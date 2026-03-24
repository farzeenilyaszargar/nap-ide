export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
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
        title: "Introducing Nap: Orchestrated Agent Coding",
        subtitle: "Nap coordinates specialized coding agents so you can ship features across files with clarity and control.",
        excerpt: "Today we're excited to announce the launch of Nap Code, a next-generation coding environment built for AI coding agents and agent orchestration. Nap is an orchestration layer that connects models and tools, not a model itself, so you can ship faster with clarity and control.",
        content: `Today we're excited to announce the launch of Nap Code, a next-generation coding environment built for AI coding agents and agent orchestration. Nap is an orchestration layer that connects models and tools, not a model itself, so you can ship faster with clarity and control.

## What Is Nap Code?

Nap Code is an agentic coding environment that helps developers coordinate multiple coding agents across files and tasks. Instead of working in isolation, agents can collaborate on refactors, new features, and documentation while you stay in the loop with clear diffs and review.

## Why We Built Nap

The way developers write code is changing rapidly. With the emergence of powerful AI models, we saw an opportunity to reimagine the entire coding experience. Traditional editors were designed for a world where developers typed every character themselves. Nap coordinates multiple agents and tools so you can delegate work across files and tasks with clear oversight.

## Key Features

### Intelligent Code Understanding
Nap doesn't just see your code as text. It understands the semantic meaning, relationships between functions, and the overall architecture of your project so agents can operate safely.

### Natural Language Commands
Tell Nap what you want to accomplish in plain English, and it will orchestrate coding agents to generate, refactor, or explain code for you.

### Context-Aware Suggestions
Unlike simple autocomplete, Nap's suggestions are informed by your entire codebase, making them relevant and accurate across multiple files.

## Who It's For

Nap Code is built for product engineers, startups, and teams that want faster iteration without losing engineering rigor. If you need a reliable AI coding assistant that understands your repo and supports multi-file edits, Nap keeps the workflow clear and reviewable.

## Local-First, Developer-Friendly

Your codebase context stays close to where you work, and the system is designed to minimize friction when you move from idea to code to commit. This is not a chat toy - it's a practical developer tool for shipping software.

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
        subtitle: "A deeper look at how Nap builds a live map of your project to coordinate reliable changes.",
        excerpt: "One of the most powerful features of Nap Code is its ability to understand your entire codebase with absolute clarity. In this deep dive, we explore semantic code indexing, why it matters for AI coding agents, and how it improves multi-file changes.",
        content: `One of the most powerful features of Nap Code is its ability to understand your entire codebase with absolute clarity. In this deep dive, we explore semantic code indexing, why it matters for AI coding agents, and how it improves multi-file changes.

## The Problem with Traditional Code Understanding

Most code editors treat your code as simple text files. They might offer basic syntax highlighting and some autocomplete, but they don't truly understand what your code does or how different parts connect.

## Our Approach: Semantic Code Indexing

When you open a project in Nap, we build a comprehensive semantic index of your entire codebase. This includes:

### Function and Class Relationships
We map out how functions call each other, which classes inherit from others, and how modules depend on one another.

### Type Information
Even in dynamically typed languages, we infer types to provide better suggestions and catch potential errors.

### Documentation Extraction
We parse comments and docstrings to understand the intent behind code, not just what it does.

## Why This Matters

With this deep understanding, Nap can orchestrate coding agents that:

- Generate code that fits your patterns: it knows how you structure your code and follows the same conventions.
- Refactor safely: it understands the ripple effects of changes across your project.
- Answer questions accurately: ask about any part of your codebase and get informed answers.

## Better Results for AI Coding Agents

Semantic indexing gives your AI coding agents the exact context they need. It reduces hallucinations, makes edits consistent across files, and keeps architectural decisions aligned with your existing patterns.

## Practical Benefits for Developers

When the system understands your repo, you get fewer broken builds, clearer diffs, and more accurate suggestions. That means faster reviews, fewer back-and-forth fixes, and a smoother developer workflow.

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
        subtitle: "Practical habits and shortcuts that make agent workflows feel fast and predictable.",
        excerpt: "Whether you're new to Nap Code or a seasoned user, these 10 tips will help you get the most out of AI coding agents and agent orchestration. From keyboard shortcuts to advanced prompting techniques, learn how to ship code faster and keep quality high.",
        content: `Whether you're new to Nap Code or a seasoned user, these 10 tips will help you get the most out of AI coding agents and agent orchestration. From keyboard shortcuts to advanced prompting techniques, learn how to ship code faster and keep quality high.

## 1. Learn the Essential Shortcuts

The fastest way to interact with Nap is through keyboard shortcuts:

- \`Cmd/Ctrl + K\` Open the agent command palette
- \`Cmd/Ctrl + L\` Start a chat session
- \`Cmd/Ctrl + I\` Inline code generation

## 2. Be Specific in Your Prompts

Instead of "make this better," try "refactor this function to use async/await and add error handling." Specific prompts yield specific results.

## 3. Use Context References

Reference files, functions, or documentation directly in your prompts: "Using the patterns from @utils.ts, create a new helper function."

## 4. Iterate and Refine

Don't expect perfection on the first try. Use follow-up prompts to refine the generated code: "Make it more concise" or "Add TypeScript types."

## 5. Let the Agent Explain Code

When diving into unfamiliar code, select it and ask "Explain this code." It's faster than reading documentation.

## 6. Generate Tests Automatically

Select a function and ask "Write unit tests for this." Nap understands your testing framework and generates appropriate tests.

## 7. Use Multi-File Editing

For large refactors, describe the change and let Nap modify multiple files at once while maintaining consistency.

## 8. Review Agent Changes Carefully

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
