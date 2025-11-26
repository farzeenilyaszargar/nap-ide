
import Image from 'next/image'
import Link from 'next/link'
import DownloadButton from './customDownload'


export default function HeroPage() {
    return (
        <div className='w-screen sm:h-150 flex md:flex-row flex-col justify-center items-center sm:px-10 px-5 gap-5 md:mt-0 mt-20'>
            <div className='md:w-2/5  flex flex-col gap-3'>
                <h1 className='sm:text-7xl text-5xl'>The IDE That Codes With <span className='font-bold'>You</span></h1>
                <p>Surfers IDE is your always-on coding partner → autocomplete, refactor, debug, and ship faster than ever. No setup. No friction. Just pure velocity.</p>
                <div className='flex gap-4'>
                    <DownloadButton/>
                    <a href='#features' className='underline flex justify-center items-center gap-1 sm:px-3 py-1 rounded-md sm:text-xl'>See Features <Image src={"/right-arrow.png"} width={15} height={15} alt='arrow'/> </a>
                </div>

            </div>
            <div className='md:w-3/5'>
                <Image src={"/demo.png"} width={1280} height={720} alt='demo' className='w-fit' />
            </div>

        </div>
    )
}
