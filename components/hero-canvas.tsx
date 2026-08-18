"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./reveal";

/**
 * The hero shell. Its whole job is to make the canvas respond to the person
 * looking at it, without shipping a motion library to do it.
 *
 * Heat follows the pointer: this writes --px/--py on the section and CSS paints
 * the radial from there, so the work on the hot path is two numbers a frame.
 * Scroll depth is not here at all — that is native `animation-timeline: view()`
 * in globals.css, which needs no listener.
 *
 * Skipped entirely on touch (no pointer to follow) and under reduced motion.
 */
export function HeroCanvas({
  children,
  className = "",
  /** Equipment plate number, top-right. Reads as instrumentation, not decoration. */
  stamp,
  /** One specular pass on load. Off for pages where the hero is mostly form. */
  sweep = true,
}: {
  children: ReactNode;
  className?: string;
  stamp?: string;
  sweep?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    // A coarse pointer has no hover position to track — the heat would just sit
    // wherever the last tap landed, which reads as a smudge.
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let x = 50;
    let y = 42;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--px", `${x}%`);
      el.style.setProperty("--py", `${y}%`);
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      x = ((event.clientX - box.left) / box.width) * 100;
      y = ((event.clientY - box.top) / box.height) * 100;
      el.dataset.warm = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      el.dataset.warm = "false";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section ref={ref} className={`hero-canvas ${className}`} data-warm="false">
      <div className="hero-heat" aria-hidden="true" />
      {sweep && !reduced && <div className="hero-sweep" aria-hidden="true" />}
      {stamp && (
        <div className="hero-stamp" aria-hidden="true">
          {stamp}
        </div>
      )}
      {children}
    </section>
  );
}

export type TelemetryItem = {
  label: string;
  /** All-digit values count up on load and keep their written width ("04" stays 04). */
  value: string;
  unit?: string;
  /** Puts the pulsing LED beside the label. One per rail, at most. */
  live?: boolean;
};

/**
 * The readout under the hero. Figures that are numbers sweep up to value the way
 * a gauge does; everything else is set in mono and left alone. Replaces the flat
 * label row that was there before — same information, but it now reads as an
 * instrument reporting rather than a caption describing.
 */
export function HeroTelemetry({ items }: { items: TelemetryItem[] }) {
  return (
    <div className="telemetry">
      <div className="rule-ticks" />
      <dl className="telemetry-grid">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="telemetry-label">
              {item.live && <span className="telemetry-led" aria-hidden="true" />}
              {item.label}
            </dt>
            <dd className="telemetry-value">
              <Figure value={item.value} />
              {item.unit && <small>{item.unit}</small>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Figure({ value }: { value: string }) {
  const numeric = /^\d+$/.test(value);
  const reduced = usePrefersReducedMotion();
  // null means "not counting" — render the real figure. That is what the server
  // emits and what a reader without JS keeps, so the number is never wrong.
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!numeric || reduced) return;

    const target = Number(value);
    const DURATION = 1500;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out-cubic: quick off the mark, settles rather than snaps
      setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numeric, reduced, value]);

  if (!numeric) return <>{value}</>;

  // The single frame between the true figure and the start of the sweep is
  // covered by the rail's own fade-in, so it never reads as a flicker.
  const display = shown ?? Number(value);
  return <>{String(display).padStart(value.length, "0")}</>;
}
