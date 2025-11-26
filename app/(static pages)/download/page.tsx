import GenHeader from "@/components/genericHeader";
import Image from "next/image";


export default function DownloadPage() {

  return (
    <div className="">
      <GenHeader/>
        <Image src={"/demo.png"} width={500} height={200} alt="abs" className="w-2/3 absolute -right-3/10 top-1/10 "/>

      <div className="flex flex-col border justify-center items-start px-10">
        <h1 className="text-5xl mx-5 mt-50 sm:hidden font-semibold">Not Availible For You ☺️</h1>
        
        <h1 className="text-3xl">Download Here</h1>
        <div className="flex flex-col gap-5 ">
        <a href="" className="border ">Download For MacOS</a>
        <a href="" className="border ">Download For MacOS</a>
        <a href="" className="border ">Download For MacOS</a>
        <a href="" className="border ">Download For MacOS</a>

        </div>

      </div>
    </div>
  );
}
