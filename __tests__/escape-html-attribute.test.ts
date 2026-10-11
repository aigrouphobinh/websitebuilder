import { describe, expect, it } from "vitest";
import { escapeHtmlAttribute } from "../utils/escape-html-attribute";

describe("escapeHtmlAttribute", () => {
  it("escapes characters that can break a quoted attribute", () => {
    expect(escapeHtmlAttribute('https://example.test/?a=1&b="x"<y>'))
      .toBe("https://example.test/?a=1&amp;b=&quot;x&quot;&lt;y&gt;");
  });

  it("handles nullish and non-string values", () => {
    expect(escapeHtmlAttribute(null)).toBe("");
    expect(escapeHtmlAttribute(42)).toBe("42");
  });
});
