import Link from "next/link";
import Image from "next/image";
import { Burner } from "./texture";
import { Reveal, WipeLines } from "./reveal";
import { photoById } from "@/lib/photos";
import { SITE } from "@/lib/site";

/**
 * The human section. The rest of the home page is instruments, contour fields
 * and telemetry — deliberately cool. This is the one place that talks like a
 * person, with a face in it, and it hands off to the full About page rather
 * than trying to tell the whole story here.
 */
export function AboutStrip() {
  const photo = photoById("team");

  return (
    <section className="relative overflow-hidden border-b border-bone-line py-20 lg:py-28">
      <Burner className="pointer-events-none absolute -left-48 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-25" />

      <Reveal className="measure relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {photo && (
            <div className="reveal order-2 lg:order-1">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-bone-line bg-bone-2"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <Image
                  src={`/photos/${photo.file}`}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgb(245_130_32/0.10),transparent_45%)]"
                />
              </div>
              {photo.credit && (
                <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
                  {photo.credit}
                </p>
              )}
            </div>
          )}

          <div className="reveal order-1 lg:order-2">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Who we are
            </div>

            <h2 className="mt-6 text-display-m" style={{ "--i": 1 } as React.CSSProperties}>
              <WipeLines lines={["There are people", "behind the pressure gauge."]} />
            </h2>

            <div
              className="mt-7 max-w-lg space-y-4 text-body-l text-fg-bone-muted"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <p>
                We started in {SITE.founded} with a truck and a small book of
                customers in Abuja. What we learned early is that nobody actually
                wants gas — they want the kitchen to open, the ovens to run, the
                plant not to stop.
              </p>
              <p>
                So we built the business around that instead: supply you can
                plan, equipment that tells you where you stand, and a number that
                a person picks up when something goes wrong.
              </p>
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-3"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              <Link href="/about" className="btn btn-flame">
                Read our story
              </Link>
              <a href={SITE.phone.href} className="btn btn-ghost">
                {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
