'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/client'

export default function Header() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        // Get initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        setDropdownOpen(false)
        setMobileMenuOpen(false)
        router.push('/signin')
        router.refresh()
    }

    const avatarUrl = user?.user_metadata?.avatar_url ||
        user?.user_metadata?.picture ||
        null
    const fullName = user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email?.split('@')[0] ||
        'User'

    const navLinks = [
        { href: '/', label: 'Overview' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/features', label: 'Features' },
        { href: '/blogs', label: 'Blogs' },
    ]

    return (
        <>
            <header className="sticky inset-x-0 top-0 z-50 w-full bg-white">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-10 lg:px-14">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Nap" width={36} height={20} className="h-5 w-auto rounded-md object-contain" />
                    </Link>

                    <nav className='mx-6 hidden flex-1 items-center justify-center gap-1 md:flex'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[#eef3f0] hover:text-[var(--text-strong)]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {loading ? (
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                            >
                                {avatarUrl ? (
                                    <Image
                                        src={avatarUrl}
                                        alt={fullName}
                                        width={32}
                                        height={32}
                                        className="rounded-full border-2 border-gray-300"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-gradient-to-br from-emerald-600 to-teal-700 text-sm font-bold text-white">
                                        {fullName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <svg
                                    className={`w-4 h-4 transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-[var(--line-soft)] bg-white py-2 shadow-[0_18px_30px_rgba(6,20,15,0.14)]">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900">{fullName}</p>
                                        <p className="truncate text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-2 font-medium">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg>
                                            Dashboard
                                        </div>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <div className="flex items-center gap-2 font-medium">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Log out
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/signin"
                            className="rounded-full border border-[var(--text-strong)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                        >
                            Sign In
                        </Link>
                    )}
                    </div>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-0 h-full w-72 border-l border-[#d8dfdb] bg-[#f5f8f6] shadow-xl">
                        <div className="flex items-center justify-between border-b border-[#d7dfdb] p-4">
                            <span className="font-semibold text-black">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-lg p-2 hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="p-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-[#e8efeb]"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {user && (
                                <>
                                    <div className="border-t border-gray-200 my-4" />
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-[#e8efeb]"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded-lg px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        Log out
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
