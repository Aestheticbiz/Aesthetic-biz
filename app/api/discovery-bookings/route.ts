import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  adminBookingEmail,
  clientBookingEmail,
  emailReady,
  sendEmail,
  type BookingEmailData,
} from "@/lib/server/email";
import {
  buildDiscoveryAvailability,
  discoverySlotStart,
  DISCOVERY_DURATION_MINUTES,
  DISCOVERY_LEAD_HOURS,
  isAllowedDiscoverySlot,
} from "@/lib/discovery";

/**
 * Discovery Call bookings (business / CRM sales — not treatment appointments).
 *
 * Production previously wrote to a JSON file on disk. That works locally and
 * fails on every serverless host (read-only filesystem), so every booking
 * returned 500 and the lead was lost.
 *
 * Rule: NEVER fail a confirmed booking because storage failed. If Supabase is
 * down or misconfigured, still confirm to the visitor and write the payload to
 * the server log for recovery.
 */

const TABLE = "discovery_bookings";

type StoredBooking = {
  id: string;
  start_utc: string;
  end_utc: string;
  slot_date: string;
  slot_time: string;
  timezone: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
  message: string;
  source: string;
};

/** Booked slot starts, for greying out times. Never throws. */
async function readBookedSlots(): Promise<string[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("start_utc")
      .gte("start_utc", new Date().toISOString());
    if (error) throw error;
    return (data ?? []).map((row) => row.start_utc as string);
  } catch (error) {
    console.error("[discovery-bookings] availability read failed", error);
    return [];
  }
}

export async function GET() {
  const booked = await readBookedSlots();
  return NextResponse.json(buildDiscoveryAvailability(booked), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  let booking: StoredBooking | null = null;

  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
    }

    // Honeypot: obscure name so browsers do not autofill it. If tripped, still
    // confirm to the client so real users never see a false failure.
    const honeypot = String(body.crm_internal_note ?? body.websiteTrap ?? "").trim();

    const date = String(body.date ?? "").trim();
    const time = String(body.time ?? "").trim();
    const timezone = String(body.timezone ?? "America/New_York").trim();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!isAllowedDiscoverySlot(date, time)) {
      return NextResponse.json({ error: "Please choose a valid Discovery Call slot." }, { status: 400 });
    }
    if (!firstName || !lastName || !email || !company || !message) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid business email." }, { status: 400 });
    }

    const start = discoverySlotStart(date, time);
    if (start.getTime() - Date.now() < DISCOVERY_LEAD_HOURS * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: "Please choose a slot at least 24 hours ahead." },
        { status: 400 },
      );
    }

    const startUtc = start.toISOString();
    const endUtc = new Date(start.getTime() + DISCOVERY_DURATION_MINUTES * 60 * 1000).toISOString();

    booking = {
      id: `disc-${Date.now()}`,
      start_utc: startUtc,
      end_utc: endUtc,
      slot_date: date,
      slot_time: time,
      timezone,
      first_name: firstName,
      last_name: lastName,
      email,
      phone: String(body.phone ?? "").trim(),
      company,
      role: String(body.role ?? "").trim(),
      website: String(body.website ?? "").trim(),
      message,
      source: String(body.source ?? "aestheticbiz").trim(),
    };

    if (honeypot) {
      console.warn("[discovery-bookings] honeypot tripped — confirmed without storage", booking.email);
      return NextResponse.json({ booking: publicBooking(booking) });
    }

    // --- Store -------------------------------------------------------------
    let stored = false;
    const supabase = getSupabaseServer();

    if (!supabase) {
      console.error("[discovery-bookings] STORAGE SKIPPED — Supabase not configured. LEAD", JSON.stringify(booking));
    } else {
      const { error } = await supabase.from(TABLE).insert(booking);

      // 23505 = unique violation on start_utc: somebody took the slot first.
      // The only case where we refuse outright — the slot genuinely is gone.
      if (error?.code === "23505") {
        return NextResponse.json(
          { error: "That time has just been booked. Please choose another slot." },
          { status: 409 },
        );
      }
      if (error) {
        console.error("[discovery-bookings] STORAGE FAILED", error);
        console.error("[discovery-bookings] LEAD", JSON.stringify(booking));
      } else {
        stored = true;
      }
    }

    // --- Notify ------------------------------------------------------------
    const notified = await sendBookingEmails(booking);

    // A booking is only safe if it landed somewhere we will actually look:
    // the database, or an admin inbox. If neither worked the lead is gone, and
    // telling the visitor "confirmed" would lose them silently — which is
    // exactly how this endpoint dropped every booking before the table existed.
    if (!stored && !notified) {
      console.error("[discovery-bookings] LEAD LOST — storage and email both failed", booking.email);
      return NextResponse.json(
        {
          error:
            "We could not confirm that booking. Please email us directly and we will secure your slot.",
        },
        { status: 503 },
      );
    }

    if (!stored) {
      console.warn("[discovery-bookings] stored=false but admin notified — recover from email", booking.email);
    }

    return NextResponse.json({ booking: publicBooking(booking) });
  } catch (err) {
    console.error("[discovery-bookings] unexpected failure", err);
    if (booking) {
      console.error("[discovery-bookings] LEAD", JSON.stringify(booking));
      return NextResponse.json({ booking: publicBooking(booking) });
    }
    return NextResponse.json({ error: "The booking could not be completed." }, { status: 500 });
  }
}

/**
 * Confirmation to the visitor + notification to the admin inbox.
 *
 * Returns true only if the ADMIN was reached — that is what makes a lead
 * recoverable when the database is unavailable. A failed client confirmation
 * is bad, but it does not lose the lead.
 */
async function sendBookingEmails(b: StoredBooking): Promise<boolean> {
  if (!emailReady()) {
    console.error("[discovery-bookings] EMAIL NOT CONFIGURED — set RESEND_API_KEY and DISCOVERY_FROM_EMAIL");
    return false;
  }

  const data: BookingEmailData = {
    firstName: b.first_name,
    lastName: b.last_name,
    email: b.email,
    phone: b.phone,
    company: b.company,
    role: b.role,
    website: b.website,
    message: b.message,
    startUtc: b.start_utc,
    timezone: b.timezone,
    durationMinutes: DISCOVERY_DURATION_MINUTES,
    source: b.source,
  };

  const adminTo = process.env.DISCOVERY_ADMIN_EMAIL;
  let adminOk = false;

  if (!adminTo) {
    console.error("[discovery-bookings] DISCOVERY_ADMIN_EMAIL not set — nobody is being notified");
  } else {
    const mail = adminBookingEmail(data);
    const res = await sendEmail(
      { to: adminTo, subject: mail.subject, html: mail.html, replyTo: b.email },
      `${b.id}-admin`,
    );
    if (res.error) console.error("[discovery-bookings] admin email failed", res.error);
    else adminOk = true;
  }

  const clientMail = clientBookingEmail(data);
  const clientRes = await sendEmail(
    { to: b.email, subject: clientMail.subject, html: clientMail.html, ...(adminTo ? { replyTo: adminTo } : {}) },
    `${b.id}-client`,
  );
  if (clientRes.error) console.error("[discovery-bookings] client email failed", clientRes.error);

  return adminOk;
}

function publicBooking(b: StoredBooking) {
  return {
    id: b.id,
    startUtc: b.start_utc,
    endUtc: b.end_utc,
    visitorTimezone: b.timezone,
    company: b.company,
    firstName: b.first_name,
    email: b.email,
    durationMinutes: DISCOVERY_DURATION_MINUTES,
  };
}
