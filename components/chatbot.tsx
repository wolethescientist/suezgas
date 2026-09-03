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
  "How do I buy gas?",
  "What is the SRG regulator?",
  "Do you supply commercial LPG?",
  "Can you plan storage for us?",
  "How do I stay safe?",
];

const ANSWERS = [
  {
    matches: ["srg", "regulator", "rms", "monitor", "monitoring", "telemetry", "usage", "gauge", "smart"],
    text: "Two things. The Suez SRG smart gas regulator has the gauge built in, so you can read the cylinder's contents and run a leak check off the same dial. RMS is our remote monitoring system for bulk vessels — level, consumption rate, a refill forecast and alerts, reported continuously.",
    link: { href: "/#products", label: "See both products" },
  },
  {
    matches: ["order", "refill", "buy", "app", "price", "cost", "how much", "delivery today", "purchase"],
    text: "Gas is bought in the SuezElectric app — it is where the current price, your saved address and delivery tracking live. This website no longer takes orders or publishes a rate card, because LPG prices move and the app always has today's.",
    link: { href: "/#app", label: "Get the app" },
  },
  {
    matches: ["kg", "kilogram", "size", "cylinder size", "estate", "retail"],
    text: "Suez Gas no longer sells retail — no cylinder refills, no doorstep deliveries. We supply LPG in bulk to off-takers, plants and commercial sites, and we plan and install storage. To buy gas as an individual, use the app.",
    link: { href: "/#app", label: "Get the app" },
  },
  {
    matches: ["commercial", "industrial", "bulk", "tanker", "off-taker", "plant", "business"],
    text: "Yes — bulk is what we do. Haulage to off-takers, plants and industrial sites is arranged with our supply team, scoped around your volume, route and schedule.",
    link: { href: "/services#haulage", label: "See bulk haulage" },
  },
  {
    matches: ["storage", "tank", "siting", "capacity", "plan storage", "installation", "install"],
    text: "We help organisations think through storage capacity, siting, refill cycles and installation before the system is put into use. That starts with a conversation, not a form.",
    link: { href: "/services#consultancy", label: "Explore supply planning" },
  },
  {
    matches: ["where", "area", "location", "abuja", "deliver"],
    text: "We are based in Wuse II, Abuja and move bulk LPG by road to off-takers and sites. Individual purchases are made in the app; bulk supply, storage planning and installation are arranged with our team.",
    link: { href: "/services", label: "Explore our services" },
  },
  {
    matches: ["safe", "safety", "leak", "smell gas", "hose", "regulator", "rust"],
    text: "If you smell gas, do not touch an electrical switch. Turn the cylinder valve off, open doors and windows, get everyone outside, then call us. Our safety guide covers the everyday checks too.",
    link: { href: "/safety", label: "Read the safety guide" },
  },
  {
    matches: ["call", "whatsapp", "contact", "phone", "human", "person", "complaint"],
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
      text: "I can help with buying gas in the app, commercial LPG, storage planning, delivery areas and safety. Choose a suggested question, or contact the supply team for a specific request.",
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
      text: "Hello. Gas is bought in our app — ask me how, or about commercial supply, storage planning and safety.",
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
