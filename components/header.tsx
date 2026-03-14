'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

    const navLinks = [
        { href: '/', label: 'Overview' },
        { href: '/features', label: 'Features' },
        { href: '/blogs', label: 'Blogs' },
    ]

    return (
        <>
            <header className="sticky top-0 z-20 w-full bg-transparent backdrop-blur-md">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 lg:px-10">
                    <Link href="/" className="flex justify-center items-center">
                        <Image src="/logo.png" alt="Nap" width={40} height={40} className="h-4 w-auto rounded-md sm:h-5" />
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

                        <Link
                            href="/download"
                            className="hidden sm:flex items-center gap-2 rounded-md border border-black bg-black px-3 py-1 text-white transition-colors hover:bg-white hover:text-black hover:border-black"
                        >
                            Download
                            <Image src="/download.png" alt="Download" width={16} height={16} className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-xl">
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
                            <Link
                                href="/download"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Download
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
