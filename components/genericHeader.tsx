import Image from "next/image";
import Link from "next/link";

export default function GenHeader() {
    return (
        <div className="w-screen flex h-14 justify-between sticky top-0 bg-white/80 backdrop-blur-md sm:px-15 px-5 z-10">
            <Link href="/" className="flex justify-center items-center">
                <Image src="/logo.png" alt="Nap" width={120} height={40} className="h-4 w-auto rounded-md" />
            </Link>
        </div>
    );
}