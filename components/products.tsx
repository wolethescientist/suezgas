import Image from "next/image";
import { Contours } from "./texture";
import { Reveal } from "./reveal";
import { SectionHead } from "./page-parts";
import { photoById } from "@/lib/photos";

/**
 * Hardware and telemetry. The company is not only moving molecules — it sells a
 * regulator that reads its own cylinder, and a monitoring system that reports a
 * tank's level and consumption remotely. Both belong on the site as products in
 * their own right, not footnotes to the supply story.
 *
 * The RMS panel is drawn rather than photographed: there is no product shot of
 * a telemetry service, and a stock dashboard screenshot would be a lie. Built
 * from the same instrument language as the hero diagram.
 */
export function ProductsSection() {
  const srg = photoById("srg");

  return (
    <section
      id="products"
      className="on-ink relative overflow-hidden py-20 lg:py-28"
    >
      <Contours origin={{ x: 108, y: 30 }} rings={24} tone="ink" opacity={0.55} />

      <Reveal className="measure relative">
        <SectionHead
          eyebrow="Products & technology"
          title="Gas you can see, and usage you can measure."
          note="Hardware · telemetry"
        />

        <Reveal className="reveal mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Suez SRG ─────────────────────────────────────────────── */}
          <div style={{ "--i": 0 } as React.CSSProperties}>
            {srg && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-line bg-white">
                <Image
                  src={`/photos/${srg.file}`}
                  alt={srg.alt}
                  width={srg.width}
                  height={srg.height}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="absolute inset-0 h-full w-full object-contain p-4"
                />
              </div>
            )}

            <div className="mt-7">
              <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-flame">
                Our own product
              </div>
              <h3 className="mt-3 text-display-s">Suez SRG smart gas regulator</h3>
              <p className="mt-4 max-w-md text-fg-ink-muted">
                A low-pressure regulator with the gauge built in. The dial reads
                the cylinder&rsquo;s contents at a glance, so a kitchen knows it
                is into the reserve before service — not halfway through it.
              </p>

              <dl className="mt-7 border-t border-ink-line">
                {[
                  ["Contents dial", "Full, low and reserve, read without tools"],
                  ["Leak check", "A dedicated position on the same dial"],
                  ["Fits", "Standard cylinder valves, domestic and commercial"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-ink-line py-3.5">
                    <dt className="text-[0.9375rem]">{k}</dt>
                    <dd className="mt-1 text-[0.8125rem] text-fg-ink-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ── RMS ──────────────────────────────────────────────────── */}
          <div style={{ "--i": 1 } as React.CSSProperties}>
            <RmsPanel />

            <div className="mt-7">
              <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-flame">
                Remote monitoring
              </div>
              <h3 className="mt-3 text-display-s">RMS &mdash; usage and telemetry</h3>
              <p className="mt-4 max-w-md text-fg-ink-muted">
                Tank-level telemetry for sites that cannot afford to find out
                they are empty. Level, consumption rate and a refill forecast,
                reported continuously instead of checked by eye on a Friday.
              </p>

              <dl className="mt-7 border-t border-ink-line">
                {[
                  ["Level and draw-down", "Continuous, per vessel, with history"],
                  ["Refill forecast", "Days to reserve at the current rate"],
                  ["Alerts", "Threshold and abnormal-consumption warnings"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-ink-line py-3.5">
                    <dt className="text-[0.9375rem]">{k}</dt>
                    <dd className="mt-1 text-[0.8125rem] text-fg-ink-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Reveal>
    </section>
  );
}

/** Sample consumption, in the shape a week of a working kitchen actually makes. */
const DRAW = [58, 62, 49, 71, 66, 80, 44, 69, 74, 61, 88, 72, 65, 79];

/**
 * The RMS readout, drawn to match the hero diagram rather than mocked from a
 * screenshot. Every figure here is illustrative and reads as an instrument,
 * not as a claim about a specific customer's tank.
 */
function RmsPanel() {
  const level = 0.42;
  const max = Math.max(...DRAW);
  const points = DRAW.map((v, i) => {
    const x = (i / (DRAW.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-line bg-ink-2 p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgb(245_130_32/0.08),transparent_36%)]"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-baseline justify-between text-[0.625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          <span>RMS · Bulk vessel 01</span>
          <span className="flex items-center gap-1.5 text-flame">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            Reporting
          </span>
        </div>

        {/* Level bar */}
        <div className="mt-6">
          <div className="flex items-end justify-between">
            <div className="font-display text-[2.5rem] leading-none text-fg-ink">
              {Math.round(level * 100)}
              <span className="ml-1 font-sans text-[0.875rem] text-fg-ink-muted">
                % level
              </span>
            </div>
            <div className="text-right text-[0.625rem] uppercase leading-relaxed tracking-[0.075em] text-fg-ink-muted">
              9 days
              <br />
              to reserve
            </div>
          </div>

          <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-ink">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-flame"
              style={{ width: `${level * 100}%` }}
            />
            {/* Reserve threshold, where the alert fires */}
            <div className="absolute inset-y-0 left-[20%] w-px bg-fg-ink-muted" />
          </div>
          <div className="mt-2 flex justify-between text-[0.5625rem] uppercase tracking-[0.075em] text-fg-ink-muted">
            <span>Empty</span>
            <span>Reserve</span>
            <span>Full</span>
          </div>
        </div>

        {/* The two figures an operator checks before anything else */}
        <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-ink-line pt-5">
          {[
            ["Draw rate", "68 kg/day"],
            ["Last read", "4 min ago"],
            ["Alerts", "None"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.5625rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                {k}
              </dt>
              <dd className="mt-1.5 font-mono text-[0.8125rem] text-fg-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Consumption trace */}
        <div className="mt-auto pt-6">
          <div className="text-[0.5625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
            Daily draw-down · 14 days
          </div>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="mt-2 h-16 w-full"
          >
            <polyline
              points={points}
              fill="none"
              stroke="#f58220"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
