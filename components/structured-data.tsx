import { SITE } from "@/lib/site";

/**
 * JSON-LD, emitted as a script tag rather than through a helper library.
 * Everything here must be visible on the page it describes — Google treats
 * schema that contradicts the rendered content as spam, so these builders read
 * from the same `SITE` constants the footer and contact page render.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const ORG_ID = `${SITE.url}/#organization`;

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        image: `${SITE.url}/opengraph-image`,
        description: SITE.description,
        foundingDate: SITE.founded,
        slogan: SITE.tagline,
        identifier: SITE.rc,
        email: SITE.email.address,
        telephone: SITE.phone.e164,
        sameAs: [SITE.social.facebook],
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE.phone.e164,
          email: SITE.email.address,
          contactType: "customer service",
          areaServed: "NG",
          availableLanguage: ["en"],
        },
      }}
    />
  );
}

/**
 * The one that wins "gas refill Abuja". Everything a Maps result needs: a
 * pinned address, a callable number, hours and the neighbourhoods we cover.
 */
export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#localbusiness`,
        parentOrganization: { "@id": ORG_ID },
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        image: `${SITE.url}/logo.png`,
        description: SITE.description,
        telephone: SITE.phone.e164,
        email: SITE.email.address,
        priceRange: "₦₦",
        currenciesAccepted: "NGN",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: SITE.hours.opens,
            closes: SITE.hours.closes,
          },
        ],
        areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
        makesOffer: [
          "Bulk LPG supply",
          "Bulk LPG haulage",
          "Suez SRG smart gas regulator",
          "RMS remote gas monitoring and telemetry",
          "LPG storage planning and installation",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      }}
    />
  );
}

/** Breadcrumbs give the result a readable path instead of a raw URL. */
export function BreadcrumbSchema({ trail }: { trail: [name: string, path: string][] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: `${SITE.url}${path === "/" ? "" : path}`,
        })),
      }}
    />
  );
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}
