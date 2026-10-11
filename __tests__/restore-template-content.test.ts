import { describe, expect, it, vi } from "vitest";
import { restoreTemplateContent } from "../utils/restore-template-content";

describe("restoreTemplateContent", () => {
  it("prefers the GrapesJS project snapshot when it loads successfully", () => {
    const loadProjectData = vi.fn();
    const setHtml = vi.fn();
    const setCss = vi.fn();

    const result = restoreTemplateContent({
      projectData: { pages: [] },
      html: "<main>fallback</main>",
      css: "main { color: red; }",
      loadProjectData,
      setHtml,
      setCss,
    });

    expect(result).toBe(true);
    expect(loadProjectData).toHaveBeenCalledOnce();
    expect(setHtml).not.toHaveBeenCalled();
    expect(setCss).not.toHaveBeenCalled();
  });

  it("falls back to saved HTML and CSS when project data cannot load", () => {
    const loadProjectData = vi.fn(() => {
      throw new Error("incompatible project data");
    });
    const setHtml = vi.fn();
    const setCss = vi.fn();

    const result = restoreTemplateContent({
      projectData: { pages: [] },
      html: "<main>saved page</main>",
      css: "main { color: red; }",
      loadProjectData,
      setHtml,
      setCss,
    });

    expect(result).toBe(true);
    expect(setHtml).toHaveBeenCalledWith("<main>saved page</main>");
    expect(setCss).toHaveBeenCalledWith("main { color: red; }");
  });

  it("clears stale CSS when the fallback template has no saved CSS", () => {
    const setCss = vi.fn();

    const result = restoreTemplateContent({
      projectData: null,
      html: "<main>plain page</main>",
      css: "",
      loadProjectData: vi.fn(),
      setHtml: vi.fn(),
      setCss,
    });

    expect(result).toBe(true);
    expect(setCss).toHaveBeenCalledWith("");
  });

  it("returns false if no usable project snapshot or HTML exists", () => {
    expect(
      restoreTemplateContent({
        projectData: null,
        html: "",
        loadProjectData: vi.fn(),
        setHtml: vi.fn(),
      }),
    ).toBe(false);
  });

  it("returns false when both snapshot and HTML restoration fail", () => {
    expect(
      restoreTemplateContent({
        projectData: null,
        html: "<main>page</main>",
        loadProjectData: vi.fn(),
        setHtml: vi.fn(() => {
          throw new Error("cannot set html");
        }),
      }),
    ).toBe(false);
  });
});
