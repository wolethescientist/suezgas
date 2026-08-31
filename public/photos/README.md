# Photographs

The site currently runs entirely on drawn illustration. That is a deliberate
look, but it is also the one thing standing between "a beautiful brochure" and
"I will trust these people with my hotel's gas supply". A commercial buyer wants
to see the truck, the plant and the person before they sign.

**Three of these slots are currently filled with library photographs** from
Pexels (free for commercial use, no attribution required — we credit anyway).
They are stand-ins. Each renders a visible "Library photograph · Pexels" line
and each caption describes the *practice*, never possession — no stock image on
this site claims to be Suez Gas equipment, and none ever should.

Replacing one with a real shot: drop the file here, point `file` at it in
`lib/photos.ts`, **delete its `credit`**, and rewrite the caption in the first
person. Until an entry has a `file`, its section does not render — nothing ever
ships as a placeholder box.

### Frames that were rejected, and why

Hold this line on any swap. Rejected candidates included: cylinders in a
competitor's livery (Petron Gasul); tanks with Chinese and Turkish signage;
a tanker on a snow-capped mountain road; and men standing unharnessed on top
of a tanker — which contradicts the safety page three clicks away.

## The shot list, in order of value

1. **`tanker.jpg` — the road tanker, working.**
   At a customer site mid-delivery, not parked empty in a yard. Branding visible.
   Landscape. This is the single most valuable image on the list.

2. **`weighing.jpg` — a cylinder on the digital scale at a customer's door.**
   The site claims every delivery is weighed in front of the customer; this is
   the photograph that proves it. Hands and scale readout in frame.

3. **`plant.jpg` — bulk storage and transfer pipework.**
   Wide enough to read as infrastructure rather than a close-up of a valve.

Worth having next:

4. **`team.jpg`** — drivers and installers in branded PPE. Faces, not a lineup.
5. **`install.jpg`** — a completed installation at a bakery, hotel or plant.
6. **`cylinders.jpg`** — the 3–50 kg range together, showing real scale.

## Shooting notes

- **Daylight, no flash.** The palette is warm bone and near-black; midday sun
  and hard flash both fight it. Early morning or late afternoon is ideal.
- **Landscape, and leave headroom.** They render in a 3-up grid and get cropped.
- **Get a release** for any identifiable face, staff or customer.
- **Never photograph an unsafe practice** — no cylinder on its side, no missing
  PPE, no smoking anywhere in frame. The safety page is checked against these.

## Export settings

- Long edge **1600px**, JPEG quality ~80, sRGB. Next.js handles the rest.
- Keep files under ~400 KB each. Strip EXIF/GPS before committing.
- Record the true pixel width and height in `lib/photos.ts` — a wrong ratio
  there causes layout shift.
