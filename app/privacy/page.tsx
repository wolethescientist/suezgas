import type { Metadata } from "next";
import { Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-parts";
import { SITE } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description:
    "What Suez Gas Nigeria does with the name, phone number and address you give us when you order gas or send a message.",
};

const SECTIONS: [string, string[]][] = [
  [
    "What we collect",
    [
      "When you use the order form it composes an email containing your name, phone number, delivery address, the product and size you asked for, your preferred delivery window and anything you type in the notes. Your email address is optional.",
      "When you use the contact form it composes an email containing your name, phone number, email address, the type of request and the message itself.",
      "In both cases the message is written into your own email app. You can read it, change it or discard it before it is ever sent.",
    ],
  ],
  [
    "What we do with it",
    [
      "We use it to call you back, confirm a price, plan a route and deliver the gas. A complaint goes to the person who can resolve it.",
      "We do not sell it, rent it, or pass it to anyone outside the delivery of your order.",
    ],
  ],
  [
    "Where it goes",
    [
      `The forms on this site do not send anything by themselves. They open your own email app with the details filled in, addressed to ${SITE.email.address}, and nothing leaves your device until you press send there.`,
      "That means this website never receives, processes or stores your details. What we hold is the email in our inbox, the same as if you had written to us directly.",
      "This site sets no advertising cookies and runs no third-party tracking scripts.",
    ],
  ],
  [
    "How long we keep it",
    [
      "Order records are kept for as long as we need them for supply history, safety records and tax obligations. Enquiries that do not become orders are cleared from the inbox once they are dealt with.",
    ],
  ],
  [
    "Your choices",
    [
      `Write to ${SITE.email.address} or call ${SITE.phone.display} and ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. We will act on it.`,
      "This notice is governed by the Nigeria Data Protection Act 2023.",
    ],
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema trail={[["Privacy", "/privacy"]]} />
      <PageHero
        eyebrow="Privacy"
        lines={["Your details,", "and nothing more."]}
        lede="We ask for the least we need to get a cylinder to your door. This page says exactly what that is and where it goes."
        stamp="SU-GAS / 08 · Notice"
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 104, y: 34 }} rings={20} opacity={0.45} />
        <Reveal className="measure relative">
          <div className="reveal max-w-2xl">
            {SECTIONS.map(([title, paragraphs], i) => (
              <div
                key={title}
                className="border-t border-bone-line py-9 first:border-t-0 first:pt-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                <h2 className="text-display-s">{title}</h2>
                <div className="mt-4 space-y-4 text-fg-bone-muted">
                  {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            <p className="border-t border-bone-line pt-9 text-[0.6875rem] uppercase tracking-[0.075em] text-fg-bone-muted">
              {SITE.legalName} · {SITE.rc} · {SITE.address.full}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
