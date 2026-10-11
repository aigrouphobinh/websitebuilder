export interface HtmlWithCssParts {
  head: string;
  css: string;
  html: string;
  bodyScripts: string;
}

/**
 * Assemble the editable canvas HTML with the CSS and scripts collected by the
 * builder. The HTML body is deliberately treated as opaque text so dynamic
 * template placeholders and authored attributes are not rewritten here.
 */
export function composeHtmlWithCss({
  head,
  css,
  html,
  bodyScripts,
}: HtmlWithCssParts): string {
  if (!css || !css.trim()) {
    return `${head}\n${html}\n${bodyScripts}`;
  }

  return `${head}\n<style>${css}</style>\n${html}\n${bodyScripts}`;
}
