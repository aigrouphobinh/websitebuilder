import { describe, expect, it } from "vitest";
import { composeExportScriptTag } from "../utils/export-script-tag";

describe("composeExportScriptTag", () => {
  it("escapes source and type attributes", () => {
    expect(
      composeExportScriptTag({
        src: 'https://example.test/a.js?x="bad"&y=1',
        type: 'module" onload="evil',
      }),
    ).toBe(
      '<script src="https://example.test/a.js?x=&quot;bad&quot;&amp;y=1" type="module&quot; onload=&quot;evil"></script>',
    );
  });

  it("preserves async and defer loading attributes", () => {
    expect(
      composeExportScriptTag({
        src: "https://example.test/app.js",
        async: true,
        defer: true,
      }),
    ).toBe(
      '<script src="https://example.test/app.js" async defer></script>',
    );
  });

  it("keeps inline code intact", () => {
    expect(
      composeExportScriptTag({ type: "module", code: "start();\nfinish();" }),
    ).toBe("<script type=\"module\">start();\nfinish();</script>");
  });
});
