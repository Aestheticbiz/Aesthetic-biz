import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  buildDiscoveryAvailability,
  discoverySlotStart,
  DISCOVERY_DURATION_MINUTES,
  DISCOVERY_LEAD_HOURS,
  isAllowedDiscoverySlot,
} from "@/lib/discovery";

type StoredBooking = {
  id: string;
  startUtc: string;
  endUtc: string;
  date: string;
  time: string;
  timezone: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
  message: string;
  source: string;
  createdAt: string;
};

const storePath = () => path.join(process.cwd(), "data", "discovery-bookings.json");

async function readBookings(): Promise<StoredBooking[]> {
  try {
    const raw = await readFile(storePath(), "utf8");
    return JSON.parse(raw) as StoredBooking[];
  } catch {
    return [];
  }
}

async function writeBookings(rows: StoredBooking[]) {
  await mkdir(path.dirname(storePath()), { recursive: true });
  await writeFile(storePath(), JSON.stringify(rows, null, 2), "utf8");
}

export async function GET() {
  const bookings = await readBookings();
  const booked = bookings.map((b) => b.startUtc);
  return NextResponse.json(buildDiscoveryAvailability(booked), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.websiteTrap) {
      return NextResponse.json({ ok: true });
    }

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
    const now = Date.now();
    if (start.getTime() - now < DISCOVERY_LEAD_HOURS * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: "Please choose a slot at least 24 hours ahead." },
        { status: 400 },
      );
    }

    const startUtc = start.toISOString();
    const endUtc = new Date(start.getTime() + DISCOVERY_DURATION_MINUTES * 60 * 1000).toISOString();
    const existing = await readBookings();
    if (existing.some((b) => b.startUtc === startUtc)) {
      return NextResponse.json(
        { error: "That time has just been booked. Please choose another slot." },
        { status: 409 },
      );
    }

    const booking: StoredBooking = {
      id: `disc-${Date.now()}`,
      startUtc,
      endUtc,
      date,
      time,
      timezone,
      firstName,
      lastName,
      email,
      phone: String(body.phone ?? "").trim(),
      company,
      role: String(body.role ?? "").trim(),
      website: String(body.website ?? "").trim(),
      message,
      source: String(body.source ?? "aestheticbiz").trim(),
      createdAt: new Date().toISOString(),
    };

    existing.unshift(booking);
    await writeBookings(existing);

    return NextResponse.json({
      booking: {
        id: booking.id,
        startUtc: booking.startUtc,
        endUtc: booking.endUtc,
        visitorTimezone: timezone,
        company: booking.company,
        firstName: booking.firstName,
        email: booking.email,
        durationMinutes: DISCOVERY_DURATION_MINUTES,
      },
    });
  } catch (err) {
    console.error("discovery-bookings POST", err);
    return NextResponse.json({ error: "The booking could not be completed." }, { status: 500 });
  }
}
