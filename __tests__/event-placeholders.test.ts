import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useEventPlaceholders } from "../composables/useEventPlaceholders";

describe("useEventPlaceholders", () => {
  const { buildEventPlaceholderReplacements, replaceEventPlaceholders, replaceEventIdPlaceholder } =
    useEventPlaceholders();

  beforeEach(() => {
    vi.stubEnv("VITE_DOMAIN", "");
    vi.stubEnv("VITE_EVENT_BASE_DOMAIN", ".events.htechmedia.vn");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds replacements from event and company context", () => {
    const replacements = buildEventPlaceholderReplacements({
      id: "evt-1",
      slug: "tech-day",
      name: "Tech Day",
      location: "Hà Nội",
      description: "Sự kiện công nghệ",
      startDate: "2026-12-15T09:00:00+07:00",
      company: { name: "Aigroup", logoUrl: "/logo.png" },
    });

    expect(replacements["[ev_name]"]).toBe("Tech Day");
    expect(replacements["[ev_location]"]).toBe("Hà Nội");
    expect(replacements["[ev_timezone]"]).toBe("Asia/Ho_Chi_Minh");
    expect(replacements["[ev_order_url]"]).toBe("/order_wizard?event_id=evt-1&ticket_id=&popup=true");
    expect(replacements["[company_name]"]).toBe("Aigroup");
    expect(replacements["[company_logo]"]).toBe("/logo.png");
  });

  it("builds min/max ticket prices and uses the event domain when provided", () => {
    const replacements = buildEventPlaceholderReplacements({
      id: "evt-prices",
      domain: "https://events.example.com/",
      tickets: [
        { price: "1000.00", currency: "VND", status: "available" },
        { price: "2500.00", currency: "VND", status: "available" },
        { price: "9999.00", currency: "VND", status: "sold_out" },
      ],
    });

    expect(replacements["[ev_min_ticket_price]"]).toBe("1.000 ₫");
    expect(replacements["[ev_max_ticket_price]"]).toBe("2.500 ₫");
    expect(replacements["[ev_domain]"]).toBe("events.example.com");
  });

  it("computes the same min/max when every valid ticket costs 1000.00", () => {
    const replacements = buildEventPlaceholderReplacements({
      id: "evt-same-price",
      tickets: [
        { price: "1000.00", status: "available" },
        { price: "1000.00", status: "available" },
      ],
    });

    expect(replacements["[ev_min_ticket_price]"]).toBe("1.000 ₫");
    expect(replacements["[ev_max_ticket_price]"]).toBe("1.000 ₫");
  });

  it("ignores null, empty, invalid and non-finite ticket prices", () => {
    const replacements = buildEventPlaceholderReplacements({
      id: "evt-invalid-prices",
      tickets: [
        { price: null, status: "available" },
        { price: "", status: "available" },
        { price: "abc", status: "available" },
        { price: "Infinity", status: "available" },
        { price: "-100", status: "available" },
        { price: "2000.00", status: "sold_out" },
        { price: "500.00", status: "available" },
      ],
    });

    expect(replacements["[ev_min_ticket_price]"]).toBe("500 ₫");
    expect(replacements["[ev_max_ticket_price]"]).toBe("500 ₫");
  });

  it("returns empty ticket prices when no valid ticket prices are supplied", () => {
    const replacements = buildEventPlaceholderReplacements({
      id: "evt-no-prices",
      tickets: [],
    });

    expect(replacements["[ev_min_ticket_price]"]).toBe("");
    expect(replacements["[ev_max_ticket_price]"]).toBe("");
  });

  it("resolves repeated placeholders and event timezone/domain from event context", () => {
    const html = [
      "<p>[ev_min_ticket_price] - [ev_max_ticket_price]</p>",
      "<p>[ev_min_ticket_price] - [ev_max_ticket_price]</p>",
      "<a href=\"[ev_domain]\">[ev_domain]</a>",
      "<span>[ev_timezone]</span>",
    ].join("");

    const result = replaceEventPlaceholders(html, {
      id: "evt-repeat",
      domainConfig: { domain: null, subdomain: "demo" },
      basicInfo: { timezone: "Asia/Bangkok" },
      tickets: [{ price: "1000.00", status: "available" }],
    });

    expect(result.match(/1\.000 ₫/g)).toHaveLength(4);
    expect(result.match(/demo\.events\.htechmedia\.vn/g)).toHaveLength(2);
    expect(result).toContain("Asia/Bangkok");
    expect(result).not.toContain("[ev_min_ticket_price]");
    expect(result).not.toContain("[ev_max_ticket_price]");
    expect(result).not.toContain("[ev_domain]");
    expect(result).not.toContain("[ev_timezone]");
  });

  it("falls back to Asia/Ho_Chi_Minh when timezone is missing", () => {
    const replacements = buildEventPlaceholderReplacements({
      id: "evt-no-timezone",
      tickets: [],
    });

    expect(replacements["[ev_timezone]"]).toBe("Asia/Ho_Chi_Minh");
  });

  it("returns an empty domain when no event or configured domain exists", () => {
    vi.stubEnv("VITE_EVENT_BASE_DOMAIN", "");
    vi.stubEnv("VITE_DOMAIN", "");

    const replacements = buildEventPlaceholderReplacements({
      id: "evt-no-domain",
      tickets: [],
    });

    expect(replacements["[ev_domain]"]).toBe("");
  });

  it("uses the event logo for [ev_logo] and falls back to the event image when no logo exists", () => {
    expect(
      buildEventPlaceholderReplacements({
        id: "evt-logo",
        logoUrl: "/uploads/event-logo.png",
        bannerUrl: "/uploads/banner.png",
      })["[ev_logo]"],
    ).toBe("/uploads/event-logo.png");

    expect(
      buildEventPlaceholderReplacements({
        id: "evt-no-logo",
        bannerUrl: "/uploads/banner.png",
      })["[ev_logo]"],
    ).toBe("/uploads/banner.png");

    expect(
      replaceEventPlaceholders('<img src="[ev_logo]" alt="Event">', {
        id: "evt-no-logo",
        thumbnailUrl: "/uploads/thumbnail.png",
      }),
    ).toBe('<img src="/uploads/thumbnail.png" alt="Event">');
  });

  it("replaces known tokens and leaves unknown dynamic tokens untouched", () => {
    const result = replaceEventPlaceholders(
      '<h1>[ev_name]</h1><a href="[ev_order_url]">Đăng ký</a><p>[ev_custom]</p>',
      { id: "evt-2", slug: "demo", name: "Demo Event" },
    );

    expect(result).toBe(
      '<h1>Demo Event</h1><a href="/order_wizard?event_id=evt-2&ticket_id=&popup=true">Đăng ký</a><p>[ev_custom]</p>',
    );
  });

  it("does not recursively replace tokens inside replacement values", () => {
    const result = replaceEventPlaceholders(
      "[ev_name] | [ev_location]",
      { id: "evt-chain", name: "Tên chứa [ev_location]", location: "Hà Nội" },
    );

    expect(result).toBe("Tên chứa [ev_location] | Hà Nội");
  });

  it("safely replaces tokens in nested objects when values contain JSON characters", () => {
    const result = replaceEventPlaceholders(
      {
        content: "[ev_description]",
        nested: [{ title: "[ev_name]" }, { html: "<p>[ev_description]</p>" }],
      },
      {
        id: "evt-3",
        name: "Event",
        description: 'Quotes: "hello" \\ path\nsecond line',
      },
    );

    expect(result.content).toBe('Quotes: "hello" \\ path\nsecond line');
    expect(result.nested[0].title).toBe("Event");
    expect(result.nested[1].html).toBe('<p>Quotes: "hello" \\ path\nsecond line</p>');
  });

  it("replaces event IDs in strings without changing unrelated text", () => {
    expect(replaceEventIdPlaceholder("event=[id_event]", "evt-42")).toBe("event=evt-42");
    expect(replaceEventIdPlaceholder("no token", "evt-42")).toBe("no token");
  });
});
