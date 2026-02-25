import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const redirectTo = searchParams.get('redirect_to') || '/electron-auth-success'

    const cookieStore = await cookies()
    const supabase = await createClient()

    // Check if user is already authenticated
    const { data: { session }, error } = await supabase.auth.getSession()

    if (session && !error) {
        // User is already logged in, redirect to electron-auth-success with tokens
        const accessToken = session.access_token
        const refreshToken = session.refresh_token

        const redirectUrl = `${redirectTo}?token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`
        return redirect(redirectUrl)
    }

    // User is not logged in, redirect to IDE auth page with instructions
    const response = redirect(`/auth/ide-auth`)

    return response
}
