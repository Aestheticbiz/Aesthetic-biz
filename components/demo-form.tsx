"use client";

type DemoFormProps = {
  title: string;
  subtitle?: string;
  submitLabel: string;
  alertMessage: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export function DemoForm({
  title,
  subtitle,
  submitLabel,
  alertMessage,
  children,
  style,
}: DemoFormProps) {
  return (
    <form
      className="lead-form"
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        alert(alertMessage);
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontFamily: "var(--font-display)",
          fontSize: 28,
          color: "var(--navy)",
        }}
      >
        {title}
      </h3>
      {subtitle ? (
        <p style={{ margin: "0 0 18px", color: "var(--text-muted)", fontSize: 14 }}>
          {subtitle}
        </p>
      ) : null}
      {children}
      <button className="btn btn-gold btn-block" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
