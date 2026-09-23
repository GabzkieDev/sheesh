import { Link } from "@tanstack/react-router";
import { useState } from "react";
import seal from "@/assets/khs-seal.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "Bulletin" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-navy/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={seal.url}
            alt="Official seal of Kolehiyo ng Heneral Santos"
            width={40}
            height={40}
            className="size-10 shrink-0"
          />
          <span className="max-w-[140px] text-[10px] font-bold uppercase leading-tight tracking-wider text-navy">
            Kolehiyo ng <br />
            Heneral Santos
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs font-semibold uppercase tracking-wider text-navy/70 transition-colors hover:text-navy"
              activeProps={{ className: "text-navy" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-sm border border-navy/10 active:bg-navy/5 md:hidden"
        >
          <span className="h-0.5 w-5 bg-navy" />
          <span className="h-0.5 w-5 bg-navy" />
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 px-4 pb-4 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-navy/5 py-3 text-sm font-semibold uppercase tracking-wide text-navy"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
