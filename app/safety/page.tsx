import type { Metadata } from "next";
import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { NumberedRow, PageHero, SectionHead } from "@/components/page-parts";
import { BreadcrumbSchema, FaqSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/safety" },
  title: "LPG safety",
  description:
    "How to store, check and handle LPG equipment safely, what to do if you smell gas, and the checks Suez Gas performs on every delivery.",
};

const CHECKS = [
  {
    q: "How do I check for a leak?",
    a: "Brush soapy water over the valve, the regulator joint and along the hose. Bubbles mean gas is escaping. Never use a flame or a lighter to test for a leak — that is how a small problem becomes a fire.",
  },
  {
    q: "Where should the cylinder sit?",
    a: "Upright, on a firm level surface, in a ventilated space at floor level — never in a sealed cupboard, never below ground, and never in a bedroom. LPG is heavier than air, so it pools at the lowest point rather than dispersing upward.",
  },
  {
    q: "How often should the hose be replaced?",
    a: "Inspect it every few months and replace it at the first sign of cracking, hardening or perishing, or every two years regardless. A hose is the cheapest part of the system and the most common point of failure.",
  },
  {
    q: "What do I do if I smell gas?",
    a: "Do not touch any electrical switch, including a light switch — the spark is the ignition source. Turn the cylinder valve off, open doors and windows, get everybody out, and call us from outside the building.",
  },
  {
    q: "Can I use a cylinder that has been lying on its side?",
    a: "Stand it upright and leave it for at least an hour before connecting. Liquid LPG reaching the regulator instead of vapour will cause it to over-deliver dangerously.",
  },
  {
    q: "Is a rusted cylinder still usable?",
    a: "Surface discolouration is normal. Pitting, deep rust, dents or a damaged foot ring are not — stop using it and let us swap it. We will not refill a cylinder we judge unsafe, even when asked to.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <BreadcrumbSchema trail={[["LPG safety", "/safety"]]} />
      {/* CHECKS is rendered further down this page, so the schema and the
          visible content can never drift apart. */}
      <FaqSchema items={CHECKS} />
      <PageHero
        eyebrow="LPG safety"
        lines={["Gas is safe.", "Bad fittings", "are not."]}
        lede="Almost every domestic gas incident traces back to a perished hose, a wrong regulator or a cylinder stored somewhere it should not be. All three are preventable in about ten minutes."
        stamp="SU-GAS / 05 · Field protocol"
        telemetry={[
          { label: "Checks per delivery", value: "03" },
          { label: "Hose life", value: "2", unit: "years" },
          { label: "Leak test", value: "Soapy water" },
          { label: "Safety line", value: "Open", live: true },
        ]}
        aside={
          <div className="border-l border-bone-line pl-6">
            <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
              If you smell gas
            </div>
            <p className="mt-3 font-display text-[1.5rem] leading-tight">
              Do not touch any switch. Valve off, windows open, everybody out,
              then call.
            </p>
            <a
              href="tel:+2348168003677"
              className="link-slide mt-4 inline-block font-mono text-[1.0625rem] text-flame-ink"
            >
              0816 800 3677
            </a>
          </div>
        }
      />

      {/* What we check (ink) */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 45 }} rings={22} tone="ink" opacity={0.55} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="On every delivery"
            title="What our driver checks before leaving."
            note="Field staff carry safety equipment as standard"
          />
          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Cylinder condition" meta="We refuse unsafe cylinders">
              <p>
                Body for pitting and deep rust, foot ring for damage, valve
                thread for wear. A cylinder that fails this does not get refilled
                — it gets swapped.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="Weight, in front of you" meta="Digital scale on every vehicle">
              <p>
                The filled cylinder is weighed where you can see the reading. You
                pay for the kilograms shown, not for the size printed on the
                collar.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Connection and leak test" meta="Soapy-water test on completion">
              <p>
                Regulator seated correctly, hose sound and in date, joint tested.
                If the hose is perished we will say so and offer a replacement
                rather than reconnect it.
              </p>
            </NumberedRow>
          </Reveal>
        </Reveal>
      </section>

      {/* Household guidance */}
      <section className="relative overflow-hidden border-b border-bone-line py-20 lg:py-28">
        <Burner className="pointer-events-none absolute -right-44 top-1/3 h-[32rem] w-[32rem] opacity-25" />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="In your kitchen"
            title="Six things worth knowing."
          />
          <div className="reveal mt-12">
            {CHECKS.map((item, i) => (
              <details
                key={item.q}
                className="faq-item"
                style={{ "--i": i } as React.CSSProperties}
              >
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-sign" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-bone-2 py-20 lg:py-24">
        <Contours origin={{ x: 26, y: 50 }} rings={20} opacity={0.5} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-xl text-display-m">
              Want the whole installation checked?
            </h2>
            <p className="mt-5 max-w-md text-fg-bone-muted">
              We will inspect the regulator, hose and connections when we
              deliver. Ask when you place the order.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/order" className="btn btn-flame">
              Order with a safety check
            </Link>
            <Link href="/services#installation" className="btn btn-ghost">
              Installation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
