import { NextResponse } from "next/server"
import type { User } from "@supabase/supabase-js"
import {
  generateOpaqueToken,
  getRefreshSessionExpiryDate,
  getRequestIp,
  hashOpaqueToken,
  issueDesktopAccessToken,
} from "@/lib/desktop-auth"
import { createAdminClient } from "@/lib/supabase/admin"

function toUserProfile(user: User) {
  const metadata = user.user_metadata || {}
  return {
    id: user.id,
    email: user.email || "",
    name:
      (typeof metadata.full_name === "string" && metadata.full_name) ||
      (typeof metadata.name === "string" && metadata.name) ||
      null,
    imageUrl:
      (typeof metadata.avatar_url === "string" && metadata.avatar_url) || null,
    username:
      (typeof metadata.user_name === "string" && metadata.user_name) ||
      (typeof metadata.preferred_username === "string" &&
        metadata.preferred_username) ||
      null,
  }
}

function safeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, maxLength)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const code = safeText(body.code, 512)
  const state = safeText(body.state, 512)
  const nonce = safeText(body.nonce, 512)

  if (!code || !state) {
    return NextResponse.json(
      { error: "code and state are required" },
      { status: 400 },
    )
  }

  const admin = createAdminClient()
  const nowIso = new Date().toISOString()

  try {
    let consumeQuery = admin
      .from("desktop_auth_codes")
      .update({ used_at: nowIso })
      .eq("code_hash", hashOpaqueToken(code))
      .eq("state", state)
      .is("used_at", null)
      .gt("expires_at", nowIso)

    if (nonce) {
      consumeQuery = consumeQuery.eq("nonce", nonce)
    }

    const { data: authCode, error: authCodeError } = await consumeQuery
      .select("id,user_id")
      .single()

    if (authCodeError || !authCode) {
      return NextResponse.json(
        { error: "Invalid or expired desktop auth code" },
        { status: 401 },
      )
    }

    const refreshToken = generateOpaqueToken()
    const refreshTokenHash = hashOpaqueToken(refreshToken)
    const refreshExpiresAt = getRefreshSessionExpiryDate()

    const { data: sessionRow, error: sessionError } = await admin
      .from("desktop_sessions")
      .insert({
        user_id: authCode.user_id,
        refresh_token_hash: refreshTokenHash,
        device_info: safeText(body.deviceInfo, 512),
        app_version: safeText(body.appVersion, 120),
        platform: safeText(body.platform, 64),
        arch: safeText(body.arch, 64),
        ip_address: getRequestIp(request),
        user_agent: safeText(request.headers.get("user-agent"), 512),
        expires_at: refreshExpiresAt.toISOString(),
      })
      .select("id")
      .single()

    if (sessionError || !sessionRow) {
      console.error("[desktop-auth] Failed to create desktop session", sessionError)
      return NextResponse.json(
        { error: "Unable to create desktop session" },
        { status: 500 },
      )
    }

    const { data: userResult, error: userError } = await admin.auth.admin.getUserById(
      authCode.user_id,
    )
    if (userError || !userResult?.user) {
      await admin
        .from("desktop_sessions")
        .update({ revoked_at: new Date().toISOString() })
        .eq("id", sessionRow.id)
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const accessToken = await issueDesktopAccessToken({
      userId: authCode.user_id,
      sessionId: sessionRow.id,
      email: userResult.user.email,
    })

    return NextResponse.json({
      token: accessToken.token,
      refreshToken,
      expiresAt: accessToken.expiresAt,
      desktopSessionId: sessionRow.id,
      user: toUserProfile(userResult.user),
    })
  } catch (error) {
    console.error("[desktop-auth] Exchange failed", error)
    return NextResponse.json(
      { error: "Desktop exchange failed" },
      { status: 500 },
    )
  }
}
