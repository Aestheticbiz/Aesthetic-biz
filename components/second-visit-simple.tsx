"use client";

import { useMemo, useState } from "react";

/**
 * Owner-facing second-visit calculator.
 * Same geometric visit model as /second-visit, explained as "out of 10".
 * Nothing is sent anywhere.
 */

const FIELDS = [
  {
    key: "patients",
    label: "New patients a month",
    hint: "People you see for the first time.",
    min: 5,
    max: 120,
    step: 1,
    prefix: "",
    suffix: "",
  },
  {
    key: "value",
    label: "What a typical visit invoices",
    hint: "The number on the invoice, including anything they take home.",
    min: 150,
    max: 2500,
    step: 25,
    prefix: "$",
    suffix: "",
  },
  {
    key: "spend",
    label: "What you spend on ads a month",
    hint: "Facebook, Google, Instagram, the agency — the lot.",
    min: 0,
    max: 25000,
    step: 250,
    prefix: "$",
    suffix: "",
  },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function money(n: number) {
  if (!Number.isFinite(n)) return "—";
  return usd.format(Math.round(n));
}

function visitsFrom(returned: number) {
  const r = Math.min(Math.max(returned, 0), 9) / 10;
  return 1 / (1 - r);
}

export function SecondVisitSimple() {
  const [patients, setPatients] = useState(25);
  const [value, setValue] = useState(600);
  const [spend, setSpend] = useState(3000);
  const [returned, setReturned] = useState(3);

  const values: Record<FieldKey, number> = { patients, value, spend };

  const result = useMemo(() => {
    const better = Math.min(returned + 2, 9);
    const visitsNow = visitsFrom(returned);
    const visitsBetter = visitsFrom(better);
    const cac = patients > 0 ? spend / patients : 0;
    const leftover = value - cac;
    const cohort = patients * 12;
    const extraVisits = (visitsBetter - visitsNow) * cohort;
    const gap = extraVisits * value;
    const adsShare = value > 0 ? Math.min(cac / value, 1.35) : 0;

    return {
      cac,
      leftover,
      gap,
      extraVisits,
      better,
      visitsNow,
      visitsBetter,
      adsShare,
      adsAteTheVisit: cac >= value,
    };
  }, [patients, value, spend, returned]);

  const lost = 10 - returned;
  const barMax = Math.max(result.visitsNow, result.visitsBetter, 0.01);

  return (
    <div className="svg-calc">
      <div className="svg-calc-inputs">
        <fieldset className="svg-ten">
          <legend>Out of every 10 new patients, how many come back?</legend>
          <div className="svg-ten-dots" role="radiogroup" aria-label="How many of ten return">
            {Array.from({ length: 10 }, (_, i) => {
              const n = i + 1;
              const on = n <= returned;
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={n === returned}
                  aria-label={`${n} out of 10 come back`}
                  className={on ? "is-on" : "is-off"}
                  onClick={() => setReturned(n === 10 ? 9 : n)}
                />
              );
            })}
          </div>
          <p className="svg-ten-read">
            <strong>{returned} come back.</strong> {lost} do not. Most owners guess high.
          </p>
        </fieldset>

        {FIELDS.map((field) => (
          <label className="svg-field" key={field.key}>
            <span className="svg-field-head">
              <span>{field.label}</span>
              <output>
                {field.prefix}
                {values[field.key].toLocaleString("en-US")}
                {field.suffix}
              </output>
            </span>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={values[field.key]}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (field.key === "patients") setPatients(n);
                if (field.key === "value") setValue(n);
                if (field.key === "spend") setSpend(n);
              }}
            />
            <span className="svg-field-hint">{field.hint}</span>
          </label>
        ))}
      </div>

      <div className="svg-calc-out" aria-live="polite">
        <p className="svg-headline-label">
          If {result.better} in 10 came back instead of {returned}, a year of new patients is worth
        </p>
        <p className="svg-headline-figure">{money(result.gap)}</p>
        <p className="svg-headline-sub">
          extra — same ads, same rooms, nobody new. That is {Math.round(result.extraVisits)} more
          visits from people you have already treated.
        </p>

        <div className="svg-bars" aria-hidden="true">
          <div className="svg-bar-row">
            <span>This year</span>
            <div className="svg-bar-track">
              <div
                className="svg-bar svg-bar-now"
                style={{ width: `${(result.visitsNow / barMax) * 100}%` }}
              />
            </div>
            <strong>{result.visitsNow.toFixed(1)} visits each</strong>
          </div>
          <div className="svg-bar-row">
            <span>If two more came back</span>
            <div className="svg-bar-track">
              <div
                className="svg-bar svg-bar-better"
                style={{ width: `${(result.visitsBetter / barMax) * 100}%` }}
              />
            </div>
            <strong>{result.visitsBetter.toFixed(1)} visits each</strong>
          </div>
        </div>

        <div className="svg-visits">
          <article>
            <h3>First visit</h3>
            <p className="svg-visit-sum">{money(value)}</p>
            <div className="svg-stack" aria-hidden="true">
              <div
                className="svg-stack-ads"
                style={{ width: `${Math.min(result.adsShare, 1) * 100}%` }}
              />
            </div>
            <p>
              {result.adsAteTheVisit ? (
                <>
                  You paid <strong>{money(result.cac)}</strong> in ads to get them in. The invoice
                  does not cover it.
                </>
              ) : (
                <>
                  <strong>{money(result.cac)}</strong> of this already went on ads.{" "}
                  {money(result.leftover)} is left on the invoice.
                </>
              )}
            </p>
          </article>
          <article>
            <h3>Second visit</h3>
            <p className="svg-visit-sum is-gold">{money(value)}</p>
            <div className="svg-stack is-full" aria-hidden="true">
              <div className="svg-stack-keep" style={{ width: "100%" }} />
            </div>
            <p>
              No ads behind this one. Full fee. This is the visit that actually pays the clinic.
            </p>
          </article>
        </div>

        <p className="svg-method">
          If {returned} in 10 return, an average new patient visits about {result.visitsNow.toFixed(1)}{" "}
          times. If {result.better} in 10 return, about {result.visitsBetter.toFixed(1)}. Nothing you
          type is sent anywhere — there is no sign-up on this page.
        </p>
      </div>
    </div>
  );
}
