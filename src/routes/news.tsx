import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { useContent } from "@/lib/site-content";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Bulletin — Kolehiyo ng Heneral Santos" },
      {
        name: "description",
        content:
          "Announcements, advisories and campus news from Kolehiyo ng Heneral Santos in General Santos City.",
      },
      { property: "og:title", content: "Bulletin — Kolehiyo ng Heneral Santos" },
      {
        property: "og:description",
        content: "Official announcements and advisories from the city college of General Santos.",
      },
    ],
  }),
  component: News,
});

function News() {
  const items = useContent("news");
  return (
    <main>
      <PageHero
        eyebrow="Bulletin"
        title="Announcements & advisories"
        lead="Official notices from the Office of the College President, the Registrar, and Student Affairs."
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((n, i) => (
            <article
              key={i}
              className={`border-l-4 bg-card p-6 shadow-sm ${i === 0 ? "border-navy" : "border-silver"}`}
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase text-navy/40">
                  {n.date.toUpperCase()}
                </span>
                <span className="bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy">
                  {n.tag}
                </span>
              </div>
              <h2 className="text-base font-bold leading-snug">{n.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">{n.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
