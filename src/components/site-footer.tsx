import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin } from "lucide-react";
import seal from "@/assets/khs-seal.png.asset.json";
import { useContent } from "@/lib/site-content";

export function SiteFooter() {
  const c = useContent("contact");
  return (
    <footer className="bg-navy px-8 pb-8 pt-16 text-primary-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 md:flex md:items-start md:justify-between md:gap-12">
          <div>
            <img
              src={seal.url}
              alt="Seal of Kolehiyo ng Heneral Santos"
              width={72}
              height={72}
              loading="lazy"
              className="mb-6 size-18 rounded-full bg-white/95 p-1"
            />
            <h2 className="mb-6 font-display text-2xl">
              Kolehiyo ng <br />
              Heneral Santos
            </h2>
            <div className="space-y-4 text-xs font-medium text-primary-foreground/60">
              <p className="flex items-start gap-3">
                <MapPin className="mt-px size-4 shrink-0 text-gold" aria-hidden />
                <span>{c.address}</span>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-px size-4 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${c.email}`} className="hover:text-gold">
                  {c.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Facebook className="mt-px size-4 shrink-0 text-gold" aria-hidden />
                <a
                  href={c.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold"
                >
                  {c.facebook.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 md:mt-0">
            <div>
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gold">
                Academics
              </h3>
              <ul className="space-y-2 text-xs text-primary-foreground/70">
                <li>
                  <Link to="/programs">Programs</Link>
                </li>
                <li>
                  <Link to="/about">About the College</Link>
                </li>
                <li>
                  <Link to="/news">Bulletin</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gold">
                Admissions
              </h3>
              <ul className="space-y-2 text-xs text-primary-foreground/70">
                <li>
                  <Link to="/admissions">How to Apply</Link>
                </li>
                <li>
                  <Link to="/admissions">Requirements</Link>
                </li>
                <li>
                  <Link to="/contact">Registrar</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/30">
            &copy; 2026 Kolehiyo ng Heneral Santos
          </p>
        </div>
      </div>
    </footer>
  );
}
