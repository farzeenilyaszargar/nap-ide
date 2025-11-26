'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

import { createClient } from '@/lib/supabase/client'

type Provider = 'google' | 'github'

const providers: Array<{
  id: Provider
  label: string
  icon: string
}> = [
  { id: 'google', label: 'Continue with Google', icon: '/google-logo.png' },
  { id: 'github', label: 'Continue with GitHub', icon: '/github-logo.png' },
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

    const redirectUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback?next=/dashboard`
        : undefined

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
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-xl">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-gray-500">
          Choose a provider to continue to your dashboard.
        </p>

        <div className="mt-8 space-y-4">
          {providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleSignIn(provider.id)}
              disabled={!!activeProvider}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-5 py-3 text-left text-sm font-medium transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="flex items-center gap-3">
                <Image
                  src={provider.icon}
                  width={24}
                  height={24}
                  alt={`${provider.label} logo`}
                />
                {provider.label}
              </span>
              {activeProvider === provider.id ? 'Redirecting…' : ''}
            </button>
          ))}
        </div>

        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
      </div>
    </div>
  )
}
