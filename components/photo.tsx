import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/photos";
import { availablePhotos } from "@/lib/photos";
import { Reveal } from "./reveal";
import { SectionHead } from "./page-parts";

/**
 * A single photograph, framed the way the drawn panels are — same radius, same
 * hairline, same ink plate — so a photo dropped into this site reads as part of
 * the system rather than something pasted on top of it.
 */
export function Photo({
  photo,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: {
  photo: PhotoData;
  priority?: boolean;
  sizes?: string;
}) {
  if (!photo.file) return null;

  return (
    <figure className="group">
      {/* The frame owns the ratio, not the file. Source photographs never
          share an aspect ratio, and letting them through unequalised left the
          captions in a 3-up row sitting on three different baselines. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-line bg-ink-2">
        <Image
          src={`/photos/${photo.file}`}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        {/* Warms the photograph into the palette without washing it out. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgb(245_130_32/0.10),transparent_45%)]"
        />
      </div>

      <figcaption className="mt-5 border-t border-current/15 pt-4">
        <div className="flex items-baseline justify-between gap-4 text-[0.6875rem] uppercase tracking-[0.09em]">
          <span className="opacity-60">{photo.meta}</span>
          {/* Present only while this is a library image. Small, but stated —
              a stock photo passed off as the company's own equipment is worse
              than no photograph at all. */}
          {photo.credit && (
            <span className="shrink-0 opacity-40">{photo.credit}</span>
          )}
        </div>
        <p className="mt-2 text-[0.9375rem] opacity-80">{photo.caption}</p>
      </figcaption>
    </figure>
  );
}

/**
 * The proof band. Renders only when there are real photographs to show — an
 * empty manifest collapses the whole section rather than shipping placeholders.
 */
export function ProofStrip() {
  const photos = availablePhotos();
  if (photos.length === 0) return null;

  return (
    <section className="on-ink relative overflow-hidden py-20 lg:py-28">
      <Reveal className="measure relative">
        <SectionHead
          eyebrow="How LPG moves"
          title="What sits behind a delivery."
          note={`${String(photos.length).padStart(2, "0")} · Abuja`}
        />

        <Reveal className="reveal mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {photos.map((photo, i) => (
            <div key={photo.id} style={{ "--i": i } as React.CSSProperties}>
              <Photo photo={photo} priority={i === 0} />
            </div>
          ))}
        </Reveal>
      </Reveal>
    </section>
  );
}
