import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <p className="text-8xl font-black">404</p>
            <p className="text-4xl">Not Found</p>
            <Link href="/" className="border text-3xl mt-10 bg-black text-white px-3 py-1 rounded flex justify-center items-center gap-2">
                <p>Go Back</p>
                <Image src="/diagonal-arrow-w.png" alt="arrow" width={20} height={20} />
            </Link>
        </div>
    )
}