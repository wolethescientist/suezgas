import { Contours } from "./texture";
import { Reveal, WipeLines } from "./reveal";
import { SITE } from "@/lib/site";

/* Official marks, from Simple Icons. */
const APPLE_PATH =
  "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";
const PLAY_PATH =
  "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z";

export function StoreButtons({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "bone";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <StoreButton
        href={SITE.app.ios}
        tone={tone}
        path={APPLE_PATH}
        kicker="Download on the"
        name="App Store"
      />
      <StoreButton
        href={SITE.app.android}
        tone={tone}
        path={PLAY_PATH}
        kicker="Get it on"
        name="Google Play"
      />
    </div>
  );
}

function StoreButton({
  href,
  path,
  kicker,
  name,
  tone,
}: {
  href: string;
  path: string;
  kicker: string;
  name: string;
  tone: "ink" | "bone";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex cursor-pointer items-center gap-3.5 rounded-full border px-5 py-3 transition-colors duration-200 ${
        tone === "ink"
          ? "border-ink-line text-fg-ink hover:border-flame hover:bg-ink-2"
          : "border-bone-line text-fg-bone hover:border-flame-ink hover:bg-bone-2"
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
        <path d={path} />
      </svg>
      <span className="text-left leading-none">
        <span
          className={`block text-[0.625rem] uppercase tracking-[0.075em] ${
            tone === "ink" ? "text-fg-ink-muted" : "text-fg-bone-muted"
          }`}
        >
          {kicker}
        </span>
        <span className="mt-1 block font-display text-[1.0625rem] leading-none">
          {name}
        </span>
      </span>
    </a>
  );
}

/**
 * A phone rendered entirely in markup — no screenshots to go stale, and the
 * device inherits the site's own palette so it reads as one piece with the
 * page. The screen cross-fades between placing an order and tracking it.
 *
 * Deliberately no naira figures anywhere in here. Gas is priced daily and the
 * app is the only place that knows the real number; a total baked into this
 * mock would be wrong within a week and would start reading as a rate card,
 * which is the exact thing this site no longer carries.
 */
export function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[19rem]">
      {/* Device shell */}
      <div className="relative aspect-[9/19] rounded-[2.75rem] border border-ink-line bg-ink-2 p-[0.6rem] shadow-[0_50px_90px_-40px_rgb(0_0_0/0.9)]">
        {/* Bezel highlight — one hairline of specular light, not a glossy overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-inset ring-white/[0.07]" />

        <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-ink">
          <Contours origin={{ x: 76, y: 12 }} rings={16} tone="ink" opacity={0.5} />

          {/* Status bar */}
          <div className="relative flex items-center justify-between px-5 pt-4 text-[0.625rem] text-fg-ink">
            <span className="font-mono">9:41</span>
            <span className="flex items-center gap-1">
              <Bars />
              <Battery />
            </span>
          </div>

          {/* Notch */}
          <div className="absolute left-1/2 top-2 h-[1.1rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-ink-2" />

          {/* Two states, cross-faded. Fixed height so neither state leaves dead
              space above the tab bar as they swap. */}
          <div className="absolute inset-x-0 bottom-[6.25rem] top-[3.25rem]">
            <div className="phone-screen phone-screen-a absolute inset-0 flex flex-col px-5">
              <ScreenOrder />
            </div>
            <div className="phone-screen phone-screen-b absolute inset-0 flex flex-col px-5">
              <ScreenTrack />
            </div>
          </div>

          {/* Tab bar */}
          <div className="absolute inset-x-0 bottom-0 border-t border-ink-line bg-ink/90 px-5 pb-5 pt-3 backdrop-blur">
            <div className="flex items-center justify-between">
              <Tab label="Gas" active />
              <Tab label="Power" />
              <Tab label="Orders" />
              <Tab label="Account" />
            </div>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-ink-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenOrder() {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[1.375rem] leading-none">Order gas</span>
        <span className="text-[0.625rem] uppercase tracking-[0.075em] text-fg-ink-muted">
          Abuja
        </span>
      </div>

      <div className="mt-6">
        <div className="text-[0.5625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          Deliver to
        </div>
        <div className="mt-1.5 flex items-center justify-between border-b border-ink-line pb-2">
          <span className="text-[0.8125rem]">20 Alexandria Cres, Wuse II</span>
          <span className="text-[0.5625rem] uppercase tracking-[0.075em] text-flame">
            Saved
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[0.5625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          Cylinder size
        </div>
        <div className="mt-2 flex gap-1.5">
          {["3", "6", "12.5", "25"].map((kg) => (
            <span
              key={kg}
              className={`flex-1 rounded-full border py-1.5 text-center font-mono text-[0.625rem] ${
                kg === "12.5"
                  ? "border-flame bg-flame/10 text-flame"
                  : "border-ink-line text-fg-ink-muted"
              }`}
            >
              {kg}
            </span>
          ))}
        </div>
      </div>

      {/* The weigh-at-the-door promise, which is the actual differentiator */}
      <div className="mt-5 rounded-2xl border border-ink-line bg-ink-2/60 px-4 py-3.5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[0.5625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
              Refill
            </div>
            <div className="mt-1 font-display text-[1.75rem] leading-none text-flame">
              12.5
              <span className="ml-1 font-sans text-[0.75rem] text-fg-ink-muted">kg</span>
            </div>
          </div>
          <div className="text-right text-[0.5625rem] uppercase leading-relaxed tracking-[0.075em] text-fg-ink-muted">
            Weighed
            <br />
            at your door
          </div>
        </div>
      </div>

      {/* Without this the screen had a dead band between the refill card and
          the button, which read as an unfinished mock rather than a real one. */}
      <div className="mt-5">
        <div className="text-[0.5625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          Delivery window
        </div>
        <div className="mt-2 flex gap-1.5">
          {["Today", "Tomorrow", "Pick a day"].map((w) => (
            <span
              key={w}
              className={`flex-1 rounded-full border py-1.5 text-center text-[0.625rem] ${
                w === "Today"
                  ? "border-flame bg-flame/10 text-flame"
                  : "border-ink-line text-fg-ink-muted"
              }`}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-full bg-flame py-3 text-center text-[0.6875rem] font-medium uppercase tracking-[0.055em] text-ink">
        Confirm order
      </div>
    </>
  );
}

function ScreenTrack() {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[1.375rem] leading-none">On the way</span>
        <span className="flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.075em] text-flame">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          Live
        </span>
      </div>

      <div className="mt-auto grid place-items-center">
        <FlameSeal />
      </div>

      <div className="mt-7 text-center">
        <div className="text-[0.5625rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          Arriving
        </div>
        <div className="mt-2 font-display text-[1.5rem] leading-none">
          Today, 4–6 pm
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-ink-line pt-4 text-center">
        {[
          ["Size", "12.5 kg"],
          ["Driver", "Musa"],
          ["Checks", "03"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[0.5625rem] uppercase tracking-[0.075em] text-fg-ink-muted">
              {k}
            </dt>
            <dd className="mt-1 text-[0.75rem]">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto rounded-full border border-ink-line py-3 text-center text-[0.6875rem] font-medium uppercase tracking-[0.055em]">
        Track delivery
      </div>
    </>
  );
}

/** The flame from the logo, redrawn as a confirmation seal. */
function FlameSeal() {
  return (
    <div className="relative grid h-24 w-24 place-items-center">
      <span className="absolute inset-0 rounded-full border border-flame/25" />
      <span className="absolute inset-3 rounded-full border border-flame/40" />
      <svg viewBox="0 0 24 24" className="relative h-9 w-9 fill-flame" aria-hidden="true">
        <path d="M13.1 1.6c.5 3.4-.7 5.3-2.4 7C9 10.3 7 11.9 6.3 15a6.4 6.4 0 0 0 3.3 6.9c-.7-1.6-.8-3.3.2-4.8.9-1.4 2.6-2.3 3-4.4 1.1 1.4 1.7 2.7 1.7 4.2 1-.9 1.6-2.1 1.7-3.5 1.6 1.7 2.3 3.6 1.9 5.5a6.5 6.5 0 0 0 2.6-6.3c-.5-3.3-2.8-4.9-4.9-7-1.4-1.4-2.5-2.9-2.7-4z" />
      </svg>
    </div>
  );
}

function Tab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={`flex flex-col items-center gap-1.5 text-[0.5rem] uppercase tracking-[0.075em] ${
        active ? "text-flame" : "text-fg-ink-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-flame" : "bg-current opacity-50"}`}
      />
      {label}
    </span>
  );
}

function Bars() {
  return (
    <svg viewBox="0 0 18 10" aria-hidden="true" className="h-2 w-3.5 fill-current">
      <rect x="0" y="6" width="3" height="4" rx="1" />
      <rect x="5" y="4" width="3" height="6" rx="1" />
      <rect x="10" y="2" width="3" height="8" rx="1" />
      <rect x="15" y="0" width="3" height="10" rx="1" opacity="0.4" />
    </svg>
  );
}

function Battery() {
  return (
    <svg viewBox="0 0 26 12" aria-hidden="true" className="h-2.5 w-5">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="3"
        className="fill-none stroke-current"
        strokeOpacity="0.5"
      />
      <rect x="2.5" y="2.5" width="14" height="7" rx="1.5" className="fill-current" />
      <path d="M23 4v4a2 2 0 0 0 0-4z" className="fill-current" opacity="0.5" />
    </svg>
  );
}

/**
 * The full home-page section, and the only place on this site that leads to a
 * purchase. Everything the website used to do — the order form, the rate card,
 * the "request delivery" buttons — now ends here.
 */
export function AppDownloadSection() {
  return (
    <section
      id="app"
      className="on-ink relative overflow-hidden border-y border-ink-line py-20 lg:py-28"
    >
      <Contours origin={{ x: 18, y: 46 }} rings={28} tone="ink" opacity={0.7} />

      <Reveal className="measure relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="reveal">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              iOS &amp; Android
            </div>

            <h2 className="mt-6 text-display-l" style={{ "--i": 1 } as React.CSSProperties}>
              <WipeLines lines={["Buying gas", "happens here."]} />
            </h2>

            <p
              className="mt-7 max-w-md text-body-l text-fg-ink-muted"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              Suez Gas supplies LPG in bulk — we do not sell retail. If you
              are buying gas as an individual, that happens in the{" "}
              {SITE.app.name} app, the same one the group uses for prepaid
              electricity.
            </p>

            <ul className="mt-9 max-w-md" style={{ "--i": 4 } as React.CSSProperties}>
              {[
                ["Order in two taps", "Saved address and cylinder size, no re-entry"],
                ["Current price, always", "Gas moves daily — the app shows today's, not last month's"],
                ["Track the delivery", "Driver, window and the weight confirmed at your door"],
              ].map(([title, body]) => (
                <li key={title} className="border-t border-ink-line py-4">
                  <div className="text-[0.9375rem]">{title}</div>
                  <div className="mt-1 text-[0.8125rem] text-fg-ink-muted">{body}</div>
                </li>
              ))}
            </ul>

            <StoreButtons className="mt-9" />

            <p
              className="mt-7 text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted"
              style={{ "--i": 6 } as React.CSSProperties}
            >
              Buying in volume? Bulk supply, haulage and storage planning are
              arranged with our team —{" "}
              <a href={SITE.phone.href} className="link-slide text-fg-ink">
                {SITE.phone.display}
              </a>
            </p>
          </div>

          <div className="reveal">
            <div style={{ "--i": 5 } as React.CSSProperties}>
              <PhoneMock />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
