import { createFileRoute, Link } from "@tanstack/react-router";
import seal from "@/assets/khs-seal.png.asset.json";
import campusMain from "@/assets/campus-main.jpg.asset.json";
import lab from "@/assets/lab.jpg";
import engineering from "@/assets/engineering.jpg";
import campusReal from "@/assets/campus-real.jpg.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kolehiyo ng Heneral Santos — City College of General Santos" },
      {
        name: "description",
        content:
          "Kolehiyo ng Heneral Santos is the city college of General Santos, established 2025. Learning Without Limits, Growing Without Bounds.",
      },
      { property: "og:title", content: "Kolehiyo ng Heneral Santos" },
      {
        property: "og:description",
        content:
          "Tuition-free, quality higher education for the youth of General Santos City. Admissions now open.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
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

const bulletin = [
  {
    date: "September 15, 2026",
    text: "Official campus groundbreaking ceremony for the Centennial Building.",
    accent: true,
  },
  {
    date: "September 10, 2026",
    text: "Now accepting scholarship applications for Academic Year 2026–2027.",
    accent: false,
  },
  {
    date: "August 28, 2026",
    text: "Entrance examination schedules released for first-year applicants.",
    accent: false,
  },
];

function Home() {
  return (
    <main>
      <header className="relative overflow-hidden px-6 pb-20 pt-14 text-center">
        <img
          src={campusReal.url}
          alt="Kolehiyo ng Heneral Santos campus building"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/80" />
        <div className="relative mx-auto max-w-3xl text-primary-foreground">
          <div className="mb-8 flex animate-seal justify-center">
            <img
              src={seal.url}
              alt="Official seal of Kolehiyo ng Heneral Santos"
              width={224}
              height={224}
              className="size-40 drop-shadow-2xl md:size-56"
            />
          </div>

          <div className="animate-entrance [animation-delay:200ms]">
            <h1 className="mb-4 font-display text-4xl leading-[1.1] tracking-tight text-balance md:text-5xl">
              Kolehiyo ng <br />
              Heneral Santos
            </h1>
            <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
              Learning Without Limits <span className="mx-2 text-gold">/</span> Growing Without
              Bounds
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/admissions"
                className="flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-navy-deep shadow-xl shadow-navy-deep/30 transition-transform active:scale-[0.98]"
              >
                Admissions 2026
                <span className="size-1 rounded-full bg-navy-deep" />
              </Link>
              <Link
                to="/programs"
                className="rounded-sm border border-primary-foreground/30 px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground backdrop-blur-sm active:bg-primary-foreground/10"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </div>
      </header>


      <section className="overflow-hidden bg-navy py-6 text-primary-foreground">
        <div className="animate-entrance overflow-x-auto [animation-delay:400ms]">
          <div className="mx-auto flex w-max items-center gap-12 px-6">
            <div>
              <div className="font-mono text-xs text-primary-foreground/50">LOCATION</div>
              <div className="text-sm font-bold uppercase tracking-tight">
                Tuna Capital of the PH
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-primary-foreground/50">TUITION</div>
              <div className="text-sm font-bold uppercase tracking-tight">Free for Gensan Youth</div>
            </div>
            <div>
              <div className="font-mono text-xs text-primary-foreground/50">FOUNDING</div>
              <div className="text-sm font-bold uppercase tracking-tight">
                Class of 2025 Opening
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-baseline justify-between border-b-2 border-navy/5 pb-4">
            <h2 className="font-display text-2xl">Academic Pillars</h2>
            <span className="font-mono text-[10px] uppercase text-navy/40">Select Tracks</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.title} className="group animate-entrance" style={{ animationDelay: `${500 + i * 100}ms` }}>
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
                <h3 className="mb-1 text-lg font-bold transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-navy/70">{p.body}</p>
              </div>
            ))}
          </div>

          <Link
            to="/programs"
            className="mt-8 inline-block border-b border-gold pb-0.5 text-xs font-bold uppercase tracking-widest text-navy"
          >
            All programs
          </Link>
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
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">
            Main campus — Purok Maliwanag, Barangay Calumpang, General Santos City
          </p>
        </div>
      </section>

      <section className="bg-silver/30 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="mb-2 font-display text-2xl">Bulletin</h2>
            <div className="h-1 w-12 bg-gold" />
          </div>

          <div className="space-y-4">
            {bulletin.map((b) => (
              <div
                key={b.text}
                className={`border-l-4 bg-card p-5 shadow-sm ${b.accent ? "border-navy" : "border-silver"}`}
              >
                <span className="mb-2 block font-mono text-[10px] text-navy/40">
                  {b.date.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold leading-tight">{b.text}</h3>
              </div>
            ))}
          </div>

          <Link
            to="/news"
            className="mt-8 inline-block border-b border-gold pb-0.5 text-xs font-bold uppercase tracking-widest text-navy"
          >
            Read the bulletin
          </Link>
        </div>
      </section>
    </main>
  );
}
