'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showSocials, setShowSocials] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const lastScrollY = useRef(0)

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

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY
            const scrollingDown = current > lastScrollY.current + 4
            const scrollingUp = current < lastScrollY.current - 4

            if (scrollingDown && current > 40) {
                setIsHidden(true)
            } else if (scrollingUp) {
                setIsHidden(false)
            }

            lastScrollY.current = current
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    
    return (
        <>
            <header className={`w-full bg-white/70 backdrop-blur-md transition-transform duration-300 sm:fixed sm:top-0 sm:left-0 sm:right-0 sm:z-20 ${isHidden ? '-translate-y-full sm:translate-y-0' : 'translate-y-0'}`}>
                <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-start px-4 lg:px-8">
                    <Link href="/" className="flex justify-center items-center">
                        <Image src="/logo.png" alt="Nap" width={22} height={22} className="h-2.5 w-auto rounded-md sm:h-3.5" />
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
                            className="flex items-center gap-2 rounded-full border border-black bg-black px-2.5 py-1 text-sm text-white transition-colors hover:bg-white hover:text-black hover:border-black"
                        >
                            Download
                        </Link>
                    </div>

                    <button
                        onClick={() => {
                            setShowSocials(false)
                            setMobileMenuOpen(true)
                        }}
                        className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-black transition hover:bg-black/5 sm:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
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
                    <div className="absolute inset-0 bg-white">
                        <div className="flex items-center justify-end px-4 py-3 pr-5">
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false)
                                    setShowSocials(false)
                                }}
                                className="rounded-md p-2 text-black/70 transition hover:bg-black/5"
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-3 px-6 py-6">
                            {showSocials ? (
                                <>
                                    <Link
                                        href="https://x.com/napHQ"
                                        target="_blank"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="menu-item rounded-md px-2 py-2 text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "40ms" }}
                                    >
                                        X
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/in/naphq/"
                                        target="_blank"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="menu-item rounded-md px-2 py-2 text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "140ms" }}
                                    >
                                        Linkedin
                                    </Link>
                                    <Link
                                        href="https://www.youtube.com/@napHQ"
                                        target="_blank"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="menu-item rounded-md px-2 py-2 text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "240ms" }}
                                    >
                                        Youtube
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="menu-item rounded-md px-2 py-2 text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "40ms" }}
                                    >
                                        Overview
                                    </Link>
                                    <Link
                                        href="/blogs"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="menu-item rounded-md px-2 py-2 text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "140ms" }}
                                    >
                                        Blogs
                                    </Link>
                                    <Link
                                        href="/faqs"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="menu-item rounded-md px-2 py-2 text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "240ms" }}
                                    >
                                        FAQ&apos;s
                                    </Link>
                                    <button
                                        onClick={() => setShowSocials(true)}
                                        className="menu-item rounded-md px-2 py-2 text-left text-3xl font-medium text-black transition hover:bg-black/5"
                                        style={{ animationDelay: "340ms" }}
                                    >
                                        Socials
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
