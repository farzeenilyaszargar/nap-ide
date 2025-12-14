"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
            <div className="text-center space-y-6 max-w-lg">
                <h1 className="text-9xl font-black text-white">404</h1>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">Page not found</h2>
                    <p className="text-stone-400 text-lg">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-stone-200 transition-colors duration-200 font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-800 bg-black/50 text-stone-300 rounded-lg hover:bg-stone-900 transition-colors duration-200 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}