'use client'

import { useEffect, useMemo, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react'
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
    const [emailStep, setEmailStep] = useState<'idle' | 'sending' | 'sent' | 'verifying'>('idle')
    const [email, setEmail] = useState('')
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''))
    const otpRefs = useRef<Array<HTMLInputElement | null>>([])
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [suppressQueryError, setSuppressQueryError] = useState(false)
    const queryError = searchParams.get('error')
    const desktopMode = searchParams.get('desktop') === '1'

    const nextPath = useMemo(() => {
        const urlRedirectTo = searchParams.get('redirect_to')
        const sessionRedirectTo = typeof window !== 'undefined' ? sessionStorage.getItem('ide_redirect_to') : null
        return urlRedirectTo || sessionRedirectTo || '/dashboard'
    }, [searchParams])

    const redirectUrlObject = useMemo(() => {
        const browserOrigin = typeof window !== 'undefined' ? window.location.origin : ''
        let siteUrl = browserOrigin || process.env.NEXT_PUBLIC_SITE_URL || ''
        siteUrl = siteUrl.replace(/\/$/, '')

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
    }, [desktopMode, nextPath, searchParams])

    const clientRedirectUrl = useMemo(() => {
        const url = new URL(redirectUrlObject.toString())
        url.pathname = '/auth/callback-client'
        return url
    }, [redirectUrlObject])

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                setSuppressQueryError(true)
                setError(null)
                setSuccess('Login successful.')
            }
        })
    }, [desktopMode, nextPath, queryError])

    const handleSignIn = async (provider: Provider) => {
        const supabase = createClient()
        setActiveProvider(provider)
        setError(null)
        setSuccess(null)

        if (desktopMode && !searchParams.get('state')) {
            setError('Missing desktop state. Please restart login from the app.')
            setActiveProvider(null)
            return
        }

        const baseOptions = {
            redirectTo: desktopMode ? redirectUrlObject.toString() : clientRedirectUrl.toString(),
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
        setSuccess(null)
        setEmailStep('idle')

        const trimmedEmail = email.trim()
        if (!trimmedEmail) {
            setError('Please enter your email address.')
            return
        }

        setEmailStep('sending')

        if (desktopMode && !searchParams.get('state')) {
            setError('Missing desktop state. Please restart login from the app.')
            setEmailStep('idle')
            return
        }

        const { error } = await supabase.auth.signInWithOtp({
            email: trimmedEmail,
            options: {
                shouldCreateUser: true,
            },
        })

        if (error) {
            setError(error.message)
            setEmailStep('idle')
            return
        }

        setOtpDigits(Array(6).fill(''))
        setEmailStep('sent')
    }

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1)
        const nextDigits = [...otpDigits]
        nextDigits[index] = digit
        setOtpDigits(nextDigits)
        if (digit && index < otpDigits.length - 1) {
            otpRefs.current[index + 1]?.focus()
        }
    }

    const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleOtpPaste = (event: ClipboardEvent<HTMLDivElement>) => {
        const paste = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, otpDigits.length)
        if (!paste) return
        event.preventDefault()
        const nextDigits = Array(otpDigits.length).fill('')
        paste.split('').forEach((char, index) => {
            nextDigits[index] = char
        })
        setOtpDigits(nextDigits)
        const nextIndex = Math.min(paste.length, otpDigits.length - 1)
        otpRefs.current[nextIndex]?.focus()
    }

    const handleVerifyOtp = async () => {
        const supabase = createClient()
        setError(null)
        setSuccess(null)

        const token = otpDigits.join('')
        if (token.length !== otpDigits.length) {
            setError('Enter the 6-digit code sent to your email.')
            return
        }

        const trimmedEmail = email.trim()
        if (!trimmedEmail) {
            setError('Please enter your email address.')
            return
        }

        setEmailStep('verifying')

        const { error } = await supabase.auth.verifyOtp({
            email: trimmedEmail,
            token,
            type: 'email',
        })

        if (error) {
            setError(error.message)
            setEmailStep('sent')
            return
        }

        if (desktopMode) {
            window.location.assign(redirectUrlObject.toString())
            return
        }

        setSuccess('Login successful.')
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
                    <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-gray-900">
                                {desktopMode ? 'Continue to Nap' : 'Welcome'}
                            </h2>
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
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                        if (emailStep !== 'idle') {
                                            setEmailStep('idle')
                                            setOtpDigits(Array(6).fill(''))
                                        }
                                    }}
                                    placeholder="Email address"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                />
                                    <button
                                        type="button"
                                        onClick={handleEmailSignIn}
                                        disabled={emailStep === 'sending'}
                                        className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {emailStep === 'sending' ? 'Sending...' : 'Continue'}
                                    </button>
                            </div>
                            {(emailStep === 'sent' || emailStep === 'verifying') && (
                                <div className="mt-4 flex flex-col gap-3">
                                    <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email.</p>
                                    <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                                        {otpDigits.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    otpRefs.current[index] = el
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(event) => handleOtpChange(index, event.target.value)}
                                                onKeyDown={(event) => handleOtpKeyDown(index, event)}
                                                className="h-11 w-11 rounded-xl border border-gray-200 bg-white text-center text-base font-semibold text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={emailStep === 'verifying'}
                                        className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {emailStep === 'verifying' ? 'Verifying...' : 'Verify'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {(error || (!suppressQueryError && queryError)) && (
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

                    <div className="mt-5 text-center animate-in fade-in slide-in-from-top-4 duration-1000 delay-300 fill-mode-both">
                        <p className="text-sm text-gray-500">
                            {desktopMode
                                ? 'After sign in, this browser tab will guide you back to the app.'
                                : <>Don&apos;t have an account? No problem. <br />Signing in creates one automatically.</>}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
