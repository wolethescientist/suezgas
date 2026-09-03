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

  {
    id: "filling",
    file: "filling.jpg",
    width: 2000,
    height: 1124,
    alt: "A technician in full protective coverall and respirator working at the valve gear of bulk LPG storage vessels.",
    caption:
      "LPG is only as safe as the people handling it. Full protective equipment is not optional at the tank.",
    meta: "At the plant",
    credit: "Library photograph · Pexels",
  },
  {
    id: "installation",
    file: "installation.jpg",
    width: 2000,
    height: 1334,
    alt: "Gloved hands fitting valves and fittings onto a pipework manifold.",
    caption:
      "Most gas incidents trace back to a fitting, not the fuel. Installation is where safety is actually decided.",
    meta: "Installation",
    credit: "Library photograph · Pexels",
  },
  {
    id: "kitchen",
    file: "kitchen.jpg",
    width: 2000,
    height: 1334,
    alt: "A chef working over a lit gas burner in a busy commercial kitchen, flame visible under the pan.",
    caption:
      "A kitchen that runs on gas cannot afford to run out mid-service. That is a supply problem before it is a cooking one.",
    meta: "Hospitality & food",
    credit: "Library photograph · Pexels",
  },

  {
    id: "team",
    file: "team.jpg",
    width: 1200,
    height: 1000,
    alt: "Three Suez Gas crew in branded coveralls and gloves weighing a cylinder on a digital scale beside their delivery truck.",
    caption:
      "Our crew, weighing on the scale that travels with the truck. Nothing leaves on an estimate.",
    meta: "Our people",
  },
  {
    id: "srg",
    file: "srg-regulator.jpg",
    width: 1600,
    height: 1447,
    alt: "The Suez SRG smart gas regulator, an orange low-pressure regulator with a dial showing contents level and a leak-check indicator.",
    caption:
      "The dial reads contents at a glance and flags a leak before you smell one — the cheapest telemetry in the system.",
    meta: "Suez SRG",
  },

  /* The SRG and crew shots above are Suez Gas's own — no credit line, and their
     captions speak in the first person. The rest are library stand-ins; the
     README carries the shot list, and the one still most worth taking is a
     road tanker of theirs, working. */
];

/** Only the entries that have a real file behind them. */
export const availablePhotos = () => PHOTOS.filter((p) => p.file !== null);

export const photoById = (id: string) =>
  PHOTOS.find((p) => p.id === id && p.file !== null);
