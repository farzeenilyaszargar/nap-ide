import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#000000] px-5 py-10 text-[#F3F4F6] sm:px-8 sm:py-14 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-8 text-sm sm:grid-cols-3 sm:gap-6">
        <div className="flex flex-col text-center sm:text-left">
          <p className="mb-2 text-sm font-medium text-[#F3F4F6]">Resources</p>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/download">Download</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/pricing">Pricing</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/faqs">FAQs</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/support">Support</Link>
        </div>
        <div className="flex flex-col text-center sm:text-left">
          <p className="mb-2 text-sm font-medium text-[#F3F4F6]">Company</p>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/blogs" target="_blank">Blog</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/devs">Developers</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/tc">T&C</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="/privacy">Privacy</Link>
        </div>
        <div className="col-span-2 flex flex-col text-center sm:col-span-1 sm:text-left">
          <p className="mb-2 text-sm font-medium text-[#F3F4F6]">Socials</p>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="https://x.com/farzeenilya" target="_blank">X</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="https://www.linkedin.com/in/farzeenilyaszargar/" target="_blank">LinkedIn</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="https://www.youtube.com/@surfersbot" target="_blank">YouTube</Link>
          <Link className="py-0.5 text-xs text-[#9BA4B5] transition-colors hover:text-[#F3F4F6] sm:text-sm" href="https://www.reddit.com/r/surfersbot/" target="_blank">Reddit</Link>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-[#9BA4B5] sm:mt-14">
        © {new Date().getFullYear()} Nap Inc. Built for developers shipping real software.
      </div>
    </footer>
  );
}
