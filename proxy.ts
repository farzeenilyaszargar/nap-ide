import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    if (request.nextUrl.pathname === '/' && (request.nextUrl.searchParams.has('code') || request.nextUrl.searchParams.has('error'))) {
        const redirectUrl = new URL('/auth/callback', request.url)
        redirectUrl.search = request.nextUrl.search
        return NextResponse.redirect(redirectUrl)
    }

    // 1. Supabase Auth Check
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // 2. Protect API Routes
    if (request.nextUrl.pathname.startsWith('/api') &&
        !request.nextUrl.pathname.startsWith('/api/razorpay') && // Allow callbacks
        !request.nextUrl.pathname.startsWith('/api/auth') && // Allow auth endpoints
        !request.nextUrl.pathname.startsWith('/api/desktop') && // Desktop routes use header auth
        !request.nextUrl.pathname.startsWith('/api/download') && // Public downloads
        !request.nextUrl.pathname.startsWith('/api/updates')) { // Public update checks

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 3. User Logs / Rate Limit Placeholder
        // In a real production app, we would use Redis (e.g., Upstash) here to rate limit by User ID.
        // Example: 
        // const ip = request.ip ?? '127.0.0.1'
        // const { success } = await ratelimit.limit(user.id)
        // if (!success) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })

    }

    // 4. Protect Dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
