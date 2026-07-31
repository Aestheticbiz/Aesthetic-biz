"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  REVIEW_QUESTIONS,
  VIDEO_PROMPTS,
  buildReviewAnswers,
  compileStructuredReview,
  emptyAnswers,
  getReviewSubjectOptions,
  resolveSubjectOption,
  subjectField,
} from "@/lib/reviews/forms";

type Tab = "write" | "video";

export default function ReviewFormClient({
  initialSubject = "",
}: {
  initialSubject?: string;
}) {
  const options = useMemo(() => getReviewSubjectOptions(), []);
  const defaultProduct =
    options.find((o) => o.label === initialSubject)?.label || options[0]?.label || "";

  const [tab, setTab] = useState<Tab>("write");
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    product: defaultProduct,
    rating: 0,
    headline: "",
    answers: emptyAnswers(),
    permission: false,
  });
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  // video
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const setAnswer = (id: string, value: string) => {
    setForm((p) => ({ ...p, answers: { ...p.answers, [id]: value } }));
    setErrors((p) => ({ ...p, [id]: "" }));
  };

  function validateWritten() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email required";
    }
    if (form.rating === 0) e.rating = "Please select a rating";
    if (!form.headline.trim()) e.headline = "Required";
    if (!form.product.trim()) e.product = "Please select a subject";
    for (const q of REVIEW_QUESTIONS) {
      const val = form.answers[q.id]?.trim() ?? "";
      const min = q.minLength ?? 30;
      if (!val) e[q.id] = "Please answer in detail";
      else if (val.length < min) e[q.id] = `Please write at least ${min} characters`;
    }
    if (!form.permission) e.permission = "Please confirm you agree";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submitWritten(ev: React.FormEvent) {
    ev.preventDefault();
    if (website) return;
    if (!validateWritten()) return;
    setStatus("sending");
    const meta = resolveSubjectOption(form.product);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        city: form.city,
        rating: form.rating,
        headline: form.headline,
        review: compileStructuredReview(REVIEW_QUESTIONS, form.answers),
        answers: buildReviewAnswers(REVIEW_QUESTIONS, form.answers),
        subjectLabel: subjectField(meta),
        scope: meta.scope,
        treatmentSlug: meta.scope === "treatment" ? meta.slug : null,
        productSlug: meta.scope === "product" ? meta.slug : null,
        website,
      }),
    });
    setStatus(res.ok ? "done" : "idle");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErrors({ headline: data.error || "Something went wrong. Please try again." });
    }
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (e) => {
      if (e.data.size) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoBlob(blob);
      setVideoPreview(URL.createObjectURL(blob));
      stream.getTracks().forEach((t) => t.stop());
    };
    recorder.start();
    setRecording(true);
    window.setTimeout(() => {
      if (mediaRecorderRef.current?.state === "recording") stopRecording();
    }, 90_000);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoBlob(file);
    setVideoPreview(URL.createObjectURL(file));
  }

  async function submitVideo(ev: React.FormEvent) {
    ev.preventDefault();
    if (website) return;
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email required";
    }
    if (!form.product.trim()) e.product = "Please select a subject";
    if (!videoBlob) e.video = "Please record or upload a short video";
    if (!form.permission) e.permission = "Please confirm you agree";
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    const meta = resolveSubjectOption(form.product);
    const ext = videoBlob!.type.includes("mp4") ? "mp4" : "webm";
    const signRes = await fetch(
      `/api/reviews/video?name=${encodeURIComponent(form.name)}&ext=${ext}`,
    );
    if (!signRes.ok) {
      setStatus("idle");
      setErrors({ video: "Could not prepare upload. Please try again." });
      return;
    }
    const { uploadUrl, path, publicUrl } = await signRes.json();

    if (uploadUrl) {
      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": videoBlob!.type || "video/webm" },
        body: videoBlob,
      });
      if (!put.ok) {
        setStatus("idle");
        setErrors({ video: "Upload failed. Please try again." });
        return;
      }
    } else if (path) {
      // Local demo upload via FormData
      const fd = new FormData();
      fd.append("file", videoBlob!, path);
      fd.append("path", path);
      const local = await fetch("/api/reviews/video", { method: "PUT", body: fd });
      if (!local.ok) {
        setStatus("idle");
        setErrors({ video: "Upload failed. Please try again." });
        return;
      }
    }

    const metaRes = await fetch("/api/reviews/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        publicUrl,
        name: form.name,
        email: form.email,
        city: form.city,
        subjectLabel: subjectField(meta),
        scope: meta.scope,
        treatmentSlug: meta.scope === "treatment" ? meta.slug : null,
        productSlug: meta.scope === "product" ? meta.slug : null,
      }),
    });

    setStatus(metaRes.ok ? "done" : "idle");
    if (!metaRes.ok) {
      const data = await metaRes.json().catch(() => ({}));
      setErrors({ video: data.error || "Could not save video review." });
    }
  }

  if (status === "done") {
    return (
      <div className="rev-form-success">
        <h3>Thank you — your review is in.</h3>
        <p>
          Demo mode publishes it to the reviews board immediately so you can see the full patient
          revenue loop. Live sites would approve first.
        </p>
        <div className="rev-form-success-actions">
          <Link className="btn btn-navy" href="/reviews">
            View patient reviews →
          </Link>
          <button type="button" className="btn btn-outline-dark" onClick={() => setStatus("idle")}>
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rev-form">
      <div className="rev-form-tabs">
        <button type="button" className={tab === "write" ? "active" : ""} onClick={() => setTab("write")}>
          Written review
        </button>
        <button type="button" className={tab === "video" ? "active" : ""} onClick={() => setTab("video")}>
          Video review
        </button>
      </div>

      {tab === "write" ? (
        <form onSubmit={submitWritten} noValidate>
          <Honeypot value={website} onChange={setWebsite} />
          <SubjectFields form={form} set={set} options={options} errors={errors} setForm={setForm} setErrors={setErrors} />

          <div className="form-row">
            <label>Rating</label>
            <div className="rev-rating-input">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={form.rating >= n ? "on" : ""}
                  onClick={() => {
                    setForm((p) => ({ ...p, rating: n }));
                    setErrors((p) => ({ ...p, rating: "" }));
                  }}
                  aria-label={`${n} stars`}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating ? <span className="field-error">{errors.rating}</span> : null}
          </div>

          <div className="form-row">
            <label>Headline</label>
            <input value={form.headline} onChange={set("headline")} placeholder="Sum up your experience in one line" />
            {errors.headline ? <span className="field-error">{errors.headline}</span> : null}
          </div>

          {REVIEW_QUESTIONS.map((q) => (
            <div className="form-row" key={q.id}>
              <label>{q.label}</label>
              {q.hint ? <p className="field-hint">{q.hint}</p> : null}
              <textarea
                rows={q.rows ?? 3}
                value={form.answers[q.id] ?? ""}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                placeholder={q.placeholder}
              />
              {errors[q.id] ? <span className="field-error">{errors[q.id]}</span> : null}
            </div>
          ))}

          <Permission
            checked={form.permission}
            error={errors.permission}
            onChange={(v) => {
              setForm((p) => ({ ...p, permission: v }));
              setErrors((p) => ({ ...p, permission: "" }));
            }}
          />

          <button className="btn btn-gold btn-block" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Submit patient review →"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitVideo} noValidate>
          <Honeypot value={website} onChange={setWebsite} />
          <SubjectFields form={form} set={set} options={options} errors={errors} setForm={setForm} setErrors={setErrors} />

          <div className="rev-video-prompts">
            <p className="eyebrow">Suggested talking points</p>
            <ol>
              {VIDEO_PROMPTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>

          <div className="rev-video-actions">
            {!recording ? (
              <button type="button" className="btn btn-navy" onClick={startRecording}>
                Record up to 90s
              </button>
            ) : (
              <button type="button" className="btn btn-gold" onClick={stopRecording}>
                Stop recording
              </button>
            )}
            <label className="btn btn-outline-dark">
              Upload video
              <input type="file" accept="video/*" hidden onChange={onFileUpload} />
            </label>
          </div>
          {errors.video ? <span className="field-error">{errors.video}</span> : null}
          {videoPreview ? <video src={videoPreview} controls className="rev-video-preview" /> : null}

          <Permission
            checked={form.permission}
            error={errors.permission}
            onChange={(v) => {
              setForm((p) => ({ ...p, permission: v }));
              setErrors((p) => ({ ...p, permission: "" }));
            }}
          />

          <button className="btn btn-gold btn-block" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Uploading…" : "Submit video review →"}
          </button>
        </form>
      )}
    </div>
  );
}

function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

function Permission({
  checked,
  error,
  onChange,
}: {
  checked: boolean;
  error?: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="form-row">
      <label className="rev-check">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        I confirm this is my genuine experience and AestheticBiz may publish my review (name and
        city) on the website.
      </label>
      {error ? <span className="field-error">{error}</span> : null}
    </div>
  );
}

function SubjectFields({
  form,
  set,
  options,
  errors,
  setForm,
  setErrors,
}: {
  form: {
    name: string;
    email: string;
    city: string;
    product: string;
  };
  set: (
    field: string,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options: ReturnType<typeof getReviewSubjectOptions>;
  errors: Record<string, string>;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  return (
    <>
      <div className="form-row">
        <label>Treatment or product</label>
        <select
          value={form.product}
          onChange={(e) => {
            setForm((p: any) => ({ ...p, product: e.target.value }));
            setErrors((p) => ({ ...p, product: "" }));
          }}
        >
          {options.map((o) => (
            <option key={`${o.scope}-${o.slug ?? o.label}`} value={o.label}>
              {o.categoryLabel}: {o.label}
            </option>
          ))}
        </select>
        {errors.product ? <span className="field-error">{errors.product}</span> : null}
      </div>
      <div className="form-row">
        <label>Full name</label>
        <input value={form.name} onChange={set("name")} placeholder="Your name" />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </div>
      <div className="form-row">
        <label>Email</label>
        <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>
      <div className="form-row">
        <label>City / neighbourhood (optional)</label>
        <input value={form.city} onChange={set("city")} placeholder="e.g. Midtown East" />
      </div>
    </>
  );
}
