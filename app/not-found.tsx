"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Page not found

        </p>
        <h2 className="mt-3 text-6xl font-bold tracking-tight text-gray-900">
          404
        </h2>
        <p className="mt-5 text-sm text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
