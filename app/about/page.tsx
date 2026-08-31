import type { Metadata } from "next";
import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero, PullQuote, SectionHead, StatRow } from "@/components/page-parts";
import { BreadcrumbSchema } from "@/components/structured-data";
import { FeaturePhoto } from "@/components/photo";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About us",
  description:
    "Suez Gas Nigeria Limited (RC 1076785) has supplied bulk commercial and industrial LPG from Wuse II, Abuja since 2012. Part of the Suez energy group.",
};

const GROUP = [
  [
    "Suez Gas Nigeria",
    "Bulk LPG supply for off-takers, hospitality, food production and industrial operations.",
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
      <BreadcrumbSchema trail={[["About", "/about"]]} />
      <PageHero
        eyebrow="RC 1076785 · Wuse II, Abuja"
        lines={["An independent", "energy supplier."]}
        lede="We specialise in bulk LPG for industrial and commercial use — road tanker haulage, storage planning and plant installation. Individual purchases are handled in the group app."
        stamp="SU-GAS / 02 · RC 1076785"
        telemetry={[
          { label: "Incorporated", value: "2012" },
          { label: "Group companies", value: "03" },
          { label: "Base", value: "Wuse II" },
          { label: "Trading", value: "Active", live: true },
        ]}
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
              className="mt-14 max-w-2xl text-body-l text-fg-ink-muted"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              We are committed to reliable service and innovative energy
              solutions, while continuously working to reduce our impact on the
              environment. We understand what quality product means in this
              trade, and we stand behind a delivery service we are willing to be
              judged on.
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
            title="A plant room, not a kitchen."
            note="Off-takers / commercial / industrial"
          />

          <Reveal className="reveal mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {[
              [
                "Off-takers and resellers",
                "Businesses buying LPG in volume to move on, supplied by road tanker on a contracted route and schedule.",
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

          <Reveal className="reveal mt-16">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <FeaturePhoto id="kitchen" />
            </div>
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
            note="Import, haulage, distribution and electricity"
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
                { label: "Bulk mode", value: "Road tanker" },
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
            <Link href="/contact" className="btn btn-flame">
              Talk to our supply team
            </Link>
            <Link href="/#app" className="btn btn-ghost">
              Get the app
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
