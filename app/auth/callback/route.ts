import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'
    const error = requestUrl.searchParams.get('error')
    const errorDescription = requestUrl.searchParams.get('error_description')

    // If there's an error from the OAuth provider, redirect with error
    if (error) {
      const errorUrl = new URL('/signin', requestUrl.origin)
      errorUrl.searchParams.set('error', errorDescription || error)
      return NextResponse.redirect(errorUrl)
    }

    // If there's a code, exchange it for a session
    if (code) {
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        const errorUrl = new URL('/signin', requestUrl.origin)
        errorUrl.searchParams.set('error', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }
    }

    // Redirect to the specified next URL or dashboard
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  } catch (error) {
    console.error('Callback route error:', error)
    const requestUrl = new URL(request.url)
    const errorUrl = new URL('/signin', requestUrl.origin)
    errorUrl.searchParams.set('error', 'An unexpected error occurred during authentication')
    return NextResponse.redirect(errorUrl)
  }
}

