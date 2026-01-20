'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

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
        { id: 'github', label1: 'Continue with GitHub', label2: 'Github', icon: '/github-icon.png' },
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

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
        const redirectUrl = `${siteUrl}/auth/callback?next=/dashboard`

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
        <div className="">
            <GenHeader />
            <div className='flex justify-center items-center h-140 sm:px-10 px-5'>

                <div className="w-full max-w-md rounded-2xl border border-gray-200 p-10 text-center bg-gray-50">
                    <h1 className="sm:text-3xl text-2xl font-semibold text-black">Sign In</h1>
                    <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                        choose a provider to continue to your dashboard.
                    </p>

                    <div className="mt-8 space-y-4 ">
                        {providers.map((provider) => (
                            <button
                                key={provider.id}
                                type="button"
                                onClick={() => handleSignIn(provider.id)}
                                disabled={!!activeProvider}
                                className="flex w-full items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-left text-sm font-medium transition hover:border-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <span className=" items-center gap-3 text-lg hidden sm:flex">
                                    <Image
                                        src={provider.icon}
                                        width={24}
                                        height={24}
                                        alt={`${provider.label1} logo`}
                                    />
                                    {provider.label1}
                                </span>
                                <span className="flex items-center gap-3 text-sm  sm:hidden">
                                    <Image
                                        src={provider.icon}
                                        width={24}
                                        height={24}
                                        alt={`${provider.label1} logo`}
                                    />
                                    {provider.label2}
                                </span>
                            </button>
                        ))}
                    </div>

                    {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
                </div>
            </div>
        </div>

    )
}
