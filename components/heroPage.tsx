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
            window.location.replace(`/auth/callback${search}`)
        }
    }, [])

    return (
        <section className='mx-auto flex w-full max-w-[88rem] flex-col items-center gap-8 px-3 pb-6 pt-10 sm:gap-12 sm:px-4 sm:pb-8 sm:pt-20 lg:px-6'>
            <div className='flex w-full flex-col items-center gap-6 sm:gap-8'>
                <div className='flex flex-col gap-3 sm:gap-6'>
                    <h1 className='text-center text-3xl font-bold text-[#383838] sm:text-6xl'>Code.</h1>
                    <h1 className='-mt-1 text-center text-3xl font-bold sm:-mt-4 sm:text-6xl'><span className='text-[#696969]'>Lightning.</span><span className='text-[#A4A4A4]'>Fast.</span></h1>
                </div>
                <div className='flex w-full justify-center'>
                    <DownloadButton />
                </div>
                <div className='flex w-full items-center justify-center'>
                    <Link href="/features" className='text-base text-[#9B9B9B] hover:underline sm:text-lg'>See Features</Link>
                    <Image src="/next.svg" width={15} height={15} alt='arrow' className='ml-2' />
                </div>

            </div>


            <div className='flex w-full items-center justify-center'>
                <div className='w-full max-w-[80rem] rounded-2xl sm:rounded-3xl shadow-[0_10px_10px_rgba(0,0,0,0.3)]'>
                    <Image src={"/main.jpeg"} width={1680} height={945} alt='demo' className='w-full rounded-2xl sm:rounded-3xl' />
                </div>
            </div>

        </section>
    )
}
