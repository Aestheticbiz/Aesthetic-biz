"use client";

import Link from "next/link";
import { useState } from "react";
import { BOOKING_OPTIONS as OPTIONS } from "@/lib/site";

const TIMES = ["10:00", "10:45", "11:30", "13:00", "14:00", "15:00", "16:00", "16:45"];

const CAL_DAYS = ["Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState("");

  const calendarDays = Array.from({ length: 10 }, (_, i) => {
    const day = CAL_DAYS[i % 5];
    const n = 28 + (i % 5) + Math.floor(i / 5) * 5;
    return `${day} ${n}`;
  });

  function next() {
    if (step === 1 && !treatment) {
      alert("Please select a treatment.");
      return;
    }
    if (step === 2 && !date) {
      alert("Please select a date.");
      return;
    }
    if (step === 3 && !time) {
      alert("Please select a time.");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSummary(
      `${treatment} · ${date} · ${time} — preview only. Live build would confirm by email/SMS and log CRM + points.`,
    );
    setDone(true);
  }

  if (done) {
    return (
      <div className="booking-wizard">
        <div className="booking-success">
          <div className="booking-success-icon">✓</div>
          <h2>Demo booking captured</h2>
          <p>{summary}</p>
          <Link className="btn btn-navy" href="/">
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-wizard">
      <div className="booking-progress">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`step-dot${step === n ? " active" : ""}${step > n ? " done" : ""}`}
            data-step={n}
          >
            <span>{n}</span>{" "}
            {n === 1 ? "Treatment" : n === 2 ? "Date" : n === 3 ? "Time" : "Details"}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="booking-step active">
          <h2>What would you like to book?</h2>
          <p>Select a treatment or package. Prices match a premium Midtown menu.</p>
          <div className="treatment-select-grid">
            {OPTIONS.map((opt) => (
              <button
                key={opt.name}
                type="button"
                className={`treatment-option${treatment.startsWith(opt.name) ? " selected" : ""}`}
                onClick={() => setTreatment(`${opt.name} (${opt.price})`)}
              >
                <strong>{opt.name}</strong>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="booking-nav">
            <span />
            <button type="button" className="btn btn-navy" onClick={next}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="booking-step active">
          <h2>Choose a date</h2>
          <p>Studio hours: Tuesday–Saturday, 10am–6pm.</p>
          <div className="calendar-grid">
            {calendarDays.map((d) => (
              <button
                key={d}
                type="button"
                className={`cal-day${date === d ? " selected" : ""}`}
                onClick={() => setDate(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="booking-nav">
            <button type="button" className="btn btn-outline-dark" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button type="button" className="btn btn-navy" onClick={next}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="booking-step active">
          <h2>Choose a time</h2>
          <p>Available slots (demo).</p>
          <div className="time-grid">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                className={`time-slot${time === t ? " selected" : ""}`}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="booking-nav">
            <button type="button" className="btn btn-outline-dark" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button type="button" className="btn btn-navy" onClick={next}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="booking-step active">
          <h2>Your details</h2>
          <p>On the live platform this creates the appointment + confirmation email + CRM lead.</p>
          <form
            className="lead-form"
            style={{ boxShadow: "none", border: "1px solid var(--border)" }}
            onSubmit={onSubmit}
          >
            <div className="form-row">
              <label>Full name</label>
              <input name="name" required placeholder="Full name" />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input name="email" type="email" required placeholder="you@email.com" />
            </div>
            <div className="form-row">
              <label>Phone</label>
              <input name="phone" type="tel" required placeholder="(347) …" />
            </div>
            <div className="form-row">
              <label>Notes</label>
              <textarea name="notes" rows={3} placeholder="Skin concerns, first visit, etc." />
            </div>
            <div className="booking-nav">
              <button type="button" className="btn btn-outline-dark" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button type="submit" className="btn btn-gold">
                Confirm booking (demo)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
