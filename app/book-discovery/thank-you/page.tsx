"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DefaultPreviewBar } from "@/components/preview-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DISCOVERY_BOOKING_STORAGE_KEY } from "@/lib/discovery";

type Stored = {
  id: string;
  firstName: string;
  company: string;
  email: string;
  startUtc: string;
  visitorTimezone: string;
  durationMinutes: number;
};

export default function DiscoveryThankYouPage() {
  const [booking, setBooking] = useState<Stored | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DISCOVERY_BOOKING_STORAGE_KEY);
      if (raw) setBooking(JSON.parse(raw) as Stored);
    } catch {
      setBooking(null);
    }
  }, []);

  const when = booking
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: booking.visitorTimezone || "America/New_York",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date(booking.startUtc))
    : null;

  return (
    <>
      <DefaultPreviewBar />
      <SiteHeader variant="platform" />
      <section className="section">
        <div className="shell-narrow">
          <div className="booking-wizard">
            <div className="booking-success">
              <div className="booking-success-icon">✓</div>
              <h2>
                {booking ? `${booking.firstName}, your Discovery Call is reserved` : "Discovery Call reserved"}
              </h2>
              {when ? (
                <p>
                  <strong>{when}</strong>
                  <br />
                  {booking?.durationMinutes ?? 60} minutes · Online with Ignatius Ackermann
                  {booking?.company ? ` · ${booking.company}` : ""}
                </p>
              ) : (
                <p>
                  Your details were captured. If you need to rebook, use the Discovery Call engine
                  again.
                </p>
              )}
              <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                {booking?.email ? (
                  <>
                    A confirmation is on its way to <strong>{booking.email}</strong>.
                    <br />
                  </>
                ) : null}
                We&rsquo;ll follow up shortly with joining details. If you need to move or cancel
                the call, just reply to that email.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <Link className="btn btn-navy" href="/">
                  Back to AestheticBiz
                </Link>
                <Link className="btn btn-outline-dark" href="/features">
                  Platform features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter compact note="Discovery Call · AestheticBiz" />
    </>
  );
}
