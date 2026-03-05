import { NextResponse } from "next/server"
import type { User } from "@supabase/supabase-js"
import {
  generateOpaqueToken,
  getRefreshSessionExpiryDate,
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

  const refreshToken = safeText(body.refreshToken, 1024)
  const desktopSessionId = safeText(body.desktopSessionId, 128)

  if (!refreshToken) {
    return NextResponse.json(
      { error: "refreshToken is required" },
      { status: 400 },
    )
  }

  const admin = createAdminClient()
  const nowIso = new Date().toISOString()

  try {
    let query = admin
      .from("desktop_sessions")
      .select("id,user_id,expires_at,revoked_at")
      .eq("refresh_token_hash", hashOpaqueToken(refreshToken))
      .is("revoked_at", null)
      .gt("expires_at", nowIso)

    if (desktopSessionId) {
      query = query.eq("id", desktopSessionId)
    }

    const { data: sessionRow, error: sessionError } = await query.single()
    if (sessionError || !sessionRow) {
      return NextResponse.json(
        { error: "Refresh token is invalid or expired" },
        { status: 401 },
      )
    }

    const newRefreshToken = generateOpaqueToken()
    const refreshExpiresAt = getRefreshSessionExpiryDate().toISOString()

    const { error: rotateError } = await admin
      .from("desktop_sessions")
      .update({
        refresh_token_hash: hashOpaqueToken(newRefreshToken),
        expires_at: refreshExpiresAt,
        last_seen_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionRow.id)
      .is("revoked_at", null)

    if (rotateError) {
      console.error("[desktop-auth] Failed to rotate refresh token", rotateError)
      return NextResponse.json(
        { error: "Unable to rotate refresh token" },
        { status: 500 },
      )
    }

    const { data: userResult, error: userError } = await admin.auth.admin.getUserById(
      sessionRow.user_id,
    )
    if (userError || !userResult?.user) {
      await admin
        .from("desktop_sessions")
        .update({ revoked_at: new Date().toISOString() })
        .eq("id", sessionRow.id)
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const accessToken = await issueDesktopAccessToken({
      userId: sessionRow.user_id,
      sessionId: sessionRow.id,
      email: userResult.user.email,
    })

    return NextResponse.json({
      token: accessToken.token,
      refreshToken: newRefreshToken,
      expiresAt: accessToken.expiresAt,
      desktopSessionId: sessionRow.id,
      user: toUserProfile(userResult.user),
    })
  } catch (error) {
    console.error("[desktop-auth] Refresh failed", error)
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 })
  }
}
