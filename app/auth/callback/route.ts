import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'
    const error = requestUrl.searchParams.get('error')
    const errorDescription = requestUrl.searchParams.get('error_description')

    // Determine the base URL for redirection
    let origin = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin
    // Sanitize: remove trailing slash if exists
    origin = origin.replace(/\/$/, '')

    // If there's an error from the OAuth provider, redirect with error
    if (error) {
      const errorUrl = new URL('/signin', origin)
      errorUrl.searchParams.set('error', errorDescription || error)
      return NextResponse.redirect(errorUrl)
    }

    // If there's a code, exchange it for a session
    if (code) {
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        const errorUrl = new URL('/signin', origin)
        errorUrl.searchParams.set('error', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }
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

