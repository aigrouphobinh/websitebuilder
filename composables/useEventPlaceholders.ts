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

  const parsePrice = (value: unknown): number | null => {
    if (value === null || value === undefined) return null;
    if (typeof value === "string" && value.trim() === "") return null;
    const price = Number(value);
    return Number.isFinite(price) && price >= 0 ? price : null;
  };

  const formatPrice = (value: number): string =>
    `${value.toLocaleString("vi-VN")} ₫`;

  const buildEventPlaceholderReplacements = (evt: any, publicOrigin?: string): Record<string, string> => {
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
      .filter((ticket: any) => !ticket?.status || ticket.status === "available")
      .map((ticket: any) => parsePrice(ticket?.price))
      .filter((price: number | null): price is number => price !== null);
    const hasTicketPrices = validTicketPrices.length > 0;
    const minTicketPrice = hasTicketPrices ? Math.min(...validTicketPrices) : null;
    const maxTicketPrice = hasTicketPrices ? Math.max(...validTicketPrices) : null;

    // The public event API exposes the event website domain in domainConfig.
    // Prefer an explicit custom domain, otherwise compose the configured
    // subdomain with VITE_EVENT_BASE_DOMAIN.
    const domainConfig = middleEvent.domainConfig || {};
    const configuredDomain =
      typeof domainConfig.domain === "string" ? domainConfig.domain.trim() : "";
    const configuredSubdomain =
      typeof domainConfig.subdomain === "string" ? domainConfig.subdomain.trim() : "";
    const baseDomainRaw = String(import.meta.env.VITE_EVENT_BASE_DOMAIN || "").trim();
    const baseDomain = baseDomainRaw.replace(/^\.+/, "").replace(/\/+$/, "");
    const eventDomainSource =
      configuredDomain ||
      (configuredSubdomain
        ? `${configuredSubdomain}${baseDomain ? `.${baseDomain}` : ""}`
        : "") ||
      middleEvent.customDomain ||
      middleEvent.domain ||
      middleEvent.publicDomain ||
      middleEvent.websiteDomain ||
      basicInfo.customDomain ||
      basicInfo.domain ||
      basicInfo.websiteDomain ||
      middleEvent.publicUrl ||
      middleEvent.websiteUrl ||
      basicInfo.websiteUrl ||
      import.meta.env.VITE_DOMAIN ||
      "";

    const timezone = String(
      middleEvent.timezone ||
        basicInfo.timezone ||
        middleEvent.settings?.timezone ||
        import.meta.env.VITE_EVENT_TIMEZONE ||
        "Asia/Ho_Chi_Minh",
    ).trim() || "Asia/Ho_Chi_Minh";

    const normalizeHost = (value: unknown): string => {
      if (typeof value !== "string" || !value.trim()) return "";
      const raw = value.trim();
      try {
        return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).host;
      } catch {
        return raw.replace(/^https?:\/\//i, "").replace(/\/$/, "");
      }
    };

    const eventDomain = normalizeHost(eventDomainSource);

    // Order URLs may use an explicitly configured public origin, but this
    // setting must never override the event-data value used by [ev_domain].
    const configuredOrigin =
      publicOrigin ||
      import.meta.env.VITE_DOMAIN ||
      eventDomainSource ||
      "";

    let publicOriginValue = "";
    if (typeof configuredOrigin === "string" && configuredOrigin.trim()) {
      try {
        const normalizedUrl = new URL(
          /^https?:\/\//i.test(configuredOrigin.trim())
            ? configuredOrigin.trim()
            : `https://${configuredOrigin.trim()}`,
        );
        publicOriginValue = normalizedUrl.origin;
      } catch {
        const host = normalizeHost(configuredOrigin);
        publicOriginValue = host ? `https://${host}` : "";
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
      "[ev_min_ticket_price]": minTicketPrice === null ? "" : formatPrice(minTicketPrice),
      "[ev_max_ticket_price]": maxTicketPrice === null ? "" : formatPrice(maxTicketPrice),
      "[ev_timezone]": timezone,
      // Resolve these against the final published page origin at runtime.
      "[ev_domain]": eventDomain,
      "[ev_order_url]": `${publicOriginValue}/order_wizard?${new URLSearchParams({
        event_id: String(middleEvent.id || ""),
        ticket_id: "",
        popup: "true",
      }).toString()}`,
      "[ev_url]": "[ev_url]",
      "[ev_logo]": eventLogo || fallbackImage || "",
      "[id_event]": middleEvent.id || "",
    };

    if (evt.company) {
      replacements["[company_name]"] = evt.company.name || "";
      replacements["[company_logo]"] = evt.company.logoUrl || "";
    }

    return replacements;
  };

  const replaceEventPlaceholders = (content: any, evt: any, publicOrigin?: string): any => {
    if (!content || !evt) return content;

    const replacements = buildEventPlaceholderReplacements(evt, publicOrigin);

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
