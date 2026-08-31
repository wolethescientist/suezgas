import Image from "next/image";
import Link from "next/link";
import logoOnInk from "@/public/logo-dark.png";
import logoOnBone from "@/public/logo.png";
import compactOnInk from "@/public/logo-dark-compact.png";
import compactOnBone from "@/public/logo-compact.png";

/**
 * The real Suez Gas lockup. The supplied artwork sets "es" and the flame highlight in
 * black, so the ink variant carries those in bone instead. Both are transparent PNGs
 * derived from the original file — same letterforms, recoloured for the canvas.
 */
export function Logo({
  tone = "bone",
  className = "h-9 w-auto",
  priority = false,
  /**
   * The full lockup carries the "...providing your convenient energy" microtext,
   * which is illegible below roughly 200px wide. Small placements get the compact
   * cut with that line removed rather than rendering it as mush.
   */
  compact = false,
  sizes = "(max-width: 640px) 160px, 220px",
}: {
  tone?: "bone" | "ink";
  className?: string;
  priority?: boolean;
  compact?: boolean;
  /**
   * Must be at least as wide as the largest place this renders. The old value
   * claimed 260px for a lockup the footer was drawing at 672px, so Next served
   * a 168px file into it — the source artwork is 416px and was never the
   * problem. Nothing on the site now draws this above ~220px.
   */
  sizes?: string;
}) {
  const src = compact
    ? tone === "ink"
      ? compactOnInk
      : compactOnBone
    : tone === "ink"
      ? logoOnInk
      : logoOnBone;

  return (
    <Image
      src={src}
      alt="Suez Gas Nigeria"
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}

export function Wordmark({
  tone = "bone",
  priority = false,
}: {
  tone?: "bone" | "ink";
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Suez Gas Nigeria — home"
      className="group flex items-center gap-3"
    >
      <Logo tone={tone} compact className="h-7 w-auto sm:h-9" priority={priority} />
      <span
        className={`hidden text-[0.5625rem] uppercase tracking-[0.16em] opacity-55 transition-opacity duration-300 group-hover:opacity-100 lg:block ${
          tone === "ink" ? "text-fg-ink-muted" : "text-fg-bone-muted"
        }`}
      >
        RC 1076785
      </span>
    </Link>
  );
}
