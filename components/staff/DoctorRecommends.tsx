import Link from "next/link";
import { DOCTOR, doctorNoteForProduct } from "@/lib/staff";

type Props = {
  productSlug: string;
  productName: string;
};

export default function DoctorRecommends({ productSlug, productName }: Props) {
  const note = doctorNoteForProduct(productSlug);

  return (
    <aside className="doctor-recommends" aria-label={`${DOCTOR.shortName} recommends`}>
      <div className="doctor-recommends-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DOCTOR.image} alt={DOCTOR.imageAlt} />
      </div>
      <div className="doctor-recommends-body">
        <p className="doctor-recommends-label">{DOCTOR.recommendsLabel}</p>
        <p className="doctor-recommends-name">
          {DOCTOR.name}
          <span>{DOCTOR.role}</span>
        </p>
        <blockquote>
          <p>&ldquo;{note}&rdquo;</p>
        </blockquote>
        <p className="doctor-recommends-foot">
          On <strong>{productName}</strong> ·{" "}
          <Link href="/about#team">Meet the clinical team</Link>
        </p>
      </div>
    </aside>
  );
}
