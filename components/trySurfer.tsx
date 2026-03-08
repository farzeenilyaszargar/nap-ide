import Image from "next/image";
import DownloadButton from "./customDownload";

export default function TryNap() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-24 lg:px-10">
            <p className="text-center text-4xl font-medium sm:text-7xl">Try Nap Editor Now.</p>
            <DownloadButton />

        </div>
    );
}
