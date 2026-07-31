import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { saveVideoReview } from "@/lib/reviews/queries";
import type { ReviewScope } from "@/lib/reviews/types";

function safeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "patient";
}

/** GET — issue local upload path (demo stand-in for signed Supabase URL) */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "patient";
  const ext = (searchParams.get("ext") || "webm").replace(/[^a-z0-9]/gi, "") || "webm";
  const fileName = `${Date.now()}-${safeName(name)}.${ext}`;
  const storagePath = `testimonials/${fileName}`;
  const publicUrl = `/uploads/${storagePath}`;

  return NextResponse.json({
    uploadUrl: null,
    path: storagePath,
    publicUrl,
  });
}

/** PUT — store video file under public/uploads (demo) */
export async function PUT(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const storagePath = String(form.get("path") || "");
    if (!(file instanceof File) || !storagePath.startsWith("testimonials/")) {
      return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
    }
    const dest = path.join(process.cwd(), "public", "uploads", storagePath);
    await mkdir(path.dirname(dest), { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.byteLength > 100 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 100MB)" }, { status: 400 });
    }
    await writeFile(dest, buf);
    return NextResponse.json({ ok: true, publicUrl: `/uploads/${storagePath}` });
  } catch (err) {
    console.error("video PUT", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

/** POST — save video review metadata */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const publicUrl = String(body.publicUrl ?? "").trim();
    if (!name || !email || !publicUrl) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const entry = await saveVideoReview({
      name,
      email,
      city: body.city,
      subjectLabel: String(body.subjectLabel ?? "Clinic experience"),
      scope: (body.scope ?? "general") as ReviewScope,
      treatmentSlug: body.treatmentSlug ?? null,
      productSlug: body.productSlug ?? null,
      videoUrl: publicUrl,
    });

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("video POST", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
