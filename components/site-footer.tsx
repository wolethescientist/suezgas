import Link from "next/link";
import { Contours, Burner } from "./texture";
import { Logo } from "./logo";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/services", label: "Our services" },
      { href: "/safety", label: "Safety" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Order",
    links: [
      { href: "/order", label: "Order gas" },
      { href: "/pricing", label: "Pricing" },
      { href: "/services#haulage", label: "Bulk haulage" },
      { href: "/services#installation", label: "Installation" },
    ],
  },
];

const SOCIALS = [
  { href: "https://www.facebook.com/suezgasnigeria/", label: "Facebook", short: "FB" },
];

export function SiteFooter() {
  return (
    <footer className="on-ink relative overflow-hidden">
      <Contours origin={{ x: 84, y: 88 }} rings={26} tone="ink" opacity={0.55} />

      {/* Instrument strip */}
      <div className="relative border-b border-ink-line">
        <div className="measure grid grid-cols-2 divide-ink-line md:grid-cols-4 md:divide-x">
          {[
            ["Supply modes", "Cylinder + bulk"],
            ["Bulk movement", "Road tanker"],
            ["Every drop", "Digitally weighed"],
            ["Supplying since", "2012"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`py-7 md:px-7 ${i % 2 === 0 ? "pr-4" : "pl-4 md:pl-7"} ${
                i < 2 ? "border-b border-ink-line md:border-b-0" : ""
              } ${i === 0 ? "md:pl-0" : ""}`}
            >
              <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                {label}
              </div>
              <div className="mt-2 font-display text-2xl sm:text-[1.75rem]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="measure relative grid gap-14 py-16 lg:grid-cols-[1.15fr_1.6fr] lg:gap-20 lg:py-20">
        <div>
          <div className="eyebrow">Suez Energy Group</div>
          <p className="mt-6 max-w-sm font-display text-[1.625rem] leading-[1.15] sm:text-[2rem]">
            LPG supply for homes, estates, hotels, bakeries and industrial sites since 2012.
          </p>

          <address className="mt-9 space-y-3 not-italic">
            <FooterContact
              label="Call & WhatsApp"
              value="+234 816 800 3677"
              href="tel:+2348168003677"
            />
            <FooterContact
              label="Email"
              value="info@suezgas.com"
              href="mailto:info@suezgas.com"
            />
            <FooterContact
              label="Office"
              value="20 Alexandria Crescent, Wuse II, Abuja"
            />
          </address>

          <div className="mt-9 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ink-line text-[0.6875rem] tracking-widest text-fg-ink-muted transition-colors duration-200 hover:border-flame hover:text-flame"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-slide text-[0.9375rem] text-fg-ink transition-colors duration-200 hover:text-flame"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
              Also in the group
            </h3>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href="https://suezelectric.com"
                  className="link-slide text-[0.9375rem] transition-colors duration-200 hover:text-flame"
                >
                  SuezElectric
                </a>
                <div className="mt-1 text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                  Prepaid electricity
                </div>
              </li>
              <li className="pt-2">
                <span className="text-[0.9375rem]">Suez Trading International</span>
                <div className="mt-1 text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                  LPG import & bulk haulage
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── End plate ──────────────────────────────────────────────────
          The lockup used to be the 416px logo bitmap stretched past 670px,
          which is the one genuinely soft thing on the site. The mark now sits
          at a size its own pixels can carry, and the OVERSIZED element is the
          company's tagline — set live in Zodiak, so it is sharp at any size and
          finally legible. It reads as brand copy instead of the 8px mush it was
          baked into the artwork at. */}
      <div className="relative border-t border-ink-line">
        <Burner
          className="pointer-events-none absolute -top-28 right-[-8rem] h-[30rem] w-[30rem] opacity-40 sm:right-2"
          stroke="#f58220"
          strokeOpacity={0.3}
        />

        <div className="measure relative py-16 lg:py-20">
          {/* The compact cut, because the full lockup bakes "...providing your
              convenient energy" in as microtype — and that line is now set
              live, at display size, directly beneath it. */}
          <Logo tone="ink" compact className="h-11 w-auto sm:h-12" />

          <p className="mt-10 max-w-[16ch] font-display text-[clamp(2.5rem,7.2vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.03em] sm:max-w-none">
            Providing your{" "}
            <span className="text-flame">convenient energy</span>.
          </p>

          <div className="rule-ticks mt-12" />

          <div className="mt-6 flex flex-col gap-x-10 gap-y-3 text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted sm:flex-row sm:flex-wrap">
            <span>{SITE.legalName}</span>
            <span>{SITE.rc}</span>
            <span>{SITE.address.locality} · Wuse II</span>
            <span>Since {SITE.founded}</span>
          </div>
        </div>
      </div>

      <div className="measure relative flex flex-col gap-4 py-8 text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} Suez Gas Nigeria Limited · RC 1076785
        </span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/privacy" className="link-slide hover:text-flame">
            Privacy
          </Link>
          <span>Abuja · Wuse II</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
            Taking orders
          </span>
        </span>
      </div>
    </footer>
  );
}

function FooterContact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="w-32 shrink-0 text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="link-slide text-[0.9375rem] transition-colors duration-200 hover:text-flame"
        >
          {value}
        </a>
      ) : (
        <span className="text-[0.9375rem] leading-relaxed">{value}</span>
      )}
    </div>
  );
}
