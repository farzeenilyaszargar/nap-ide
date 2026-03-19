"use client";

import Image from 'next/image'
import Link from 'next/link'
import DownloadButton from './customDownload'
import { useEffect } from 'react'

export default function HeroPage() {
    useEffect(() => {
        if (typeof window === 'undefined') return
        const { search, pathname } = window.location
        if (pathname !== '/') return
        const params = new URLSearchParams(search)
        if (params.has('code') || params.has('error')) {
            window.location.replace(`/auth/callback-client${search}`)
        }
    }, [])

    return (
        <section className='relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-12 pt-12 sm:gap-16 sm:px-6 sm:pb-16 sm:pt-24 lg:px-10'>
            <div className='pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-[120px]' />
            <div className='pointer-events-none absolute right-0 top-24 h-64 w-64 translate-x-1/4 rounded-full bg-white/8 blur-[120px]' />

            <div className='grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
                <div className='flex flex-col gap-6 text-left'>
                    <p className='fade-up font-display text-xs uppercase tracking-[0.3em] text-white/60'>Nap Code</p>
                    <h2 className='fade-up-delay-1 font-display text-4xl font-semibold leading-tight text-white sm:text-6xl'>
                        Coordinate coding agents on your machine.
                    </h2>
                    <p className='fade-up-delay-2 max-w-xl text-base text-white/70 sm:text-lg'>
                        Edit, refactor, and review across your repo with multiple agents—fast, local, and controlled.
                    </p>
                    <div className='fade-up-delay-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center'>
                        <DownloadButton showOnMobile />
                        <Link href="/features" className='text-sm text-white/60 transition hover:text-white sm:text-base'>
                            See Features
                        </Link>
                    </div>
                    <div className='text-xs text-white/50 sm:text-sm'>
                        Runs locally. macOS, Windows, Linux. Multi-agent orchestration.
                    </div>
                </div>

                <div className='fade-up-delay-1 flex w-full items-center justify-center'>
                    <div className='w-full rounded-2xl border border-white/12 bg-metal p-2 sm:rounded-3xl sm:p-3'>
                        <Image src={"/main.jpeg"} width={1280} height={720} alt='demo' className='w-full rounded-xl border border-white/10 sm:rounded-2xl' />
                    </div>
                </div>
            </div>
        </section>
    )
}
