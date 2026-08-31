"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { FormAlert, MailtoHandoff, useMailtoHandoff } from "./form-shell";
import { isEmail, isPhone } from "@/lib/validate";
import type { Row } from "@/lib/mailto";

const NEED_LABELS: Record<string, string> = {
  refill: "Refill my cylinder",
  cylinder: "New cylinder",
  bundle: "Regulator + cylinder + gas bundle",
  regulator: "Regulator only",
  bulk: "Bulk / commercial volume",
};

const WINDOW_LABELS: Record<string, string> = {
  today: "Today if possible",
  tomorrow: "Tomorrow",
  morning: "A morning this week",
  afternoon: "An afternoon this week",
};

export function OrderForm() {
  const { status, error, badFields, body, fail, handOff, reset } = useMailtoHandoff();
  const invalid = (name: string) => (badFields.includes(name) ? true : undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const address = get("address");

    const gaps = [
      ["name", name],
      ["phone", phone],
      ["address", address],
    ]
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (gaps.length) {
      return fail("Please fill in your name, phone and delivery address.", gaps);
    }
    if (!isPhone(phone)) {
      return fail("That phone number does not look right.", ["phone"]);
    }
    if (email && !isEmail(email)) {
      return fail("That email address does not look right.", ["email"]);
    }

    const need = get("type");
    const size = get("size");
    const rows: Row[] = [
      ["Full name", name],
      ["Phone", phone],
      ["Email", email],
      ["Needs", NEED_LABELS[need] ?? need],
      ["Cylinder size", size === "bulk" ? "Bulk — see notes" : size ? `${size} kg` : ""],
      ["Delivery address", address],
      ["Preferred window", WINDOW_LABELS[get("when")] ?? get("when")],
      [
        "Safety check",
        data.get("safety_check") === "on"
          ? "Yes — check regulator, hose and connections"
          : "Not requested",
      ],
      ["Notes", get("notes")],
    ];

    handOff(
      `Gas order — ${name} — ${NEED_LABELS[need] ?? need}${
        size && size !== "bulk" ? ` ${size} kg` : ""
      }`,
      rows,
    );
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
          We have filled in a message to our supply team with everything you
          entered. It is not with us until you press send there.
        </p>
        <p>
          If no email app opened, copy the details across — or skip it and call.
          For an urgent refill the phone line is the faster route anyway.
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
          <label htmlFor="o-name">Full name</label>
          <input
            id="o-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={invalid("name")}
          />
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
            aria-invalid={invalid("phone")}
          />
        </p>
      </div>

      <p className="field">
        <label htmlFor="o-email">Email (optional)</label>
        <input
          id="o-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={invalid("email")}
        />
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
            <option value="bulk">Bulk - I will describe below</option>
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
          aria-invalid={invalid("address")}
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

      <FormAlert message={error} />

      <button type="submit" className="btn btn-flame w-full sm:w-auto">
        Compose this order
      </button>

      <p className="text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] text-fg-bone-muted">
        This opens your email app with the details filled in — you press send.
        Nothing is charged, and we call to confirm.{" "}
        <Link href="/privacy" className="link-slide">
          How we handle your details
        </Link>
        .
      </p>
    </form>
  );
}
