import type { Metadata } from "next";
import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionHead } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Cylinder, refill, bulk LPG and hardware pricing from Suez Gas Nigeria. LPG is a commodity, so the price on the day is confirmed before delivery moves.",
};

const PRODUCTS = [
  {
    name: "Bulk LPG supply",
    detail: "Volume supply for off-takers, plants and industrial sites",
    range: "Quote on request",
    note: "By volume, route and schedule",
  },
  {
    name: "Gas refill",
    detail: "Your own cylinder, collected and returned full",
    range: "₦16,000 - ₦65,000",
    note: "By cylinder size, 3 kg to 50 kg",
  },
  {
    name: "Gas cylinder",
    detail: "New cylinder, various capacities",
    range: "₦56,500 - ₦180,000",
    note: "One-off purchase, yours to keep",
  },
  {
    name: "Regulator + cylinder + gas bundle",
    detail: "Cylinder, regulator and gas for a new installation",
    range: "₦69,000 - ₦120,000",
    note: "For a new installation",
  },
  {
    name: "Suez Gas low-pressure regulator",
    detail: "Replacement regulator, fitted on request",
    range: "₦50,000",
    note: "Fixed price",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        lines={["What it costs,", "before you order."]}
        lede="LPG is a commodity and the landed price moves. Cylinder ranges are indicative, while bulk and commercial supply is quoted around volume, route and schedule."
        stamp="SU-GAS / 04 · Rate card"
        telemetry={[
          { label: "Listed items", value: "05" },
          { label: "Refill from", value: "₦16,000" },
          { label: "Priced by", value: "Kilogram" },
          { label: "Day rate", value: "Confirmed", live: true },
        ]}
        aside={
          <div className="border-l border-bone-line pl-6">
            <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
              Bulk volumes
            </div>
            <div className="mt-2 font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-none text-flame-ink">
              Quoted
            </div>
            <p className="mt-3 max-w-[16rem] text-sm text-fg-bone-muted">
              Tell us the site, consumption and delivery rhythm. We will build the right quote.
            </p>
          </div>
        }
      />

      {/* Price table — hairline rows, no boxes */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 40 }} rings={22} tone="ink" opacity={0.55} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Products"
            title="Cylinder, bulk and hardware pricing."
            note="Indicative. Confirmed on order."
          />

          <Reveal className="reveal mt-14 overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-line">
                  {["Item", "What it is", "Price", "Notes"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-4 pr-6 text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p, i) => (
                  <tr
                    key={p.name}
                    className="border-b border-ink-line"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <td className="py-6 pr-6 align-top">
                      <span className="font-display text-[1.125rem]">{p.name}</span>
                    </td>
                    <td className="py-6 pr-6 align-top text-[0.9375rem] text-fg-ink-muted">
                      {p.detail}
                    </td>
                    <td className="py-6 pr-6 align-top font-mono text-[0.9375rem] tabular-nums text-flame">
                      {p.range}
                    </td>
                    <td className="py-6 pr-6 align-top text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                      {p.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <p className="reveal mt-10 max-w-2xl text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] text-fg-ink-muted">
            Prices exclude delivery outside the Abuja metropolis. Bulk and
            commercial volumes are quoted separately around the site and route.
          </p>
        </Reveal>
      </section>

      {/* How we price */}
      <section className="relative overflow-hidden border-b border-bone-line py-20 lg:py-28">
        <Burner className="pointer-events-none absolute -right-40 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 opacity-25" />
        <Reveal className="measure relative">
          <SectionHead eyebrow="How we price" title="Per kilogram, not per promise." />

          <Reveal className="reveal mt-14 grid gap-x-14 gap-y-10 md:grid-cols-3">
            {[
              [
                "You pay for weight",
                "The cylinder is weighed on a digital scale at your door. If it is short, you do not pay for the difference.",
              ],
              [
                "The day's price, confirmed",
                "Landed LPG cost moves. We tell you the figure on the call and hold it for that delivery.",
              ],
              [
                "Volume is quoted",
                "Estates, hospitality and industrial consumption gets a contract rate rather than a shelf price.",
              ],
            ].map(([title, body], i) => (
              <div
                key={title}
                className="border-t border-bone-line pt-6"
                style={{ "--i": i } as React.CSSProperties}
              >
                <h3 className="text-display-s">{title}</h3>
                <p className="mt-3 text-fg-bone-muted">{body}</p>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-bone-2 py-20 lg:py-24">
        <Contours origin={{ x: 96, y: 50 }} rings={20} opacity={0.5} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-display-m">
            Get today&rsquo;s price for your cylinder size.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/order" className="btn btn-flame">
              Order gas
            </Link>
            <a href="tel:+2348168003677" className="btn btn-ghost">
              0816 800 3677
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
