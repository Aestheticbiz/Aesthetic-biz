import { SITE } from "@/lib/site";

/**
 * Transactional email via Resend's REST API.
 *
 * Deliberately uses fetch rather than the `resend` package — one less
 * dependency, and it matches the pattern already used elsewhere.
 *
 * Everything here is AestheticBiz-branded. A visitor books on AestheticBiz,
 * so every message they receive must come from AestheticBiz.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type MailResult = { id?: string; error?: string };

/** Resend needs a key and a verified sender before anything can go out. */
export function emailReady() {
  return Boolean(process.env.RESEND_API_KEY && process.env.DISCOVERY_FROM_EMAIL);
}

/**
 * Send one email. Never throws — callers decide what a failure means, and a
 * failed notification must never lose a booking that was already stored.
 */
export async function sendEmail(
  payload: {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
  },
  idempotencyKey: string,
): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DISCOVERY_FROM_EMAIL;
  if (!apiKey || !from) return { error: "email_not_configured" };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });
    const result = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
    };
    if (!response.ok) {
      return { error: result.message || `Resend returned ${response.status}` };
    }
    return { id: result.id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "email_send_failed" };
  }
}

export type BookingEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
  message: string;
  startUtc: string;
  timezone: string;
  durationMinutes: number;
  source: string;
};

/** e.g. "Tuesday, 18 August 2026 at 2:00 PM (SAST)" in the visitor's zone. */
function formatSlot(startUtc: string, timezone: string) {
  const date = new Date(startUtc);
  try {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(heading: string, body: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1c1917;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:12px;padding:32px;">
      <p style="margin:0 0 24px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#a8a29e;">${escapeHtml(SITE.name)}</p>
      <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;">${heading}</h1>
      ${body}
      <p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #e7e5e4;font-size:13px;color:#78716c;">
        ${escapeHtml(SITE.name)} · <a href="${SITE.domain}" style="color:#78716c;">${escapeHtml(SITE.domain.replace(/^https?:\/\//, ""))}</a>
      </p>
    </div>
  </body>
</html>`;
}

/** Confirmation to the person who booked. */
export function clientBookingEmail(b: BookingEmailData) {
  const when = formatSlot(b.startUtc, b.timezone);
  return {
    subject: `Your Discovery Call is confirmed — ${when}`,
    html: shell(
      `Thanks ${escapeHtml(b.firstName)}, your Discovery Call is confirmed.`,
      `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">We've reserved this time for you:</p>
       <p style="margin:0 0 20px;padding:16px;background:#fafaf9;border-radius:8px;font-size:16px;font-weight:600;">${escapeHtml(when)}<br>
         <span style="font-weight:400;font-size:14px;color:#78716c;">${b.durationMinutes} minutes</span></p>
       <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
         We'll be in touch shortly with joining details. If you need to move or cancel the call, just reply to this email.</p>
       <p style="margin:0;font-size:15px;line-height:1.6;">Looking forward to speaking with you.</p>`,
    ),
  };
}

/** Internal notification — everything needed to prepare for the call. */
export function adminBookingEmail(b: BookingEmailData) {
  const when = formatSlot(b.startUtc, b.timezone);
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#78716c;font-size:14px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;font-size:14px;">${escapeHtml(value)}</td></tr>`
      : "";
  return {
    subject: `New Discovery Call — ${b.firstName} ${b.lastName}, ${b.company}`,
    html: shell(
      `New Discovery Call booked`,
      `<p style="margin:0 0 20px;padding:16px;background:#fafaf9;border-radius:8px;font-size:16px;font-weight:600;">${escapeHtml(when)}<br>
         <span style="font-weight:400;font-size:14px;color:#78716c;">Visitor timezone: ${escapeHtml(b.timezone)}</span></p>
       <table style="border-collapse:collapse;width:100%;">
         ${row("Name", `${b.firstName} ${b.lastName}`)}
         ${row("Company", b.company)}
         ${row("Role", b.role)}
         ${row("Email", b.email)}
         ${row("Phone", b.phone)}
         ${row("Website", b.website)}
         ${row("Source", b.source)}
       </table>
       <p style="margin:20px 0 6px;color:#78716c;font-size:14px;">What they want to discuss</p>
       <p style="margin:0;padding:16px;background:#fafaf9;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(b.message)}</p>`,
    ),
  };
}
