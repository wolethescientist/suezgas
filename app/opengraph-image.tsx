import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — LPG supply, storage and haulage`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card that shows up in a WhatsApp forward, and for most people the first
 * thing they ever see of this company. Ink ground with the flame accent, so it
 * reads as the site does. Rendered by Satori, which supports a flexbox subset
 * only — no grid, and every element needs an explicit display.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#111316",
          backgroundImage:
            "radial-gradient(760px 500px at 78% 8%, rgba(245,130,32,0.20), transparent 62%)",
          color: "#f2efe9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 46,
              height: 46,
              borderRadius: 999,
              background: "#f58220",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9b9892",
            }}
          >
            Suez Gas Nigeria · {SITE.rc}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 1.02, letterSpacing: -3 }}>
            LPG at
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#f58220",
            }}
          >
            commercial scale.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "#9b9892",
              maxWidth: 820,
            }}
          >
            Storage, haulage and dependable LPG supply across Nigeria since 2012.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2b3037",
            paddingTop: 26,
            fontSize: 25,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#9b9892",
          }}
        >
          <div style={{ display: "flex" }}>{SITE.address.full}</div>
          <div style={{ display: "flex", color: "#f2efe9" }}>{SITE.phone.display}</div>
        </div>
      </div>
    ),
    size,
  );
}
