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
      <strong>You are inside the demo practice</strong> — everything here is live and clickable.{" "}
      <span className="preview-bar-owner">
        For practice owners: <Link href="/full-fee-patients">the 90-day platform</Link> ·{" "}
        <Link href="/financial">what one patient a week is worth</Link>
      </span>
    </PreviewBar>
  );
}
