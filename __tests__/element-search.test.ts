import { describe, expect, it } from "vitest";
import { normalizeElementSearch } from "../utils/element-search";

describe("normalizeElementSearch", () => {
  it("matches Vietnamese words when the query omits diacritics", () => {
    expect(normalizeElementSearch("Tiêu đề")).toBe("tieu de");
    expect(normalizeElementSearch("tieu de")).toBe("tieu de");
  });

  it("normalizes case and surrounding whitespace", () => {
    expect(normalizeElementSearch("  NÚT Mua Vé  ")).toBe("nut mua ve");
    expect(normalizeElementSearch("nut   mua\\n  ve")).toBe("nut mua ve");
  });

  it("normalizes Vietnamese d-stroke characters", () => {
    expect(normalizeElementSearch("Đăng ký")).toBe("dang ky");
    expect(normalizeElementSearch("địa điểm")).toBe("dia diem");
  });

  it("supports substring matching after normalization", () => {
    const label = normalizeElementSearch("Phần đầu trang Hero");
    const query = normalizeElementSearch("phan dau");
    expect(label.includes(query)).toBe(true);
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(normalizeElementSearch("   ")).toBe("");
  });
});
