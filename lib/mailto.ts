import { SITE } from "./site";

/**
 * Form submissions are handed to the visitor's own mail app rather than posted
 * to a server. Nothing is stored, nothing is sent on their behalf, and the site
 * needs no backend, no mail provider and no API key to keep working.
 *
 * The trade-off is real and the UI has to own it: a `mailto:` only lands if the
 * device has a mail client wired up. Desktop webmail users can click and see
 * nothing happen — which is why every form falls through to the phone line and
 * a copy-to-clipboard of the same text.
 */

export type Row = [label: string, value: string];

/**
 * Practical ceiling for a mailto URL. The spec sets none, but Outlook has
 * historically truncated past ~2000 characters, so the body is trimmed rather
 * than risking a silently cut-off order.
 */
const MAX_BODY = 1600;

export function formatBody(rows: Row[]) {
  const body = rows
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const trimmed =
    body.length > MAX_BODY ? `${body.slice(0, MAX_BODY)}\n[…trimmed]` : body;

  return `${trimmed}\n\n— Sent from suezgas.com`;
}

export function buildMailto(subject: string, rows: Row[]) {
  const params = new URLSearchParams({
    subject,
    body: formatBody(rows),
  });

  // URLSearchParams encodes spaces as "+", which some mail clients render
  // literally in the subject line. %20 is understood everywhere.
  return `mailto:${SITE.email.address}?${params.toString().replace(/\+/g, "%20")}`;
}
