import Link from "next/link";
import { DOCTOR } from "@/lib/staff";

type Props = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function DoctorTrust({
  ctaHref = "/about#team",
  ctaLabel = "About Dr. Hale",
}: Props) {
  return (
    <section className="section section-alt doctor-trust">
      <div className="shell doctor-trust-grid">
        <div className="doctor-trust-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={DOCTOR.image} alt={DOCTOR.imageAlt} />
          <div className="doctor-trust-badge">
            <strong>15+</strong>
            <span>Years experience</span>
          </div>
        </div>
        <div>
          <span className="eyebrow">Meet your doctor</span>
          <h2 className="section-title">
            Dr. Jonathan
            <br />
            Hale
          </h2>
          <p className="doctor-trust-role">{DOCTOR.role}</p>
          <blockquote className="doctor-trust-quote">
            <p>&ldquo;{DOCTOR.quote}&rdquo;</p>
          </blockquote>
          <p className="doctor-trust-bio">{DOCTOR.bio}</p>
          <div className="doctor-trust-creds">
            {DOCTOR.credentials.map((c) => (
              <div key={c} className="doctor-trust-cred">
                <span />
                {c}
              </div>
            ))}
          </div>
          <Link className="btn btn-outline-dark" href={ctaHref}>
            {ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
