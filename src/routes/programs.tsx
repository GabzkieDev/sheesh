import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import lab from "@/assets/lab.jpg";
import engineering from "@/assets/engineering.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Academic Programs — Kolehiyo ng Heneral Santos" },
      {
        name: "description",
        content:
          "Degree programs at Kolehiyo ng Heneral Santos: fisheries and aquatic resources, engineering and technology, business, education and public administration.",
      },
      { property: "og:title", content: "Academic Programs — Kolehiyo ng Heneral Santos" },
      {
        property: "og:description",
        content: "Explore the degree programs offered by the city college of General Santos.",
      },
    ],
  }),
  component: Programs;
});

const featured = [
  {
    image: lab,
    tag: "College of Science",
    title: "Aquatic Resources & Fisheries",
    body: "Building global leaders for the sustainable future of General Santos City's primary industry.",
  },
  {
    image: engineering,
    tag: "College of Technology",
    title: "Mechanical & Industrial Engineering",
    body: "Innovative solutions for industrial growth and urban infrastructure excellence.",
  },
];

const catalogue = [
  ["BS Fisheries", "Capture fisheries, aquaculture, post-harvest processing"],
  ["BS Industrial Engineering", "Operations, quality systems, plant management"],
  ["BS Information Technology", "Software development, networks, data systems"],
  ["BS Business Administration", "Marketing management, financial management"],
  ["BS Accountancy", "Financial accounting, audit, taxation"],
  ["Bachelor of Public Administration", "Local governance, policy, public finance"],
  ["Bachelor of Elementary Education", "Generalist track with practicum in city schools"],
  ["BS Criminology", "Law enforcement administration and forensic science"],
];

function Programs() {
  return (
    <main>
      <PageHero
        eyebrow="Academics"
        title="Academic Pillars"
        lead="Every program is designed with the industries of General Santos City — fishing, agro-industry, logistics, public service — so graduates can step straight into work that matters here."
      />

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <div key={p.title} className="group animate-entrance" style={{ animationDelay: `${i * 100}ms` }}>
              <img
                src={p.image}
                alt={p.title}
                width={1200}
                height={675}
                loading="lazy"
                className="mb-4 aspect-video w-full rounded-sm object-cover outline outline-1 -outline-offset-1 outline-navy/5"
              />
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-navy/40">
                {p.tag}
              </p>
              <h2 className="mb-1 text-lg font-bold transition-colors group-hover:text-gold">
                {p.title}
              </h2>
              <p className="text-sm leading-relaxed text-navy/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-silver/30 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h2 className="mb-2 font-display text-2xl">Full Course Offerings</h2>
            <div className="h-1 w-12 bg-gold" />
          </div>

          <ul className="divide-y divide-navy/10 border-y border-navy/10">
            {catalogue.map(([name, detail]) => (
              <li key={name} className="flex flex-col gap-1 py-4">
                <span className="text-sm font-bold">{name}</span>
                <span className="text-xs text-navy/60">{detail}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/admissions"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-4 text-sm font-semibold text-primary-foreground"
          >
            Apply for admission
            <span className="size-1 rounded-full bg-gold" />
          </Link>
        </div>
      </section>
    </main>
  );
}
