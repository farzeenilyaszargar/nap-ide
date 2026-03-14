import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Sparkles, Tag, BookOpen, ArrowUpRight } from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { getBlogBySlug, getAllBlogSlugs } from "../data";

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const takeaways = blog.excerpt
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Back Button */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Blogs</span>
                </Link>

                {/* Article Header */}
                <article>
                    <header className="mb-12">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
                            <div className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                            {blog.category}
                                        </span>
                                        <span className="text-gray-400 text-sm">{blog.date}</span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-6 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {blog.author.charAt(0)}
                                        </div>
                                        <span className="font-medium">{blog.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{blog.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        <span>{blog.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-black/5 blur-2xl" />
                                <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-black/5 blur-2xl" />
                                <div className="relative h-full">
                                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                                        <Sparkles className="w-4 h-4" />
                                        Featured
                                    </div>
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            width={800}
                                            height={600}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
                                        <span className="inline-flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            Editor insights
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            Read now
                                            <ArrowUpRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[1.6fr_0.7fr]">
                        <div>
                            {/* Article Content */}
                            <div className="prose prose-lg max-w-none">
                                {blog.content.split('\n\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('## ')) {
                                        return (
                                            <h2 key={index} className="text-2xl font-bold text-black mt-10 mb-4">
                                                {paragraph.replace('## ', '')}
                                            </h2>
                                        );
                                    }
                                    if (paragraph.startsWith('### ')) {
                                        return (
                                            <h3 key={index} className="text-xl font-semibold text-black mt-8 mb-3">
                                                {paragraph.replace('### ', '')}
                                            </h3>
                                        );
                                    }
                                    if (paragraph.startsWith('- ')) {
                                        const items = paragraph.split('\n');
                                        return (
                                            <ul key={index} className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                                                {items.map((item, i) => (
                                                    <li key={i} className="leading-relaxed">
                                                        {item.replace('- ', '')}
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    return (
                                        <p key={index} className="text-gray-700 leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                                <div className="flex items-center gap-2 text-sm font-semibold text-black mb-3">
                                    <Sparkles className="w-4 h-4" />
                                    Key takeaways
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    {takeaways.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-black/70" />
                                            <span>{item.endsWith(".") ? item : `${item}.`}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <div className="text-sm font-semibold text-black mb-3">Reading flow</div>
                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex items-center justify-between">
                                        <span>Focus time</span>
                                        <span className="font-medium text-black">{blog.readTime}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-white border border-gray-200 overflow-hidden">
                                        <div className="h-full w-2/3 bg-black" />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Save this for later and continue right where you left off.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>

                </article>

                {/* Footer CTA */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-black mb-4">
                            Ready to supercharge your coding?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Try Nap Editor today and experience AI-powered development.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
