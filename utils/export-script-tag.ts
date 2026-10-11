import { escapeHtmlAttribute } from "./escape-html-attribute";

export interface ExportScriptDescriptor {
  src?: string;
  type?: string;
  code?: string;
  async?: boolean;
  defer?: boolean;
}

/**
 * Serialize a configured script for exported HTML while preserving its loading
 * attributes. Only attribute values are escaped; inline script code stays intact.
 */
export function composeExportScriptTag(
  script: ExportScriptDescriptor,
): string {
  const open = "<scr" + "ipt";
  const close = "</scr" + "ipt>";
  const type = script.type
    ? ` type="${escapeHtmlAttribute(script.type)}"`
    : "";
  const asyncAttr = script.async ? " async" : "";
  const deferAttr = script.defer ? " defer" : "";

  if (script.src) {
    return `${open} src="${escapeHtmlAttribute(script.src)}"${type}${asyncAttr}${deferAttr}>${close}`;
  }

  return `${open}${type}${asyncAttr}${deferAttr}>${script.code || ""}${close}`;
}
