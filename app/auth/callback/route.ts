import { NextResponse } from 'next/server'

import {
  buildDesktopRedirectUrl,
  generateOpaqueToken,
  getAuthCodeExpiryDate,
  hashOpaqueToken,
} from '@/lib/desktop-auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

function addDesktopParams(
  target: URL,
  params: {
    desktopMode: boolean
    state: string | null
    nonce: string | null
    protocol: string | null
    redirectUri: string | null
    callbackUri: string | null
  },
) {
  if (!params.desktopMode) return
  target.searchParams.set('desktop', '1')
  if (params.state) target.searchParams.set('state', params.state)
  if (params.nonce) target.searchParams.set('nonce', params.nonce)
  if (params.protocol) target.searchParams.set('protocol', params.protocol)
  if (params.redirectUri) target.searchParams.set('redirect', params.redirectUri)
  if (params.callbackUri) target.searchParams.set('callback', params.callbackUri)
}

function shouldUseClientPkceFallback(errorMessage: string): boolean {
  const normalized = errorMessage.toLowerCase()
  return (
    normalized.includes('code verifier') ||
    normalized.includes('both auth code and code verifier should be non-empty')
  )
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'
    const desktopMode = requestUrl.searchParams.get('desktop') === '1'
    const state = requestUrl.searchParams.get('state')
    const nonce = requestUrl.searchParams.get('nonce')
    const protocol = requestUrl.searchParams.get('protocol')
    const redirectUri = requestUrl.searchParams.get('redirect')
    const callbackUri = requestUrl.searchParams.get('callback')
    const error = requestUrl.searchParams.get('error')
    const errorDescription = requestUrl.searchParams.get('error_description')

    // Determine the base URL for redirection
    // Always use the request origin for web OAuth to preserve PKCE storage.
    // The PKCE verifier is stored per-domain, so redirecting to a different host breaks the exchange.
    let origin = requestUrl.origin
    origin = origin.replace(/\/$/, '')

    // If there's an error from the OAuth provider, redirect with error
    if (error) {
      const errorUrl = new URL('/signin', origin)
      errorUrl.searchParams.set('error', errorDescription || error)
      addDesktopParams(errorUrl, {
        desktopMode,
        state,
        nonce,
        protocol,
        redirectUri,
        callbackUri,
      })
      return NextResponse.redirect(errorUrl)
    }

    // If there's a code and we're not in desktop mode, complete on the client
    if (code && !desktopMode) {
      const clientUrl = new URL('/auth/callback-client', origin)
      clientUrl.searchParams.set('code', code)
      clientUrl.searchParams.set('next', next)
      return NextResponse.redirect(clientUrl)
    }

    // If there's a code, exchange it for a session
    if (code) {
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        if (shouldUseClientPkceFallback(exchangeError.message)) {
          const fallbackUrl = new URL('/auth/callback-client', origin)
          fallbackUrl.searchParams.set('code', code)
          fallbackUrl.searchParams.set('next', next)
          if (desktopMode) fallbackUrl.searchParams.set('desktop', '1')
          if (state) fallbackUrl.searchParams.set('state', state)
          if (nonce) fallbackUrl.searchParams.set('nonce', nonce)
          if (protocol) fallbackUrl.searchParams.set('protocol', protocol)
          if (redirectUri) fallbackUrl.searchParams.set('redirect', redirectUri)
          if (callbackUri) fallbackUrl.searchParams.set('callback', callbackUri)
          return NextResponse.redirect(fallbackUrl)
        }

        const errorUrl = new URL('/signin', origin)
        errorUrl.searchParams.set('error', exchangeError.message)
        addDesktopParams(errorUrl, {
          desktopMode,
          state,
          nonce,
          protocol,
          redirectUri,
          callbackUri,
        })
        return NextResponse.redirect(errorUrl)
      }
    }

    if (desktopMode) {
      if (!state) {
        const errorUrl = new URL('/signin', origin)
        errorUrl.searchParams.set(
          'error',
          'Missing desktop auth state. Please restart login from the app.',
        )
        addDesktopParams(errorUrl, {
          desktopMode,
          state,
          nonce,
          protocol,
          redirectUri,
          callbackUri,
        })
        return NextResponse.redirect(errorUrl)
      }

      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        const errorUrl = new URL('/signin', origin)
        errorUrl.searchParams.set(
          'error',
          'Could not determine user after sign in. Please try again.',
        )
        addDesktopParams(errorUrl, {
          desktopMode,
          state,
          nonce,
          protocol,
          redirectUri,
          callbackUri,
        })
        return NextResponse.redirect(errorUrl)
      }

      const admin = createAdminClient()
      const desktopCode = generateOpaqueToken(32)
      const codeHash = hashOpaqueToken(desktopCode)
      const expiresAt = getAuthCodeExpiryDate().toISOString()

      const { error: insertError } = await admin.from('desktop_auth_codes').insert({
        code_hash: codeHash,
        state,
        nonce,
        user_id: user.id,
        expires_at: expiresAt,
      })

      if (insertError) {
        console.error('Failed to mint desktop auth code:', insertError)
        const errorUrl = new URL('/signin', origin)
        errorUrl.searchParams.set(
          'error',
          'Unable to create desktop session code. Please retry.',
        )
        addDesktopParams(errorUrl, {
          desktopMode,
          state,
          nonce,
          protocol,
          redirectUri,
          callbackUri,
        })
        return NextResponse.redirect(errorUrl)
      }

      const deepLink = buildDesktopRedirectUrl({
        redirect: redirectUri,
        protocol,
        code: desktopCode,
        state,
      })

      const callbackPage = new URL('/electron-auth-success', origin)
      callbackPage.searchParams.set('desktop', '1')
      callbackPage.searchParams.set('deep_link', deepLink)
      callbackPage.searchParams.set('state', state)
      return NextResponse.redirect(callbackPage)
    }

    // Redirect to the specified next URL or dashboard
    const finalUrl = new URL(next, origin)

    // If we're going to the electron auth success page, we need to pass the tokens
    if (next === '/electron-auth-success') {
      const supabase = await createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        finalUrl.searchParams.set('token', session.access_token)
        if (session.refresh_token) {
          finalUrl.searchParams.set('refresh_token', session.refresh_token)
        }
      }
    }

    return NextResponse.redirect(finalUrl)
  } catch (error) {
    console.error('Callback route error:', error)
    const requestUrl = new URL(request.url)
    const origin = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin
    const errorUrl = new URL('/signin', origin)
    errorUrl.searchParams.set('error', 'An unexpected error occurred during authentication')
    return NextResponse.redirect(errorUrl)
  }
}
