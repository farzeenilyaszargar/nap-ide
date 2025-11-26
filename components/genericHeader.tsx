import Image from "next/image";
import Link from "next/link";

export default function GenHeader()
{
    return(
         <div className="w-screen flex h-14 justify-between sticky top-0 bg-white/20 backdrop-blur-md sm:px-10 px-5 z-10 ">
            <Link href="/" className="flex justify-center items-center ">
                <Image src={"./logo.svg"} width={25} height={25} alt="logo" />
                <h1 className="font-black text-2xl italic ml-1">nap</h1>
                <h1 className="text-2xl italic ml-1">editor</h1>
            </Link>
        </div>
    );
}