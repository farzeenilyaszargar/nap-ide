export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
}

export const blogs: BlogPost[] = [
    {
        id: 1,
        slug: "introducing-nap-editor",
        title: "Introducing Nap Editor: The Future of AI-Powered Coding",
        excerpt: "Today we're excited to announce the launch of Nap Editor — a next-generation code editor built from the ground up with AI at its core. Unlike traditional editors that bolt on AI features as an afterthought, Nap was designed to make AI an integral part of your development workflow.",
        content: `Today we're excited to announce the launch of Nap Editor — a next-generation code editor built from the ground up with AI at its core. Unlike traditional editors that bolt on AI features as an afterthought, Nap was designed to make AI an integral part of your development workflow.

## Why We Built Nap Editor

The way developers write code is changing rapidly. With the emergence of powerful AI models, we saw an opportunity to reimagine the entire coding experience. Traditional editors were designed for a world where developers typed every character themselves. But what if your editor truly understood your code and could help you write it?

## Key Features

### Intelligent Code Understanding
Nap Editor doesn't just see your code as text — it understands the semantic meaning, relationships between functions, and the overall architecture of your project.

### Natural Language Commands
Tell the AI what you want to accomplish in plain English, and watch as it generates, refactors, or explains code for you.

### Context-Aware Suggestions
Unlike simple autocomplete, Nap's suggestions are informed by your entire codebase, making them relevant and accurate.

## What's Next

This is just the beginning. We're constantly improving our AI models and adding new features based on developer feedback. Stay tuned for more updates!`,
        author: "Nap Team",
        date: "December 15, 2025",
        readTime: "5 min read",
        category: "Announcement",
        image: "/demo.png"
    },
    {
        id: 2,
        slug: "understanding-your-codebase",
        title: "How Nap Understands Your Entire Codebase",
        excerpt: "One of the most powerful features of Nap is its ability to understand your entire codebase with absolute clarity. In this deep dive, we explore the technology behind our semantic code indexing, how it builds a comprehensive map of your project, and why this matters for AI-assisted development.",
        content: `One of the most powerful features of Nap is its ability to understand your entire codebase with absolute clarity. In this deep dive, we explore the technology behind our semantic code indexing, how it builds a comprehensive map of your project, and why this matters for AI-assisted development.

## The Problem with Traditional Code Understanding

Most code editors treat your code as simple text files. They might offer basic syntax highlighting and some autocomplete, but they don't truly understand what your code does or how different parts connect.

## Our Approach: Semantic Code Indexing

When you open a project in Nap Editor, we build a comprehensive semantic index of your entire codebase. This includes:

### Function and Class Relationships
We map out how functions call each other, which classes inherit from others, and how modules depend on one another.

### Type Information
Even in dynamically typed languages, we infer types to provide better suggestions and catch potential errors.

### Documentation Extraction
We parse comments and docstrings to understand the intent behind code, not just what it does.

## Why This Matters

With this deep understanding, our AI can:

- **Generate code that fits your patterns** — It knows how you structure your code and follows the same conventions.
- **Refactor safely** — It understands the ripple effects of changes across your project.
- **Answer questions accurately** — Ask about any part of your codebase and get informed answers.

## Technical Implementation

Our indexing system uses a combination of static analysis, language servers, and custom parsers to extract meaning from your code. The index is stored locally and updated incrementally as you work.`,
        author: "Nap Team",
        date: "December 28, 2025",
        readTime: "8 min read",
        category: "Technical",
        image: "/demo.png"
    },
    {
        id: 3,
        slug: "productivity-tips",
        title: "10 Tips to Maximize Your Productivity with Nap",
        excerpt: "Whether you're new to Nap or a seasoned user, these 10 tips will help you get the most out of your AI coding assistant. From keyboard shortcuts to advanced prompting techniques, learn how to supercharge your development workflow and ship code faster than ever.",
        content: `Whether you're new to Nap or a seasoned user, these 10 tips will help you get the most out of your AI coding assistant. From keyboard shortcuts to advanced prompting techniques, learn how to supercharge your development workflow and ship code faster than ever.

## 1. Learn the Essential Shortcuts

The fastest way to interact with Nap's AI is through keyboard shortcuts:

- **Cmd/Ctrl + K** — Open the AI command palette
- **Cmd/Ctrl + L** — Start a chat session
- **Cmd/Ctrl + I** — Inline code generation

## 2. Be Specific in Your Prompts

Instead of "make this better," try "refactor this function to use async/await and add error handling." Specific prompts yield specific results.

## 3. Use Context References

Reference files, functions, or documentation directly in your prompts: "Using the patterns from @utils.ts, create a new helper function."

## 4. Iterate and Refine

Don't expect perfection on the first try. Use follow-up prompts to refine the generated code: "Make it more concise" or "Add TypeScript types."

## 5. Let AI Explain Code

When diving into unfamiliar code, select it and ask "Explain this code." It's faster than reading documentation.

## 6. Generate Tests Automatically

Select a function and ask "Write unit tests for this." Nap understands your testing framework and generates appropriate tests.

## 7. Use Multi-File Editing

For large refactors, describe the change and let Nap modify multiple files at once while maintaining consistency.

## 8. Review AI Changes Carefully

Always review generated code before committing. The AI is a powerful assistant, but you're still the expert on your codebase.

## 9. Customize Your Settings

Adjust AI behavior in settings to match your preferences for verbosity, code style, and prompting behavior.

## 10. Stay Updated

We ship improvements weekly. Keep Nap updated to get the latest AI models and features.`,
        author: "Nap Team",
        date: "January 2, 2026",
        readTime: "6 min read",
        category: "Tutorial",
        image: "/demo.png"
    }
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogs.find(blog => blog.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return blogs.map(blog => blog.slug);
}
