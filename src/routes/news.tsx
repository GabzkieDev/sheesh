import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

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

const items = [
  {
    date: "September 15, 2026",
    tag: "Campus",
    title: "Official campus groundbreaking ceremony for the Centennial Building",
    body: "City officials and the college community gathered at the Calumpang campus site for the ceremonial torch-lighting and groundbreaking of the first permanent academic building.",
  },
  {
    date: "September 10, 2026",
    tag: "Scholarships",
    title: "Now accepting scholarship applications for Academic Year 2026–2027",
    body: "City-funded scholarship slots are open to incoming and continuing students. Applications are received at the Office of Student Affairs.",
  },
  {
    date: "August 28, 2026",
    tag: "Admissions",
    title: "Entrance examination schedules released for first-year applicants",
    body: "Examinations run every Saturday at 8:00 AM. Applicants must present an exam permit and a valid identification card.",
  },
  {
    date: "August 12, 2026",
    tag: "Partnership",
    title: "College signs agreement with local farms and agri-enterprises",
    body: "The partnership provides on-the-job training slots and equipment support for the BS Agribusiness program.",
  },
];

function News() {
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
              key={n.title}
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
