import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Grain } from "@/components/texture";
import { Chatbot } from "@/components/chatbot";
import { LocalBusinessSchema, OrganizationSchema } from "@/components/structured-data";
import { SITE } from "@/lib/site";

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
    default: "Suez Gas Nigeria - LPG supply, storage and haulage",
    template: "%s - Suez Gas Nigeria",
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  // Every page sets its own; this is the fallback so no URL is ever left
  // without one and the /?utm_source= variants collapse onto the real page.
  alternates: { canonical: "/" },
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Energy",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Suez Gas Nigeria - LPG supply, storage and haulage",
    description:
      "LPG supply, storage planning, bulk haulage and cylinder distribution for homes, estates, hospitality, food production and industrial operations.",
    type: "website",
    locale: "en_NG",
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Suez Gas Nigeria - LPG supply, storage and haulage",
    description:
      "LPG supply, storage planning, bulk haulage and cylinder distribution across Nigeria since 2012.",
  },
  other: {
    "geo.region": "NG-FC",
    "geo.placename": SITE.address.locality,
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
        <Chatbot />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
