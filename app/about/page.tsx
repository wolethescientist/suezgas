import type { Metadata } from "next";
import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero, PullQuote, SectionHead, StatRow } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Suez Gas Nigeria Limited (RC 1076785) has supplied commercial, industrial and residential LPG from Wuse II, Abuja since 2012. Part of the Suez energy group.",
};

const GROUP = [
  [
    "Suez Gas Nigeria",
    "LPG supply for homes, estates, hospitality, food production and industrial operations.",
    "This company",
  ],
  [
    "Suez Trading International",
    "LPG importation and bulk distribution to off-takers by truck. Our upstream supply.",
    "Upstream",
  ],
  [
    "SuezElectric",
    "Prepaid electricity vending across Nigerian distribution companies. Our sister company.",
    "Electricity",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="RC 1076785 · Wuse II, Abuja"
        lines={["An independent", "energy supplier."]}
        lede="We specialise in LPG supply for industrial, commercial and residential use, from cylinder distribution and road tanker haulage to storage planning and plant installation."
        aside={
          <dl className="space-y-4 border-l border-bone-line pl-6">
            {[
              ["Incorporated", "7 November 2012"],
              ["Registered office", "20 Alexandria Crescent, Wuse II, Abuja"],
              ["Sector", "Petroleum products sales & distribution"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
                  {k}
                </dt>
                <dd className="mt-1.5 text-[0.9375rem]">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Mission (ink) */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -6, y: 30 }} rings={22} tone="ink" opacity={0.55} />
        <Reveal className="measure relative">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <PullQuote>
                Our mission is to make LPG supply safer and easier to plan at
                every scale.
              </PullQuote>
            </div>
            <p
              className="mt-9 max-w-2xl text-body-l text-fg-ink-muted"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              We are committed to reliable service and innovative energy
              solutions, while continuously working to reduce our impact on the
              environment. We understand what quality product means in this
              trade, and we price competitively alongside a delivery service we
              are willing to be judged on.
            </p>
          </div>
        </Reveal>
      </section>

      {/* What we do */}
      <section className="relative overflow-hidden border-b border-bone-line py-20 lg:py-28">
        <Burner className="pointer-events-none absolute -left-44 top-1/4 h-[32rem] w-[32rem] opacity-25" />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Who we serve"
            title="One cylinder or a plant room."
            note="Residential / commercial / industrial"
          />

          <Reveal className="reveal mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {[
              [
                "Homes and estates",
                "Individual households and whole estates on a scheduled refill round, with cylinder pick-up and return.",
              ],
              [
                "Hospitality",
                "Hotels, lounges and bars where a cylinder running dry mid-service is not an option.",
              ],
              [
                "Food production",
                "Eateries and bakeries running ovens all day, on volumes that need planning rather than guessing.",
              ],
              [
                "Industrial and projects",
                "Industrial supply and natural gas utilisation projects, with the group's import and haulage behind them.",
              ],
            ].map(([title, body], i) => (
              <div
                key={title}
                className="border-t border-bone-line pt-6"
                style={{ "--i": i } as React.CSSProperties}
              >
                <h3 className="text-display-s">{title}</h3>
                <p className="mt-3 max-w-md text-fg-bone-muted">{body}</p>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </section>

      {/* Group */}
      <section className="relative overflow-hidden bg-bone-2 py-20 lg:py-28">
        <Contours origin={{ x: 104, y: 70 }} rings={20} opacity={0.5} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="The group"
            title="Three companies behind the supply."
            note="Import, haulage, domestic distribution and electricity"
          />
          <Reveal className="reveal mt-14">
            {GROUP.map(([name, body, tag], i) => (
              <div
                key={name}
                className="grid gap-3 border-t border-bone-line py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-12"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div>
                  <h3 className="text-display-s">{name}</h3>
                  <div className="mt-2 text-[0.6875rem] uppercase tracking-[0.09em] text-flame-ink">
                    {tag}
                  </div>
                </div>
                <p className="max-w-xl text-fg-bone-muted">{body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="reveal mt-16">
            <StatRow
              items={[
                { label: "Incorporated", value: "2012" },
                { label: "Base", value: "Wuse II" },
                { label: "Cylinder range", value: "3-50 kg" },
                { label: "Group companies", value: "3" },
              ]}
            />
          </Reveal>
        </Reveal>
      </section>

      <section className="relative overflow-hidden py-20 lg:py-24">
        <Contours origin={{ x: 30, y: 45 }} rings={24} opacity={0.55} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-display-m">
            Need LPG at a larger scale?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/order" className="btn btn-flame">
              Order gas
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
