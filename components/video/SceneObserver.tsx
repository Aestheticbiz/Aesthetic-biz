"use client";

import { useEffect } from "react";

/** Marks a film scene `is-on` once most of it is on screen, which starts its animations. Once on, it stays on. */
export function SceneObserver() {
  useEffect(() => {
    const scenes = document.querySelectorAll<HTMLElement>("[data-scene]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-on")),
      { threshold: 0.55 },
    );
    scenes.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return null;
}
