import Image from "next/image";
import DownloadButton from "./customDownload";

export default function TryNap() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-34 lg:px-10">
            <p className="text-center text-4xl font-normal tracking-normal sm:text-6xl text-[#131313]">Start Building Now.</p>
            <DownloadButton />

        </div>
    );
}
