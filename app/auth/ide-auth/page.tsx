'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function IDEAuthPage() {
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkSession()
    }, [])

    const checkSession = async () => {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()

        setIsChecking(false)

        if (session) {
            setIsLoggedIn(true)
            // User is logged in, redirect to electron-auth-success with tokens
            const redirectUrl = `/electron-auth-success?token=${encodeURIComponent(session.access_token)}&refresh_token=${encodeURIComponent(session.refresh_token || '')}`
            router.push(redirectUrl)
        } else {
            setIsLoggedIn(false)
        }
    }

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
                </div>
            </div>
        )
    }

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">IDE Authentication Required</h1>

                    <div className="space-y-4 text-gray-700">
                        <p>
                            To authenticate the Nap IDE, you need to be logged into your Nap account in this browser first.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h2 className="font-semibold text-blue-900 mb-2">Quick Steps:</h2>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                                <li>Click the button below to sign in</li>
                                <li>Complete authentication with Google or GitHub</li>
                                <li>Return to the IDE and try logging in again</li>
                            </ol>
                        </div>

                        <button
                            onClick={() => router.push('/signin?redirect_to=/auth/ide-auth')}
                            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Sign In to Continue
                        </button>

                        <p className="text-sm text-gray-500 text-center">
                            After signing in, you can close this tab and return to the IDE.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Redirecting to IDE...</p>
            </div>
        </div>
    )
}
