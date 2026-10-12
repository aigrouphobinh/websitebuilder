import { describe, expect, it } from "vitest";
import {
  matchesElementSearch,
  normalizeElementSearch,
} from "../utils/element-search";

describe("normalizeElementSearch", () => {
  it("matches Vietnamese words when the query omits diacritics", () => {
    expect(normalizeElementSearch("Tiêu đề")).toBe("tieu de");
    expect(normalizeElementSearch("tieu de")).toBe("tieu de");
  });

  it("normalizes case and surrounding whitespace", () => {
    expect(normalizeElementSearch("  NÚT Mua Vé  ")).toBe("nut mua ve");
    expect(normalizeElementSearch("nut   mua\n  ve")).toBe("nut mua ve");
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
describe("matchesElementSearch", () => {
  it("matches Vietnamese setting labels without diacritics", () => {
    expect(matchesElementSearch("khoang cach", "Khoảng cách (px)")).toBe(true);
    expect(matchesElementSearch("dia diem", "Địa điểm")).toBe(true);
  });

  it("normalizes repeated whitespace in queries and labels", () => {
    expect(matchesElementSearch("  URL   anh  ", "URL ảnh")).toBe(true);
  });

  it("returns false when no label matches", () => {
    expect(matchesElementSearch("javascript", "Khoảng cách", "Kích thước")).toBe(false);
  });

  it("keeps all settings visible for an empty query", () => {
    expect(matchesElementSearch("   ", "Khoảng cách")).toBe(true);
  });
});
