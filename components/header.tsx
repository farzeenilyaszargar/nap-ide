'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'

type HeaderUser = {
    email?: string | null
    user_metadata?: {
        avatar_url?: string
        picture?: string
        full_name?: string
        name?: string
    } | null
}

export default function Header() {
    const [user, setUser] = useState<HeaderUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user as HeaderUser | null)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser((session?.user as HeaderUser | null) ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 4)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
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
            <header
                className={`fixed top-0 z-30 w-full transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
            >
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
                    <Link href="/" className="flex items-center justify-center">
                        <Image src="/logo.png" alt="Nap" width={40} height={40} className="h-5 w-auto rounded-md" />
                    </Link>

                    <div className='mx-5 hidden flex-1 justify-end gap-5 sm:flex'>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="flex items-center justify-center text-sm text-[#6B7280] transition hover:text-[#111827]">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-lg p-2 text-[#111827] transition-colors hover:bg-black/5 sm:hidden"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                        {loading ? (
                            <div className="h-8 w-8 animate-pulse rounded-full bg-[#E5E7EB]" />
                        ) : user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D1D5DB]"
                                >
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt={fullName}
                                            width={32}
                                            height={32}
                                            className="rounded-full border-2 border-[#D1D5DB]"
                                        />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#D1D5DB] bg-[#111827] text-sm font-bold text-white">
                                            {fullName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <svg
                                        className={`hidden h-4 w-4 text-[#6B7280] transition-transform sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
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
                                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                                        <div className="border-b border-[#EEF0F3] px-4 py-2">
                                            <p className="text-sm font-medium text-[#111827]">{fullName}</p>
                                            <p className="truncate text-xs text-[#6B7280]">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/signin"
                                className="rounded-md border border-[#111827] bg-transparent px-3 py-1 text-sm text-[#111827] transition-colors hover:bg-[#111827] hover:text-white"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    <div
                        className="absolute inset-0 bg-black/20"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] border-l border-[#E5E7EB] bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-[#EEF0F3] p-4">
                            <span className="font-semibold text-[#111827]">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-lg p-2 text-[#111827] hover:bg-black/5"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="space-y-2 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-[#374151] transition-colors hover:bg-[#F9FAFB]"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {!loading && !user && (
                                <Link
                                    href="/signin"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-4 block rounded-lg border border-[#111827] px-3 py-2 text-center font-medium text-[#111827] transition-colors hover:bg-[#111827] hover:text-white"
                                >
                                    Sign In
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
