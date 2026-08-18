import type { Metadata } from "next";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-parts";

export const metadata: Metadata = {
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
              <form className="mt-10 space-y-8" style={{ "--i": 1 } as React.CSSProperties}>
                <div className="grid gap-8 sm:grid-cols-2">
                  <p className="field">
                    <label htmlFor="c-name">Full name</label>
                    <input id="c-name" name="name" type="text" autoComplete="name" required />
                  </p>
                  <p className="field">
                    <label htmlFor="c-phone">Phone</label>
                    <input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="080 0000 0000"
                      required
                    />
                  </p>
                </div>

                <p className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" required />
                </p>

                <p className="field">
                  <label htmlFor="c-topic">Type of request</label>
                  <select id="c-topic" name="topic" defaultValue="enquiry">
                    <option value="enquiry">General enquiry</option>
                    <option value="delivery">Gas delivery</option>
                    <option value="shop">Cylinders & hardware</option>
                    <option value="haulage">Bulk haulage</option>
                    <option value="installation">Installation</option>
                    <option value="complaint">A delivery went wrong</option>
                    <option value="other">Others</option>
                  </select>
                </p>

                <p className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" name="message" required />
                </p>

                {/* ponytail: presentation only — wire to your mailer or a server action. */}
                <button type="submit" className="btn btn-flame w-full sm:w-auto">
                  Send message
                </button>

                <p className="text-[0.6875rem] uppercase tracking-[0.075em] text-fg-bone-muted">
                  Urgent refills are faster on the phone line.
                </p>
              </form>
            </Reveal>
          </div>
        </Reveal>
      </section>
    </>
  );
}
