"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ChatMessage = {
  id: number;
  from: "bot" | "user";
  text: string;
  link?: { href: string; label: string };
};

const PRESET_QUESTIONS = [
  "Do you supply commercial LPG?",
  "Can you plan storage for us?",
  "How do I order gas?",
  "How do I stay safe?",
];

const ANSWERS = [
  {
    matches: ["order", "refill", "buy", "request", "delivery today"],
    text: "To order, tell us your cylinder size and location through the order form. A customer care representative will confirm the price and delivery window before we dispatch.",
    link: { href: "/order", label: "Start an order" },
  },
  {
    matches: ["price", "cost", "how much", "kg", "kilogram", "size"],
    text: "Our listed sizes run from 3 kg to 50 kg. LPG prices can change with the market, so the pricing page has the latest published rates and size guide.",
    link: { href: "/pricing", label: "See current prices" },
  },
  {
    matches: ["commercial", "industrial", "bulk", "tanker", "off-taker", "plant", "business"],
    text: "Yes. We supply LPG beyond household refills, including bulk haulage to off-takers and industrial sites. We can scope the right route around your consumption, storage and schedule.",
    link: { href: "/services#haulage", label: "See bulk haulage" },
  },
  {
    matches: ["storage", "tank", "siting", "capacity", "plan storage", "installation"],
    text: "We help organisations think through storage capacity, siting, refill cycles and installation before the system is put into use.",
    link: { href: "/services#consultancy", label: "Explore supply planning" },
  },
  {
    matches: ["where", "area", "location", "abuja", "deliver", "delivery"],
    text: "We deliver across the Abuja metropolis and surrounding estates. For commercial supply, bulk haulage and installation, our services page has the right starting point.",
    link: { href: "/services", label: "Explore delivery services" },
  },
  {
    matches: ["safe", "safety", "leak", "smell gas", "hose", "regulator", "rust"],
    text: "If you smell gas, do not touch an electrical switch. Turn the cylinder valve off, open doors and windows, get everyone outside, then call us. Our safety guide covers the everyday checks too.",
    link: { href: "/safety", label: "Read the safety guide" },
  },
  {
    matches: ["call", "whatsapp", "contact", "phone", "human", "person"],
    text: "You can reach the customer care team on 0816 800 3677 by call or WhatsApp. We answer requests, complaints and delivery questions.",
    link: { href: "/contact", label: "Contact the team" },
  },
];

function getAnswer(question: string) {
  const normalized = question.trim().toLowerCase();
  const match = ANSWERS.find((entry) =>
    entry.matches.some((keyword) => normalized.includes(keyword)),
  );

  return (
    match ?? {
      text: "I can help with commercial LPG, storage planning, orders, delivery areas and safety. Choose a suggested question, or contact the supply team for a specific request.",
      link: { href: "/contact", label: "Speak with customer care" },
    }
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      from: "bot",
      text: "Hello. I can help with commercial LPG, storage planning, orders, delivery and safety.",
    },
  ]);

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;

    const answer = getAnswer(trimmed);
    const now = Date.now();
    setMessages((current) => [
      ...current,
      { id: now, from: "user", text: trimmed },
      { id: now + 1, from: "bot", text: answer.text, link: answer.link },
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="chatbot" aria-live="polite">
      {open && (
        <section className="chatbot-panel" aria-label="Suez Gas assistant">
          <div className="chatbot-header">
            <div>
              <div className="chatbot-kicker">Suez Gas support</div>
              <h2>How can we help?</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="chatbot-close"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message chatbot-message-${message.from}`}>
                <p>{message.text}</p>
                {message.link && (
                  <Link href={message.link.href} onClick={() => setOpen(false)}>
                    {message.link.label} <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="chatbot-presets">
            <div className="chatbot-presets-label">Try a question</div>
            <div className="chatbot-preset-list">
              {PRESET_QUESTIONS.map((question) => (
                <button key={question} type="button" onClick={() => ask(question)}>
                  {question}
                </button>
              ))}
            </div>
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label htmlFor="chatbot-question" className="sr-only">
              Ask Suez Gas a question
            </label>
            <input
              id="chatbot-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Send question" disabled={!input.trim()}>
              ↗
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`chatbot-launcher ${open ? "chatbot-launcher-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close Suez Gas assistant" : "Open Suez Gas assistant"}
      >
        <span className="chatbot-launcher-mark" aria-hidden="true">
          {open ? "×" : "?"}
        </span>
        <span className="chatbot-launcher-label">Ask Suez</span>
      </button>
    </div>
  );
}
