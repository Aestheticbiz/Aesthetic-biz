"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DISCOVERY_BOOKING_STORAGE_KEY,
  DISCOVERY_TIMEZONES,
  formatDiscoveryDate,
  formatDiscoveryLong,
  formatDiscoverySlot,
  type DiscoveryAvailability,
} from "@/lib/discovery";

type BookingResult = {
  id: string;
  startUtc: string;
  endUtc: string;
  visitorTimezone: string;
  company: string;
  firstName: string;
  email: string;
  durationMinutes: number;
};

export function DiscoveryBookingWizard() {
  const router = useRouter();
  const [availability, setAvailability] = useState<DiscoveryAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetch("/api/discovery-bookings", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as DiscoveryAvailability & { error?: string };
        if (!response.ok) throw new Error(data.error || "Availability could not be loaded.");
        setAvailability(data);
      })
      .catch((error: Error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const booked = useMemo(() => new Set(availability?.booked || []), [availability]);
  const selectedLocal = date && time ? formatDiscoveryLong(date, time, timezone) : "";
  const selectedSa =
    date && time ? formatDiscoveryLong(date, time, "Africa/Johannesburg") : "";

  function chooseDate(value: string) {
    setDate(value);
    setTime("");
    setStep(2);
    setSubmitError("");
  }

  function chooseTime(value: string) {
    setTime(value);
    setStep(3);
    setSubmitError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !time) return;
    setSubmitting(true);
    setSubmitError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/discovery-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          date,
          time,
          timezone,
          source:
            new URLSearchParams(window.location.search).get("source") || "aestheticbiz",
        }),
      });
      const data = (await response.json()) as { booking?: BookingResult; error?: string };
      if (!response.ok || !data.booking) {
        throw new Error(data.error || "The booking could not be completed.");
      }
      sessionStorage.setItem(DISCOVERY_BOOKING_STORAGE_KEY, JSON.stringify(data.booking));
      router.push("/book-discovery/thank-you");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "The booking could not be completed.");
      if (/already|choose another/i.test(error instanceof Error ? error.message : "")) {
        setStep(2);
        fetch("/api/discovery-bookings", { cache: "no-store" })
          .then((r) => r.json())
          .then((data: DiscoveryAvailability) => setAvailability(data))
          .catch(() => undefined);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="booking-wizard discovery-wizard">
        <div className="booking-success" style={{ padding: "48px 24px" }}>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            Checking the next available Discovery Call times…
          </p>
        </div>
      </div>
    );
  }

  if (loadError || !availability) {
    return (
      <div className="booking-wizard discovery-wizard">
        <div className="booking-success">
          <h2>Availability temporarily unavailable</h2>
          <p>{loadError || "Please try again shortly."}</p>
          <a className="btn btn-navy" href="https://www.crmsolutions.app/book-discovery-call">
            Book on CRM Solutions →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-wizard discovery-wizard">
      <div className="booking-progress">
        {[
          [1, "Date"],
          [2, "Time"],
          [3, "Details"],
        ].map(([n, label]) => (
          <button
            key={n}
            type="button"
            className={`step-dot${step === n ? " active" : ""}${step > Number(n) ? " done" : ""}`}
            disabled={Number(n) >= step}
            onClick={() => setStep(Number(n))}
          >
            <span>{step > Number(n) ? "✓" : n}</span> {label}
          </button>
        ))}
      </div>

      <div className="discovery-meta">
        <div>
          <span>Times shown in</span>
          <strong>
            {DISCOVERY_TIMEZONES.find(([value]) => value === timezone)?.[1] ||
              timezone.replaceAll("_", " ")}
          </strong>
        </div>
        <label>
          <span className="sr-only">Change timezone</span>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            {!DISCOVERY_TIMEZONES.some(([value]) => value === timezone) && (
              <option value={timezone}>{timezone.replaceAll("_", " ")}</option>
            )}
            {DISCOVERY_TIMEZONES.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="discovery-hours-note">
        Same hours as CRM Solutions · Monday–Friday · 14:00 / 15:00 / 16:00 SAST · 60 minutes ·
        book at least 24 hours ahead
      </p>

      {step === 1 && (
        <div className="booking-step active">
          <h2>Choose a workday</h2>
          <p>Available Monday to Friday. Your exact local time appears on the next step.</p>
          <div className="calendar-grid discovery-date-grid">
            {availability.dates.map((item) => {
              const [weekday, rest] = formatDiscoveryDate(item).split(", ");
              return (
                <button
                  key={item}
                  type="button"
                  className={`cal-day${date === item ? " selected" : ""}`}
                  onClick={() => chooseDate(item)}
                >
                  <span className="cal-weekday">{weekday}</span>
                  <strong>{rest}</strong>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && date && (
        <div className="booking-step active">
          <h2>Choose your local time</h2>
          <p>
            {formatDiscoveryDate(date)} · Three one-hour Discovery Call appointments
          </p>
          <div className="time-grid discovery-time-grid">
            {availability.slots.map((slot) => {
              const startIso = new Date(`${date}T${slot}:00+02:00`).toISOString();
              const unavailable = booked.has(startIso);
              return (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot discovery-slot${time === slot ? " selected" : ""}`}
                  disabled={unavailable}
                  onClick={() => chooseTime(slot)}
                >
                  <span>Your time</span>
                  <strong>{formatDiscoverySlot(date, slot, timezone)}</strong>
                  <small>
                    South Africa {formatDiscoverySlot(date, slot, "Africa/Johannesburg")}
                  </small>
                  <i>{unavailable ? "Booked" : "Available"}</i>
                </button>
              );
            })}
          </div>
          <div className="booking-nav">
            <button type="button" className="btn btn-outline-dark" onClick={() => setStep(1)}>
              ← Choose another date
            </button>
            <span />
          </div>
        </div>
      )}

      {step === 3 && date && time && (
        <div className="booking-step active">
          <h2>Tell Ignatius who he is meeting</h2>
          <p>
            Selected: <strong>{selectedLocal}</strong>
          </p>
          <div className="discovery-selected-card">
            <span>Your time</span>
            <b>{selectedLocal}</b>
            <small>South Africa: {selectedSa}</small>
            <button type="button" onClick={() => setStep(2)}>
              Change
            </button>
          </div>
          <form
            className="lead-form"
            style={{ boxShadow: "none", border: "1px solid var(--border)" }}
            onSubmit={submit}
          >
            <div className="form-row two">
              <div>
                <label>First name *</label>
                <input name="firstName" autoComplete="given-name" required />
              </div>
              <div>
                <label>Last name *</label>
                <input name="lastName" autoComplete="family-name" required />
              </div>
            </div>
            <div className="form-row two">
              <div>
                <label>Business email *</label>
                <input name="email" type="email" autoComplete="email" required />
              </div>
              <div>
                <label>Phone / WhatsApp</label>
                <input name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className="form-row two">
              <div>
                <label>Company *</label>
                <input name="company" autoComplete="organization" required />
              </div>
              <div>
                <label>Your role</label>
                <input name="role" autoComplete="organization-title" />
              </div>
            </div>
            <div className="form-row">
              <label>Website</label>
              <input name="website" type="url" placeholder="https://" inputMode="url" />
            </div>
            <div className="form-row">
              <label>What would make this call valuable? *</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="The commercial problem, current constraint, or decision you want to make."
              />
            </div>
            <div aria-hidden className="website-trap">
              <label>
                Leave blank
                <input name="websiteTrap" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {submitError ? (
              <p className="field-error" role="alert">
                {submitError}
              </p>
            ) : null}
            <div className="booking-nav">
              <button type="button" className="btn btn-outline-dark" onClick={() => setStep(2)}>
                ← Back to times
              </button>
              <button type="submit" className="btn btn-gold" disabled={submitting}>
                {submitting ? "Reserving your call…" : "Confirm Discovery Call →"}
              </button>
            </div>
            <p className="discovery-consent">
              By booking, you agree that CRM Solutions may contact you about this Discovery Call.
              Demo reservations are stored on AestheticBiz; live calendar sync matches{" "}
              <Link href="https://www.crmsolutions.app/book-discovery-call">
                crmsolutions.app
              </Link>
              .
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
