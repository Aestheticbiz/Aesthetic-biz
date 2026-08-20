"use client";

import { useMemo, useState } from "react";

/**
 * The second-visit calculator — the approved design's markup and class names,
 * extended with acquisition cost and affordability.
 *
 * Headline model is the approved one: it counts at most ONE additional visit
 * per patient, which is conservative and is stated on the panel.
 *
 *   additional visits  = new patients × 12 × (target return % − current return %)
 *   additional revenue = additional visits × visit value
 *
 * The affordability figures extend it on the SAME basis, so the two halves of
 * the panel cannot contradict each other:
 *
 *   visits per patient = 1 + return rate
 *   value per patient  = visits per patient × visit value × gross margin
 *   affordable spend   = value per patient ÷ 3   (conventional healthy ratio)
 *   acquisition cost   = marketing spend ÷ new patients
 *
 * Nothing is stored or transmitted.
 */

const HEALTHY_RATIO = 3;

const formatMoney = (value: number) =>
  Number.isFinite(value)
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Math.round(value))
    : "—";

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <label className="slider-row">
      <span className="slider-label">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
        aria-label={label}
      />
      <span className="slider-range">
        <small>
          {min}
          {unit}
        </small>
        <small>
          {max}
          {unit}
        </small>
      </span>
    </label>
  );
}

export function SecondVisitCalculator() {
  const [patients, setPatients] = useState(25);
  const [visitValue, setVisitValue] = useState(500);
  const [currentReturn, setCurrentReturn] = useState(20);
  const [targetReturn, setTargetReturn] = useState(45);
  const [margin, setMargin] = useState(65);
  const [spend, setSpend] = useState(3000);

  const calculation = useMemo(() => {
    const annualPatients = patients * 12;
    const returnRateGap = Math.max(0, targetReturn - currentReturn) / 100;
    const additionalVisits = annualPatients * returnRateGap;
    const additionalRevenue = additionalVisits * visitValue;
    const grossProfit = additionalRevenue * (margin / 100);

    const marginPerVisit = visitValue * (margin / 100);
    const valueNow = (1 + currentReturn / 100) * marginPerVisit;
    const valueTarget = (1 + targetReturn / 100) * marginPerVisit;
    const cac = patients > 0 ? spend / patients : 0;

    return {
      additionalVisits,
      additionalRevenue,
      grossProfit,
      currentAnnualReturns: annualPatients * (currentReturn / 100),
      targetAnnualReturns: annualPatients * (targetReturn / 100),
      cac,
      valueNow,
      affordNow: valueNow / HEALTHY_RATIO,
      affordTarget: valueTarget / HEALTHY_RATIO,
      ratio: cac > 0 ? valueNow / cac : Infinity,
      paybackVisits: marginPerVisit > 0 ? cac / marginPerVisit : 0,
      uplift: valueNow > 0 ? valueTarget / valueNow - 1 : 0,
      hasGap: targetReturn > currentReturn,
    };
  }, [patients, visitValue, currentReturn, targetReturn, margin, spend]);

  return (
    <div className="calculator-grid">
      <div className="controls-panel">
        <Slider
          label="New patients per month"
          value={patients}
          min={5}
          max={150}
          step={1}
          display={String(patients)}
          onChange={setPatients}
        />
        <Slider
          label="Average visit value"
          value={visitValue}
          min={100}
          max={2500}
          step={50}
          display={formatMoney(visitValue)}
          onChange={setVisitValue}
        />
        <Slider
          label="Patients who currently return"
          value={currentReturn}
          min={0}
          max={80}
          step={1}
          unit="%"
          display={`${currentReturn}%`}
          onChange={(value) => {
            setCurrentReturn(value);
            if (value > targetReturn) setTargetReturn(value);
          }}
        />
        <Slider
          label="Return rate you want to model"
          value={targetReturn}
          min={5}
          max={90}
          step={1}
          unit="%"
          display={`${targetReturn}%`}
          onChange={(value) => {
            setTargetReturn(value);
            if (value < currentReturn) setCurrentReturn(value);
          }}
        />
        <Slider
          label="Gross margin per visit"
          value={margin}
          min={20}
          max={90}
          step={1}
          unit="%"
          display={`${margin}%`}
          onChange={setMargin}
        />
        <Slider
          label="Marketing spend per month"
          value={spend}
          min={0}
          max={50000}
          step={250}
          display={formatMoney(spend)}
          onChange={setSpend}
        />
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="result-kicker">One year, using your figures</p>
        <p className="result-label">Potential additional revenue</p>
        <strong className="result-number">{formatMoney(calculation.additionalRevenue)}</strong>
        <p className="result-explanation">
          {calculation.hasGap ? (
            <>
              If the share of new patients who return once moves from {currentReturn}% to{" "}
              {targetReturn}%, that represents approximately{" "}
              <b>{Math.round(calculation.additionalVisits)} additional visits</b> in a year — on
              the same marketing spend, the same rooms and the same team.
            </>
          ) : (
            <>
              Raise the modelled return rate above your current {currentReturn}% to see what a
              stronger return journey would be worth.
            </>
          )}
        </p>

        <div className="afford-row">
          <div>
            <span>You can afford to pay, per patient</span>
            <strong>{formatMoney(calculation.affordNow)}</strong>
            <small>at your return rate today</small>
          </div>
          <div className="afford-target">
            <span>You could afford</span>
            <strong>{formatMoney(calculation.affordTarget)}</strong>
            <small>at a {targetReturn}% return rate</small>
          </div>
        </div>

        {calculation.hasGap && (
          <p className="afford-read">
            That is {Math.round(calculation.uplift * 100)}% more than you can bid today for exactly
            the same patient. Whoever in your market can afford the most wins it — and that
            capacity is decided by the second visit, not by the ad account.
          </p>
        )}

        <div className="result-metrics">
          <div>
            <span>Cost to acquire a patient</span>
            <strong>{formatMoney(calculation.cac)}</strong>
          </div>
          <div>
            <span>What a patient is worth</span>
            <strong>{formatMoney(calculation.valueNow)}</strong>
          </div>
          <div>
            <span>Value against cost</span>
            <strong>
              {Number.isFinite(calculation.ratio)
                ? `${calculation.ratio.toFixed(1)} : 1`
                : "no spend"}
            </strong>
          </div>
          <div>
            <span>Visits to pay back acquisition</span>
            <strong>{calculation.paybackVisits.toFixed(1)}</strong>
          </div>
          <div>
            <span>Gross-profit opportunity</span>
            <strong>{formatMoney(calculation.grossProfit)}</strong>
          </div>
          <div>
            <span>Returns per year, modelled</span>
            <strong>
              {Math.round(calculation.currentAnnualReturns)} →{" "}
              {Math.round(calculation.targetAnnualReturns)}
            </strong>
          </div>
        </div>

        <div className="calculation-note">
          <span aria-hidden="true">i</span>
          <p>
            This is a planning estimate, not a forecast or guarantee. It models one additional
            visit only and excludes treatment mix, capacity, discounts, cancellations, tax and
            operating costs.
          </p>
        </div>
      </div>
    </div>
  );
}
