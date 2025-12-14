import Image from "next/image";
import Link from "next/link";

export default function GenHeader() {
    return (
        <div className="w-screen flex h-14 justify-between sticky top-0 bg-black/20 backdrop-blur-md sm:px-15 px-5 z-10">
            <Link href="/" className="flex justify-center items-center">
                <h1 className="font-bold text-2xl italic ml-1">Nap</h1>
            </Link>
        </div>
    );
}