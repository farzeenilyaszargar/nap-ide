'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

    
    return (
        <>
            <header className="sticky top-0 z-20 w-full bg-transparent backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-10">
                    <Link href="/" className="flex justify-center items-center">
                        <Image src="/white-logo.png" alt="Nap" width={24} height={24} className="h-3.5 w-auto rounded-md sm:h-4" />
                    </Link>

                    {/* Desktop Navigation */}
                    

                    <div className="flex justify-center items-center gap-3">
                        <Link
                            href="/download"
                            className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition hover:bg-white/90"
                        >
                            Download
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
                    </div>
                </div>
            )}
        </>
    )
}
