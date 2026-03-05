import { NextResponse } from "next/server"
import {
  getDesktopTokenFromHeaders,
  hashOpaqueToken,
  verifyDesktopAccessToken,
} from "@/lib/desktop-auth"
import { createAdminClient } from "@/lib/supabase/admin"

function safeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, maxLength)
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {}
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    body = {}
  }

  const refreshToken = safeText(body.refreshToken, 1024)
  const providedSessionId = safeText(body.desktopSessionId, 128)
  const desktopToken = getDesktopTokenFromHeaders(request.headers)

  const sessionIds = new Set<string>()
  let scopedUserId: string | null = null

  if (desktopToken) {
    try {
      const claims = await verifyDesktopAccessToken(desktopToken)
      sessionIds.add(claims.sid)
      scopedUserId = claims.sub
    } catch {
      // Invalid access token is tolerated if refresh token is present.
      if (!refreshToken && !providedSessionId) {
        return NextResponse.json(
          { error: "Invalid desktop token" },
          { status: 401 },
        )
      }
    }
  }

  const admin = createAdminClient()

  if (refreshToken) {
    const { data: refreshSession } = await admin
      .from("desktop_sessions")
      .select("id,user_id")
      .eq("refresh_token_hash", hashOpaqueToken(refreshToken))
      .single()

    if (refreshSession) {
      sessionIds.add(refreshSession.id)
      if (!scopedUserId) {
        scopedUserId = refreshSession.user_id
      }
    }
  }

  if (providedSessionId && !scopedUserId) {
    sessionIds.add(providedSessionId)
  } else if (providedSessionId && scopedUserId) {
    const { data: session } = await admin
      .from("desktop_sessions")
      .select("id")
      .eq("id", providedSessionId)
      .eq("user_id", scopedUserId)
      .single()
    if (session) {
      sessionIds.add(session.id)
    }
  }

  if (sessionIds.size === 0) {
    return NextResponse.json({ success: true, revokedCount: 0 })
  }

  try {
    let revokeQuery = admin
      .from("desktop_sessions")
      .update({
        revoked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .in("id", Array.from(sessionIds))

    if (scopedUserId) {
      revokeQuery = revokeQuery.eq("user_id", scopedUserId)
    }

    const { error: revokeError } = await revokeQuery
    if (revokeError) {
      console.error("[desktop-auth] Failed to revoke session", revokeError)
      return NextResponse.json(
        { error: "Unable to revoke desktop session" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, revokedCount: sessionIds.size })
  } catch (error) {
    console.error("[desktop-auth] Logout failed", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
