import type { Metadata } from "next";
import { Burner, Contours } from "@/components/texture";
import { Reveal, WipeLines } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Order gas",
  description:
    "Request a cooking gas refill or a new cylinder in Abuja. A representative confirms the size, the day's price and your delivery window before anything moves.",
};

const STEPS = [
  ["Submit a request", "Fill the form, or call if that is faster for you."],
  ["Order confirmation", "A representative calls to confirm size, price and window."],
  ["Delivery confirmation", "Delivered and weighed at your door, on time."],
];

export default function OrderPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-bone-line pb-16 pt-36 sm:pt-44">
        <Contours origin={{ x: 94, y: 26 }} rings={24} opacity={0.6} />
        <div className="bloom" />
        <Reveal className="measure relative" immediate>
          <div className="reveal max-w-3xl">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Order gas
            </div>
            <h1
              className="mt-7 text-display-l"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <WipeLines lines={["Tell us the size."]} />
            </h1>
            <p
              className="mt-8 max-w-xl text-body-l text-fg-bone-muted"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              Requests placed before mid-afternoon are normally delivered the same
              day across the Abuja metropolis. Nothing is charged until a
              representative has confirmed the price with you.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Three-step strip (ink) */}
      <section className="on-ink relative overflow-hidden py-14">
        <Contours origin={{ x: 12, y: 60 }} rings={18} tone="ink" opacity={0.5} />
        <Reveal className="measure relative">
          <ol className="reveal grid gap-8 md:grid-cols-3 md:gap-14">
            {STEPS.map(([title, body], i) => (
              <li
                key={title}
                className="border-t border-ink-line pt-6"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="text-[0.6875rem] uppercase tracking-[0.09em] text-flame">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-3 font-display text-[1.375rem] leading-tight">
                  {title}
                </h2>
                <p className="mt-2 text-[0.9375rem] text-fg-ink-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* The form */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <Burner className="pointer-events-none absolute -left-48 top-1/3 h-[34rem] w-[34rem] opacity-25" />
        <Reveal className="measure relative">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <Reveal className="reveal">
              <h2 className="text-display-m" style={{ "--i": 0 } as React.CSSProperties}>
                Gas request form
              </h2>
              <form className="mt-10 space-y-8" style={{ "--i": 1 } as React.CSSProperties}>
                <div className="grid gap-8 sm:grid-cols-2">
                  <p className="field">
                    <label htmlFor="o-name">Full name</label>
                    <input id="o-name" name="name" type="text" autoComplete="name" required />
                  </p>
                  <p className="field">
                    <label htmlFor="o-phone">Phone</label>
                    <input
                      id="o-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="080 0000 0000"
                      required
                    />
                  </p>
                </div>

                <p className="field">
                  <label htmlFor="o-email">Email (optional)</label>
                  <input id="o-email" name="email" type="email" autoComplete="email" />
                </p>

                <div className="grid gap-8 sm:grid-cols-2">
                  <p className="field">
                    <label htmlFor="o-type">What do you need?</label>
                    <select id="o-type" name="type" defaultValue="refill">
                      <option value="refill">Refill my cylinder</option>
                      <option value="cylinder">New cylinder</option>
                      <option value="bundle">Regulator + cylinder + gas bundle</option>
                      <option value="regulator">Regulator only</option>
                      <option value="bulk">Bulk / commercial volume</option>
                    </select>
                  </p>
                  <p className="field">
                    <label htmlFor="o-size">Cylinder size</label>
                    <select id="o-size" name="size" defaultValue="12.5">
                      <option value="3">3 kg</option>
                      <option value="6">6 kg</option>
                      <option value="12.5">12.5 kg</option>
                      <option value="25">25 kg</option>
                      <option value="50">50 kg</option>
                      <option value="bulk">Bulk — I will describe below</option>
                    </select>
                  </p>
                </div>

                <p className="field">
                  <label htmlFor="o-address">Delivery address</label>
                  <input
                    id="o-address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Street, estate, district"
                    required
                  />
                </p>

                <p className="field">
                  <label htmlFor="o-when">Preferred window</label>
                  <select id="o-when" name="when" defaultValue="today">
                    <option value="today">Today if possible</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="morning">A morning this week</option>
                    <option value="afternoon">An afternoon this week</option>
                  </select>
                </p>

                <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem]">
                  <input
                    type="checkbox"
                    name="safety_check"
                    className="mt-1 h-4 w-4 cursor-pointer accent-flame"
                  />
                  <span>
                    Check my regulator, hose and connections while you are here
                    <span className="mt-0.5 block text-[0.8125rem] text-fg-bone-muted">
                      Free with any delivery
                    </span>
                  </span>
                </label>

                <p className="field">
                  <label htmlFor="o-notes">Anything else?</label>
                  <textarea
                    id="o-notes"
                    name="notes"
                    placeholder="Gate code, landmark, volume details"
                  />
                </p>

                {/* ponytail: presentation only — wire to your order endpoint,
                    mailer or WhatsApp Business API when the backend exists. */}
                <button type="submit" className="btn btn-flame w-full sm:w-auto">
                  Submit request
                </button>

                <p className="text-[0.6875rem] uppercase tracking-[0.075em] text-fg-bone-muted">
                  We will call to confirm. No payment is taken on this form.
                </p>
              </form>
            </Reveal>

            {/* Faster alternatives */}
            <Reveal className="reveal">
              <div
                className="on-ink rounded-2xl p-8 sm:p-10"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <div className="eyebrow">Faster</div>
                <h2 className="mt-5 font-display text-[1.75rem] leading-tight">
                  Or just call. We answer.
                </h2>
                <p className="mt-4 text-fg-ink-muted">
                  For an urgent refill, the phone line and WhatsApp are the
                  quickest route — the same number for both.
                </p>

                <dl className="mt-8 space-y-5 border-t border-ink-line pt-7">
                  {[
                    ["Call & WhatsApp", "+234 816 800 3677", "tel:+2348168003677"],
                    ["Email", "info@suezgas.com", "mailto:info@suezgas.com"],
                  ].map(([label, value, href]) => (
                    <div key={label}>
                      <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                        {label}
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={href}
                          className="link-slide font-display text-[1.25rem] transition-colors duration-200 hover:text-flame"
                        >
                          {value}
                        </a>
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                      Office
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed">
                      20 Alexandria Crescent, Wuse II, Abuja
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>
    </>
  );
}
