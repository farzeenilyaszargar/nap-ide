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

## Built for Real Developer Workflows

Nap Code was designed for the day-to-day work of software engineering teams. You can ask for multi-file edits, generate tests, or document a module, and the system keeps your codebase context intact across tasks. This makes it a practical AI coding assistant for production code, not just quick demos.

## Why We Built Nap

The way developers write code is changing rapidly. With the emergence of powerful AI models, we saw an opportunity to reimagine the entire coding experience. Traditional editors were designed for a world where developers typed every character themselves. Nap coordinates multiple agents and tools so you can delegate work across files and tasks with clear oversight.

## Key Features

### Intelligent Code Understanding
Nap doesn't just see your code as text. It understands the semantic meaning, relationships between functions, and the overall architecture of your project so agents can operate safely.

### Natural Language Commands
Tell Nap what you want to accomplish in plain English, and it will orchestrate coding agents to generate, refactor, or explain code for you.

### Context-Aware Suggestions
Unlike simple autocomplete, Nap's suggestions are informed by your entire codebase, making them relevant and accurate across multiple files.

## Agent Orchestration That Stays Reviewable

Agentic coding only works if the output is easy to review. Nap Code focuses on readable diffs, predictable changes, and a workflow that keeps humans in control. That lets you use AI coding agents with confidence on complex features and refactors.

## Who It's For

Nap Code is built for product engineers, startups, and teams that want faster iteration without losing engineering rigor. If you need a reliable AI coding assistant that understands your repo and supports multi-file edits, Nap keeps the workflow clear and reviewable.

## Local-First, Developer-Friendly

Your codebase context stays close to where you work, and the system is designed to minimize friction when you move from idea to code to commit. This is not a chat toy - it's a practical developer tool for shipping software.

## Use Cases for Agentic Coding

Nap Code is an AI coding assistant built for real engineering outcomes. Common use cases include:

- Multi-file refactors that require consistent naming and architecture
- Test generation to cover new features quickly
- Documentation updates that stay aligned with implementation
- Code review support and summary explanations for teammates

## Summary: An AI Coding Assistant You Can Trust

If you've been looking for a code editor that supports agent orchestration and reliable multi-file changes, Nap Code is built for that exact workflow. It's a developer-first, local-first environment for modern agentic coding.

## Frequently Asked Questions

### Is Nap Code an AI model?
No. Nap Code is an agent orchestration layer that connects AI models, tools, and your codebase context. You choose models, and Nap coordinates them into a reliable developer workflow.

### Who should use Nap Code?
Teams and solo developers who want an AI coding assistant that handles multi-file edits, refactors, and test generation with clear review.

### Does it work with real production repositories?
Yes. Nap Code is built for real repositories with many files, dependencies, and conventions. It prioritizes safe, reviewable changes.

## What's Next

This is just the beginning. We're constantly improving our AI models and adding new features based on developer feedback. Stay tuned for more updates!`,
        author: "Nap Team",
        date: "December 15, 2025",
        readTime: "5 min read",
        category: "Announcement",
        image: "/blogy1.png"
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

## Why Codebase Understanding Changes Everything

When a coding assistant only sees snippets, it produces brittle output. With a complete map of the repository, an AI coding agent can reason about dependencies, conventions, and safe refactors. That context is what makes agentic coding reliable.

## Our Approach: Semantic Code Indexing

When you open a project in Nap, we build a comprehensive semantic index of your entire codebase. This includes:

### Function and Class Relationships
We map out how functions call each other, which classes inherit from others, and how modules depend on one another.

### Type Information
Even in dynamically typed languages, we infer types to provide better suggestions and catch potential errors.

### Documentation Extraction
We parse comments and docstrings to understand the intent behind code, not just what it does.

## Abstract Syntax Trees (ASTs)

A key part of reliable code understanding is parsing source files into abstract syntax trees (ASTs). ASTs represent the structure of code - functions, classes, expressions, and dependencies - in a way that machines can traverse and analyze consistently. This makes it possible to reason about code changes safely instead of relying on raw text or brittle regex heuristics.

## Semantic Search for Code

Semantic search connects natural language queries to the code that actually implements an idea. Instead of searching for exact string matches, the system uses embeddings and structural signals to find relevant files, functions, and symbols. This is how Nap can answer questions like "where does authentication happen?" or "what validates user input?" with accurate, project-specific results.

## Hybrid Retrieval for Accurate Results

Modern code search works best with a hybrid approach that combines semantic embeddings with exact-symbol and keyword matching. This makes it possible to find both conceptual matches and precise references, which is critical for tasks like refactors or API migrations.

## Keeping the Index Fresh

As your code changes, the index must stay up to date. Nap updates incrementally so that new files, renamed symbols, and deleted modules are reflected quickly. This keeps agent suggestions accurate and prevents stale context from leaking into edits.

## Why This Matters

With this deep understanding, Nap can orchestrate coding agents that:

- Generate code that fits your patterns: it knows how you structure your code and follows the same conventions.
- Refactor safely: it understands the ripple effects of changes across your project.
- Answer questions accurately: ask about any part of your codebase and get informed answers.

## Better Results for AI Coding Agents

Semantic indexing gives your AI coding agents the exact context they need. It reduces hallucinations, makes edits consistent across files, and keeps architectural decisions aligned with your existing patterns.

## Practical Benefits for Developers

When the system understands your repo, you get fewer broken builds, clearer diffs, and more accurate suggestions. That means faster reviews, fewer back-and-forth fixes, and a smoother developer workflow.

## Developer Workflow Improvements

Clearer codebase understanding improves every step of the workflow: planning, implementation, review, and testing. For teams, this means cleaner pull requests and fewer surprises during QA.

## Technical Implementation

Our indexing system uses a combination of static analysis, language servers, and custom parsers to extract meaning from your code. The index is stored locally and updated incrementally as you work.`,
        author: "Nap Team",
        date: "December 28, 2025",
        readTime: "8 min read",
        category: "Technical",
        image: "/blog21.png"
    },
    {
        id: 3,
        slug: "productivity-tips",
        title: "10 Tips to Maximize Your Productivity with Nap",
        subtitle: "Practical habits and shortcuts that make agent workflows feel fast and predictable.",
        excerpt: "Whether you're new to Nap Code or a seasoned user, these 10 tips will help you get the most out of AI coding agents and agent orchestration. From keyboard shortcuts to advanced prompting techniques, learn how to ship code faster and keep quality high.",
        content: `Whether you're new to Nap Code or a seasoned user, these 10 tips will help you get the most out of AI coding agents and agent orchestration. From keyboard shortcuts to advanced prompting techniques, learn how to ship code faster and keep quality high.

## Why Productivity Matters in Agentic Coding

Agentic coding is only effective when it fits your workflow. These tips focus on practical habits that improve output quality while saving time, making Nap Code a reliable AI coding assistant for real projects.

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

We ship improvements weekly. Keep Nap updated to get the latest AI models and features.

## Bonus Tips for Consistent Results

Small habits add up. Try keeping a short prompt template for common tasks like "add tests", "refactor for readability", or "update documentation". Consistency helps the agents produce more predictable changes.

## When to Use Agents vs Manual Edits

Use agents for cross-file edits, repetitive changes, and scaffolding. For tiny one-line tweaks, manual edits are often faster. This keeps your workflow efficient and keeps you in control.

## Build a Review Checklist

Before committing agent changes, scan for:

- Correctness against requirements
- Consistent naming and style
- Tests updated or added
- Edge cases handled

## Final Takeaway

The goal is speed without chaos. With clear prompts, good review habits, and a stable workflow, Nap Code becomes a dependable AI coding assistant for shipping real software.`,
        author: "Nap Team",
        date: "January 2, 2026",
        readTime: "6 min read",
        category: "Tutorial",
        image: "/blog3.jpg"
    }
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogs.find(blog => blog.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return blogs.map(blog => blog.slug);
}
