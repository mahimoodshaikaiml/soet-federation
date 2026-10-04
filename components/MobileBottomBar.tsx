"use client";

import type { MobileBarContent } from "@/types/manifesto";
import { trackEvent } from "@/lib/analytics";

interface MobileBottomBarProps {
  mobileBar: MobileBarContent;
  formUrl: string;
}

export default function MobileBottomBar({
  mobileBar,
  formUrl,
}: MobileBottomBarProps) {
  const handleWhatsAppShare = () => {
    trackEvent("whatsapp_share_click", {
      eventLabel: "Share on WhatsApp",
    });
    if (typeof window === "undefined") return;
    const currentUrl = window.location.href;
    const message = `${mobileBar.shareText} ${currentUrl}`.trim();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <aside
      aria-label="Mobile actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-cream border-t-2 border-near-black shadow-[0_-3px_0_0_var(--color-near-black)] p-2.5 sm:p-3"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-md mx-auto">
        {/* WhatsApp Share Button */}
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="pressable inline-flex items-center justify-center w-full min-h-[48px] px-2 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-cream bg-near-black border-2 border-near-black shadow-[2px_2px_0px_var(--color-gold)] active:shadow-none hover:bg-near-black/90 transition-colors text-center leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          {mobileBar.whatsappLabel}
        </button>

        {/* Suggest an Idea Link */}
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("suggestion_click", {
              eventLabel: "Share Your Idea",
            });
          }}
          className="pressable inline-flex items-center justify-center w-full min-h-[48px] px-2 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black bg-gold border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] active:shadow-none hover:bg-gold/90 transition-colors text-center leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          {mobileBar.suggestLabel}
        </a>
      </div>
    </aside>
  );
}
