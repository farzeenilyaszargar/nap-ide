"use client";

import Image from 'next/image'
import Link from 'next/link'
import DownloadButton from './customDownload'

export default function HeroPage() {
    return (
        <div className='w-screen flex-row  justify-center items-center sm:px-10 px-5 gap-5 md:mt-0 mt-20'>
            <div className='flex flex-col gap-10 h-120 justify-center items-center'>
                <div className='flex flex-col gap-10'>
                    <h1 className='sm:text-6xl text-5xl text-center font-bold text-[#383838]'>Code.</h1>
                    <h1 className='sm:text-6xl text-5xl text-center font-bold -mt-7 '><span className='text-[#696969]'>Lightning.</span><span className='text-[#A4A4A4]'>Fast.</span></h1>
                </div>
                <div className='flex gap-4'>
                    <DownloadButton />
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Link href="/waitlist" className='text-lg hover:underline text-[#9B9B9B]'>Join Waitlist</Link>
                    <Image src="/next.svg" width={20} height={20} alt='arrow' className='ml-2' />
                </div>

            </div>


            <div className='w-full flex justify-center items-center'>
                <Image src={"/demo.png"} width={1280} height={720} alt='demo' className='w-full' />
            </div>

        </div>
    )
}
