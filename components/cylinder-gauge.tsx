"use client";

import { useEffect, useRef, useState } from "react";

const SIZES = [
  { kg: 3, from: "₦16,000" },
  { kg: 6, from: "₦24,000" },
  { kg: 12.5, from: "₦38,000" },
  { kg: 50, from: "₦65,000" },
];
const ACTIVE = 2; // 12.5kg — the domestic default

/**
 * The signature element: a cylinder filling to its rated weight, with the delivery
 * window beside it. Same role the token readout plays on SuezElectric — show the
 * actual product, not an illustration of it.
 */
export function CylinderGauge() {
  const [fill, setFill] = useState(0);
  const size = SIZES[ACTIVE];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFill(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DURATION = 1700;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out-expo, so it rushes then settles like a real fill
      setFill(p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const full = fill > 0.995;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-ink-line bg-ink-2/70 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-ink-line px-5 py-3 text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
        <span className="font-mono tracking-normal">Cylinder {size.kg} kg</span>
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              full ? "bg-flame" : "bg-fg-ink-muted"
            }`}
          />
          {full ? "Filled" : "Filling"}
        </span>
      </div>

      <div className="flex gap-7 px-5 py-7 sm:px-7">
        <Cylinder fill={fill} />

        <div className="min-w-0 flex-1">
          <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
            Net weight
          </div>
          <div className="mt-2 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-flame">
            {(size.kg * fill).toFixed(1)}
            <span className="ml-1.5 font-sans text-base text-fg-ink-muted">kg</span>
          </div>

          <dl className="mt-7 space-y-3.5 border-t border-ink-line pt-5">
            <Row label="Refill from" value={size.from} />
            <Row label="Delivery" value={full ? "Today, by 6pm" : "—"} />
            <Row label="Weighed at" value="Your door" />
          </dl>
        </div>
      </div>

      <p className="border-t border-ink-line px-5 py-3.5 text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted sm:px-7">
        Digital scale on every delivery
      </p>
    </figure>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
        {label}
      </dt>
      <dd className="font-mono text-[0.9375rem] tabular-nums">{value}</dd>
    </div>
  );
}

/**
 * LPG cylinder drawn to real proportions — a 12.5kg domestic bottle is roughly
 * 1:1.6 body width to height, with a domed shoulder, not a slender tube.
 */
function Cylinder({ fill }: { fill: number }) {
  const bodyTop = 110; // top of usable volume, inside the dome
  const bodyBottom = 298;
  const h = bodyBottom - bodyTop;
  const level = bodyBottom - h * fill;

  // 128 wide x 202 tall => 1:1.6, the real proportion of a domestic bottle
  const BODY =
    "M26 158C26 124 54 98 90 98C126 98 154 124 154 158L154 282C154 294 146 300 132 300L48 300C34 300 26 294 26 282Z";

  return (
    <svg
      viewBox="0 0 190 330"
      className="h-56 w-auto shrink-0 sm:h-64"
      aria-label={`Cylinder ${Math.round(fill * 100)} percent full`}
      role="img"
    >
      <defs>
        <clipPath id="cyl-body">
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* Valve stem, handle collar, neck */}
      <path d="M82 22h16v18H82z" className="fill-none stroke-fg-ink-muted" strokeWidth="2" />
      <path
        d="M64 50c0-6 5-10 11-10h30c6 0 11 4 11 10v14H64z"
        className="fill-none stroke-fg-ink-muted"
        strokeWidth="2"
      />
      <path d="M70 64h40v26H70z" className="fill-none stroke-fg-ink-muted" strokeWidth="2" />

      {/* The fill, clipped to the body */}
      <g clipPath="url(#cyl-body)">
        <rect
          x="20"
          y={level}
          width="150"
          height={bodyBottom - level + 14}
          className="fill-flame"
          opacity="0.92"
        />
        {fill > 0.02 && fill < 0.995 && (
          <rect x="20" y={level} width="150" height="2.5" className="fill-flame-lit" />
        )}
      </g>

      {/* Outline last, so it stays crisp over the fill */}
      <path d={BODY} className="fill-none stroke-fg-ink" strokeWidth="2" />

      {/* Graduation scale, clear of the wall so it can be read */}
      {[0.25, 0.5, 0.75, 1].map((g) => {
        const major = g === 0.5 || g === 1;
        return (
          <line
            key={g}
            x1={major ? 158 : 164}
            y1={bodyBottom - h * g}
            x2="176"
            y2={bodyBottom - h * g}
            className="stroke-fg-ink-muted"
            strokeWidth="1"
            strokeOpacity={major ? 0.85 : 0.5}
          />
        );
      })}

      {/* Foot ring */}
      <path
        d="M42 300h96v12a8 8 0 0 1-8 8H50a8 8 0 0 1-8-8z"
        className="fill-none stroke-fg-ink-muted"
        strokeWidth="2"
      />
    </svg>
  );
}
