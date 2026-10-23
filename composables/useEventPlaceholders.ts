/**
 * Utility composable for replacing event dynamic placeholders in HTML templates.
 * Placeholders: [ev_name], [ev_location], [ev_date], [ev_order_url], [company_name], etc.
 */

export function useEventPlaceholders() {
  const toDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "number") return new Date(value);
    if (typeof value === "string") {
      const parsed = Date.parse(value);
      return isNaN(parsed) ? null : new Date(parsed);
    }
    return null;
  };

  const formatDate = (d: Date | null): string => {
    if (!d) return "";
    return d.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (d: Date | null): string => {
    if (!d) return "";
    return d.toLocaleTimeString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const buildEventPlaceholderReplacements = (evt: any): Record<string, string> => {
    if (!evt) return {};
    const middleEvent = (evt as any).event || evt;
    const start = toDate((middleEvent as any).startDate);

    const basicInfo = middleEvent.basicInfo || middleEvent.settings?.basicInfo || {};
    const tickets = Array.isArray(evt.tickets)
      ? evt.tickets
      : Array.isArray(middleEvent.tickets)
        ? middleEvent.tickets
        : [];
    const validTicketPrices = tickets
      .filter((ticket: any) => !ticket.status || ticket.status === "available")
      .map((ticket: any) => Number(ticket.price))
      .filter((price: number) => Number.isFinite(price) && price >= 0);
    const minTicketPrice = validTicketPrices.length ? Math.min(...validTicketPrices) : "";
    const maxTicketPrice = validTicketPrices.length ? Math.max(...validTicketPrices) : "";

    // Prefer an event-owned domain/URL. If the API omits it, use the current
    // website origin when running in a browser; avoid referencing window during SSR.
    const eventDomainValue =
      middleEvent.domain ||
      middleEvent.customDomain ||
      middleEvent.websiteUrl ||
      middleEvent.url ||
      basicInfo.domain ||
      basicInfo.websiteUrl ||
      "";
    let eventDomain = typeof eventDomainValue === "string" ? eventDomainValue : "";
    if (!eventDomain && typeof window !== "undefined") {
      eventDomain = window.location.origin;
    }
    if (eventDomain) {
      try {
        eventDomain = new URL(
          eventDomain.startsWith("http://") || eventDomain.startsWith("https://")
            ? eventDomain
            : `https://${eventDomain}`,
        ).host;
      } catch {
        eventDomain = eventDomain.replace(/^https?:\\/\\//i, "").replace(/\\/$/, "");
      }
    }
    const logoValue =
      middleEvent.logoUrl ||
      middleEvent.logo_url ||
      middleEvent.logo ||
      basicInfo.logoUrl ||
      basicInfo.logo ||
      middleEvent.branding?.logoUrl ||
      "";
    // [ev_logo] is used as an image source in templates. Prefer the event's
    // explicit logo; if none exists, fall back to the event image already
    // available so the rendered <img> still has a usable src.
    const eventLogo =
      typeof logoValue === "string"
        ? logoValue
        : logoValue?.url || logoValue?.src || "";
    const fallbackImage =
      middleEvent.bannerUrl ||
      middleEvent.thumbnailUrl ||
      middleEvent.imageUrl ||
      middleEvent.image ||
      "";

    const replacements: Record<string, string> = {
      "[ev_name]": middleEvent.name || "",
      "[ev_location]": middleEvent.location || "",
      "[ev_description]": middleEvent.description || middleEvent.shortDescription || "",
      "[ev_date]": start ? formatDate(start) : "",
      "[ev_time]": start ? formatTime(start) : "",
      "[ev_min_ticket_price]": String(minTicketPrice),
      "[ev_max_ticket_price]": String(maxTicketPrice),
      "[ev_timezone]": "Asia/Ho_Chi_Minh",
      "[ev_domain]": eventDomain,
      "[ev_order_url]": (middleEvent as any).slug
        ? `/events/${(middleEvent as any).slug}/order`
        : `/events/${middleEvent.id}/order`,
      "[ev_url]": (middleEvent as any).slug
        ? `/events/${(middleEvent as any).slug}`
        : `/events/${middleEvent.id}`,
      "[ev_logo]": eventLogo || fallbackImage || "",
      "[id_event]": middleEvent.id || "",
    };

    if (evt.company) {
      replacements["[company_name]"] = evt.company.name || "";
      replacements["[company_logo]"] = evt.company.logoUrl || "";
    }

    return replacements;
  };

  const replaceEventPlaceholders = (content: any, evt: any): any => {
    if (!content || !evt) return content;

    const replacements = buildEventPlaceholderReplacements(evt);

    // Match token-shaped text once. Inserted replacement values are not scanned
    // again, preventing accidental cascading substitutions.
    const replaceText = (text: string): string =>
      text.replace(/\[[a-z0-9_]+\]/g, (token) => {
        const value = replacements[token];
        return value === undefined || value === null ? token : String(value);
      });

    if (typeof content === "string") {
      return replaceText(content);
    }

    if (typeof content === "object") {
      // Replace values recursively instead of serializing the whole object to JSON.
      // This keeps replacement text containing quotes, backslashes, or newlines valid.
      const replaceValue = (value: any): any => {
        if (typeof value === "string") return replaceText(value);
        if (Array.isArray(value)) return value.map(replaceValue);
        if (value && typeof value === "object") {
          return Object.fromEntries(
            Object.entries(value).map(([key, nested]) => [
              replaceText(key),
              replaceValue(nested),
            ]),
          );
        }
        return value;
      };

      try {
        return replaceValue(content);
      } catch {
        return content;
      }
    }

    return content;
  };

  const replaceEventIdPlaceholder = (content: any, eventId: string): any => {
    if (!content || !eventId) return content;
    const placeholder = "[id_event]";

    if (typeof content === "string") {
      return content.split(placeholder).join(eventId);
    }

    if (typeof content === "object") {
      try {
        let jsonStr = JSON.stringify(content);
        jsonStr = jsonStr.split(placeholder).join(eventId);
        return JSON.parse(jsonStr);
      } catch {
        return content;
      }
    }

    return content;
  };

  return {
    toDate,
    formatDate,
    formatTime,
    buildEventPlaceholderReplacements,
    replaceEventPlaceholders,
    replaceEventIdPlaceholder,
  };
}
