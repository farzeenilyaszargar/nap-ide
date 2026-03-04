import Image from "next/image";
import DownloadButton from "./customDownload";

export default function TryNap() {
    return (
        <div className="w-screen flex flex-col justify-center items-center py-30 gap-15">
            <p className="sm:text-7xl text-4xl text-center font-medium">Try Nap Editor Now.</p>
            <DownloadButton />

        </div>
    );
}
