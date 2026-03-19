import Image from "next/image";

export default function Features() {
    return (
        <section className="w-full overflow-hidden py-12 sm:py-16">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:px-10">
                <h2 className="sr-only">Features</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-metal p-6 text-left sm:p-8">
                        <div className="space-y-3">
                            <h3 className="font-display text-2xl font-semibold text-white sm:text-4xl">
                                Precision across your entire codebase.
                            </h3>
                            <p className="text-sm text-white/65 sm:text-base">
                                Agents read the whole repo, keep intent across files, and deliver changes you can
                                trust.
                            </p>
                        </div>
                        <Image src="/parallel.jpeg" width={2000} height={2000} alt="Parallel agents" className="rounded-2xl border border-white/10" />
                    </div>
                    <div className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-metal p-6 text-left sm:p-8">
                        <Image src="/files.jpeg" width={2000} height={2000} alt="Multi-file edits" className="rounded-2xl border border-white/10" />
                        <div className="space-y-3">
                            <h3 className="font-display text-2xl font-semibold text-white sm:text-4xl">
                                Multi-file edits, coordinated in minutes.
                            </h3>
                            <p className="text-sm text-white/65 sm:text-base">
                                Manage agents, workflows, and state from one place—no context switching, no lost
                                changes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-metal p-6 sm:flex-row sm:gap-10 sm:p-10">
                    <div className="w-full sm:w-1/2">
                        <Image
                            src="/git.jpeg"
                            alt="Built for performance"
                            className="rounded-2xl border border-white/10 object-cover"
                            width={800}
                            height={600}
                        />
                    </div>
                    <div className="w-full sm:w-1/2 text-center sm:text-left">
                        <h3 className="font-display text-2xl font-semibold text-white sm:text-4xl">
                            Push to Git with confidence.
                        </h3>
                        <p className="mt-4 text-sm text-white/65 sm:text-base">
                            Branches, diffs, and reviews stay in sync while agents move fast. You stay in control
                            from start to merge.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
