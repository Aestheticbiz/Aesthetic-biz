import Link from "next/link";

type PreviewBarProps = {
  children: React.ReactNode;
};

export function PreviewBar({ children }: PreviewBarProps) {
  return (
    <div className="preview-bar">
      <div className="shell">
        <span>{children}</span>
      </div>
    </div>
  );
}

export function DefaultPreviewBar() {
  return (
    <PreviewBar>
      <strong>AestheticBiz demo</strong> · Patient Revenue Platform preview by{" "}
      <a href="https://crmsolutions.app" target="_blank" rel="noopener noreferrer">
        CRM Solutions
      </a>{" "}
      · <Link href="/audit">Read the audit</Link> · <Link href="/features">Features</Link>
    </PreviewBar>
  );
}
