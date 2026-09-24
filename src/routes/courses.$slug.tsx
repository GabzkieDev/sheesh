import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCourse } from "@/lib/courses";
import { courseImages } from "@/lib/course-images";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Course not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.course;
    const title = `${c.name} — Kolehiyo ng Heneral Santos`;
    return {
      meta: [
        { title },
        { name: "description", content: c.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: c.overview },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: CourseNotFound,
  component: CoursePage,
});

function CourseNotFound() {
  return (
    <main className="px-6 py-24 text-center">
      <h1 className="mb-4 font-display text-3xl">Course not found</h1>
      <Link to="/programs" className="border-b border-gold text-sm font-bold uppercase text-navy">
        Back to programs
      </Link>
    </main>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-sm bg-card p-6 shadow-sm">
      <h2 className="mb-2 font-display text-xl">{title}</h2>
      <div className="mb-4 h-1 w-10 bg-gold" />
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-sm text-navy/80">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoursePage() {
  const { course } = Route.useLoaderData();
  return (
    <main>
      <header className="relative overflow-hidden px-6 pb-16 pt-20">
        <img
          src={courseImages[course.slug]}
          alt={course.name}
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/80" />
        <div className="relative mx-auto max-w-3xl animate-entrance text-primary-foreground">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-primary-foreground/60">
            {course.college}
          </p>
          <h1 className="mb-4 font-display text-4xl leading-[1.1] tracking-tight text-balance md:text-5xl">
            {course.name}
          </h1>
          <div className="mb-6 h-1 w-12 bg-gold" />
          <p className="max-w-[60ch] text-sm leading-relaxed text-primary-foreground/80">{course.overview}</p>
        </div>
      </header>
      <section className="bg-silver/30 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap gap-8 border-b border-navy/10 pb-6">
            <div>
              <div className="font-mono text-[10px] uppercase text-navy/40">Duration</div>
              <div className="text-sm font-bold">{course.duration}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-navy/40">College</div>
              <div className="text-sm font-bold">{course.college}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-navy/40">Tuition</div>
              <div className="text-sm font-bold">Free for Gensan Youth</div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <List title="Program Highlights" items={course.highlights} />
            <List title="Key Subjects" items={course.subjects} />
            <List title="Career Paths" items={course.careers} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-4 text-sm font-semibold text-primary-foreground"
            >
              Apply for this program <span className="size-1 rounded-full bg-gold" />
            </Link>
            <Link to="/programs" className="px-4 py-4 text-sm font-semibold text-navy underline-offset-4 hover:underline">
              ← All programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
