"use client";

import { useRef } from "react";

export function ScrollRail({
  children,
  label = "Scroll items",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.85, 360);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="scroll-rail">
      <div className="scroll-rail-controls">
        <button type="button" aria-label="Previous" onClick={() => scrollBy(-1)}>
          ←
        </button>
        <button type="button" aria-label="Next" onClick={() => scrollBy(1)}>
          →
        </button>
      </div>
      <div ref={ref} className="scroll-rail-track" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
