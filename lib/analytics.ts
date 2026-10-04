const ANONYMOUS_ID_KEY = "soet_anonymous_id";
const SESSION_ID_KEY = "soet_session_id";

function getOrCreateAnonymousId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(ANONYMOUS_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(ANONYMOUS_ID_KEY, id);
    }
    return id;
  } catch {
    return "anonymous_fallback";
  }
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return "session_fallback";
  }
}

function getDeviceType(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

export interface TrackEventOptions {
  eventLabel?: string;
  metadata?: Record<string, unknown>;
  pagePath?: string;
}

const DEDUPED_EVENTS = new Set([
  "page_view",
  "scroll_25",
  "scroll_50",
  "scroll_75",
  "scroll_100",
]);

export async function trackEvent(
  eventName: string,
  options?: TrackEventOptions
): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const anonymousId = getOrCreateAnonymousId();
    const sessionId = getOrCreateSessionId();
    const deviceType = getDeviceType();
    const pagePath = options?.pagePath || window.location.pathname || "/";

    // Deduplicate page_view and scroll milestone events per session + pagePath
    if (DEDUPED_EVENTS.has(eventName)) {
      const storageKey = `soet_event_${sessionId}_${pagePath}_${eventName}`;
      try {
        if (sessionStorage.getItem(storageKey)) {
          return;
        }
        sessionStorage.setItem(storageKey, "1");
      } catch {
        // Proceed safely if sessionStorage access is restricted
      }
    }

    const payload = {
      anonymousId,
      sessionId,
      eventName,
      eventLabel: options?.eventLabel,
      pagePath,
      deviceType,
      metadata: options?.metadata ?? {},
    };

    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Fail silently to never impact user experience
  }
}
