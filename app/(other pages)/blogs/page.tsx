"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogs } from "./data";

export default function BlogsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % blogs.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
    };

    const currentBlog = blogs[currentIndex];

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            <Script
                id="breadcrumb-blogs"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Home",
                                item: "https://www.nap-code.com",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Blogs",
                                item: "https://www.nap-code.com/blogs",
                            },
                        ],
                    }),
                }}
            />
            <Header />

            {/* Hero Header */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6 sm:pt-16 sm:pb-8 sm:mt-20">
                <div className="text-center">
                    <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
                    <h2 className="text-center text-4xl font-semibold tracking-[-0.04em] text-[#383838] sm:text-5xl">blogs</h2>
                </div>
            </div>

            {/* Blog Slideshow */}
            <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
                <div className="relative bg-gray-50 rounded-3xl overflow-hidden">

                    {/* Blog Content */}
                    <div className="p-6 sm:p-10 md:p-16 mx-0 sm:mx-5">
                        <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
                            <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                {currentBlog.category}
                            </span>
                            <span className="hidden sm:inline text-gray-400 text-xs sm:text-sm">{currentBlog.date}</span>
                            <span className="hidden sm:inline text-gray-400 text-xs sm:text-sm">•</span>
                            <span className="hidden sm:inline text-gray-400 text-xs sm:text-sm">{currentBlog.readTime}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                            {currentBlog.title}
                        </h2>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                            {currentBlog.excerpt}
                        </p>

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <Image src={"/logo-black.png"} alt={currentBlog.author} width={32} height={32} className="rounded-full" />
                                <span className="text-gray-700 text-sm sm:text-base font-medium">{currentBlog.author}</span>
                            </div>

                            <Link
                                href={`/blogs/${currentBlog.slug}`}
                                className="bg-black text-white px-5 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
                            >
                                Read Article
                                <Image src="/right-arrow.png" alt="Read" width={16} height={16} className="h-4 w-4 inline-block ml-2 invert" />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-3 mt-8">
                    {blogs.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsAutoPlaying(false);
                                setCurrentIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-black w-8'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
