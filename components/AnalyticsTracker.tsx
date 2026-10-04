"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pageViewSentRef = useRef(false);
  const firedMilestonesRef = useRef<{ [key: number]: boolean }>({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    const pagePath = window.location.pathname;

    // Check sessionStorage to pre-seed fired milestones for current session and page
    try {
      const sessionId = sessionStorage.getItem("soet_session_id");
      if (sessionId) {
        for (const m of [25, 50, 75, 100]) {
          if (sessionStorage.getItem(`soet_event_${sessionId}_${pagePath}_scroll_${m}`)) {
            firedMilestonesRef.current[m] = true;
          }
        }
      }
    } catch {
      // Safe fallback if sessionStorage is blocked
    }

    // Send page_view on initial page load (trackEvent will deduplicate per session)
    if (!pageViewSentRef.current) {
      pageViewSentRef.current = true;
      trackEvent("page_view", {
        pagePath,
      });
    }

    let isTicking = false;

    const checkScrollMilestones = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        return;
      }

      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const scrollPercentage = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / scrollHeight) * 100))
      );

      const milestones = [25, 50, 75, 100] as const;

      for (const milestone of milestones) {
        const threshold = milestone === 100 ? 98 : milestone;
        if (
          scrollPercentage >= threshold &&
          !firedMilestonesRef.current[milestone]
        ) {
          firedMilestonesRef.current[milestone] = true;
          trackEvent(`scroll_${milestone}`, {
            pagePath: window.location.pathname,
          });
        }
      }
    };

    const handleScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          checkScrollMilestones();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    // Check once in case page was reloaded at a scrolled position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
