import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1f2b25] bg-[#0c1310] px-5 py-12 text-white sm:px-10 lg:px-14">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo.png" alt="Nap logo" width={42} height={42} className="rounded-md" />
            <span className="text-lg font-semibold tracking-wide">Nap Editor</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            The desktop editor for developers who care about speed, quality, and reliable AI-assisted shipping.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="mb-1 text-sm font-semibold text-white">Resources</p>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/download">Download</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/pricing">Pricing</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/faqs">FAQs</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/support">Support</Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="mb-1 text-sm font-semibold text-white">Company</p>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/blogs">Blog</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/devs">Developers</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/tc">T&C</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="/privacy">Privacy</Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="mb-1 text-sm font-semibold text-white">Social</p>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="https://x.com/farzeenilya" target="_blank" rel="noreferrer">X</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="https://www.linkedin.com/in/farzeenilyaszargar/" target="_blank" rel="noreferrer">LinkedIn</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="https://www.youtube.com/@surfersbot" target="_blank" rel="noreferrer">YouTube</Link>
          <Link className="text-sm text-white/65 transition-colors hover:text-white" href="https://www.reddit.com/r/surfersbot/" target="_blank" rel="noreferrer">Reddit</Link>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl border-t border-white/10 pt-5 text-sm text-white/50">
        © {new Date().getFullYear()} Nap Inc. All rights reserved.
      </div>
    </footer>
  );
}
