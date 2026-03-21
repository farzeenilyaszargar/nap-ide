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
        <section className='mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pb-6 pt-14 sm:gap-0 sm:px-6 sm:pb-8 sm:pt-16 sm:mt-25 lg:px-10 overflow-x-hidden'>
            <div className='flex w-full flex-col items-start gap-6 sm:items-center sm:gap-8'>
                <div className='flex flex-col gap-3 sm:gap-6'>
                    <h2 className='text-left text-2xl font-medium tracking-tight text-[#383838] sm:hidden'>
                        Nap is the best way to code with AI and run multiple agents on your PC.
                    </h2>
                    <div className='hidden flex-col gap-3 sm:flex sm:gap-6'>
                        <h2 className='text-center text-2xl font-semibold tracking-[-0.04em] text-[#383838] sm:text-5xl'>Code.
                            <span className='text-[#5e5e5e]'> Lightning. </span>
                            <span className='text-[#929292]'>Fast.</span>
                        </h2>
                        <p className='text-left text-lg text-[#696969] sm:text-medium'>Nap is the best way to code with AI and run multiple agents on your PC.</p>

                    </div>
                </div>
                <div className='w-full justify-center hidden sm:flex'>
                    <DownloadButton />
                </div>
                <div className='flex w-full items-center justify-start sm:hidden'>
                    <Link
                        href="#features"
                        className='inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-black/90'
                    >
                        See Features
                        <Image src="/right-arrow.png" width={14} height={14} alt='arrow' className='invert opacity-100' />
                    </Link>
                </div>

            </div>


            <div className='flex w-full items-center justify-start overflow-visible sm:justify-center'>
                <div className='relative left-1/2 mr-auto w-screen max-w-none -translate-x-1/2 sm:w-[140vw]'>
                    <Image src={"/new-main.png"} width={1280} height={720} alt='demo' className='w-full rounded-md sm:rounded-md h-[60vh] sm:h-auto object-cover object-left' />
                </div>
            </div>

        </section>
    )
}
