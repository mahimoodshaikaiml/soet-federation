"use client";

import { useState } from "react";
import type { ManifestoPoint } from "@/types/manifesto";

interface ManifestoAccordionProps {
  point: ManifestoPoint;
}

export default function ManifestoAccordion({ point }: ManifestoAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `manifesto-point-content-${point.number}`;
  const headerId = `manifesto-point-header-${point.number}`;

  return (
    <div className="border-2 border-near-black bg-cream shadow-[3px_3px_0px_var(--color-near-black)] pressable-accordion">
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="pressable w-full min-h-[48px] p-3 sm:p-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-near-black/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <span className="shrink-0 flex items-center justify-center w-8 h-8 bg-near-black text-cream font-bold text-sm border-2 border-near-black shadow-[2px_2px_0px_var(--color-gold)]">
            {point.number}
          </span>
          <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-near-black leading-snug">
            {point.title}
          </span>
        </div>
        <span
          className="shrink-0 flex items-center justify-center w-7 h-7 border-2 border-near-black bg-cream text-near-black font-bold text-base leading-none shadow-[2px_2px_0px_var(--color-near-black)] select-none ml-2"
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 sm:pt-2 border-t-2 border-near-black/15"
        >
          <p className="text-base leading-relaxed text-near-black/85">
            {point.text}
          </p>
        </div>
      )}
    </div>
  );
}
