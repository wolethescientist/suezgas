import { Contours } from "./texture";
import { Reveal } from "./reveal";

const CHANNELS = [
  {
    name: "Facebook",
    handle: "Suez Gas Nigeria",
    mark: "f",
    className: "social-facebook",
    href: "https://www.facebook.com/suezgasnigeria/",
    description: "Company updates, announcements and practical LPG advice from our team.",
    action: "Visit our Facebook page",
  },
  {
    name: "WhatsApp",
    handle: "0816 800 3677",
    mark: "wa",
    className: "social-whatsapp",
    href: "https://wa.me/2348168003677?text=Hello%20Suez%20Gas%2C%20I%20have%20a%20question.",
    description: "Ask a question, check a delivery or start an order with customer care.",
    action: "Chat with customer care",
  },
];

export function SocialMediaSection() {
  return (
    <section className="on-ink social-section relative overflow-hidden py-20 lg:py-28">
      <Contours origin={{ x: 84, y: 42 }} rings={26} tone="ink" opacity={0.5} />
      <Reveal className="measure relative">
        <div className="social-section-heading">
          <div>
            <div className="eyebrow">Official channels</div>
            <h2 className="mt-6 max-w-xl text-display-m">Follow Suez Gas as we build a stronger LPG supply chain.</h2>
            <p className="mt-6 max-w-lg text-fg-ink-muted">
              Get service updates, practical safety notes and a direct line to the people who handle your delivery.
            </p>
          </div>
          <div className="social-section-note">
            <span>Open channels</span>
            <strong>02</strong>
          </div>
        </div>

        <Reveal className="reveal mt-14 grid gap-6 lg:grid-cols-2">
          {CHANNELS.map((channel, index) => (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card ${channel.className}`}
              style={{ "--i": index } as React.CSSProperties}
            >
              <div className="social-card-top">
                <div className="social-card-identity">
                  <span className="social-channel-mark" aria-hidden="true">{channel.mark}</span>
                  <span>
                    <strong>{channel.name}</strong>
                    <small>{channel.handle}</small>
                  </span>
                </div>
                <span className="social-card-follow">Open ↗</span>
              </div>
              <div className="social-card-center">
                <span className="social-card-symbol" aria-hidden="true">{channel.mark}</span>
                <strong>{channel.handle}</strong>
                <p>{channel.description}</p>
                <span className="social-card-action">{channel.action} ↗</span>
              </div>
            </a>
          ))}
        </Reveal>

        <div className="social-more">
          <span>Also find us on</span>
          <span className="social-coming-soon">Instagram <small>coming soon</small></span>
          <span className="social-coming-soon">LinkedIn <small>coming soon</small></span>
        </div>
      </Reveal>
    </section>
  );
}
