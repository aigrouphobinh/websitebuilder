import { describe, expect, it } from "vitest";
import { composeHtmlWithCss } from "../utils/html-with-css";

describe("composeHtmlWithCss", () => {
  it("includes collected CSS and keeps HTML markup and dynamic placeholders intact", () => {
    const html =
      '<section id="hero" class="event-hero" data-event="[id_event]"><h1>[ev_name]</h1><a href="[ev_order_url]">Đăng ký</a></section>';
    const css = ".event-hero { color: #123456; }";
    const result = composeHtmlWithCss({
      head: '<link rel="stylesheet" href="/theme.css">',
      css,
      html,
      bodyScripts: '<script>window.eventReady = true;</script>',
    });

    expect(result).toContain('<style>.event-hero { color: #123456; }</style>');
    expect(result).toContain('id="hero"');
    expect(result).toContain('class="event-hero"');
    expect(result).toContain('data-event="[id_event]"');
    expect(result).toContain("[ev_name]");
    expect(result).toContain("[ev_order_url]");
    expect(result).toContain('<link rel="stylesheet" href="/theme.css">');
    expect(result).toContain('<script>window.eventReady = true;</script>');
  });

  it("does not add an empty style tag when CSS is blank", () => {
    const result = composeHtmlWithCss({
      head: "",
      css: "  \n ",
      html: "<main>[ev_description]</main>",
      bodyScripts: "",
    });

    expect(result).toBe("\n<main>[ev_description]</main>\n");
    expect(result).not.toContain("<style>");
  });

  it("preserves a real CSS string exactly", () => {
    const css = "/* keep comments */\n.hero { background: url('/a.png'); }";
    const result = composeHtmlWithCss({
      head: "",
      css,
      html: "<div class='hero'></div>",
      bodyScripts: "",
    });

    expect(result).toContain(`<style>${css}</style>`);
  });
});
