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
        <section className='mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 pb-10 pt-10 sm:gap-14 sm:px-6 sm:pb-14 sm:pt-20 lg:px-10'>
            <div className='flex w-full flex-col items-center gap-6 sm:gap-8'>
                <div className='flex max-w-3xl flex-col gap-4 text-center'>
                    <p className='font-display text-xs uppercase tracking-[0.3em] text-white/60'>Nap Code</p>
                    <h2 className='font-display text-4xl font-semibold text-white sm:text-6xl'>
                        Coordinate coding agents on your machine.
                    </h2>
                    <p className='text-base text-white/70 sm:text-lg'>
                        Edit, refactor, and review across your repo with multiple agents—fast, local, and controlled.
                    </p>
                </div>
                <div className='flex flex-col items-center gap-3 sm:flex-row'>
                    <DownloadButton showOnMobile />
                    <Link href="/features" className='text-sm text-white/60 transition hover:text-white sm:text-base'>
                        See Features
                    </Link>
                </div>
                <div className='flex flex-wrap items-center justify-center gap-3 text-xs text-white/50 sm:text-sm'>
                    <span className='rounded-full border border-white/10 px-3 py-1'>macOS • Windows • Linux</span>
                    <span className='rounded-full border border-white/10 px-3 py-1'>Runs locally</span>
                    <span className='rounded-full border border-white/10 px-3 py-1'>Multi-agent orchestration</span>
                </div>
            </div>

            <div className='flex w-full items-center justify-center'>
                <div className='w-full rounded-2xl border border-white/12 bg-white/5 p-2 sm:rounded-3xl sm:p-3'>
                    <Image src={"/main.jpeg"} width={1280} height={720} alt='demo' className='w-full rounded-xl border border-white/10 sm:rounded-2xl' />
                </div>
            </div>

        </section>
    )
}
