"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"

function getSearchParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams()
  }
  return new URLSearchParams(window.location.search)
}

export default function CallbackClientPage() {
  const params = useMemo(() => getSearchParams(), [])
  const [status, setStatus] = useState("Completing sign-in...")

  useEffect(() => {
    const code = params.get("code")
    const next = params.get("next") || "/dashboard"
    const desktop = params.get("desktop") === "1"
    const state = params.get("state")
    const nonce = params.get("nonce")
    const protocol = params.get("protocol")
    const redirectUri = params.get("redirect")
    const callbackUri = params.get("callback")

    if (!code) {
      window.location.replace(`/signin?error=${encodeURIComponent("Missing auth code")}`)
      return
    }

    const complete = async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        window.location.replace(
          `/signin?error=${encodeURIComponent(error.message || "Authentication failed")}`,
        )
        return
      }

      const serverCallbackUrl = new URL("/auth/callback", window.location.origin)
      serverCallbackUrl.searchParams.set("next", next)
      if (desktop) serverCallbackUrl.searchParams.set("desktop", "1")
      if (state) serverCallbackUrl.searchParams.set("state", state)
      if (nonce) serverCallbackUrl.searchParams.set("nonce", nonce)
      if (protocol) serverCallbackUrl.searchParams.set("protocol", protocol)
      if (redirectUri) serverCallbackUrl.searchParams.set("redirect", redirectUri)
      if (callbackUri) serverCallbackUrl.searchParams.set("callback", callbackUri)

      setStatus("Sign-in completed. Redirecting...")
      window.location.replace(serverCallbackUrl.toString())
    }

    void complete()
  }, [params])

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-xl bg-white text-black flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold">Signing You In</h1>
        <p className="mt-4 text-sm text-gray-600">{status}</p>
      </div>
    </main>
  )
}
