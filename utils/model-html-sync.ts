export type IncomingHtmlAction = "empty" | "ignore" | "replace";

/**
 * Decide how an incoming v-model value should affect the GrapesJS canvas.
 * Empty is explicit (it must not be swallowed by the echo guard).
 */
export function getIncomingHtmlAction(
  incomingHtml: string,
  currentHtml: string,
  lastEmittedHtml: string,
): IncomingHtmlAction {
  if (incomingHtml === "") return "empty";
  if (incomingHtml === currentHtml || incomingHtml === lastEmittedHtml) {
    return "ignore";
  }
  return "replace";
}
