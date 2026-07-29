import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Grain } from "@/components/texture";

// Display (Zodiak) and body (Switzer) load from Fontshare in globals.css.
// Mono is reserved for real data — weights, prices, cylinder sizes.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Suez Gas Nigeria — Cooking gas, delivered and weighed at your door",
    template: "%s — Suez Gas Nigeria",
  },
  description:
    "Domestic and commercial LPG in Abuja since 2012. Cylinder refills from 3kg to 50kg, bulk haulage, professional installation and consultancy — every delivery weighed on a digital scale at your door.",
  metadataBase: new URL("https://suezgas.com"),
  openGraph: {
    title: "Suez Gas Nigeria — Cooking gas, delivered and weighed at your door",
    description:
      "Domestic and commercial LPG distribution in Abuja since 2012. Part of the Suez energy group.",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2ede4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={mono.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-flame focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:text-ink"
        >
          Skip to content
        </a>
        <Grain />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
