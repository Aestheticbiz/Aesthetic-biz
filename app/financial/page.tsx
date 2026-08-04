"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { discoveryUrl } from "@/lib/site";
import "./financial.css";

/* ── Types ──────────────────────────────────────────────────────────── */

type Row = { id: string; label: string; amount: number };
type Treatment = { id: string; label: string; price: number; perMonth: number };

type Model = {
  currency: string;
  utilities: Row[];
  staff: Row[];
  treatments: Treatment[];
  productRevenue: number;
  productMargin: number;
  treatmentMargin: number;
  extraPatientsPerWeek: number;
  productMultiplier: number;
  investment: number;
};

/* ── Defaults: an established practice, comfortably profitable ─────── */

const DEFAULTS: Model = {
  currency: "US$",
  utilities: [
    { id: "u1", label: "Rent", amount: 6500 },
    { id: "u2", label: "Electricity & water", amount: 900 },
  ],
  staff: [
    { id: "s1", label: "Front desk 1", amount: 3200 },
    { id: "s2", label: "Front desk 2", amount: 3000 },
    { id: "s3", label: "Cleaning staff", amount: 1400 },
    { id: "s4", label: "Nursing assistant 1", amount: 4200 },
    { id: "s5", label: "Nursing assistant 2", amount: 4000 },
    { id: "s6", label: "Medical doctor 1", amount: 12000 },
    { id: "s7", label: "Medical doctor 2", amount: 9000 },
  ],
  treatments: [
    { id: "t1", label: "Acne treatment", price: 250, perMonth: 34 },
    { id: "t2", label: "Pigmentation treatment", price: 400, perMonth: 22 },
    { id: "t3", label: "Lip filler", price: 650, perMonth: 30 },
    { id: "t4", label: "Jaw & chin contouring", price: 1200, perMonth: 10 },
    { id: "t5", label: "Excessive sweating", price: 1100, perMonth: 7 },
    { id: "t6", label: "Vitamin drips", price: 180, perMonth: 40 },
    { id: "t7", label: "Medical weight loss", price: 450, perMonth: 26 },
    { id: "t8", label: "Varicose vein treatment", price: 800, perMonth: 8 },
  ],
  productRevenue: 9000,
  productMargin: 50,
  treatmentMargin: 70,
  extraPatientsPerWeek: 1,
  productMultiplier: 2,
  investment: 10000,
};

const CURRENCIES = ["US$", "R", "£", "€", "A$"] as const;
const STORAGE_KEY = "aestheticbiz-financial-model-v1";
const WEEKS_PER_MONTH = 52 / 12;

/* ── Helpers ────────────────────────────────────────────────────────── */

function newId() {
  return `x${Math.random().toString(36).slice(2, 9)}`;
}

function sum(rows: Row[]) {
  return rows.reduce((total, row) => total + (row.amount || 0), 0);
}

export default function FinancialPage() {
  const discovery = discoveryUrl("financial-calculator");
  const [model, setModel] = useState<Model>(DEFAULTS);
  const [restored, setRestored] = useState(false);

  /* Load any saved model after mount, so server and client render alike. */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setModel({ ...DEFAULTS, ...(JSON.parse(saved) as Model) });
    } catch {
      /* corrupt or unavailable storage — defaults are fine */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
    } catch {
      /* private mode / quota — the page still works, it just won't persist */
    }
  }, [model, restored]);

  const set = <K extends keyof Model>(key: K, value: Model[K]) =>
    setModel((prev) => ({ ...prev, [key]: value }));

  const money = useMemo(() => {
    const symbol = model.currency;
    return (value: number) => {
      const rounded = Math.round(value);
      const sign = rounded < 0 ? "−" : "";
      return `${sign}${symbol}${Math.abs(rounded).toLocaleString("en-US")}`;
    };
  }, [model.currency]);

  /* ── The model ────────────────────────────────────────────────────── */
  const m = useMemo(() => {
    const fixedCosts = sum(model.utilities) + sum(model.staff);

    const treatmentRevenue = model.treatments.reduce(
      (total, t) => total + (t.price || 0) * (t.perMonth || 0),
      0,
    );
    const patientsPerMonth = model.treatments.reduce(
      (total, t) => total + (t.perMonth || 0),
      0,
    );
    const averageFee = patientsPerMonth > 0 ? treatmentRevenue / patientsPerMonth : 0;

    const tMargin = (model.treatmentMargin || 0) / 100;
    const pMargin = (model.productMargin || 0) / 100;

    const treatmentGross = treatmentRevenue * tMargin;
    const productGross = (model.productRevenue || 0) * pMargin;

    const revenue = treatmentRevenue + (model.productRevenue || 0);
    const grossProfit = treatmentGross + productGross;
    const netProfit = grossProfit - fixedCosts;

    /* The uplift. Fixed costs do not move — that is the entire point. */
    const extraPatients = (model.extraPatientsPerWeek || 0) * WEEKS_PER_MONTH;
    const extraTreatmentRevenue = extraPatients * averageFee;
    const extraTreatmentProfit = extraTreatmentRevenue * tMargin;

    const newProductRevenue = (model.productRevenue || 0) * (model.productMultiplier || 1);
    const extraProductRevenue = newProductRevenue - (model.productRevenue || 0);
    const extraProductProfit = extraProductRevenue * pMargin;

    const extraRevenue = extraTreatmentRevenue + extraProductRevenue;
    const extraProfit = extraTreatmentProfit + extraProductProfit;

    const newRevenue = revenue + extraRevenue;
    const newNetProfit = netProfit + extraProfit;

    const profitLift = netProfit > 0 ? (extraProfit / netProfit) * 100 : 0;
    const patientLift = patientsPerMonth > 0 ? (extraPatients / patientsPerMonth) * 100 : 0;
    const paybackMonths = extraProfit > 0 ? (model.investment || 0) / extraProfit : 0;

    return {
      fixedCosts,
      treatmentRevenue,
      patientsPerMonth,
      averageFee,
      treatmentGross,
      productGross,
      revenue,
      grossProfit,
      netProfit,
      extraPatients,
      extraRevenue,
      extraProfit,
      newRevenue,
      newNetProfit,
      profitLift,
      patientLift,
      paybackMonths,
    };
  }, [model]);

  /* ── Row editing ──────────────────────────────────────────────────── */
  const updateRow = (key: "utilities" | "staff", id: string, patch: Partial<Row>) =>
    setModel((prev) => ({
      ...prev,
      [key]: prev[key].map((row) => (row.id === id ? { ...row, ...patch } : row)),
    }));

  const removeRow = (key: "utilities" | "staff", id: string) =>
    setModel((prev) => ({ ...prev, [key]: prev[key].filter((row) => row.id !== id) }));

  const addRow = (key: "utilities" | "staff", label: string) =>
    setModel((prev) => ({ ...prev, [key]: [...prev[key], { id: newId(), label, amount: 0 }] }));

  const updateTreatment = (id: string, patch: Partial<Treatment>) =>
    setModel((prev) => ({
      ...prev,
      treatments: prev.treatments.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));

  const removeTreatment = (id: string) =>
    setModel((prev) => ({ ...prev, treatments: prev.treatments.filter((t) => t.id !== id) }));

  const addTreatment = () =>
    setModel((prev) => ({
      ...prev,
      treatments: [
        ...prev.treatments,
        { id: newId(), label: "New treatment", price: 0, perMonth: 0 },
      ],
    }));

  return (
    <main className="fin-page">
      <header className="fin-top">
        <Link href="/full-fee-patients" className="fin-mark">
          <strong>AestheticBiz</strong>
          <span>By CRM Solutions</span>
        </Link>
        <a className="fin-top-cta" href={discovery}>
          Book a Discovery Call
        </a>
      </header>

      <section className="fin-intro">
        <p className="fin-eyebrow">The one-patient calculator</p>
        <h1>What is one extra patient a week actually worth?</h1>
        <p className="fin-lede">
          Most owners have never put this on paper. The numbers below are estimates for a
          mid-sized practice — <strong>replace every one of them with your own</strong>. Nothing is
          sent anywhere; it saves in your browser and nowhere else.
        </p>

        <div className="fin-controls">
          <label className="fin-currency">
            <span>Currency</span>
            <select
              value={model.currency}
              onChange={(e) => set("currency", e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="fin-reset"
            onClick={() => setModel(DEFAULTS)}
          >
            Reset to example figures
          </button>
        </div>
      </section>

      <div className="fin-grid">
        {/* ── Inputs ───────────────────────────────────────────────── */}
        <div className="fin-inputs">
          {/* Utilities */}
          <section className="fin-card">
            <div className="fin-card-head">
              <h2>Premises</h2>
              <span>{money(sum(model.utilities))} / month</span>
            </div>
            <div className="fin-rows">
              {model.utilities.map((row) => (
                <div className="fin-row" key={row.id}>
                  <input
                    type="text"
                    className="fin-label-input"
                    value={row.label}
                    aria-label="Cost name"
                    onChange={(e) => updateRow("utilities", row.id, { label: e.target.value })}
                  />
                  <div className="fin-amount">
                    <span className="fin-symbol">{model.currency}</span>
                    <input
                      type="number"
                      min={0}
                      value={row.amount === 0 ? "" : row.amount}
                      placeholder="0"
                      aria-label={`${row.label} monthly amount`}
                      onChange={(e) =>
                        updateRow("utilities", row.id, { amount: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="fin-remove"
                    aria-label={`Remove ${row.label}`}
                    onClick={() => removeRow("utilities", row.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="fin-add" onClick={() => addRow("utilities", "New cost")}>
              + Add a premises cost
            </button>
          </section>

          {/* Staff */}
          <section className="fin-card">
            <div className="fin-card-head">
              <h2>Staff</h2>
              <span>{money(sum(model.staff))} / month</span>
            </div>
            <div className="fin-rows">
              {model.staff.map((row) => (
                <div className="fin-row" key={row.id}>
                  <input
                    type="text"
                    className="fin-label-input"
                    value={row.label}
                    aria-label="Role name"
                    onChange={(e) => updateRow("staff", row.id, { label: e.target.value })}
                  />
                  <div className="fin-amount">
                    <span className="fin-symbol">{model.currency}</span>
                    <input
                      type="number"
                      min={0}
                      value={row.amount === 0 ? "" : row.amount}
                      placeholder="0"
                      aria-label={`${row.label} monthly cost`}
                      onChange={(e) =>
                        updateRow("staff", row.id, { amount: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="fin-remove"
                    aria-label={`Remove ${row.label}`}
                    onClick={() => removeRow("staff", row.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="fin-add" onClick={() => addRow("staff", "New role")}>
              + Add a role
            </button>
          </section>

          {/* Treatments */}
          <section className="fin-card">
            <div className="fin-card-head">
              <h2>Treatments</h2>
              <span>{money(m.treatmentRevenue)} / month</span>
            </div>
            <div className="fin-treat-head" aria-hidden="true">
              <span>Treatment</span>
              <span>Fee</span>
              <span>Per month</span>
              <span />
            </div>
            <div className="fin-rows">
              {model.treatments.map((t) => (
                <div className="fin-treat-row" key={t.id}>
                  <input
                    type="text"
                    className="fin-label-input"
                    value={t.label}
                    aria-label="Treatment name"
                    onChange={(e) => updateTreatment(t.id, { label: e.target.value })}
                  />
                  <div className="fin-amount">
                    <span className="fin-symbol">{model.currency}</span>
                    <input
                      type="number"
                      min={0}
                      value={t.price === 0 ? "" : t.price}
                      placeholder="0"
                      aria-label={`${t.label} fee`}
                      onChange={(e) =>
                        updateTreatment(t.id, { price: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div className="fin-amount fin-amount-plain">
                    <input
                      type="number"
                      min={0}
                      value={t.perMonth === 0 ? "" : t.perMonth}
                      placeholder="0"
                      aria-label={`${t.label} patients per month`}
                      onChange={(e) =>
                        updateTreatment(t.id, { perMonth: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="fin-remove"
                    aria-label={`Remove ${t.label}`}
                    onClick={() => removeTreatment(t.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="fin-add" onClick={addTreatment}>
              + Add a treatment
            </button>
          </section>

          {/* Retail + margins */}
          <section className="fin-card">
            <div className="fin-card-head">
              <h2>Retail &amp; margins</h2>
              <span>{money(model.productRevenue)} / month</span>
            </div>
            <div className="fin-rows">
              <div className="fin-row">
                <label className="fin-static-label" htmlFor="fin-prod-rev">
                  Product sales per month
                </label>
                <div className="fin-amount">
                  <span className="fin-symbol">{model.currency}</span>
                  <input
                    id="fin-prod-rev"
                    type="number"
                    min={0}
                    value={model.productRevenue === 0 ? "" : model.productRevenue}
                    placeholder="0"
                    onChange={(e) => set("productRevenue", Number(e.target.value) || 0)}
                  />
                </div>
                <span className="fin-spacer" />
              </div>

              <div className="fin-row">
                <label className="fin-static-label" htmlFor="fin-t-margin">
                  Treatment margin after consumables
                </label>
                <div className="fin-amount fin-amount-pct">
                  <input
                    id="fin-t-margin"
                    type="number"
                    min={0}
                    max={100}
                    value={model.treatmentMargin === 0 ? "" : model.treatmentMargin}
                    placeholder="0"
                    onChange={(e) => set("treatmentMargin", Number(e.target.value) || 0)}
                  />
                  <span className="fin-symbol">%</span>
                </div>
                <span className="fin-spacer" />
              </div>

              <div className="fin-row">
                <label className="fin-static-label" htmlFor="fin-p-margin">
                  Product margin
                </label>
                <div className="fin-amount fin-amount-pct">
                  <input
                    id="fin-p-margin"
                    type="number"
                    min={0}
                    max={100}
                    value={model.productMargin === 0 ? "" : model.productMargin}
                    placeholder="0"
                    onChange={(e) => set("productMargin", Number(e.target.value) || 0)}
                  />
                  <span className="fin-symbol">%</span>
                </div>
                <span className="fin-spacer" />
              </div>
            </div>
            <p className="fin-note">
              Gross profit on treatments {money(m.treatmentGross)} · on products{" "}
              {money(m.productGross)} per month.
            </p>
          </section>
        </div>

        {/* ── Results ──────────────────────────────────────────────── */}
        <div className="fin-results">
          <section className="fin-panel">
            <h2>Where the practice stands today</h2>
            <dl className="fin-figures">
              <div>
                <dt>Revenue</dt>
                <dd>{money(m.revenue)}</dd>
              </div>
              <div>
                <dt>Gross profit</dt>
                <dd>{money(m.grossProfit)}</dd>
              </div>
              <div>
                <dt>Fixed costs</dt>
                <dd>−{money(m.fixedCosts).replace("−", "")}</dd>
              </div>
              <div className="fin-figure-total">
                <dt>Net profit / month</dt>
                <dd>{money(m.netProfit)}</dd>
              </div>
              <div className="fin-figure-total">
                <dt>Net profit / year</dt>
                <dd>{money(m.netProfit * 12)}</dd>
              </div>
            </dl>
            <p className="fin-panel-note">
              {Math.round(m.patientsPerMonth)} patients a month, average fee{" "}
              {money(m.averageFee)}.
            </p>
          </section>

          <section className="fin-panel fin-panel-magic">
            <p className="fin-eyebrow fin-eyebrow-gold">Now the arithmetic nobody runs</p>
            <h2>Add one patient a week.</h2>

            <div className="fin-sliders">
              <label>
                <span>
                  Extra patients per week <b>{model.extraPatientsPerWeek}</b>
                </span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={model.extraPatientsPerWeek}
                  onChange={(e) => set("extraPatientsPerWeek", Number(e.target.value))}
                />
              </label>
              <label>
                <span>
                  Retail sales multiplier <b>{model.productMultiplier}×</b>
                </span>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={0.5}
                  value={model.productMultiplier}
                  onChange={(e) => set("productMultiplier", Number(e.target.value))}
                />
              </label>
            </div>

            <p className="fin-magic-why">
              Your rent, salaries and utilities do not change when one more patient walks in. That
              is why the extra fee converts almost entirely into profit.
            </p>

            <table className="fin-compare">
              <thead>
                <tr>
                  <th scope="col">Per month</th>
                  <th scope="col">Today</th>
                  <th scope="col">After</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Revenue</th>
                  <td>{money(m.revenue)}</td>
                  <td>{money(m.newRevenue)}</td>
                </tr>
                <tr>
                  <th scope="row">Fixed costs</th>
                  <td>{money(m.fixedCosts)}</td>
                  <td>{money(m.fixedCosts)}</td>
                </tr>
                <tr className="fin-compare-total">
                  <th scope="row">Net profit</th>
                  <td>{money(m.netProfit)}</td>
                  <td>{money(m.newNetProfit)}</td>
                </tr>
              </tbody>
            </table>

            <div className="fin-headline-figures">
              <div>
                <span>Extra profit per month</span>
                <strong>{money(m.extraProfit)}</strong>
              </div>
              <div className="fin-headline-year">
                <span>Extra profit per year</span>
                <strong>{money(m.extraProfit * 12)}</strong>
              </div>
            </div>

            {m.netProfit > 0 && m.patientLift > 0 && (
              <p className="fin-leverage">
                {m.patientLift.toFixed(1)}% more patients produces{" "}
                <b>{m.profitLift.toFixed(0)}% more profit.</b>
              </p>
            )}

            <div className="fin-payback">
              <label htmlFor="fin-investment">
                <span>Build cost</span>
                <div className="fin-amount">
                  <span className="fin-symbol">{model.currency}</span>
                  <input
                    id="fin-investment"
                    type="number"
                    min={0}
                    value={model.investment === 0 ? "" : model.investment}
                    placeholder="0"
                    onChange={(e) => set("investment", Number(e.target.value) || 0)}
                  />
                </div>
              </label>
              <p>
                {m.paybackMonths > 0 ? (
                  <>
                    Pays for itself in{" "}
                    <b>
                      {m.paybackMonths < 1
                        ? "under a month"
                        : `${m.paybackMonths.toFixed(1)} months`}
                    </b>
                    , then compounds every month after that.
                  </>
                ) : (
                  <>Set an uplift above to see the payback period.</>
                )}
              </p>
            </div>
          </section>

          <section className="fin-cta">
            <h2>That is the whole argument.</h2>
            <p>
              Not a better website. One more patient a week, and retail that finally sells — from an
              online business that works while the practice is closed.
            </p>
            <a className="fin-btn" href={discovery}>
              Book a 20-Minute Discovery Call
            </a>
            <p className="fin-cta-note">
              Or <Link href="/full-fee-patients">read how the ninety days work →</Link>
            </p>
          </section>
        </div>
      </div>

      <p className="fin-foot">
        These figures are a planning guide, not a forecast, and no result is promised or implied.
        Every number is an estimate you control. Nothing you type here leaves your browser.
      </p>
    </main>
  );
}
