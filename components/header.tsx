'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'

export default function Header() {
    const [user, setUser] = useState<any>(null)
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
            <div className="w-screen flex h-14 justify-between sticky top-0 backdrop-blur-md sm:px-15 px-5 z-10 bg-white/80">
                <Link href="/" className="flex justify-center items-center">
                    <Image src="/real_logo.svg" alt="Surfers" width={120} height={40} className="h-8 w-auto" />
                </Link>

                {/* Desktop Navigation */}
                <div className='gap-5 flex-1 mx-5 justify-end hidden sm:flex'>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="flex justify-center items-center text-gray-700 hover:text-black">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* User Avatar / Sign In */}
                    {loading ? (
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
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
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-gray-300">
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
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">{fullName}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
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
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
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
                            className="bg-black text-white border   px-3 py-1 rounded-md hover:bg-white hover:text-black hover:border-black transition-colors"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <span className="font-semibold text-black">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
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
                                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
