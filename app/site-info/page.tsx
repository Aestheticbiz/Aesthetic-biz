import type { Metadata } from "next";
import { TourFilm } from "@/components/video/TourFilm";
import { tourCut } from "@/lib/tour";

/**
 * Owners' overview of AestheticBiz as Adel's film: one full-screen scene per
 * line of lib/tour.ts. noindex, nofollow, not in any menu and no sitemap:
 * share the link directly. Floating launchers are off here
 * (lib/conversion-routes.ts). No prices, ever: pricing is on the Discovery Call.
 *
 * Video mode: /site-info?video=1&cut=short|long adds Adel's live narration
 * (components/video/AdelTour.tsx). The recorder
 * (crmsolutions/scripts/video/record-tour.mjs) fires `sandy:tour` (or
 * `tour:start`) and waits for `window.__sandyTour.done`.
 * Without video=1 the long cut's scenes scroll as a silent page.
 */
export const metadata: Metadata = {
  title: { absolute: "A med spa that never stops booking | AestheticBiz" },
  description:
    "For US med spa owners: Adel answers patients aloud 24/7 and books the free consultation, with online booking, skincare shop, loyalty points and reviews.",
  alternates: { canonical: "/site-info" },
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function SiteInfoPage({ searchParams }: Props) {
  const q = await searchParams;
  const video = q.video === "1";
  return <TourFilm cut={video ? tourCut(q.cut) : "long"} narrated={video} />;
}
