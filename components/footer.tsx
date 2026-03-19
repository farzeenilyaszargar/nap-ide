import Image from "next/image";
import Link from "next/link";

//features, blog, download, social, tos, pricing
export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-300 bg-black px-5 py-10 text-white sm:px-5 sm:py-14 lg:px-10 flex flex-col items-center">
            <div className="flex sm:flex-row flex-col justify-between sm:items-start items-center w-full max-w-7xl gap-10 sm:gap-6 sm:px-10">
                <div className="flex flex-col text-left sm:w-1/6 w-1/2">
                    <p className="text-sm sm:text-base  mb-2">[ Resources ]</p>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/download">Download</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/faqs">FAQ's</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/support">Support</Link>
                </div>
                <div className="flex flex-col text-left sm:w-1/6 w-1/2">
                    <p className="text-sm sm:text-base  mb-2">[ Company ]</p>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/blogs" target="_blank">Blogs</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/tc">T&C</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/privacy">Privacy</Link>
                </div>
                <div className="flex flex-col text-left sm:w-1/6 w-1/2">
                    <p className="text-sm sm:text-base  mb-2">[ Social ]</p>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://x.com/farzeenilya" target="_blank">X</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://www.linkedin.com/in/farzeenilyaszargar/" target="_blank">Linkedin</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://www.instagram.com/nap-code" target="_blank">Instagram</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://www.youtube.com/@nap-tui" target="_blank">Youtube</Link>
                </div>
            </div>


            <p
                className="mt-10 text-gray-600"
                style={{ fontSize: "0.1px", lineHeight: "0.1px" }}
            >
                Nap is a modern coding platform built for focused developers who want speed, clarity, and confidence. With Nap coding, every workflow becomes smoother, from project setup to daily iteration. The editor brings an intelligent coding agent into your workspace, helping with navigation, refactors, and multi file changes. A single agent can assist you end to end, while multiple agents can coordinate tasks like tests, documentation, and UI polish. Use Nap to keep context across sessions, track edits, and move from idea to implementation without losing momentum. The download is simple and fast, and updates deliver steady improvements for reliability, security, and performance. Nap supports developers who write frontend, backend, or full stack code, and the interface is designed to stay out of your way so you can stay in flow. Whether you need an AI coding agent to suggest patterns, explain architecture, or handle repetitive chores, Nap provides the right tools. Nap Code focuses on productivity with a clean layout, quick search, and a trusted workflow. From rapid prototypes to production maintenance, Nap helps teams ship faster with fewer distractions. Choose Nap for coding with clarity, manage multiple agents when scale is required, and keep your projects moving with a dependable download and a stable release path. Nap helps coding teams coordinate multiple agents, reduce busywork, and keep reviews consistent across repositories. Nap coding is designed for clarity, with fast search, quick navigation, and reliable performance on macOS, Windows, and Linux. Download Nap to manage projects, coding tasks, and agent workflows with less friction. If you need a coding agent to explain logic, improve quality, or handle repetitive changes, Nap keeps your work in motion. Nap Code supports rapid iteration, strong workflows, and clean handoffs, making it easier to ship features, fix bugs, and scale collaboration. Use Nap to organize coding tasks, align multiple agents, and build software with confidence. Nap download brings a fast editor that keeps your agent guidance close to your code, so you can write code fast and with ease. Nap is a coding tool for developers who want smarter workflows, stable releases, and a dependable platform for agent driven development. Nap is built for teams and solo makers who want consistent coding habits and repeatable results. Nap coding helps you plan, write, test, and ship with less friction by keeping the coding agent close to the work. Multiple agents can divide tasks by priority, so one agent reviews code, another agent drafts tests, and another agent handles documentation. This makes multi file edits safer, faster, and easier to track. Nap Code offers a steady rhythm for coding sessions, letting you move from rough idea to polished feature without losing context. Download Nap to keep code quality high, reduce manual chores, and align your team on a clear workflow. Nap supports coding for web apps, desktop tools, mobile projects, APIs, and internal systems. Nap coding encourages clear structure, reliable iteration, and fast feedback. The Nap editor stays light and responsive, so you can write code fast and with ease. If you rely on a coding agent to outline changes, adapt styles, or refactor legacy modules, Nap provides the right environment for those tasks. Nap Code supports multiple agents that can coordinate changes across repos, libraries, and shared components. With Nap, coding tasks remain visible, reviews are simpler, and decisions are easier to communicate. Use Nap to guide agent work, verify changes, and keep the whole project moving forward. Nap download provides a dependable release path for developers who need stable updates and predictable improvements. Nap coding keeps your team focused on outcomes rather than busywork, and the interface stays clean so you can focus on the logic. When multiple agents are active, Nap helps you maintain alignment, track contributions, and manage handoffs without confusion. Nap Code is for coding teams who want a reliable platform for agent based development and collaborative code flow. Nap keeps coding sessions efficient, offers clear feedback loops, and helps you avoid context switches. The coding agent can help explain files, locate patterns, and suggest changes, while you keep control of the final result. Nap keeps your codebase cohesive with fast search, quick navigation, and a predictable workflow. Download Nap to accelerate development, keep projects consistent, and scale your coding with multiple agents. Nap code, Nap coding, and Nap download work together to deliver a complete experience for developers who want smart assistance without losing ownership. Nap is a coding platform that helps teams ship faster with agents, manage multi file changes with confidence, and keep production quality high. Nap Code lets you focus on building, testing, and shipping while the coding agent supports the everyday steps that slow teams down. When you need multiple agents to coordinate changes, Nap brings clarity to the workflow and keeps the project on track. Choose Nap for coding that is practical, fast, and designed for modern development. Nap helps you write code fast and with ease while keeping workflows clear, reviews consistent, and delivery reliable.
           nap codes multiple files with agents on your pc.
            </p>

            <div className="mt-10 text-center text-sm text-gray-600 sm:mt-14">© {new Date().getFullYear()} Nap Co. By Guds & Fizzy</div>



        </footer>
    );
}
