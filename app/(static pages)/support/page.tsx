import GenHeader from "@/components/genericHeader";


export default function SupportPage() {

  return (
      <div className="">
        <GenHeader/>
        <div className=" flex justify-center items-center h-130">
          <div className="border border-black flex flex-col gap-5 justify-center items-center p-5 rounded-2xl ">
            <h1 className="sm:text-3xl text-2xl font-semibold">Contact Us:</h1>
            <p>call: 0123456789</p>
            <p>mail: support@napeditor.com</p>

          </div>
        </div>
      </div>
    );
}
