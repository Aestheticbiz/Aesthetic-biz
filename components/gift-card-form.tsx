"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/site";

const DENOMS = [100, 250, 500, 1000];

export function GiftCardForm() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(250);

  useEffect(() => {
    const raw = searchParams.get("amount");
    if (!raw) return;
    const parsed = Number(raw);
    if (DENOMS.includes(parsed)) setAmount(parsed);
  }, [searchParams]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="shell gift-layout">
      <form
        className="lead-form"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Preview only — live platform emails the digital gift card.");
        }}
      >
        <h3
          style={{
            margin: "0 0 16px",
            fontFamily: "var(--font-display)",
            fontSize: 28,
            color: "var(--navy)",
          }}
        >
          Create a gift card
        </h3>
        <div className="form-row">
          <label>Amount</label>
          <div className="denom-grid">
            {DENOMS.map((d) => (
              <button
                key={d}
                type="button"
                className={`denom${amount === d ? " selected" : ""}`}
                onClick={() => setAmount(d)}
              >
                ${d}
              </button>
            ))}
          </div>
        </div>
        <div className="form-row">
          <label>Recipient name</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Who is this for?"
            required
          />
        </div>
        <div className="form-row">
          <label>Recipient email</label>
          <input type="email" placeholder="their@email.com" required />
        </div>
        <div className="form-row">
          <label>Your name</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            required
          />
        </div>
        <div className="form-row">
          <label>Personal message</label>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={3}
            placeholder={`Congrats — treat yourself at ${SITE.name} on Madison…`}
          />
        </div>
        <button className="btn btn-gold btn-block" type="submit">
          Send gift card (demo)
        </button>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}>
          Delivered by email with a redeem code. Purchases can also earn AestheticBiz Points
          for the buyer where eligible.
        </p>
      </form>

      <div className="gift-preview-card" aria-live="polite">
        <div className="logo-main">{SITE.name}</div>
        <div className="gift-amount">${amount}</div>
        <p className="gift-message">
          {msg ||
            "A Midtown medical spa experience — facials, peels, laser & skincare."}
        </p>
        <p className="gift-recipient">
          To: <span>{to || "Someone special"}</span>
          <br />
          From: <span>{from || "You"}</span>
        </p>
      </div>
    </div>
  );
}
