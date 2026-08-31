/**
 * One source of truth for the company's NAP (name, address, phone) and the few
 * facts that are repeated across the footer, the contact page, the JSON-LD and
 * the mail templates. If a detail is wrong it should be wrong in exactly one
 * place — search engines punish a business whose details disagree with itself.
 */

export const SITE = {
  url: "https://suezgas.com",
  legalName: "Suez Gas Nigeria Limited",
  name: "Suez Gas Nigeria",
  short: "Suez Gas",
  rc: "RC 1076785",
  founded: "2012",
  tagline: "Providing your convenient energy",
  description:
    "Bulk commercial and industrial LPG supply in Nigeria since 2012. Road tanker haulage, storage planning, plant installation and consultancy from the Suez energy group.",

  phone: {
    e164: "+2348168003677",
    display: "+234 816 800 3677",
    href: "tel:+2348168003677",
  },
  email: {
    address: "info@suezgas.com",
    href: "mailto:info@suezgas.com",
  },

  address: {
    street: "20 Alexandria Crescent, Wuse II",
    locality: "Abuja",
    region: "Federal Capital Territory",
    country: "NG",
    full: "20 Alexandria Crescent, Wuse II, Abuja",
  },

  /**
   * TODO(suez): confirm against the real office pin before launch. A wrong
   * coordinate in LocalBusiness data sends drivers and Maps users to the
   * wrong street, which is worse than publishing none at all.
   */
  geo: { lat: 9.0785, lng: 7.4696 },

  /** TODO(suez): confirm the real trading hours. */
  hours: { days: "Mo-Sa", opens: "08:00", closes: "18:00" },

  areaServed: [
    "Abuja",
    "Wuse",
    "Maitama",
    "Garki",
    "Asokoro",
    "Gwarinpa",
    "Jabi",
    "Lugbe",
    "Federal Capital Territory",
  ],

  social: {
    facebook: "https://www.facebook.com/suezgasnigeria/",
  },

  /**
   * Buying moved off this website and into the group app. Retail ordering and
   * the published rate card were removed with it — the site informs, the app
   * transacts, and nothing here should read as a place to make a purchase.
   *
   * These are the live SuezElectric listings: gas and electricity are sold
   * through the one group app rather than two.
   */
  app: {
    name: "SuezElectric",
    ios: "https://apps.apple.com/us/app/suezelectric/id1543156442",
    android: "https://play.google.com/store/apps/details?id=com.suezElectric.suez",
  },

  group: [
    { name: "SuezElectric", note: "Prepaid electricity", href: "https://suezelectric.com" },
    { name: "Suez Trading International", note: "LPG import & bulk haulage" },
  ],
} as const;
