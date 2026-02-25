'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { createClient } from '@/lib/supabase/client'
import { Mail, User, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'

export default function Waitlist() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!name.trim()) {
            setError('Please enter your name')
            setLoading(false)
            return
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            setLoading(false)
            return
        }

        try {
            const supabase = createClient()
            const { error: supabaseError } = await supabase
                .from('waitlist')
                .insert([{ name, email }])

            if (supabaseError) {
                if (supabaseError.code === '23505') {
                    setError('This email is already on the waitlist!')
                } else {
                    setError('Something went wrong. Please try again.')
                }
                console.error(supabaseError)
            } else {
                setSubmitted(true)
            }
        } catch (err) {
            setError('An unexpected error occurred.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

                <div className="w-full max-w-xl relative z-10 transition-all duration-500 ease-in-out">
                    <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-12">
                        {!submitted ? (
                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                                        Join the <span className="text-gray-500">Waitlist</span>
                                    </h1>
                                    <p className="text-gray-500 text-lg max-w-sm mx-auto">
                                        Be the first to experience the future of AI-powered development.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-gray-400">
                                                <User size={20} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400 text-gray-900"
                                                required
                                            />
                                        </div>

                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-gray-400">
                                                <Mail size={20} />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Your Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400 text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="text-red-500 text-sm font-medium px-2 animate-in fade-in slide-in-from-top-1">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-black text-white py-4 rounded-2xl font-semibold shadow-xl shadow-black/10 hover:shadow-black/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <>
                                                Join Now
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="text-center pt-2">
                                    <p className="text-gray-400 text-sm">
                                        Join 500+ developers already in line. No spam, ever.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                        <CheckCircle2 size={48} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-gray-900">You're on the list!</h2>
                                    <p className="text-gray-500 text-lg">
                                        Thanks for your interest, <span className="font-semibold text-gray-900">{name}</span>. We've sent a confirmation to <span className="font-semibold text-gray-900">{email}</span>.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                                >
                                    Add another email
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>


        </div>
    )
}