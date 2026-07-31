/** Same Discovery Call hours as CRM Solutions (crmsolutions.app/book-discovery-call) */

export const DISCOVERY_SLOT_HOURS = [14, 15, 16] as const; // SAST
export const DISCOVERY_SA_OFFSET = "+02:00";
export const DISCOVERY_DURATION_MINUTES = 60;
export const DISCOVERY_BASE_TIMEZONE = "Africa/Johannesburg";
export const DISCOVERY_LEAD_HOURS = 24;
export const DISCOVERY_DATE_COUNT = 15;

export const DISCOVERY_TIMEZONES = [
  ["America/New_York", "Eastern Time"],
  ["America/Chicago", "Central Time"],
  ["America/Denver", "Mountain Time"],
  ["America/Los_Angeles", "Pacific Time"],
  ["Africa/Johannesburg", "South Africa"],
] as const;

export type DiscoveryAvailability = {
  dates: string[];
  slots: string[];
  booked: string[];
  baseTimezone: string;
  durationMinutes: number;
};

export function discoverySlotStart(date: string, time: string) {
  return new Date(`${date}T${time}:00${DISCOVERY_SA_OFFSET}`);
}

export function discoverySlots() {
  return DISCOVERY_SLOT_HOURS.map((h) => `${String(h).padStart(2, "0")}:00`);
}

/** Next Mon–Fri dates that still have at least one slot ≥ 24h ahead (SAST days). */
export function nextDiscoveryBusinessDates(count = DISCOVERY_DATE_COUNT): string[] {
  const now = new Date();
  const saNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const cursor = new Date(
    Date.UTC(saNow.getUTCFullYear(), saNow.getUTCMonth(), saNow.getUTCDate(), 12),
  );
  const dates: string[] = [];
  const slots = discoverySlots();
  const leadMs = DISCOVERY_LEAD_HOURS * 60 * 60 * 1000;

  while (dates.length < count) {
    const date = cursor.toISOString().slice(0, 10);
    const day = cursor.getUTCDay();
    const hasFutureSlot = slots.some((time) => {
      const start = discoverySlotStart(date, time);
      return start.getTime() - now.getTime() >= leadMs;
    });
    if (day >= 1 && day <= 5 && hasFutureSlot) dates.push(date);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

export function isAllowedDiscoverySlot(date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:00$/.test(time)) return false;
  const hour = Number(time.slice(0, 2));
  if (!(DISCOVERY_SLOT_HOURS as readonly number[]).includes(hour)) return false;
  const start = discoverySlotStart(date, time);
  const day = start.getUTCDay();
  return !Number.isNaN(start.getTime()) && day >= 1 && day <= 5;
}

export function buildDiscoveryAvailability(booked: string[] = []): DiscoveryAvailability {
  return {
    dates: nextDiscoveryBusinessDates(),
    slots: discoverySlots(),
    booked,
    baseTimezone: DISCOVERY_BASE_TIMEZONE,
    durationMinutes: DISCOVERY_DURATION_MINUTES,
  };
}

export function formatDiscoveryDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(discoverySlotStart(date, "12:00"));
}

export function formatDiscoverySlot(date: string, time: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(discoverySlotStart(date, time));
}

export function formatDiscoveryLong(date: string, time: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(discoverySlotStart(date, time));
}

export const DISCOVERY_BOOKING_STORAGE_KEY = "aestheticbiz-discovery-booking";
