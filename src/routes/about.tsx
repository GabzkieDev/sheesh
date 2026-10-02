import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import campusMain from "@/assets/campus-main.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kolehiyo ng Heneral Santos" },
      {
        name: "description",
        content:
          "The mission, vision and history of Kolehiyo ng Heneral Santos, the city college of General Santos established in 2025.",
      },
      { property: "og:title", content: "About Kolehiyo ng Heneral Santos" },
      {
        property: "og:description",
        content: "Mission, vision and the story behind the city college of General Santos.",
      },
    ],
  }),
  component: About,
});

const values = [
  { k: "Mission", v: "To deliver accessible, tuition-free higher education that answers the real needs of General Santos City's industries and communities." },
  { k: "Vision", v: "A city college recognized across Mindanao for competent graduates, honest service, and research rooted in local life." },
  { k: "Mandate", v: "Established in 2025 by the City Government of General Santos as its own institution of higher learning." },
];

function About() {
  return (
    <main>
      <PageHero
        eyebrow="The College"
        title="A college built by the city, for the city"
        lead="Kolehiyo ng Heneral Santos opened its doors in 2025 as the local college of the Tuna Capital of the Philippines. Its seal carries a torch, an open book, gears and a marlin — learning in service of the industries that feed the region."
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl space-y-8">
          {values.map((item) => (
            <div key={item.k} className="border-l-4 border-navy bg-card p-6 shadow-sm">
              <h2 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">
                {item.k}
              </h2>
              <p className="text-sm leading-relaxed text-navy/80">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <img
            src={campusMain.url}
            alt="Students and faculty of Kolehiyo ng Heneral Santos in front of the main campus building"
            width={1600}
            height={900}
            loading="lazy"
            className="aspect-video w-full rounded-sm object-cover"
          />
        </div>
      </section>

      <section className="bg-navy px-6 py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-2xl">Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Katapatan", "Honesty in every transaction, inside and outside the classroom."],
              ["Kahusayan", "Excellence measured by what our graduates can actually do."],
              ["Malasakit", "Genuine care for students, families and the wider community."],
              ["Kaunlaran", "Progress for General Santos City through applied knowledge."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-white/15 pt-4">
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gold">{t}</h3>
                <p className="text-xs leading-relaxed text-primary-foreground/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
