import { NURSE, DOCTOR } from "@/lib/staff";

const MEMBERS = [
  {
    person: DOCTOR,
    focus: "Injectables, medical skin, wellness protocols, product curation",
  },
  {
    person: NURSE,
    focus: "Treatment support, aftercare education, retail routines",
  },
] as const;

export default function StaffGrid() {
  return (
    <div className="staff-grid" id="team">
      {MEMBERS.map(({ person, focus }) => (
        <article key={person.slug} className="staff-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={person.image} alt={person.imageAlt} />
          <div className="staff-card-body">
            <p className="staff-card-role">{person.role}</p>
            <h3>{person.name}</h3>
            <blockquote>
              <p>&ldquo;{person.quote}&rdquo;</p>
            </blockquote>
            <p className="staff-card-bio">{person.bio}</p>
            <p className="staff-card-focus">
              <strong>Focus:</strong> {focus}
            </p>
            <ul className="staff-card-creds">
              {person.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
