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
        <section className='mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pb-6 pt-8 sm:gap-12 sm:px-6 sm:pb-8 sm:pt-16 lg:px-10'>
            <div className='flex w-full flex-col items-center gap-6 sm:gap-8'>
                <div className='flex flex-col gap-3 sm:gap-6'>
                    <h2 className='text-center text-4xl font-bold text-[#383838] sm:text-6xl'>Code.</h2>
                    <h3 className='-mt-1 text-center text-4xl font-bold sm:-mt-4 sm:text-6xl'><span className='text-[#696969]'>Lightning.</span><span className='text-[#A4A4A4]'>Fast.</span></h3>
                </div>
                <div className=' w-full justify-center hidden sm:flex'>
                    <DownloadButton />
                </div>
                <div className='flex w-full items-center justify-center'>
                    <Link href="/features" className='text-base text-[#9B9B9B] hover:underline sm:text-lg'>See Features</Link>
                    <Image src="/next.svg" width={15} height={15} alt='arrow' className='ml-2' />
                </div>

            </div>


            <div className='flex w-full items-center justify-center'>
                <div className='w-full rounded-2xl sm:rounded-3xl'>
                    <Image src={"/main.jpeg"} width={1280} height={720} alt='demo' className='w-full rounded-2xl sm:rounded-3xl' />
                </div>
            </div>

        </section>
    )
}
