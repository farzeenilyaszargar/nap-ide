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

    
    return (
        <>
            <header className="sticky top-0 z-20 w-full bg-transparent backdrop-blur-md">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-start px-5 lg:px-10">
                    <Link href="/" className="flex justify-center items-center">
                        <Image src="/logo.png" alt="Nap" width={28} height={28} className="h-3 w-auto rounded-md sm:h-4.5" />
                    </Link>

                    <div className="ml-auto hidden items-center gap-6 sm:flex">
                        <nav className="flex items-center gap-6">
                            <Link href="/" className="text-sm text-black/70 transition-colors hover:text-black">
                                Overview
                            </Link>
                            <Link href="/blogs" className="text-sm text-black/70 transition-colors hover:text-black">
                                Blogs
                            </Link>
                        </nav>
                        <Link
                            href="/download"
                            className="flex items-center gap-2 rounded-md border border-black bg-black px-3 py-1 text-white transition-colors hover:bg-white hover:text-black hover:border-black"
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
