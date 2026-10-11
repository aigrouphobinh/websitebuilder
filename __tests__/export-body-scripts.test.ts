import { describe, expect, it } from "vitest";
import { composeExportBodyScripts } from "../utils/export-body-scripts";

describe("composeExportBodyScripts", () => {
  it("returns no scripts when the export option disables scripts", () => {
    expect(
      composeExportBodyScripts({
        includeScripts: false,
        installedScripts: "<script>custom()</script>",
        mobileToggleScript: "<script>mobile()</script>",
        anchorScrollScript: "<script>anchors()</script>",
      }),
    ).toBe("");
  });

  it("includes configured and builder behavior scripts by default", () => {
    const result = composeExportBodyScripts({
      installedScripts: "<script>custom()</script>",
      mobileToggleScript: "<script>mobile()</script>",
      anchorScrollScript: "<script>anchors()</script>",
    });

    expect(result).toContain("<script>custom()</script>");
    expect(result).toContain("<script>mobile()</script>");
    expect(result).toContain("<script>anchors()</script>");
  });

  it("omits empty entries and joins enabled scripts with line breaks", () => {
    expect(
      composeExportBodyScripts({
        installedScripts: "",
        mobileToggleScript: "<script>mobile()</script>",
        anchorScrollScript: "",
      }),
    ).toBe("<script>mobile()</script>");
  });
});
