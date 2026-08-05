import { getEntry } from "@/lib/glossary";
import { GlossaryPopover } from "./glossary-popover";
import "./glossary-term.css";

/**
 * Inline glossary reference: renders the term as a link to its glossary page,
 * with a hover/focus popup carrying the one-line summary.
 *
 * The lookup happens here, on the server, so the glossary content never ships
 * to the browser — only the small positioning shell does.
 *
 *   <GlossaryTerm slug="funnel" />                    → "Funnel"
 *   <GlossaryTerm slug="funnel">your funnel</GlossaryTerm>  → custom wording
 */
export function GlossaryTerm({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  const entry = getEntry(slug);

  // An unknown slug must never silently drop words out of the copy.
  if (!entry) return <>{children ?? slug}</>;

  return (
    <GlossaryPopover
      href={`/glossary/${entry.slug}`}
      term={entry.term}
      oneLine={entry.oneLine}
      status={entry.status}
    >
      {children ?? entry.term}
    </GlossaryPopover>
  );
}
