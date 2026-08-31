import type { Metadata } from "next";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-parts";
import { ContactForm } from "@/components/contact-form";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Call or WhatsApp +234 816 800 3677, email info@suezgas.com, or visit 20 Alexandria Crescent, Wuse II, Abuja.",
};

const CHANNELS = [
  {
    label: "Call & WhatsApp",
    value: "+234 816 800 3677",
    href: "tel:+2348168003677",
    note: "One number for both. Fastest route for an urgent refill.",
  },
  {
    label: "Email",
    value: "info@suezgas.com",
    href: "mailto:info@suezgas.com",
    note: "Best for quotes, volume enquiries and invoices.",
  },
  {
    label: "Office",
    value: "20 Alexandria Crescent, Wuse II, Abuja",
    note: "Monday to Saturday.",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema trail={[["Contact", "/contact"]]} />
      <PageHero
        eyebrow="Contact"
        lines={["Questions?", "Ask a person."]}
        lede="Requests, complaints and feedback all reach the same team. If a delivery went wrong, say so and we will fix it rather than file it."
        stamp="SU-GAS / 06 · Channels"
        telemetry={[
          { label: "Channels", value: "03" },
          { label: "Office hours", value: "Mon–Sat" },
          { label: "Base", value: "Wuse II" },
          { label: "Line", value: "Answering", live: true },
        ]}
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 104, y: 30 }} rings={22} opacity={0.5} />
        <Burner className="pointer-events-none absolute -left-40 bottom-[-9rem] h-[30rem] w-[30rem] opacity-25" />

        <Reveal className="measure relative">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
            <div className="reveal">
              {CHANNELS.map((c, i) => (
                <div
                  key={c.label}
                  className="border-t border-bone-line py-7"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="link-slide mt-3 block font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight transition-colors duration-200 hover:text-flame-ink"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-3 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight">
                      {c.value}
                    </p>
                  )}
                  <p className="mt-3 max-w-sm text-sm text-fg-bone-muted">{c.note}</p>
                </div>
              ))}
            </div>

            <Reveal className="reveal">
              <h2 className="text-display-m" style={{ "--i": 0 } as React.CSSProperties}>
                Send a message.
              </h2>
              <ContactForm />
            </Reveal>
          </div>
        </Reveal>
      </section>
    </>
  );
}
