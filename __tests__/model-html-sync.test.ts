import { describe, expect, it } from "vitest";
import { getIncomingHtmlAction } from "../utils/model-html-sync";

describe("getIncomingHtmlAction", () => {
  it("treats an empty parent value as an explicit clear", () => {
    expect(getIncomingHtmlAction("", "<h1>Starter</h1>", "")).toBe("empty");
    expect(getIncomingHtmlAction("", "", "")).toBe("empty");
  });

  it("ignores HTML that already exists in the canvas", () => {
    expect(getIncomingHtmlAction("<p>Same</p>", "<p>Same</p>", "")).toBe("ignore");
  });

  it("ignores the parent's echo of HTML just emitted by the builder", () => {
    expect(getIncomingHtmlAction("<p>Saved</p>", "<p>Older</p>", "<p>Saved</p>")).toBe("ignore");
  });

  it("replaces the canvas when the parent supplies different HTML", () => {
    expect(getIncomingHtmlAction("<h1>External update</h1>", "<h1>Old</h1>", "<h1>Old</h1>")).toBe("replace");
  });
});
