import { NextResponse } from "next/server"
import {
  getDesktopTokenFromHeaders,
  monthPeriod,
  sanitizeTelemetryPayload,
  toFiniteNumber,
  verifyDesktopAccessToken,
} from "@/lib/desktop-auth"
import { createAdminClient } from "@/lib/supabase/admin"

const MAX_EVENTS_PER_BATCH = 100

type IngestEvent = {
  idempotencyKey: string
  eventType: string
  payload: Record<string, unknown>
  createdAt?: string | null
}

type AggregatePeriod = {
  totalCostUsd: number
  inputTokens: number
  outputTokens: number
  reasoningTokens: number
  totalTokens: number
  eventCount: number
  apiCallCount: number
  voiceCallCount: number
}

function planCodeFromName(planName: string): string {
  return planName.trim().toLowerCase().replace(/\s+/g, "_")
}

function safeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, maxLength)
}

function parseCreatedAt(value: unknown): Date {
  if (typeof value === "string") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed
    }
  }
  return new Date()
}

function extractMetrics(eventType: string, payload: Record<string, unknown>) {
  const inputTokens = toFiniteNumber(payload.inputTokens)
  const outputTokens = toFiniteNumber(payload.outputTokens)
  const reasoningTokens = toFiniteNumber(payload.reasoningTokens)
  const totalTokens = toFiniteNumber(
    payload.totalTokens,
    inputTokens + outputTokens + reasoningTokens,
  )
  const totalCostUsd = toFiniteNumber(payload.totalCostUsd)

  const endpoint =
    eventType === "api_call" ? safeString(payload.endpoint, 500) : null
  const statusCode =
    eventType === "api_call" ? toFiniteNumber(payload.statusCode, 0) : 0
  const durationMs = toFiniteNumber(payload.durationMs, 0)

  return {
    inputTokens,
    outputTokens,
    reasoningTokens,
    totalTokens,
    totalCostUsd,
    endpoint,
    statusCode: statusCode > 0 ? statusCode : null,
    durationMs: durationMs > 0 ? durationMs : null,
  }
}

function duplicateKeyError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false
  const code = (error as { code?: string }).code
  return code === "23505"
}

function numberFromDb(value: unknown): number {
  return toFiniteNumber(value, 0)
}

export async function POST(request: Request) {
  const desktopToken = getDesktopTokenFromHeaders(request.headers)
  if (!desktopToken) {
    return NextResponse.json({ error: "Missing desktop token" }, { status: 401 })
  }

  let claims
  try {
    claims = await verifyDesktopAccessToken(desktopToken)
  } catch {
    return NextResponse.json({ error: "Invalid desktop token" }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const events = Array.isArray(body.events) ? (body.events as IngestEvent[]) : null
  if (!events) {
    return NextResponse.json({ error: "events[] is required" }, { status: 400 })
  }

  if (events.length > MAX_EVENTS_PER_BATCH) {
    return NextResponse.json(
      { error: `Batch too large. Max ${MAX_EVENTS_PER_BATCH} events.` },
      { status: 400 },
    )
  }

  const admin = createAdminClient()
  const nowIso = new Date().toISOString()

  const { data: sessionRow, error: sessionError } = await admin
    .from("desktop_sessions")
    .select("id,user_id")
    .eq("id", claims.sid)
    .eq("user_id", claims.sub)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .single()

  if (sessionError || !sessionRow) {
    return NextResponse.json(
      { error: "Desktop session is invalid or expired" },
      { status: 401 },
    )
  }

  await admin
    .from("desktop_sessions")
    .update({ last_seen_at: nowIso, updated_at: nowIso })
    .eq("id", sessionRow.id)

  const { data: usageRow } = await admin
    .from("user_usage")
    .select("plans(name)")
    .eq("user_id", claims.sub)
    .maybeSingle()

  const planName =
    (usageRow?.plans as { name?: string } | null | undefined)?.name || "Free"
  const { data: planLimit } = await admin
    .from("plan_limits")
    .select("included_quota_usd")
    .eq("plan_code", planCodeFromName(planName))
    .maybeSingle()
  const includedQuotaUsd = numberFromDb(planLimit?.included_quota_usd)

  const accepted: string[] = []
  const rejected: Array<{ idempotencyKey: string; reason: string }> = []
  const aggregates = new Map<string, AggregatePeriod>()

  for (const rawEvent of events) {
    const idempotencyKey = safeString(rawEvent?.idempotencyKey, 120)
    const eventType = safeString(rawEvent?.eventType, 100)
    if (!idempotencyKey || !eventType) {
      rejected.push({
        idempotencyKey: idempotencyKey || "unknown",
        reason: "Missing idempotencyKey or eventType",
      })
      continue
    }

    let sanitizedPayload: Record<string, unknown>
    try {
      sanitizedPayload = sanitizeTelemetryPayload(rawEvent.payload || {})
    } catch (error) {
      rejected.push({
        idempotencyKey,
        reason: error instanceof Error ? error.message : "Invalid payload",
      })
      continue
    }

    const createdAt = parseCreatedAt(rawEvent.createdAt)
    const { periodStart, periodEnd } = monthPeriod(createdAt)
    const key = `${periodStart}:${periodEnd}`

    const metrics = extractMetrics(eventType, sanitizedPayload)

    const { error: insertError } = await admin.from("usage_events").insert({
      idempotency_key: idempotencyKey,
      user_id: claims.sub,
      desktop_session_id: sessionRow.id,
      event_type: eventType,
      payload: sanitizedPayload,
      input_tokens: metrics.inputTokens,
      output_tokens: metrics.outputTokens,
      reasoning_tokens: metrics.reasoningTokens,
      total_tokens: metrics.totalTokens,
      total_cost_usd: metrics.totalCostUsd,
      endpoint: metrics.endpoint,
      status_code: metrics.statusCode,
      duration_ms: metrics.durationMs,
      created_at: createdAt.toISOString(),
      received_at: nowIso,
    })

    if (insertError) {
      if (duplicateKeyError(insertError)) {
        // Duplicate idempotency key is considered accepted.
        accepted.push(idempotencyKey)
        continue
      }
      rejected.push({
        idempotencyKey,
        reason: insertError.message || "Insert failed",
      })
      continue
    }

    accepted.push(idempotencyKey)
    const aggregate = aggregates.get(key) || {
      totalCostUsd: 0,
      inputTokens: 0,
      outputTokens: 0,
      reasoningTokens: 0,
      totalTokens: 0,
      eventCount: 0,
      apiCallCount: 0,
      voiceCallCount: 0,
    }

    aggregate.totalCostUsd += metrics.totalCostUsd
    aggregate.inputTokens += metrics.inputTokens
    aggregate.outputTokens += metrics.outputTokens
    aggregate.reasoningTokens += metrics.reasoningTokens
    aggregate.totalTokens += metrics.totalTokens
    aggregate.eventCount += 1
    if (eventType === "api_call") aggregate.apiCallCount += 1
    if (eventType === "voice_transcription_usage") aggregate.voiceCallCount += 1

    aggregates.set(key, aggregate)
  }

  for (const [key, aggregate] of aggregates.entries()) {
    const [periodStart, periodEnd] = key.split(":")
    const { data: existing } = await admin
      .from("usage_period_rollups")
      .select(
        "id,usage_cost_usd,included_quota_usd,assistant_total_tokens,api_call_count,voice_call_count,event_count",
      )
      .eq("user_id", claims.sub)
      .eq("period_start", periodStart)
      .eq("period_end", periodEnd)
      .maybeSingle()

    if (existing?.id) {
      const usageCostUsd = numberFromDb(existing.usage_cost_usd) + aggregate.totalCostUsd
      const includedQuota = numberFromDb(existing.included_quota_usd) || includedQuotaUsd
      const overageCostUsd = Math.max(0, usageCostUsd - includedQuota)

      await admin
        .from("usage_period_rollups")
        .update({
          usage_cost_usd: usageCostUsd,
          included_quota_usd: includedQuota,
          overage_cost_usd: overageCostUsd,
          assistant_total_tokens:
            numberFromDb(existing.assistant_total_tokens) + aggregate.totalTokens,
          api_call_count: numberFromDb(existing.api_call_count) + aggregate.apiCallCount,
          voice_call_count:
            numberFromDb(existing.voice_call_count) + aggregate.voiceCallCount,
          event_count: numberFromDb(existing.event_count) + aggregate.eventCount,
          updated_at: nowIso,
        })
        .eq("id", existing.id)
    } else {
      await admin.from("usage_period_rollups").insert({
        user_id: claims.sub,
        period_start: periodStart,
        period_end: periodEnd,
        usage_cost_usd: aggregate.totalCostUsd,
        included_quota_usd: includedQuotaUsd,
        overage_cost_usd: Math.max(0, aggregate.totalCostUsd - includedQuotaUsd),
        assistant_total_tokens: aggregate.totalTokens,
        api_call_count: aggregate.apiCallCount,
        voice_call_count: aggregate.voiceCallCount,
        event_count: aggregate.eventCount,
        updated_at: nowIso,
      })
    }
  }

  return NextResponse.json({
    accepted,
    rejected,
  })
}
