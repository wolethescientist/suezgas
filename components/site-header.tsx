"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./logo";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/safety", label: "Safety" },
  { href: "/contact", label: "Contact" },
];

/** Where the pill's own vertical middle sits, measured from the top of the viewport. */
const HEADER_MID = 44;

/**
 * Reports whether the section currently passing under the header is an ink one.
 * The bar floats over both canvases, and a bone pill over a black section was
 * reading as a muddy grey slab with barely legible links.
 *
 * A rect read on a handful of sections per frame is cheaper than the
 * IntersectionObserver band this replaced, which needed rebuilding on every
 * resize to keep its root a one-pixel line.
 */
function useSectionTone() {
  const [tone, setTone] = useState<"bone" | "ink">("bone");
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let sections: HTMLElement[] = [];

    /**
     * Resolved lazily, not once at effect time. The header renders above
     * `<main>`, so this effect can commit before the route's sections are in
     * the DOM — snapshotting there caught an empty list and pinned the bar to
     * bone for the life of the page. Re-queries whenever the cache is empty or
     * its nodes have been detached by a client-side navigation.
     */
    const currentSections = () => {
      if (sections.length === 0 || !sections[0].isConnected) {
        sections = Array.from(document.querySelectorAll<HTMLElement>(".on-ink"));
      }
      return sections;
    };

    const measure = () => {
      frame = 0;
      const over = currentSections().some((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top <= HEADER_MID && bottom >= HEADER_MID;
      });
      setTone(over ? "ink" : "bone");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return tone;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tone = useSectionTone();
  const onInk = tone === "ink";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const muted = onInk ? "text-fg-ink-muted hover:text-fg-ink" : "text-fg-bone-muted hover:text-fg-bone";

  return (
    <>
      {/* The pill floats clear of the viewport edge, and content used to scroll
          visibly through the sliver above it. This is the shield — tone-matched,
          and only present once there is something to hide. */}
      <div
        aria-hidden="true"
        className="header-scrim"
        data-tone={tone}
        data-visible={scrolled}
      />

      <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5">
        <div
          className={`mx-auto flex w-full max-w-[88rem] items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,padding] duration-500 sm:pl-7 sm:pr-2.5 ${
            scrolled
              ? onInk
                ? "border-ink-line bg-ink/85 py-2 backdrop-blur-xl"
                : "border-bone-line bg-bone/85 py-2 backdrop-blur-xl"
              : "border-transparent bg-transparent py-3.5"
          }`}
        >
          <Wordmark tone={tone} priority />

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-slide text-[0.6875rem] font-medium uppercase tracking-[0.09em] transition-colors duration-200 ${
                    active ? (onInk ? "text-flame" : "text-flame-ink") : muted
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE.phone.href}
              className={`hidden text-[0.6875rem] font-medium uppercase tracking-[0.09em] transition-colors duration-200 sm:block ${muted}`}
            >
              0816 800 3677
            </a>
            <Link href="/order" className="btn btn-flame hidden sm:inline-flex">
              Order gas
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition-colors duration-200 lg:hidden ${
                onInk
                  ? "border-ink-line hover:bg-ink-2"
                  : "border-bone-line hover:bg-bone-2"
              }`}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-full transition-all duration-300 ${
                    onInk ? "bg-fg-ink" : "bg-fg-bone"
                  } ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-full transition-all duration-300 ${
                    onInk ? "bg-fg-ink" : "bg-fg-bone"
                  } ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-3xl border-bone-line bg-bone/95 backdrop-blur-xl transition-[max-height,opacity,margin] duration-500 lg:hidden ${
            open ? "mt-2 max-h-[32rem] border opacity-100" : "mt-0 max-h-0 border-0 opacity-0"
          }`}
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex w-full max-w-[88rem] flex-col px-4 py-4 sm:px-6"
          >
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline justify-between border-b border-bone-line py-4 font-display text-2xl transition-colors duration-200 last:border-0 hover:text-flame-ink"
              >
                {item.label}
                <span className="text-[0.6875rem] text-fg-bone-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
            <div className="mt-5 flex gap-3">
              <Link href="/order" className="btn btn-flame flex-1">
                Order gas
              </Link>
              <a href={SITE.phone.href} className="btn btn-ghost flex-1">
                Call
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
