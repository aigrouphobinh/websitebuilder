/**
 * Normalize a component label or search query for forgiving Vietnamese search.
 * Keeps matching deterministic while allowing queries without diacritics.
 */
export function normalizeElementSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("vi")
    .trim();
}
