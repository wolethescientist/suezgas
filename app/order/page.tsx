import type { Metadata } from "next";
import { Burner, Contours } from "@/components/texture";
import { Reveal, WipeWords } from "@/components/reveal";
import { HeroCanvas, HeroTelemetry } from "@/components/hero-canvas";
import { OrderForm } from "@/components/order-form";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/order" },
  title: "Order gas",
  description:
    "Request LPG delivery, a cylinder refill or bulk commercial supply in Abuja. A representative confirms the requirement, price and delivery window before anything moves.",
};

const STEPS = [
  ["Submit a request", "Fill the form, or call if that is faster for you."],
  ["Order confirmation", "A representative calls to confirm size, price and window."],
  ["Delivery confirmation", "Delivered and weighed at your door, on time."],
];

export default function OrderPage() {
  return (
    <>
      <BreadcrumbSchema trail={[["Order gas", "/order"]]} />
      <HeroCanvas
        stamp="SU-GAS / 07 · Dispatch"
        className="border-b border-bone-line pb-16 pt-36 sm:pt-44"
      >
        <Contours origin={{ x: 94, y: 26 }} rings={24} opacity={0.6} depth />
        <div className="bloom" />
        <Reveal className="measure relative" immediate>
          <div className="reveal hero-parallax max-w-3xl">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Order gas
            </div>
            <h1
              className="mt-7 text-display-l"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <WipeWords lines={["Tell us the size."]} />
            </h1>
            <p
              className="mt-8 max-w-xl text-body-l text-fg-bone-muted"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              Tell us the cylinder size, site or commercial volume you need.
              Nothing is charged until a representative has confirmed the
              requirement, price and delivery window with you.
            </p>
          </div>
        </Reveal>

        <Reveal className="measure relative mt-14">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <HeroTelemetry
                items={[
                  { label: "Steps to delivery", value: "03" },
                  { label: "Charged on this form", value: "₦0" },
                  { label: "Weighed at", value: "Your door" },
                  { label: "Taking orders", value: "Now", live: true },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </HeroCanvas>

      {/* Three-step strip (ink) */}
      <section className="on-ink relative overflow-hidden py-14">
        <Contours origin={{ x: 12, y: 60 }} rings={18} tone="ink" opacity={0.5} />
        <Reveal className="measure relative">
          <ol className="reveal grid gap-8 md:grid-cols-3 md:gap-14">
            {STEPS.map(([title, body], i) => (
              <li
                key={title}
                className="border-t border-ink-line pt-6"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-flame">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-3 font-display text-[1.375rem] leading-tight">
                  {title}
                </h2>
                <p className="mt-2 text-[0.9375rem] text-fg-ink-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* The form */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <Burner className="pointer-events-none absolute -left-48 top-1/3 h-[34rem] w-[34rem] opacity-25" />
        <Reveal className="measure relative">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <Reveal className="reveal">
              <h2 className="text-display-m" style={{ "--i": 0 } as React.CSSProperties}>
                Gas request form
              </h2>
              <OrderForm />
            </Reveal>

            {/* Faster alternatives */}
            <Reveal className="reveal">
              <div
                className="on-ink rounded-2xl p-8 sm:p-10"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <div className="eyebrow">Faster</div>
                <h2 className="mt-5 font-display text-[1.75rem] leading-tight">
                  Or just call. We answer.
                </h2>
                <p className="mt-4 text-fg-ink-muted">
                  For an urgent refill, the phone line and WhatsApp are the
                  quickest route — the same number for both.
                </p>

                <dl className="mt-8 space-y-5 border-t border-ink-line pt-7">
                  {[
                    ["Call & WhatsApp", "+234 816 800 3677", "tel:+2348168003677"],
                    ["Email", "info@suezgas.com", "mailto:info@suezgas.com"],
                  ].map(([label, value, href]) => (
                    <div key={label}>
                      <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                        {label}
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={href}
                          className="link-slide font-display text-[1.25rem] transition-colors duration-200 hover:text-flame"
                        >
                          {value}
                        </a>
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                      Office
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed">
                      20 Alexandria Crescent, Wuse II, Abuja
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>
    </>
  );
}
