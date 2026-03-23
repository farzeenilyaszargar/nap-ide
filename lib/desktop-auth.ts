import { createHash, randomBytes } from "node:crypto"
import { SignJWT, jwtVerify, type JWTPayload } from "jose"

const ACCESS_TOKEN_TTL_SECONDS = Number(
  process.env.DESKTOP_ACCESS_TOKEN_TTL_SECONDS || 60 * 60,
)
const REFRESH_TOKEN_TTL_DAYS = Number(
  process.env.DESKTOP_REFRESH_TOKEN_TTL_DAYS || 90,
)
const AUTH_CODE_TTL_MINUTES = Number(
  process.env.DESKTOP_AUTH_CODE_TTL_MINUTES || 10,
)

const DEFAULT_PROTOCOLS = [
  "nap",
  "nap-agents",
  "twentyfirst-agents",
  "twentyfirst-agents-dev",
]
const DESKTOP_PROTOCOLS = (
  process.env.DESKTOP_ALLOWED_PROTOCOLS || DEFAULT_PROTOCOLS.join(",")
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean)

const DISALLOWED_PAYLOAD_KEYS = new Set([
  "prompt",
  "prompts",
  "response",
  "responses",
  "message",
  "messages",
  "content",
  "parts",
  "assistanttext",
  "usertext",
  "tooloutput",
  "filecontent",
  "input",
  "output",
  "text",
])

export interface DesktopAccessTokenPayload extends JWTPayload {
  sub: string
  sid: string
  email?: string
}

function getDesktopJwtSecret(): Uint8Array {
  const secret =
    process.env.DESKTOP_AUTH_JWT_SECRET ||
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET

  if (!secret) {
    throw new Error(
      "Missing DESKTOP_AUTH_JWT_SECRET (or JWT_SECRET/NEXTAUTH_SECRET fallback).",
    )
  }

  return new TextEncoder().encode(secret)
}

function getIssuer(): string {
  return process.env.DESKTOP_JWT_ISSUER || "nap-desktop-auth"
}

function getAudience(): string {
  return process.env.DESKTOP_JWT_AUDIENCE || "nap-desktop"
}

function normalizeProtocol(value: string): string {
  return value.replace(/:$/, "").trim().toLowerCase()
}

function getAllowedProtocolSet(): Set<string> {
  return new Set(DESKTOP_PROTOCOLS.map(normalizeProtocol))
}

export function getAuthCodeExpiryDate(): Date {
  return new Date(Date.now() + AUTH_CODE_TTL_MINUTES * 60 * 1000)
}

export function getRefreshSessionExpiryDate(): Date {
  return new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000)
}

export function getAccessTokenExpiryDate(): Date {
  return new Date(Date.now() + ACCESS_TOKEN_TTL_SECONDS * 1000)
}

export function hashOpaqueToken(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

export function generateOpaqueToken(byteLength = 48): string {
  return randomBytes(byteLength).toString("base64url")
}

export async function issueDesktopAccessToken(params: {
  userId: string
  sessionId: string
  email?: string | null
}): Promise<{ token: string; expiresAt: string }> {
  const issuedAtSeconds = Math.floor(Date.now() / 1000)
  const expiresAtSeconds = issuedAtSeconds + ACCESS_TOKEN_TTL_SECONDS
  const jwtSecret = getDesktopJwtSecret()

  const token = await new SignJWT({
    sid: params.sessionId,
    email: params.email || undefined,
    typ: "desktop",
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(params.userId)
    .setIssuer(getIssuer())
    .setAudience(getAudience())
    .setIssuedAt(issuedAtSeconds)
    .setExpirationTime(expiresAtSeconds)
    .sign(jwtSecret)

  return {
    token,
    expiresAt: new Date(expiresAtSeconds * 1000).toISOString(),
  }
}

export async function verifyDesktopAccessToken(
  token: string,
): Promise<DesktopAccessTokenPayload> {
  const { payload } = await jwtVerify(token, getDesktopJwtSecret(), {
    issuer: getIssuer(),
    audience: getAudience(),
  })

  if (!payload.sub || typeof payload.sub !== "string") {
    throw new Error("Invalid desktop token subject")
  }
  if (!payload.sid || typeof payload.sid !== "string") {
    throw new Error("Invalid desktop token session claim")
  }

  return payload as DesktopAccessTokenPayload
}

export function getDesktopTokenFromHeaders(headers: Headers): string | null {
  const desktopToken = headers.get("x-desktop-token")
  if (desktopToken) return desktopToken.trim()

  const authHeader = headers.get("authorization")
  if (!authHeader) return null

  const [scheme, value] = authHeader.split(" ")
  if (!scheme || !value) return null
  if (scheme.toLowerCase() !== "bearer") return null
  return value.trim()
}

export function buildDesktopRedirectUrl(params: {
  redirect?: string | null
  protocol?: string | null
  code: string
  state: string
}): string {
  const allowedProtocols = getAllowedProtocolSet()
  const preferredProtocol =
    normalizeProtocol(params.protocol || "") || DEFAULT_PROTOCOLS[0]

  if (!allowedProtocols.has(preferredProtocol)) {
    throw new Error("Unsupported desktop protocol")
  }

  let target = `${preferredProtocol}://auth`

  if (params.redirect) {
    const candidate = new URL(params.redirect)
    const candidateProtocol = normalizeProtocol(candidate.protocol)
    if (!allowedProtocols.has(candidateProtocol)) {
      throw new Error("Invalid desktop redirect protocol")
    }
    target = candidate.toString()
  }

  const deepLink = new URL(target)
  deepLink.searchParams.set("code", params.code)
  deepLink.searchParams.set("state", params.state)
  return deepLink.toString()
}

export function getRequestIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || null
  }
  return request.headers.get("x-real-ip")
}

export function toFiniteNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback
  }
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export function sanitizeTelemetryPayload(value: unknown): Record<string, unknown> {
  const seen = new WeakSet<object>()

  const clone = (input: unknown): unknown => {
    if (!input || typeof input !== "object") {
      if (typeof input === "number" && !Number.isFinite(input)) {
        return null
      }
      return input
    }

    if (seen.has(input as object)) {
      return null
    }
    seen.add(input as object)

    if (Array.isArray(input)) {
      return input.map(clone)
    }

    const output: Record<string, unknown> = {}
    for (const [rawKey, rawValue] of Object.entries(input as Record<string, unknown>)) {
      const normalizedKey = rawKey.toLowerCase()
      if (DISALLOWED_PAYLOAD_KEYS.has(normalizedKey)) {
        throw new Error(`Payload contains disallowed key "${rawKey}"`)
      }
      output[rawKey] = clone(rawValue)
    }
    return output
  }

  const cloned = clone(value)
  if (!cloned || typeof cloned !== "object" || Array.isArray(cloned)) {
    return {}
  }
  return cloned as Record<string, unknown>
}

export function monthPeriod(date: Date): { periodStart: string; periodEnd: string } {
  const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
  const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0))
  return {
    periodStart: start.toISOString().slice(0, 10),
    periodEnd: end.toISOString().slice(0, 10),
  }
}
