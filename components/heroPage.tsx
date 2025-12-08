"use client";

import Image from 'next/image'
import Link from 'next/link'
import DownloadButton from './customDownload'

export default function HeroPage() {
    return (
        <div className='w-screen flex-row  justify-center items-center sm:px-10 px-5 gap-5 md:mt-0 mt-20'>
            <div className='flex flex-col  gap-10 h-120 justify-center items-center'>
                <div className='flex flex-col gap-10'>
                    <h1 className='sm:text-7xl text-5xl'>The IDE That Codes With <span className='font-bold'>You</span></h1>
                    <p>Nap Editor is your always on coding partner - autocomplete, refactor, debug, and ship faster than ever. No setup. No friction. Just pure velocity.</p>
                </div>
                <div className='flex gap-4'>
                    <DownloadButton/>
                </div>

            </div>
            <div className='w-full flex justify-center items-center'>
                <Image src={"/demo.png"} width={1280} height={720} alt='demo' className='w-full' />
            </div>

        </div>
    )
}
