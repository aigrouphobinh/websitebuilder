/**
 * Escape untrusted values before interpolating them into quoted HTML attributes.
 * This is for attribute values only; do not use it for HTML text or CSS.
 */
export function escapeHtmlAttribute(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
