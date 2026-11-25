/**
 * Prevents a single orphan word on the last line of a text:
 * the last two words are joined with a non-breaking space.
 */
export function noOrphan(text: string): string {
  const t = text.replace(/\s+$/, "");
  const i = t.lastIndexOf(" ");
  if (i <= 0) return text;
  return t.slice(0, i) + " " + t.slice(i + 1);
}
