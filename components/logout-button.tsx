'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/signin')
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Signing out...' : 'Sign out'}
      </button>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  )
}

