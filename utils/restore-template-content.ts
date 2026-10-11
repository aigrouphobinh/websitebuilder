export interface RestoreTemplateContentOptions<T> {
  projectData?: T | null;
  html?: string | null;
  css?: string | null;
  loadProjectData: (data: T) => void;
  setHtml: (html: string) => void;
  setCss?: (css: string) => void;
}

/**
 * Prefer the richer GrapesJS project snapshot, but recover with saved HTML/CSS
 * if that snapshot is malformed or incompatible with the current editor version.
 */
export function restoreTemplateContent<T>({
  projectData,
  html,
  css,
  loadProjectData,
  setHtml,
  setCss,
}: RestoreTemplateContentOptions<T>): boolean {
  if (projectData) {
    try {
      loadProjectData(projectData);
      return true;
    } catch {
      // Fall back to portable HTML/CSS below.
    }
  }

  if (typeof html !== "string" || html.length === 0) return false;

  try {
    setHtml(html);
    if (css && setCss) setCss(css);
    return true;
  } catch {
    return false;
  }
}
