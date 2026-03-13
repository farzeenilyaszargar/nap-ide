'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import GenHeader from '@/components/genericHeader'

type Provider = 'google'

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
    const [emailLoading, setEmailLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const queryError = searchParams.get('error')
    const desktopMode = searchParams.get('desktop') === '1'

    const redirectUrlObject = useMemo(() => {
        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
        siteUrl = siteUrl.replace(/\/$/, '')

        const urlRedirectTo = searchParams.get('redirect_to')
        const sessionRedirectTo = typeof window !== 'undefined' ? sessionStorage.getItem('ide_redirect_to') : null
        const nextPath = urlRedirectTo || sessionRedirectTo || '/dashboard'

        const redirectUrl = new URL('/auth/callback', siteUrl)

        if (desktopMode) {
            const state = searchParams.get('state')
            const nonce = searchParams.get('nonce')
            const protocol = searchParams.get('protocol')
            const redirect = searchParams.get('redirect')
            const callback = searchParams.get('callback')

            if (state) {
                redirectUrl.searchParams.set('desktop', '1')
                redirectUrl.searchParams.set('state', state)
                if (nonce) redirectUrl.searchParams.set('nonce', nonce)
                if (protocol) redirectUrl.searchParams.set('protocol', protocol)
                if (redirect) redirectUrl.searchParams.set('redirect', redirect)
                if (callback) redirectUrl.searchParams.set('callback', callback)
            }
        } else {
            redirectUrl.searchParams.set('next', nextPath)
        }

        return redirectUrl
    }, [desktopMode, searchParams])

    const clientRedirectUrl = useMemo(() => {
        const url = new URL(redirectUrlObject.toString())
        url.pathname = '/auth/callback-client'
        return url
    }, [redirectUrlObject])

    const handleSignIn = async (provider: Provider) => {
        const supabase = createClient()
        setActiveProvider(provider)
        setError(null)

        if (desktopMode && !searchParams.get('state')) {
            setError('Missing desktop state. Please restart login from the app.')
            setActiveProvider(null)
            return
        }

        const baseOptions = {
            redirectTo: clientRedirectUrl.toString(),
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

    const handleEmailSignIn = async () => {
        const supabase = createClient()
        setError(null)
        setEmailSent(false)

        const trimmedEmail = email.trim()
        if (!trimmedEmail) {
            setError('Please enter your email address.')
            return
        }

        setEmailLoading(true)

        if (desktopMode && !searchParams.get('state')) {
            setError('Missing desktop state. Please restart login from the app.')
            setEmailLoading(false)
            return
        }

        const { error } = await supabase.auth.signInWithOtp({
            email: trimmedEmail,
            options: {
                emailRedirectTo: clientRedirectUrl.toString(),
                shouldCreateUser: true,
            },
        })

        if (error) {
            setError(error.message)
            setEmailLoading(false)
            return
        }

        setEmailSent(true)
        setEmailLoading(false)
    }

    return (
        <div className="min-h-screen bg-white">
            <GenHeader />

            <main className="relative flex min-h-[calc(100vh-56px)] flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
                {/* Modern subtle background background */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(0,123,255,0.03)_0%,rgba(255,255,255,0)_100%)]" />
                <div className="absolute top-[20%] left-[10%] -z-10 h-64 w-64 rounded-full bg-blue-50/40 blur-3xl" />
                <div className="absolute bottom-[20%] right-[10%] -z-10 h-72 w-72 rounded-full bg-indigo-50/40 blur-3xl" />

                <div className="w-full max-w-[420px] transition-all duration-700 animate-in fade-in slide-in-from-bottom-6">
                    {emailSent ? (
                        <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white/80 p-6 text-center shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Open mail for confirmation</h1>
                            <p className="mt-3 text-sm text-gray-500">We just sent a secure sign-in link to your email.</p>
                        </div>
                    ) : (
                    <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-8">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
                                {desktopMode ? 'Continue to Nap Desktop' : 'Welcome'}
                            </h1>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                {desktopMode
                                    ? 'Use Google sign-in to securely authenticate and return to the desktop app.'
                                    : 'Sign in to continue to your dashboard and start building with agents.'}
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
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
                            <div className="flex items-center gap-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                                <span className="h-px flex-1 bg-gray-200" />
                                <span>or</span>
                                <span className="h-px flex-1 bg-gray-200" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Email address"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                />
                                    <button
                                        type="button"
                                        onClick={handleEmailSignIn}
                                        disabled={emailLoading}
                                        className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {emailLoading ? 'Sending...' : 'Continue'}
                                    </button>
                            </div>
                        </div>

                        {(error || queryError) && (
                            <div className="mt-6 animate-in fade-in zoom-in-95 duration-300">
                                <div className="rounded-xl bg-red-50 px-4 py-3 text-center">
                                    <p className="text-sm font-medium text-red-600">{error || queryError}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 pt-5 border-t border-gray-50">
                            <p className="text-center text-xs text-gray-400">
                                By signing in, you agree to our{' '}
                                <Link href="/tc" className="font-medium text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-gray-400">Terms</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="font-medium text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-gray-400">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                    )}

                    {!emailSent && (
                        <div className="mt-5 text-center animate-in fade-in slide-in-from-top-4 duration-1000 delay-300 fill-mode-both">
                            <p className="text-sm text-gray-500">
                                {desktopMode
                                    ? 'After sign in, this browser tab will guide you back to the app.'
                                    : <>Don&apos;t have an account? No problem. <br />Signing in creates one automatically.</>}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
