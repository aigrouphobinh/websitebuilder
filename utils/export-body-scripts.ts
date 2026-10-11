export interface ExportBodyScriptsOptions {
  includeScripts?: boolean;
  installedScripts: string;
  mobileToggleScript: string;
  anchorScrollScript: string;
}

/**
 * Assemble optional export-time behavior scripts. When scripts are disabled,
 * no inline or configured body scripts should leak into the exported document.
 */
export function composeExportBodyScripts({
  includeScripts = true,
  installedScripts,
  mobileToggleScript,
  anchorScrollScript,
}: ExportBodyScriptsOptions): string {
  if (!includeScripts) return "";

  return [
    installedScripts,
    mobileToggleScript,
    anchorScrollScript,
  ].filter((script) => script && script.trim()).join("\n");
}
