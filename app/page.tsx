import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal, WipeWords } from "@/components/reveal";
import { GlobalGasTicker } from "@/components/global-gas-ticker";
import { NumberedRow, PullQuote, SectionHead, StatRow } from "@/components/page-parts";
import { HeroCanvas, HeroTelemetry } from "@/components/hero-canvas";
import { LpgInfrastructure } from "@/components/lpg-infrastructure";
import { SocialMediaSection } from "@/components/social-media";
import { ProofStrip } from "@/components/photo";
import { AppDownloadSection } from "@/components/app-download";

const SUPPLY_MODES = [
  "Bulk LPG supply",
  "Road tanker haulage",
  "Storage planning",
  "Plant installation",
];

/**
 * Every figure on this rail has to be something a customer could check. "Supply
 * modes: 04" counted a list further down the same page, which is filler dressed
 * as instrumentation — it is out.
 *
 * TODO(suez): three real numbers would beat all of these, and only the company
 * has them: tonnes moved per month, sites currently on supply, and the average
 * hours from order to delivery. Send them over and they replace the middle two.
 */
const HERO_TELEMETRY = [
  { label: "Supplying since", value: "2012" },
  { label: "Bulk movement", value: "Road tanker" },
  { label: "Every handover", value: "Weighed" },
  { label: "Dispatch", value: "Live", live: true },
];

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── Hero (bone) ───────────────────────── */}
      <HeroCanvas
        stamp="SU-GAS / 01 · Abuja"
        className="border-b border-bone-line pb-14 pt-32 sm:pt-40 lg:pb-20 lg:pt-48"
      >
        <Contours origin={{ x: 74, y: 34 }} rings={32} depth />
        <div className="bloom" />

        <Reveal className="measure relative" immediate>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.85fr] lg:items-center lg:gap-16">
            <div className="reveal hero-parallax">
              <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
                Bulk LPG infrastructure
              </div>
              <h1 className="mt-7 text-display-l">
                <WipeWords lines={["LPG at", "commercial scale."]} />
              </h1>

              <p
                className="mt-9 max-w-lg text-body-l text-fg-bone-muted"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                Bulk LPG supply, road tanker haulage and storage planning for
                off-takers, plants, hospitality, food production and industrial
                operations across Nigeria.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-3"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                <Link href="/#app" className="btn btn-flame">
                  Get the app
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Talk to our supply team
                </Link>
              </div>
            </div>

            <div className="reveal hero-parallax-slow">
              <div
                className="on-ink rounded-2xl"
                style={{ "--i": 6 } as React.CSSProperties}
              >
                <LpgInfrastructure />
              </div>
            </div>
          </div>
        </Reveal>

        {/* The readout, then the capability legend under it */}
        <Reveal className="measure relative mt-16 lg:mt-20">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <HeroTelemetry items={HERO_TELEMETRY} />
            </div>
            <div
              className="mt-9 flex flex-wrap items-baseline gap-x-7 gap-y-2 border-t border-bone-line pt-6 text-[0.6875rem] font-medium uppercase tracking-[0.075em] text-fg-bone-muted"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <span className="text-flame-ink">What we handle</span>
              {SUPPLY_MODES.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </HeroCanvas>

      <GlobalGasTicker />

      <AppDownloadSection />

      {/* ───────────────────────── Supply chain (ink) ───────────────────────── */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 62 }} rings={22} tone="ink" opacity={0.55} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="The supply chain"
            title="From landed LPG to the point of use."
            note="Tanker, storage or plant supply"
          />

          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Source and plan" meta="Import, storage and route">
              <p>
                We start with the operating reality: your consumption, storage
                requirement, location and the continuity you need from supply.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="Move what is needed" meta="Road tanker to off-takers and sites">
              <p>
                Bulk LPG moves by road to off-takers, plants and commercial
                sites, contracted by volume and route. Individual purchases are
                not part of this — those happen in the app.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Deliver into operations" meta="Measured delivery and field support">
              <p>
                Our team handles the final connection, delivery checks and
                practical support so the fuel is ready where work happens.
              </p>
            </NumberedRow>
          </Reveal>
        </Reveal>
      </section>

      {/* ───────────────────────── Why us (bone) ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-bone-line py-20 lg:py-28">
        <Burner className="pointer-events-none absolute -right-40 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-30" />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Why Suez Gas"
            title="A larger LPG operation needs more than a refill truck."
          />

          <Reveal className="reveal mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Supply chain behind the sale",
                "Import, bulk distribution and field delivery work together so supply does not stop at the point of sale.",
              ],
              [
                "Storage planned for reality",
                "We help organisations think through capacity, siting and refill cycles before a tank becomes a bottleneck.",
              ],
              [
                "Commercial continuity",
                "Volume, route and scheduling are agreed around the operation that depends on the gas.",
              ],
              [
                "Measured delivery",
                "Bulk movement is planned, metered, documented and checked at handover, so what was ordered is what arrives.",
              ],
              [
                "Field-ready teams",
                "Drivers and installers know the difference between moving LPG and leaving a safe working system behind.",
              ],
              [
                "Off-taker to industrial",
                "Off-takers, hotels, bakeries and industrial sites can work with one LPG partner as demand grows.",
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

      <ProofStrip />

      {/* ───────────────────────── Heritage (bone-2) ───────────────────────── */}
      <section className="relative overflow-hidden bg-bone-2 py-20 lg:py-28">
        <Contours origin={{ x: 106, y: 30 }} rings={20} opacity={0.5} />
        <Reveal className="measure relative">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <PullQuote attribution="Suez Gas Nigeria Limited · RC 1076785 · Incorporated 2012">
                Energy for kitchens, plants and everything between. We make LPG
                supply safer, more dependable and easier to plan at every scale.
              </PullQuote>
            </div>
            <div className="mt-14" style={{ "--i": 1 } as React.CSSProperties}>
              <StatRow
                items={[
                  { label: "Supplying since", value: "2012" },
                  { label: "Registered", value: "RC 1076785" },
                  { label: "Service base", value: "Abuja · Wuse II" },
                  { label: "Bulk movement", value: "Road tanker" },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── Supply CTA (ink) ───────────────────────── */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Burner
          className="pointer-events-none absolute -left-32 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 opacity-35"
          stroke="#f58220"
          strokeOpacity={0.35}
        />
        <Reveal className="measure relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <div>
              <div className="eyebrow">Plan your supply</div>
              <h2 className="mt-7 max-w-2xl text-display-l">
                Put a dependable LPG plan behind your operation.
              </h2>
              <p className="mt-7 max-w-lg text-body-l text-fg-ink-muted">
                Tell us what you consume, where you operate and what continuity
                looks like. We will point you to the right supply route.
                Buying as an individual happens in the app instead.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-flame">
                Talk to supply team
              </Link>
              <Link href="/#app" className="btn btn-ghost">
                Get the app
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <SocialMediaSection />
    </>
  );
}
