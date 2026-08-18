import type { Metadata } from "next";
import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionHead } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "LPG supply, bulk haulage, storage planning, professional installation and gas consultancy across Abuja from Suez Gas Nigeria.",
};

const SERVICES = [
  {
    id: "delivery",
    tag: "Cylinder distribution",
    title: "Cylinder delivery",
    lede: "Personalised cylinder pick-up and delivery to your doorstep, on our own vehicles.",
    body: [
      "Whatever your LPG requirement, we build the delivery around the reality of your home, estate or organisation, with reliable and safe service you can plan around.",
      "Fast and efficient delivery schedules, experienced drivers who take the utmost care on your property, and competitive prices. We collect the empty cylinder and return it filled.",
    ],
    facts: [
      ["Sizes", "3-50 kg"],
      ["Window", "Same day"],
      ["Weighing", "Digital scale at your door"],
    ],
  },
  {
    id: "haulage",
    tag: "Bulk haulage",
    title: "Gas haulage",
    lede: "Bulk LPG moved by road to off-takers, plants and industrial sites.",
    body: [
      "Through Suez Trading International the group imports LPG and distributes it to off-takers in trucks. That upstream position is what keeps our per-kilogram price competitive downstream.",
      "Haulage is contracted by volume and route, with scheduling agreed in advance so a plant never runs to the bottom of its tank.",
    ],
    facts: [
      ["Mode", "Road tanker"],
      ["Contracting", "By volume & route"],
      ["Scheduling", "Agreed in advance"],
    ],
  },
  {
    id: "installation",
    tag: "Plant installation",
    title: "Professional installation",
    lede: "Storage, regulators, hoses, manifolds and appliance connections, fitted properly.",
    body: [
      "Most domestic gas incidents trace back to a bad connection, a perished hose or a regulator that was never right for the appliance. Installation is where safety is actually decided.",
      "Our field staff are equipped and trained for the work, and we will tell you plainly when a component needs replacing rather than reconnecting.",
    ],
    facts: [
      ["Covers", "Domestic & commercial"],
      ["Includes", "Leak test on completion"],
      ["Parts", "Regulators, hoses, manifolds"],
    ],
  },
  {
    id: "consultancy",
    tag: "Supply planning",
    title: "LPG systems consultancy",
    lede: "Sizing, siting and specification for organisations moving to or scaling up on LPG.",
    body: [
      "For estates, hospitality groups and food producers, the questions are how much storage, where it can legally and safely sit, and what the refill cycle should look like at your consumption.",
      "We also advise on natural gas utilisation projects, drawing on the group's distribution and import experience rather than a brochure.",
    ],
    facts: [
      ["For", "Estates, hospitality, industry"],
      ["Scope", "Sizing, siting, specification"],
      ["Also", "Gas utilisation projects"],
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        lines={["One supply chain,", "four ways in."]}
        lede="Storage planning, bulk haulage, cylinder distribution and installation from people who move LPG into the places where work happens."
        stamp="SU-GAS / 03 · Service lines"
        telemetry={[
          { label: "Service lines", value: "04" },
          { label: "Cylinder range", value: "3–50", unit: "kg" },
          { label: "Bulk mode", value: "Road tanker" },
          { label: "Scheduling", value: "Agreed", live: true },
        ]}
      />

      {SERVICES.map((s, i) => {
        const ink = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`relative overflow-hidden py-20 lg:py-28 ${
              ink ? "on-ink" : "border-b border-bone-line"
            }`}
          >
            {ink ? (
              <Contours
                origin={{ x: i === 1 ? -6 : 104, y: 40 }}
                rings={22}
                tone="ink"
                opacity={0.55}
              />
            ) : (
              <Burner
                className={`pointer-events-none absolute ${
                  i === 0 ? "-right-40" : "-left-40"
                } top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 opacity-25`}
              />
            )}

            <Reveal className="measure relative">
              <SectionHead eyebrow={s.tag} title={s.title} note={s.lede} />

              <Reveal className="reveal mt-14 grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
                <div style={{ "--i": 0 } as React.CSSProperties}>
                  {s.body.map((p) => (
                    <p
                      key={p}
                      className={`mt-5 max-w-2xl text-body-l first:mt-0 ${
                        ink ? "text-fg-ink-muted" : "text-fg-bone-muted"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link href="/order" className="btn btn-flame">
                      Request this service
                    </Link>
                  </div>
                </div>

                <dl style={{ "--i": 1 } as React.CSSProperties}>
                  {s.facts.map(([k, v]) => (
                    <div key={k} className="border-t py-4">
                      <dt
                        className={`text-[0.6875rem] uppercase tracking-[0.09em] ${
                          ink ? "text-fg-ink-muted" : "text-fg-bone-muted"
                        }`}
                      >
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </Reveal>
          </section>
        );
      })}

      <section className="relative overflow-hidden bg-bone-2 py-20 lg:py-24">
        <Contours origin={{ x: 24, y: 50 }} rings={22} opacity={0.5} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-display-m">
            Not sure which of these you need?
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+2348168003677" className="btn btn-flame">
              0816 800 3677
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Send a message
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
