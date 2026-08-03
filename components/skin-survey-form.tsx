"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Question = {
  id: string;
  prompt: string;
  options: { label: string; score: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "concern",
    prompt: "What is your main skin concern right now?",
    options: [
      { label: "Acne or breakouts", score: 2 },
      { label: "Pigmentation / uneven tone", score: 3 },
      { label: "Texture / dullness", score: 3 },
      { label: "Ageing / loss of firmness", score: 4 },
    ],
  },
  {
    id: "routine",
    prompt: "How consistent is your current skincare routine?",
    options: [
      { label: "I barely have one", score: 1 },
      { label: "Basics only (cleanser + moisturiser)", score: 2 },
      { label: "Actives a few times a week", score: 3 },
      { label: "Daily clinical-grade routine", score: 4 },
    ],
  },
  {
    id: "sun",
    prompt: "How often do you use broad-spectrum sunscreen?",
    options: [
      { label: "Rarely", score: 1 },
      { label: "When I remember", score: 2 },
      { label: "Most days", score: 3 },
      { label: "Every morning, without fail", score: 4 },
    ],
  },
  {
    id: "clinic",
    prompt: "Have you had in-clinic treatments in the last 12 months?",
    options: [
      { label: "Never", score: 1 },
      { label: "Once", score: 2 },
      { label: "A few times", score: 3 },
      { label: "Regularly", score: 4 },
    ],
  },
  {
    id: "goal",
    prompt: "What would a successful next step look like?",
    options: [
      { label: "Clearer skin for events", score: 2 },
      { label: "A personalised plan I can stick to", score: 3 },
      { label: "Visible lift / refinement", score: 4 },
      { label: "I'm exploring — not sure yet", score: 2 },
    ],
  },
];

function scoreToBand(score: number): { label: string; detail: string } {
  if (score >= 8.5) {
    return {
      label: "Strong foundation",
      detail:
        "Your baseline looks organised. A consult can refine actives and in-clinic timing so retail and treatments work together.",
    };
  }
  if (score >= 6.5) {
    return {
      label: "Ready for a plan",
      detail:
        "You have momentum. A short consult usually clarifies which peel, facial pathway or home-care stack will move the needle fastest.",
    };
  }
  if (score >= 4.5) {
    return {
      label: "Needs a clearer path",
      detail:
        "Most patients in this band benefit from a structured assessment before more product spend — that is what this survey is for.",
    };
  }
  return {
    label: "Start with fundamentals",
    detail:
      "Begin with barrier support, sun protection and a guided consult. The platform can book that visit on-brand — no third-party exit.",
  };
}

export function SkinSurveyForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const finished = step >= QUESTIONS.length;

  const score = useMemo(() => {
    if (!answers.length) return 0;
    const raw = answers.reduce((sum, n) => sum + n, 0);
    const max = QUESTIONS.length * 4;
    return Math.round((raw / max) * 100) / 10;
  }, [answers]);

  const band = scoreToBand(score);
  const current = QUESTIONS[step];

  if (finished) {
    return (
      <div className="skin-survey-result">
        <p className="eyebrow">Your Skin Health Score</p>
        <div className="skin-survey-score-display">
          <strong>{score.toFixed(1)}</strong>
          <span>/ 10</span>
        </div>
        <h2>{band.label}</h2>
        <p>{band.detail}</p>
        <p className="skin-survey-demo-note">
          Preview only — a live clinic survey would email a full report and create a CRM lead for
          follow-up.
        </p>
        <div className="skin-survey-result-actions">
          <Link className="btn btn-navy" href="/book">
            Book a consultation →
          </Link>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              setStep(0);
              setAnswers([]);
            }}
          >
            Retake survey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="skin-survey-form">
      <div className="skin-survey-progress">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <div>
          <i style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>
      <h2>{current.prompt}</h2>
      <div className="skin-survey-options">
        {current.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => {
              setAnswers((prev) => [...prev, option.score]);
              setStep((prev) => prev + 1);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
