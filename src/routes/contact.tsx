import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kolehiyo ng Heneral Santos" },
      {
        name: "description",
        content:
          "Contact Kolehiyo ng Heneral Santos: Purok Maliwanag, Barangay Calumpang, General Santos City, office hours, email and Facebook page.",
      },
      { property: "og:title", content: "Contact — Kolehiyo ng Heneral Santos" },
      {
        property: "og:description",
        content: "Reach the Admissions Office, Registrar and Student Affairs of the college.",
      },
    ],
  }),
  component: Contact,
});

const offices = [
  ["Office of Admissions", "kolehiyodeheneral@gmail.com", "+63 (083) 552 4000"],
  ["Office of the Registrar", "kolehiyodeheneral@gmail.com", "+63 (083) 552 4001"],
  ["Student Affairs", "kolehiyodeheneral@gmail.com", "+63 (083) 552 4002"],
];

function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Visit or write to us"
        lead="The college holds office at Purok Maliwanag, Barangay Calumpang, General Santos City. Walk-in inquiries are welcome during office hours."
      />

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-xl">Campus</h2>
            <p className="flex items-start gap-3 text-sm leading-relaxed text-navy/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <span>
                Purok Maliwanag, Barangay Calumpang
                <br />
                General Santos City, Philippines 9500
              </span>
            </p>
            <h3 className="mt-8 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">
              Online
            </h3>
            <div className="space-y-2 text-sm text-navy/75">
              <p className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-navy" aria-hidden />
                <a href="mailto:kolehiyodeheneral@gmail.com" className="hover:text-navy">
                  kolehiyodeheneral@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Facebook className="size-4 shrink-0 text-navy" aria-hidden />
                <a
                  href="https://www.facebook.com/kolehiyoNgHeneralSantos"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-navy"
                >
                  facebook.com/kolehiyoNgHeneralSantos
                </a>
              </p>
            </div>
            <h3 className="mt-8 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">
              Office hours
            </h3>
            <p className="text-sm text-navy/75">
              Monday to Friday, 8:00 AM – 5:00 PM
              <br />
              Saturday, 8:00 AM – 12:00 NN (exam days only)
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl">Offices</h2>
            <ul className="divide-y divide-navy/10 border-y border-navy/10">
              {offices.map(([name, email, phone]) => (
                <li key={name} className="py-4">
                  <p className="text-sm font-bold">{name}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-navy/65">
                    <Mail className="size-3.5 shrink-0" aria-hidden />
                    {email}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-navy/65">
                    <Phone className="size-3.5 shrink-0" aria-hidden />
                    {phone}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-silver/30 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">Note</p>
          <p className="mt-3 text-sm leading-relaxed text-navy/75">
            The contact details, dates and announcements on this website are sample content. Send me
            the college's real address, phone numbers, email and announcements and I will replace
            them.
          </p>
        </div>
      </section>
    </main>
  );
}
