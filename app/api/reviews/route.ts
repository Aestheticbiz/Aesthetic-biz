import { NextResponse } from "next/server";
import { saveWrittenReview } from "@/lib/reviews/queries";
import type { ReviewAnswer, ReviewScope } from "@/lib/reviews/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const rating = Number(body.rating);
    const headline = String(body.headline ?? "").trim();
    const review = String(body.review ?? "").trim();
    const answers = (Array.isArray(body.answers) ? body.answers : []) as ReviewAnswer[];
    const scope = (body.scope ?? "general") as ReviewScope;

    if (!name || !email || !headline || !review || !(rating >= 1 && rating <= 5)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (review.length < 80) {
      return NextResponse.json(
        { error: "Please share a little more detail (about 80+ characters)." },
        { status: 400 },
      );
    }

    const entry = await saveWrittenReview({
      name,
      email,
      city: String(body.city ?? ""),
      rating,
      headline,
      review,
      answers,
      subjectLabel: String(body.subjectLabel ?? "Clinic experience"),
      scope,
      treatmentSlug: body.treatmentSlug ?? null,
      productSlug: body.productSlug ?? null,
    });

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("reviews POST", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
