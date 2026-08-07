import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
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

    const supabase = getSupabaseServer();
    if (!supabase) {
      console.error("[discovery-bookings] STORAGE SKIPPED — Supabase not configured. LEAD", JSON.stringify(booking));
      return NextResponse.json({ booking: publicBooking(booking) });
    }

    const { error } = await supabase.from(TABLE).insert(booking);

    // 23505 = unique violation on start_utc: somebody took the slot first.
    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "That time has just been booked. Please choose another slot." },
        { status: 409 },
      );
    }
    if (error) {
      console.error("[discovery-bookings] STORAGE FAILED — booking captured in log only", error);
      console.error("[discovery-bookings] LEAD", JSON.stringify(booking));
      return NextResponse.json({ booking: publicBooking(booking) });
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
