"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./logo";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/safety", label: "Safety" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5">
      <div
        className={`mx-auto flex w-full max-w-[88rem] items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,padding] duration-500 sm:pl-7 sm:pr-2.5 ${
          scrolled
            ? "border-bone-line bg-bone/85 py-2 backdrop-blur-xl"
            : "border-transparent bg-transparent py-3.5"
        }`}
      >
        <Wordmark priority />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-slide text-[0.6875rem] font-medium uppercase tracking-[0.09em] transition-colors duration-200 ${
                  active
                    ? "text-flame-ink"
                    : "text-fg-bone-muted hover:text-fg-bone"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+2348168003677"
            className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-fg-bone-muted transition-colors duration-200 hover:text-fg-bone sm:block"
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
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-bone-line transition-colors duration-200 hover:bg-bone-2 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-fg-bone transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-fg-bone transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
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
            <a href="tel:+2348168003677" className="btn btn-ghost flex-1">
              Call
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
