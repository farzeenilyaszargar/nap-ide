"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
    {
        id: 1,
        title: "Introducing Surfers Editor: The Future of AI-Powered Coding",
        excerpt: "Today we're excited to announce the launch of Surfers Editor — a next-generation code editor built from the ground up with AI at its core. Unlike traditional editors that bolt on AI features as an afterthought, Surfers was designed to make AI an integral part of your development workflow.",
        author: "Farzeen Ilyas",
        date: "December 15, 2025",
        readTime: "5 min read",
        category: "Announcement",
        image: "/demo.png"
    },
    {
        id: 2,
        title: "How Surfers Understands Your Entire Codebase",
        excerpt: "One of the most powerful features of Surfers is its ability to understand your entire codebase with absolute clarity. In this deep dive, we explore the technology behind our semantic code indexing, how it builds a comprehensive map of your project, and why this matters for AI-assisted development.",
        author: "Surfers Team",
        date: "December 28, 2025",
        readTime: "8 min read",
        category: "Technical",
        image: "/demo.png"
    },
    {
        id: 3,
        title: "10 Tips to Maximize Your Productivity with Surfers",
        excerpt: "Whether you're new to Surfers or a seasoned user, these 10 tips will help you get the most out of your AI coding assistant. From keyboard shortcuts to advanced prompting techniques, learn how to supercharge your development workflow and ship code faster than ever.",
        author: "Surfers Team",
        date: "January 2, 2026",
        readTime: "6 min read",
        category: "Tutorial",
        image: "/demo.png"
    }
];

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
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
                <div className="text-center">
                    <p className="text-gray-400 text-lg font-mono mb-2">/dev/</p>
                    <h1 className="text-6xl font-bold text-black">blogs</h1>
                </div>
            </div>

            {/* Blog Slideshow */}
            <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="relative bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">

                    {/* Blog Content */}
                    <div className="p-10 md:p-16">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                {currentBlog.category}
                            </span>
                            <span className="text-gray-400 text-sm">{currentBlog.date}</span>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-gray-400 text-sm">{currentBlog.readTime}</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                            {currentBlog.title}
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {currentBlog.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {currentBlog.author.charAt(0)}
                                </div>
                                <span className="text-gray-700 font-medium">{currentBlog.author}</span>
                            </div>

                            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                                Read Article
                            </button>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
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
