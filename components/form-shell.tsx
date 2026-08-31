"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildMailto, formatBody, type Row } from "@/lib/mailto";
import { SITE } from "@/lib/site";

type Status = "idle" | "error" | "handed-off";

/**
 * The submit half of both forms. Composes the enquiry into a `mailto:` and
 * hands it to the visitor's mail app — no request, no endpoint, no key.
 *
 * `handed-off` is deliberately not called "sent". We cannot know whether the
 * mail client opened, let alone whether the customer pressed send, and telling
 * someone with an empty cylinder that their order is in when it may not be is
 * the worst thing this form could do.
 */
export function useMailtoHandoff() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [badFields, setBadFields] = useState<string[]>([]);
  const [body, setBody] = useState("");

  const fail = useCallback((message: string, fields: string[] = []) => {
    setError(message);
    setBadFields(fields);
    setStatus("error");
    return false;
  }, []);

  const handOff = useCallback((subject: string, rows: Row[]) => {
    setError("");
    setBadFields([]);
    setBody(formatBody(rows));

    // Keeps the plain-text copy available for the clipboard fallback below.
    window.location.href = buildMailto(subject, rows);
    setStatus("handed-off");
    return true;
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
    setBadFields([]);
  }, []);

  return { status, error, badFields, body, fail, handOff, reset };
}

/** Validation failure, announced rather than silently colouring a border. */
export function FormAlert({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="border-l-2 border-flame-ink bg-bone-2 px-4 py-3 text-[0.9375rem] text-fg-bone"
    >
      {message}
    </p>
  );
}

/** Copies the same text the mail app was handed, for when it did not open. */
function CopyDetails({ body }: { body: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(body);
          setCopied(true);
        } catch {
          // Clipboard is blocked outside a secure context, and on an insecure
          // origin there is no fallback worth the code — the details are still
          // on screen to select by hand.
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : "Copy the details"}
    </button>
  );
}

/**
 * What replaces the form once the mail app has been handed the message. It
 * states plainly that the customer still has to press send, and puts the phone
 * line first for anyone whose mail app never appeared.
 */
export function MailtoHandoff({
  title,
  children,
  body,
  onReset,
  resetLabel,
}: {
  title: string;
  children: React.ReactNode;
  body: string;
  onReset: () => void;
  resetLabel: string;
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation — a screen reader user who just submitted
  // would otherwise be left on a button that no longer exists.
  useEffect(() => heading.current?.focus(), []);

  return (
    <div className="mt-10 border-t-2 border-flame-ink pt-9">
      <div className="eyebrow">One more step</div>
      <h3 ref={heading} tabIndex={-1} className="mt-5 text-display-s outline-none">
        {title}
      </h3>
      <div className="mt-4 max-w-md space-y-3 text-fg-bone-muted">{children}</div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={SITE.phone.href} className="btn btn-flame">
          Call {SITE.phone.display}
        </a>
        <CopyDetails body={body} />
        <button type="button" onClick={onReset} className="btn btn-ghost">
          {resetLabel}
        </button>
      </div>

      <details className="mt-8 border-t border-bone-line pt-5">
        <summary className="cursor-pointer text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
          Show what we prepared
        </summary>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap bg-bone-2 p-4 text-[0.8125rem] leading-relaxed">
          {body}
        </pre>
      </details>
    </div>
  );
}
