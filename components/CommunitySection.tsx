"use client";

import type { CommunityContent } from "@/types/manifesto";
import { trackEvent } from "@/lib/analytics";

interface CommunitySectionProps {
  community: CommunityContent;
}

export default function CommunitySection({
  community,
}: CommunitySectionProps) {
  return (
    <section id="community" className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-cream border-2 border-near-black shadow-[6px_6px_0px_var(--color-near-black)] p-6 sm:p-8 md:p-10 space-y-6">
        {/* Section Heading */}
        <div className="pb-4 border-b-2 border-near-black/15">
          <div className="inline-block px-3 py-1 bg-gold border-2 border-near-black text-near-black text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--color-near-black)] mb-3">
            {community.eyebrow}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-near-black leading-none">
            {community.title}
          </h2>
        </div>

        {/* Body Text */}
        <div>
          <p className="text-base sm:text-lg leading-relaxed text-near-black/85">
            {community.body}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <a
            href={community.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("whatsapp_community_click", {
                eventLabel: "Join WhatsApp Community",
              });
            }}
            className="pressable inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-8 py-3 bg-near-black text-cream font-bold text-base sm:text-lg uppercase tracking-wider border-2 border-near-black shadow-[4px_4px_0px_var(--color-gold)] active:shadow-[2px_2px_0px_var(--color-gold)] hover:bg-near-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            {community.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
