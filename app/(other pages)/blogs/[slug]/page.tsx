import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

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

export async function generateMetadata(
    { params }: BlogPageProps,
): Promise<Metadata> {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        return {
            title: "Nap | Blog",
            description: "Read Nap updates and deep dives on agent orchestration.",
        };
    }

    return {
        title: `Nap | ${blog.title}`,
        description: blog.excerpt,
        alternates: { canonical: `https://www.nap-code.com/blogs/${blog.slug}` },
        openGraph: {
            title: `Nap | ${blog.title}`,
            description: blog.excerpt,
            url: `https://www.nap-code.com/blogs/${blog.slug}`,
            type: "article",
            images: blog.image ? [{ url: blog.image }] : undefined,
        },
        twitter: {
            title: `Nap | ${blog.title}`,
            description: blog.excerpt,
            images: blog.image ? [blog.image] : undefined,
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const renderInline = (text: string) => {
        const parts = text.split(/`([^`]+)`/g);
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return (
                    <span
                        key={index}
                        className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-800"
                    >
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Script
                id={`breadcrumb-blog-${blog.slug}`}
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
                            {
                                "@type": "ListItem",
                                position: 3,
                                name: blog.title,
                                item: `https://www.nap-code.com/blogs/${blog.slug}`,
                            },
                        ],
                    }),
                }}
            />
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                {blog.category}
                            </span>
                            <span className="text-gray-400 text-sm">{blog.date}</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-black mb-3 leading-tight">
                            {blog.title}
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                            {blog.subtitle}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-6 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Image src={"/logo-black.png"} alt={blog.author} width={32} height={32} className="rounded-full" />
                                <span className="font-medium">{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{blog.readTime}</span>
                            </div>
                        </div>
                        {blog.image ? (
                            <div className="mt-8">
                                {blog.image === "/blog3.jpg" ? (
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover object-center rounded-2xl"
                                            sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={1600}
                                        height={900}
                                        className="w-full h-auto"
                                        sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
                                        priority
                                    />
                                )}
                            </div>
                        ) : null}
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        {blog.content.split('\n\n').map((paragraph, index) => {
                            // Check if it's a heading
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-2xl font-bold text-black mt-10 mb-4">
                                        {renderInline(paragraph.replace('## ', ''))}
                                    </h2>
                                );
                            }
                            if (paragraph.startsWith('### ')) {
                                return (
                                    <h3 key={index} className="text-xl font-semibold text-black mt-8 mb-3">
                                        {renderInline(paragraph.replace('### ', ''))}
                                    </h3>
                                );
                            }
                            if (paragraph.startsWith('![')) {
                                const match = paragraph.match(/^!\[(.*)\]\((.*)\)$/);
                                if (match) {
                                    const [, alt, src] = match;
                                    return (
                                        <div key={index} className="my-8">
                                            <Image
                                                src={src}
                                                alt={alt}
                                                width={1600}
                                                height={900}
                                                className="w-full h-auto"
                                                sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
                                            />
                                        </div>
                                    );
                                }
                            }
                            // Check if it's a list item
                            if (paragraph.startsWith('- ')) {
                                const items = paragraph.split('\n');
                                return (
                                    <ul key={index} className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                                        {items.map((item, i) => (
                                            <li key={i} className="leading-relaxed">
                                                {renderInline(item.replace('- ', ''))}
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }
                            // Regular paragraph
                            return (
                                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                                    {renderInline(paragraph)}
                                </p>
                            );
                        })}
                    </div>
                </article>

                {/* Footer CTA */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-black mb-4">
                            Ready to supercharge your coding?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Try Nap today and experience agent-powered development.
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
