import Image from "next/image";
import DownloadButton from "./customDownload";

export default function TrySurfers() {
    return (
        <div className="w-screen flex flex-col justify-center items-center py-20 gap-5">
            <p className="text-6xl text-center">Try Surfers Now.</p>
            <DownloadButton/>
            
        </div>
    );
}
