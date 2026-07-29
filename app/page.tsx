import Link from "next/link";
import { Burner, Contours } from "@/components/texture";
import { Reveal, WipeLines } from "@/components/reveal";
import { CylinderGauge } from "@/components/cylinder-gauge";
import { NumberedRow, PullQuote, SectionHead, StatRow } from "@/components/page-parts";

const SIZES = ["3 kg", "6 kg", "12.5 kg", "25 kg", "50 kg", "Bulk / tanker"];

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── Hero (bone) ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-bone-line pb-14 pt-32 sm:pt-40 lg:pb-20 lg:pt-48">
        <Contours origin={{ x: 74, y: 34 }} rings={32} />
        <div className="bloom" />

        <Reveal className="measure relative" immediate>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.85fr] lg:items-center lg:gap-16">
            <div className="reveal">
              <h1 className="text-display-xl">
                <WipeLines lines={["Gas that", "arrives full."]} />
              </h1>

              <p
                className="mt-9 max-w-lg text-body-l text-fg-bone-muted"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                Order a refill, and it reaches your door the same day — weighed
                in front of you on a digital scale. No half-filled cylinders, no
                guessing what you paid for.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-3"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                <Link href="/order" className="btn btn-flame">
                  Order gas
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See prices
                </Link>
              </div>
            </div>

            <div className="reveal">
              <div
                className="on-ink rounded-2xl"
                style={{ "--i": 6 } as React.CSSProperties}
              >
                <CylinderGauge />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sizes, as a gauge scale rather than a product grid */}
        <div className="measure relative mt-16 lg:mt-20">
          <div className="rule-ticks" />
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2 pt-6 text-[0.6875rem] font-medium uppercase tracking-[0.075em] text-fg-bone-muted">
            <span className="text-flame-ink">Cylinder sizes</span>
            {SIZES.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── How ordering works (ink) ───────────────────────── */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 62 }} rings={22} tone="ink" opacity={0.55} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Three steps, one day"
            title="From request to a full cylinder."
            note="Abuja and surrounding estates"
          />

          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Submit a request" meta="Online, phone or WhatsApp">
              <p>
                Tell us the cylinder size and where you are. If you do not own a
                cylinder yet, we will bring one.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="We confirm it" meta="A person, not an autoresponder">
              <p>
                A customer care representative calls to confirm the size, the
                price on the day and your delivery window before anything moves.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Weighed at your door" meta="Digital scale, every delivery">
              <p>
                Our driver fills or swaps your cylinder and weighs it in front of
                you. You pay for the kilograms you actually receive.
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
            title="Short-measured cylinders are the industry's oldest trick."
          />

          <Reveal className="reveal mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Weighed in front of you",
                "A fully charged digital scale on every vehicle. You see the number before you pay it.",
              ],
              [
                "Doorstep pick-up and return",
                "We collect the empty and bring it back filled, on our own vehicles and our own schedule.",
              ],
              [
                "Trained, equipped drivers",
                "Field staff carry safety equipment and know how to handle a leaking valve — not just how to drive.",
              ],
              [
                "Domestic and commercial",
                "The same service for a one-bedroom flat and for a bakery running ovens all day.",
              ],
              [
                "Around-the-clock support",
                "Requests, complaints and feedback answered on the phone line and on WhatsApp.",
              ],
              [
                "Competitive on price",
                "Direct import and bulk haulage through the group keeps the per-kilogram price honest.",
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

      {/* ───────────────────────── Heritage (bone-2) ───────────────────────── */}
      <section className="relative overflow-hidden bg-bone-2 py-20 lg:py-28">
        <Contours origin={{ x: 106, y: 30 }} rings={20} opacity={0.5} />
        <Reveal className="measure relative">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <PullQuote attribution="Suez Gas Nigeria Limited · RC 1076785 · Incorporated 2012">
                Our mission is to make domestic LPG use a safer and easier
                experience for everyone. Fourteen years on the same Abuja
                streets is how we know what that actually requires.
              </PullQuote>
            </div>
            <div className="mt-14" style={{ "--i": 1 } as React.CSSProperties}>
              <StatRow
                items={[
                  { label: "Supplying since", value: "2012" },
                  { label: "Cylinder range", value: "3–50 kg" },
                  { label: "Delivery window", value: "Same day" },
                  { label: "Scale on every van", value: "Digital" },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── Order CTA (ink) ───────────────────────── */}
      <section className="on-ink relative overflow-hidden py-20 lg:py-28">
        <Burner
          className="pointer-events-none absolute -left-32 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 opacity-35"
          stroke="#f58220"
          strokeOpacity={0.35}
        />
        <Reveal className="measure relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <div>
              <div className="eyebrow">Order today</div>
              <h2 className="mt-7 max-w-2xl text-display-l">
                Tell us the size. We will handle the rest.
              </h2>
              <p className="mt-7 max-w-lg text-body-l text-fg-ink-muted">
                Requests placed before mid-afternoon are normally delivered the
                same day, anywhere in the Abuja metropolis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/order" className="btn btn-flame">
                Order gas
              </Link>
              <a href="tel:+2348168003677" className="btn btn-ghost">
                0816 800 3677
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
