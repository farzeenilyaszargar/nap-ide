'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { createClient } from '@/lib/supabase/client'
import { User, Mail, Calendar, Trash2, Loader2, ShieldAlert } from 'lucide-react'

interface WaitlistEntry {
    id: string
    created_at: string
    name: string
    email: string
}

export default function WaitlistAdmin() {
    const [entries, setEntries] = useState<WaitlistEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                setAuthorized(true)
                fetchEntries()
            } else {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const fetchEntries = async () => {
        setLoading(true)
        try {
            const supabase = createClient()
            const { data, error: supabaseError } = await supabase
                .from('waitlist')
                .select('*')
                .order('created_at', { ascending: false })

            if (supabaseError) {
                setError(supabaseError.message)
            } else {
                setEntries(data || [])
            }
        } catch (err) {
            setError('Failed to fetch entries')
        } finally {
            setLoading(false)
        }
    }

    const deleteEntry = async (id: string) => {
        if (!confirm('Are you sure you want to remove this entry?')) return

        try {
            const supabase = createClient()
            const { error: supabaseError } = await supabase
                .from('waitlist')
                .delete()
                .eq('id', id)

            if (supabaseError) {
                alert('Error deleting entry: ' + supabaseError.message)
            } else {
                setEntries(entries.filter(e => e.id !== id))
            }
        } catch (err) {
            alert('Failed to delete entry')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
                <Footer />
            </div>
        )
    }

    if (!authorized) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-grow flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-red-50 border border-red-100 rounded-3xl p-8 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full">
                            <ShieldAlert size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Access Required</h1>
                        <p className="text-gray-600">Please sign in with an authorized account to view the waitlist.</p>
                        <a href="/signin" className="inline-block px-6 py-3 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors">
                            Sign In
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <Header />

            <main className="flex-grow p-6 sm:p-12">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Waitlist Management</h1>
                            <p className="text-gray-500">There are {entries.length} people interested in your project.</p>
                        </div>
                        <button
                            onClick={fetchEntries}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Refresh List
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl">
                            {error}
                        </div>
                    )}

                    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Joined Date</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {entries.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                                No entries found yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        entries.map((entry) => (
                                            <tr key={entry.id} className="hover:bg-gray-50/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold uppercase">
                                                            {entry.name.charAt(0)}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{entry.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Mail size={14} />
                                                        <span>{entry.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                        <Calendar size={14} />
                                                        {new Date(entry.created_at).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => deleteEntry(entry.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                        title="Delete entry"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
