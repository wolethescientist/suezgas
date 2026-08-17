import Link from "next/link";
import { Contours, Burner } from "./texture";
import { Logo } from "./logo";

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

      {/* Oversized lockup with the burner plate behind it */}
      <div className="relative border-t border-ink-line">
        <Burner
          className="pointer-events-none absolute -top-24 right-[-7rem] h-[28rem] w-[28rem] opacity-40 sm:right-4"
          stroke="#f58220"
          strokeOpacity={0.3}
        />
        <div className="measure relative py-14 lg:py-16">
          <Logo tone="ink" className="h-auto w-full max-w-2xl" />
        </div>
      </div>

      <div className="measure relative flex flex-col gap-4 py-8 text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} Suez Gas Nigeria Limited · RC 1076785
        </span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
