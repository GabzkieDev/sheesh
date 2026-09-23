export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="border-b border-navy/5 px-6 pb-12 pt-14">
      <div className="mx-auto max-w-3xl animate-entrance">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-navy/40">
          {eyebrow}
        </p>
        <h1 className="mb-4 font-display text-4xl leading-[1.1] tracking-tight text-balance">
          {title}
        </h1>
        <div className="mb-6 h-1 w-12 bg-gold" />
        <p className="max-w-[60ch] text-sm leading-relaxed text-navy/70">{lead}</p>
      </div>
    </header>
  );
}
