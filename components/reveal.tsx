"use client";

import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/** Default true so a WipeLines used outside a Reveal renders visible, not hidden. */
const RevealCtx = createContext(true);

const ENTRANCE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * The wipe transforms are written inline from React state, so the stylesheet's
 * reduced-motion block can never reach them — inline always wins. The guard has
 * to live here, at the one place both wipe components read from.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Adds the entrance state for its subtree. IntersectionObserver instead of a motion
 * library — the whole system is a few dozen lines and ships no runtime.
 *
 * Children stagger via CSS (`.reveal-hidden > *`), applied by a class that is
 * REMOVED to reveal, so nothing has to out-specify anything. Headlines go through
 * WipeLines/WipeWords, which read this context and write inline styles — that path
 * is immune to stylesheet ordering entirely.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  /** Fires on load — for above-the-fold content that shouldn't wait on scroll */
  immediate = false,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setInView(true);
    };

    if (immediate) {
      // One paint with the hidden state, then reveal. rAF gets there on the next
      // frame when visible — but rAF is SUSPENDED in a hidden or background tab,
      // which would leave the hero invisible until focus. The timer backs it up;
      // whichever fires first wins.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(fire);
      });
      const timer = setTimeout(fire, 120 + delay);
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        clearTimeout(timer);
      };
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fire();
          io.disconnect(); // reveal once, never re-animate on scroll back
        }
      },
      // Fire as the section's leading edge approaches, not once a sixth of it
      // is already on screen. A tall section under the old 0.15/-8% pair could
      // fill the viewport while still fully transparent, which read as a blank
      // screen on a fast scroll.
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate, delay]);

  return (
    <RevealCtx.Provider value={inView}>
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={`${className}${inView ? "" : " reveal-hidden"}`}
      >
        {children}
      </Tag>
    </RevealCtx.Provider>
  );
}

/**
 * Heading whose lines wipe up from a clipped baseline, staggered.
 * Transform is inline and driven by React state, so no stylesheet can override it.
 */
export function WipeLines({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  const inView = useContext(RevealCtx);
  const reduced = usePrefersReducedMotion();
  const settled = inView || reduced;

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`wipe ${className}`}>
          <span
            style={{
              display: "block",
              transform: settled ? "none" : "translate3d(0, 105%, 0)",
              transition: reduced ? undefined : `transform 620ms ${ENTRANCE}`,
              transitionDelay: reduced ? undefined : `${i * 60}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * Headline set word by word rather than line by line. Each word rises from the
 * clipped baseline on a slight rotation, so the line assembles like type being
 * locked into a press rather than a block sliding up.
 *
 * The stagger runs across the whole headline, not per line, which keeps the
 * rhythm even when the lines have different word counts.
 */
export function WipeWords({
  lines,
  className = "",
  /** ms between consecutive words */
  stagger = 52,
}: {
  lines: string[];
  className?: string;
  stagger?: number;
}) {
  const inView = useContext(RevealCtx);
  const reduced = usePrefersReducedMotion();
  const settled = inView || reduced;

  let word = 0;

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`wipe ${className}`}>
          {line.split(" ").map((text, j) => {
            const delay = word++ * stagger;
            return (
              // The separating space sits OUTSIDE the inline-block — inside it
              // collapses against the box edge and the words run together.
              <Fragment key={j}>
                <span
                  className="wipe-word"
                  style={{
                    transform: settled
                      ? "none"
                      : "translate3d(0, 110%, 0) rotate(4deg)",
                    transition: reduced
                      ? undefined
                      : `transform 720ms ${ENTRANCE}`,
                    transitionDelay: reduced ? undefined : `${delay}ms`,
                  }}
                >
                  {text}
                </span>{" "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </>
  );
}
