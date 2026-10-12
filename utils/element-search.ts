/**
 * Normalize a component label or search query for forgiving Vietnamese search.
 * Keeps matching deterministic while allowing queries without diacritics.
 */
export function normalizeElementSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, (char) => (char === "Đ" ? "D" : "d"))
    .toLocaleLowerCase("vi")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match a user query against one or more inspector labels.
 * Empty queries intentionally match every label so callers can keep the
 * default, unfiltered UI visible.
 */
export function matchesElementSearch(query: string, ...terms: string[]): boolean {
  const normalizedQuery = normalizeElementSearch(query);
  if (!normalizedQuery) return true;

  return terms.some((term) =>
    normalizeElementSearch(term).includes(normalizedQuery),
  );
}
