import Image from "next/image";

export default function Features() {
  const cards = [
    {
      title: "Work on many files in one instruction.",
      body: "Nap edits large surfaces of your project in one go, so feature work feels like execution instead of coordination.",
      image: "/files.jpeg",
      tone: "bg-[var(--surface-strong)] text-white border-white/10",
      bodyTone: "text-white/80"
    },
    {
      title: "See your repository with context, not guesses.",
      body: "Your codebase is treated as one connected system, giving better decisions and fewer broken assumptions.",
      image: "/parallel.jpeg",
      tone: "bg-white text-[var(--text-strong)] border-[var(--line-soft)]",
      bodyTone: "text-[var(--text-muted)]"
    }
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-12 pt-8 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase">Why Teams Switch</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-strong)] sm:text-5xl">
          A sharper workflow from first prompt to shipped commit.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`group overflow-hidden rounded-[24px] border p-6 shadow-[0_10px_30px_rgba(10,25,19,0.06)] transition duration-300 hover:-translate-y-1 ${card.tone}`}
          >
            <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{card.title}</h3>
            <p className={`mt-4 text-sm leading-relaxed sm:text-base ${card.bodyTone}`}>{card.body}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
              <Image
                src={card.image}
                width={1800}
                height={1200}
                alt={card.title}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </article>
        ))}
      </div>

      <article className="mt-6 grid items-center gap-8 rounded-[26px] border border-[var(--line-soft)] bg-white p-6 shadow-[0_12px_34px_rgba(12,31,24,0.07)] md:grid-cols-2 md:p-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase">GitHub Native Flow</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-strong)]">
            Keep branches clean and release velocity high.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            Nap works like an engineer who understands version control discipline. Changes stay structured, review-ready, and easy to ship.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
            <span className="rounded-full bg-[#edf6f2] px-3 py-1.5 font-medium text-[#14553f]">Commit-ready changes</span>
            <span className="rounded-full bg-[#edf6f2] px-3 py-1.5 font-medium text-[#14553f]">Branch-safe execution</span>
            <span className="rounded-full bg-[#edf6f2] px-3 py-1.5 font-medium text-[#14553f]">Lower merge friction</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-black/10">
          <Image
            src="/git.jpeg"
            alt="Nap Editor with GitHub workflow"
            className="h-auto w-full object-cover transition duration-500 hover:scale-[1.03]"
            width={1100}
            height={780}
          />
        </div>
      </article>
    </section>
  );
}
