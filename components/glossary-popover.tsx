"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

type Align = "center" | "start" | "end";

/**
 * Positioning shell for an inline glossary popup.
 *
 * A centred popup clips off-screen whenever the term sits near the start or end
 * of a line, and CSS alone cannot know where the viewport edge is. This measures
 * on hover/focus and flips the alignment. Only the positioning logic ships to the
 * client — the glossary content itself is resolved on the server.
 */
export function GlossaryPopover({
  href,
  term,
  oneLine,
  status,
  children,
}: {
  href: string;
  term: string;
  oneLine: string;
  status: string;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [align, setAlign] = useState<Align>("center");

  const reposition = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const popWidth = Math.min(320, window.innerWidth * 0.78);
    const half = popWidth / 2;
    const centre = rect.left + rect.width / 2;
    const margin = 12;

    if (centre - half < margin) setAlign("start");
    else if (centre + half > window.innerWidth - margin) setAlign("end");
    else setAlign("center");
  }, []);

  return (
    <span
      ref={wrapRef}
      className="gterm"
      onMouseEnter={reposition}
      onFocus={reposition}
    >
      <Link href={href} className="gterm-anchor">
        {children}
      </Link>
      <span className={`gterm-pop gterm-pop-${align}`} role="note">
        <span className="gterm-pop-head">
          <strong>{term}</strong>
          <em className={`gterm-status gl-status-${status.toLowerCase().replace(/\s+/g, "-")}`}>
            {status}
          </em>
        </span>
        <span className="gterm-pop-body">{oneLine}</span>
        <span className="gterm-pop-more">Read more →</span>
      </span>
    </span>
  );
}
