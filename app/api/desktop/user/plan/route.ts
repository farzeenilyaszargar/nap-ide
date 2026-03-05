import { NextResponse } from "next/server"
import {
  getDesktopTokenFromHeaders,
  monthPeriod,
  toFiniteNumber,
  verifyDesktopAccessToken,
} from "@/lib/desktop-auth"
import { createAdminClient } from "@/lib/supabase/admin"

function planCodeFromName(planName: string): string {
  return planName.trim().toLowerCase().replace(/\s+/g, "_")
}

function numberFromDb(value: unknown): number {
  return toFiniteNumber(value, 0)
}

function periodRange(periodStart: string, periodEnd: string) {
  return {
    startIso: `${periodStart}T00:00:00.000Z`,
    endIso: `${periodEnd}T23:59:59.999Z`,
  }
}

export async function GET(request: Request) {
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
    .select(
      "tokens_used,requests_count,plan_start_date,plan_expiry_date,plans(name)",
    )
    .eq("user_id", claims.sub)
    .maybeSingle()

  const planName =
    (usageRow?.plans as { name?: string } | null | undefined)?.name || "Free"
  const status =
    usageRow?.plan_expiry_date &&
    new Date(usageRow.plan_expiry_date).getTime() < Date.now()
      ? "expired"
      : "active"

  const { periodStart, periodEnd } = monthPeriod(new Date())
  const { startIso, endIso } = periodRange(periodStart, periodEnd)

  const { data: planLimit } = await admin
    .from("plan_limits")
    .select("included_quota_usd,warning_threshold_ratio,overage_unit_price_usd")
    .eq("plan_code", planCodeFromName(planName))
    .maybeSingle()

  const includedUsd = numberFromDb(planLimit?.included_quota_usd)
  const warningThresholdRatio = numberFromDb(planLimit?.warning_threshold_ratio)
  const overageUnitPriceUsd = numberFromDb(planLimit?.overage_unit_price_usd)

  const { data: rollupRow } = await admin
    .from("usage_period_rollups")
    .select("usage_cost_usd,included_quota_usd,overage_cost_usd")
    .eq("user_id", claims.sub)
    .eq("period_start", periodStart)
    .eq("period_end", periodEnd)
    .maybeSingle()

  let usageUsd = 0
  if (rollupRow) {
    usageUsd = numberFromDb(rollupRow.usage_cost_usd)
  } else {
    const { data: costRows } = await admin
      .from("usage_events")
      .select("total_cost_usd")
      .eq("user_id", claims.sub)
      .gte("created_at", startIso)
      .lte("created_at", endIso)

    usageUsd = (costRows || []).reduce((sum, row) => {
      return sum + numberFromDb(row.total_cost_usd)
    }, 0)
  }

  const quotaUsd = rollupRow
    ? numberFromDb(rollupRow.included_quota_usd)
    : includedUsd
  const overageUsd = rollupRow
    ? numberFromDb(rollupRow.overage_cost_usd)
    : Math.max(0, usageUsd - quotaUsd)

  return NextResponse.json({
    email: claims.email || null,
    plan: planName,
    status,
    quotaUsd,
    includedUsd: quotaUsd,
    periodStart,
    periodEnd,
    usageUsd,
    overageUsd,
    warningThresholdRatio,
    overageUnitPriceUsd,
    tokensUsed: usageRow?.tokens_used || 0,
    requestsCount: usageRow?.requests_count || 0,
  })
}
