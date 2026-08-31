/**
 * The photo manifest.
 *
 * Every illustration on this site is drawn. That is a deliberate look, but a
 * hotel buying three months of gas wants to see a truck, a plant and a person
 * before they sign — one real photograph of the operation does more for that
 * decision than the entire SVG system.
 *
 * ── ABOUT THE CURRENT IMAGES ─────────────────────────────────────────────
 * The three shots below are LIBRARY PHOTOGRAPHS, not Suez Gas equipment.
 * They are stand-ins until real ones exist, and everything about how they are
 * presented follows from that single fact:
 *
 *   · `credit` is set, so the page renders a visible source line. A stock
 *     photo captioned as your own fleet is the one thing that would genuinely
 *     damage the credibility this section exists to build.
 *   · Captions describe the PRACTICE ("bulk LPG moves by road tanker"), never
 *     possession ("our tanker"). Read every replacement caption against that.
 *   · Frames with a competitor's branding, foreign-language signage or an
 *     unsafe working practice were rejected. Hold that line on any swap.
 *
 * Replacing one with a real photograph means: drop the file in /public/photos,
 * point `file` at it, delete `credit`, and rewrite the caption in the first
 * person. That is the whole job, and it is worth doing.
 *
 * HOW TO ADD ONE
 *   1. Put the file in /public/photos (see the README there for the shot list
 *      and the sizes to export at).
 *   2. Set `file` below to its name and fill in the real pixel dimensions.
 *   3. Write an `alt` that describes what is happening, and a `caption` that
 *      says something a customer could not have guessed from the picture.
 *
 * An entry whose `file` is null renders nothing at all — the section it belongs
 * to collapses. Nothing ever ships as a grey placeholder box.
 */

export type Photo = {
  id: string;
  /** Filename inside /public/photos, or null until the real shot exists. */
  file: string | null;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Small instrument-style label above the caption. */
  meta: string;
  /**
   * Source line for a library photograph. Present ONLY while the image is not
   * Suez Gas equipment — delete it the moment a real shot takes its place.
   */
  credit?: string;
};

export const PHOTOS: Photo[] = [
  {
    id: "haulage",
    file: "haulage.jpg",
    width: 1600,
    height: 1231,
    alt: "The rear of a road tanker, showing the transfer pump, hose connections and access ladder.",
    caption:
      "Bulk LPG moves by road tanker. Volume, route and delivery window are agreed before a truck is loaded.",
    meta: "Bulk haulage",
    credit: "Library photograph · Pexels",
  },
  {
    id: "cylinders",
    file: "cylinders.jpg",
    width: 1600,
    height: 1067,
    alt: "Rows of LPG cylinders racked and secured on the bed of a distribution vehicle.",
    caption:
      "Cylinder distribution runs on a refill cycle: racked, secured, delivered, and weighed at the door.",
    meta: "Cylinder distribution",
    credit: "Library photograph · Pexels",
  },
  {
    id: "terminal",
    file: "terminal.jpg",
    width: 1600,
    height: 1076,
    alt: "A storage and processing terminal at dusk, with a road tanker loading in the foreground.",
    caption:
      "Storage sized to the operation that depends on it, not to whatever tank happened to be available.",
    meta: "Storage & supply",
    credit: "Library photograph · Pexels",
  },

  /* ── Not yet shot. These stay null until real files exist — see the README.
     The weighing shot is the highest-value photograph on the whole site: it is
     the only one that can evidence a claim the site makes in three places. */
  {
    id: "weighing",
    file: null,
    width: 1600,
    height: 1200,
    alt: "A Suez Gas driver weighing a customer's cylinder on a digital scale at the point of delivery.",
    caption:
      "Every cylinder is weighed in front of the customer, on a digital scale carried on the vehicle.",
    meta: "Measured delivery",
  },
];

/** Only the entries that have a real file behind them. */
export const availablePhotos = () => PHOTOS.filter((p) => p.file !== null);

export const photoById = (id: string) =>
  PHOTOS.find((p) => p.id === id && p.file !== null);
