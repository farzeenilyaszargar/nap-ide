'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import GenHeader from '@/components/genericHeader'

type Provider = 'google' | 'github'

const providers: Array<{
    id: Provider
    label1: string
    label2: string
    icon: string
}> = [
        { id: 'google', label1: 'Continue with Google', label2: 'Google', icon: '/google-icon.png' },
    ]

export default function SignIn() {
    const searchParams = useSearchParams()
    const [activeProvider, setActiveProvider] = useState<Provider | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const errorParam = searchParams.get('error')
        if (errorParam) {
            setError(errorParam)
        }
    }, [searchParams])

    const handleSignIn = async (provider: Provider) => {
        const supabase = createClient()
        setActiveProvider(provider)
        setError(null)

        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
        // Sanitize: remove trailing slash if exists
        siteUrl = siteUrl.replace(/\/$/, '')

        // Check for redirect destination from URL params or sessionStorage
        const urlRedirectTo = searchParams.get('redirect_to')
        const sessionRedirectTo = typeof window !== 'undefined' ? sessionStorage.getItem('ide_redirect_to') : null
        const nextPath = urlRedirectTo || sessionRedirectTo || '/dashboard'

        // For IDE logins, we need to ensure the OAuth callback knows to redirect to electron-auth-success
        const redirectUrl = `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}`

        const baseOptions = {
            redirectTo: redirectUrl,
            skipBrowserRedirect: false,
        } as const

        const providerOptions =
            provider === 'google'
                ? {
                    ...baseOptions,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                }
                : baseOptions

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: providerOptions,
        })

        if (error) {
            setError(error.message)
            setActiveProvider(null)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <GenHeader />

            <main className="relative flex min-h-[calc(100vh-56px)] flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
                {/* Modern subtle background background */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(0,123,255,0.03)_0%,rgba(255,255,255,0)_100%)]" />
                <div className="absolute top-[20%] left-[10%] -z-10 h-64 w-64 rounded-full bg-blue-50/40 blur-3xl" />
                <div className="absolute bottom-[20%] right-[10%] -z-10 h-72 w-72 rounded-full bg-indigo-50/40 blur-3xl" />

                <div className="w-full max-w-[420px] transition-all duration-700 animate-in fade-in slide-in-from-bottom-6">
                    <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white/80 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-12">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-10 flex items-center justify-center transition-transform duration-500 hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="Surfers Logo"
                                    width={160}
                                    height={50}
                                    className="h-10 w-auto rounded-lg"
                                />
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                Welcome Back
                            </h1>
                            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
                                Sign in to continue to your dashboard and start building with AI.
                            </p>
                        </div>

                        <div className="mt-10 space-y-4">
                            {providers.map((provider) => (
                                <button
                                    key={provider.id}
                                    type="button"
                                    onClick={() => handleSignIn(provider.id)}
                                    disabled={!!activeProvider}
                                    className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-6 w-6 transform transition-transform group-hover:scale-110">
                                            <Image
                                                src={provider.icon}
                                                fill
                                                alt={`${provider.label1} logo`}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="hidden sm:inline">{provider.label1}</span>
                                        <span className="sm:hidden">{provider.label2}</span>
                                    </div>

                                    {activeProvider === provider.id && (
                                        <div className="absolute right-4">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600/20 border-t-blue-600" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <div className="mt-6 animate-in fade-in zoom-in-95 duration-300">
                                <div className="rounded-xl bg-red-50 px-4 py-3 text-center">
                                    <p className="text-sm font-medium text-red-600">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-10 pt-8 border-t border-gray-50">
                            <p className="text-center text-xs text-gray-400">
                                By signing in, you agree to our{' '}
                                <Link href="/tc" className="font-medium text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-gray-400">Terms</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="font-medium text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-gray-400">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center animate-in fade-in slide-in-from-top-4 duration-1000 delay-300 fill-mode-both">
                        <p className="text-sm text-gray-500">
                            Don't have an account? No problem. <br />
                            Signing in creates one automatically.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
