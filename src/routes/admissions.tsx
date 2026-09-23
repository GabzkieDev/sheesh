import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Kolehiyo ng Heneral Santos" },
      {
        name: "description",
        content:
          "How to apply to Kolehiyo ng Heneral Santos: requirements, entrance examination schedule and enrollment steps for Academic Year 2026–2027.",
      },
      { property: "og:title", content: "Admissions — Kolehiyo ng Heneral Santos" },
      {
        property: "og:description",
        content: "Requirements, exam schedule and enrollment steps for incoming students.",
      },
    ],
  }),
  component: Admissions,
});

const steps = [
  ["01", "Secure an application form", "Available at the Office of Admissions, Civic Center campus, or downloadable once the portal opens."],
  ["02", "Submit your requirements", "Complete documents are screened on the spot before an exam permit is issued."],
  ["03", "Take the entrance examination", "Scheduled in batches; bring your permit and a valid ID."],
  ["04", "Interview and evaluation", "Program chairs interview qualified examinees."],
  ["05", "Enroll", "Present your notice of admission to the Registrar to finalize your slot."],
];

const requirements = [
  "Form 138 (Senior High School report card), original and photocopy",
  "Certificate of Good Moral Character",
  "PSA birth certificate",
  "Barangay certificate of residency in General Santos City",
  "Two 2x2 ID photos with white background",
];

function Admissions() {
  return (
    <main>
      <PageHero
        eyebrow="Admissions 2026"
        title="Applications are open"
        lead="Kolehiyo ng Heneral Santos is tuition-free for qualified residents of General Santos City. Slots per program are limited, so complete your requirements early."
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl">Application Steps</h2>
          <ol className="space-y-6">
            {steps.map(([n, t, d]) => (
              <li key={n} className="flex gap-5">
                <span className="font-mono text-sm font-medium text-gold">{n}</span>
                <div>
                  <h3 className="text-sm font-bold">{t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/65">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-silver/30 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 font-display text-2xl">Requirements</h2>
          <div className="mb-8 h-1 w-12 bg-gold" />
          <ul className="space-y-3">
            {requirements.map((r) => (
              <li key={r} className="flex gap-3 text-sm text-navy/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-navy" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy px-6 py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-2xl">Key Dates</h2>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {[
              ["Application period", "Open until May 15, 2026"],
              ["Entrance examinations", "Every Saturday, 8:00 AM"],
              ["Enrollment", "June 1 – 20, 2026"],
              ["Classes begin", "August 3, 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/50">
                  {k}
                </dt>
                <dd className="text-sm font-bold">{v}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/contact"
            className="mt-10 inline-block rounded-sm border border-white/25 px-8 py-4 text-sm font-semibold"
          >
            Ask the Admissions Office
          </Link>
        </div>
      </section>
    </main>
  );
}
