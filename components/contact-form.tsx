"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { FormAlert, MailtoHandoff, useMailtoHandoff } from "./form-shell";
import { isEmail, isPhone } from "@/lib/validate";
import type { Row } from "@/lib/mailto";

const TOPIC_LABELS: Record<string, string> = {
  enquiry: "General enquiry",
  bulk: "Bulk supply",
  haulage: "Bulk haulage",
  installation: "Installation",
  complaint: "A delivery went wrong",
  other: "Others",
};

export function ContactForm() {
  const { status, error, badFields, body, fail, handOff, reset } = useMailtoHandoff();
  const invalid = (name: string) => (badFields.includes(name) ? true : undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const message = get("message");

    const gaps = [
      ["name", name],
      ["phone", phone],
      ["email", email],
      ["message", message],
    ]
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (gaps.length) {
      return fail("Please fill in every field before sending.", gaps);
    }
    if (!isEmail(email)) {
      return fail("That email address does not look right.", ["email"]);
    }
    if (!isPhone(phone)) {
      return fail("That phone number does not look right.", ["phone"]);
    }

    const topic = get("topic");
    const label = TOPIC_LABELS[topic] ?? "Enquiry";
    const rows: Row[] = [
      ["Full name", name],
      ["Phone", phone],
      ["Email", email],
      ["Topic", label],
      ["Message", message],
    ];

    // A complaint should be findable in the inbox without opening it.
    handOff(`${topic === "complaint" ? "COMPLAINT" : label} — ${name}`, rows);
  }

  if (status === "handed-off") {
    return (
      <MailtoHandoff
        title="Press send in your email app."
        body={body}
        onReset={reset}
        resetLabel="Start again"
      >
        <p>
          We have filled in a message to our team with everything you wrote. It
          does not reach us until you press send there.
        </p>
        <p>
          If no email app opened, copy the details across — or call instead. An
          urgent refill is faster on the phone line either way.
        </p>
      </MailtoHandoff>
    );
  }

  return (
    <form
      className="relative mt-10 space-y-8"
      onSubmit={handleSubmit}
      noValidate
      style={{ "--i": 1 } as React.CSSProperties}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <p className="field">
          <label htmlFor="c-name">Full name</label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={invalid("name")}
          />
        </p>
        <p className="field">
          <label htmlFor="c-phone">Phone</label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="080 0000 0000"
            required
            aria-invalid={invalid("phone")}
          />
        </p>
      </div>

      <p className="field">
        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={invalid("email")}
        />
      </p>

      <p className="field">
        <label htmlFor="c-topic">Type of request</label>
        <select id="c-topic" name="topic" defaultValue="enquiry">
          <option value="enquiry">General enquiry</option>
            <option value="bulk">Bulk supply</option>
          <option value="haulage">Bulk haulage</option>
          <option value="installation">Installation</option>
          <option value="complaint">A delivery went wrong</option>
          <option value="other">Others</option>
        </select>
      </p>

      <p className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" required aria-invalid={invalid("message")} />
      </p>

      <FormAlert message={error} />

      <button type="submit" className="btn btn-flame w-full sm:w-auto">
        Compose this message
      </button>

      <p className="text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] text-fg-bone-muted">
        This opens your email app with the details filled in — you press send.
        Urgent refills are faster on the phone line.{" "}
        <Link href="/privacy" className="link-slide">
          How we handle your details
        </Link>
        .
      </p>
    </form>
  );
}
