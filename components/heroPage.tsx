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
        <section className='mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pb-6 pt-14 sm:gap-12 sm:px-6 sm:pb-8 sm:pt-16 lg:px-10 overflow-x-hidden'>
            <div className='flex w-full flex-col items-start gap-6 sm:items-center sm:gap-8'>
                <div className='flex flex-col gap-3 sm:gap-6'>
                    <h2 className='text-left text-2xl font-medium tracking-tight text-[#383838] sm:hidden'>
                        Nap is the best way to code with AI and run multiple agents on your PC.
                    </h2>
                    <div className='hidden flex-col gap-3 sm:flex sm:gap-6'>
                        <h2 className='text-center text-3xl font-bold tracking-tight text-[#383838] sm:text-6xl'>Code.</h2>
                        <h3 className='-mt-1 text-center text-3xl font-bold tracking-tight sm:-mt-4 sm:text-6xl'>
                            <span className='text-[#696969]'>Lightning.</span>
                            <span className='text-[#A4A4A4]'>Fast.</span>
                        </h3>
                    </div>
                </div>
                <div className='w-full justify-center hidden sm:flex'>
                    <DownloadButton />
                </div>
                <div className='flex w-full items-center justify-start sm:justify-center'>
                    <Link
                        href="#features"
                        className='inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-black/90 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-lg sm:text-[#9B9B9B] sm:hover:bg-transparent sm:hover:underline'
                    >
                        See Features
                        <Image src="/right-arrow.png" width={14} height={14} alt='arrow' className='invert opacity-70 sm:invert-0 sm:opacity-60' />
                    </Link>
                </div>

            </div>


            <div className='flex w-full items-center justify-start overflow-visible sm:justify-center'>
                <div className='mr-auto w-[140%] max-w-none sm:mr-0 sm:w-full sm:max-w-7xl'>
                    <Image src={"/main.jpeg"} width={1280} height={720} alt='demo' className='w-full rounded-sm sm:rounded-3xl min-h-[380px] object-cover object-left sm:min-h-0' />
                </div>
            </div>

        </section>
    )
}
