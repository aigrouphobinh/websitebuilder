import { describe, expect, it } from "vitest";
import { useEventPlaceholders } from "../composables/useEventPlaceholders";

describe("useEventPlaceholders", () => {
  const { buildEventPlaceholderReplacements, replaceEventPlaceholders, replaceEventIdPlaceholder } =
    useEventPlaceholders();

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
    expect(replacements["[ev_order_url]"]).toBe("/events/tech-day/order");
    expect(replacements["[company_name]"]).toBe("Aigroup");
    expect(replacements["[company_logo]"]).toBe("/logo.png");
  });

  it("replaces known tokens and leaves unknown dynamic tokens untouched", () => {
    const result = replaceEventPlaceholders(
      '<h1>[ev_name]</h1><a href="[ev_order_url]">Đăng ký</a><p>[ev_custom]</p>',
      { id: "evt-2", slug: "demo", name: "Demo Event" },
    );

    expect(result).toBe(
      '<h1>Demo Event</h1><a href="/events/demo/order">Đăng ký</a><p>[ev_custom]</p>',
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
