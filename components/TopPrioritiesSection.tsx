"use client";

import { trackEvent } from "@/lib/analytics";

interface PriorityItem {
  number: string;
  title: string;
  description: string;
}

const TOP_PRIORITIES: PriorityItem[] = [
  {
    number: "01",
    title: "BETTER BASIC FACILITIES",
    description: "Classrooms, drinking water, sanitation and essential student facilities.",
  },
  {
    number: "02",
    title: "SKILLS & CAREER OPPORTUNITIES",
    description: "Clubs, innovation, skill development, industry exposure and career support.",
  },
  {
    number: "03",
    title: "STRONG STUDENT REPRESENTATION",
    description: "Raise student concerns and work for transparent, responsive representation.",
  },
];

export default function TopPrioritiesSection() {
  return (
    <section id="top-priorities" className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-near-black leading-none mb-3">
          TOP 3 PRIORITIES
        </h2>
        <p className="text-base sm:text-lg font-medium text-near-black/80 max-w-xl mx-auto">
          Focused on the student needs that matter most.
        </p>
      </div>

      {/* 3 Priorities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {TOP_PRIORITIES.map((priority) => (
          <article
            key={priority.number}
            className="bg-cream border-2 border-near-black border-t-4 border-t-gold shadow-[4px_4px_0px_var(--color-near-black)] p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-near-black/15">
                <span className="font-display text-2xl sm:text-3xl font-bold text-near-black/30 select-none leading-none">
                  {priority.number}
                </span>
                <span className="w-2 h-2 bg-gold border border-near-black rotate-45" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-near-black leading-tight mb-2.5">
                {priority.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-near-black/85 leading-relaxed">
                {priority.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Under Priorities */}
      <div className="mt-8 sm:mt-10 text-center">
        <a
          href="#manifesto"
          onClick={() => {
            trackEvent("manifesto_topic_nav_click", {
              eventLabel: "Top 3 Priorities CTA",
            });
          }}
          className="pressable inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-8 py-3 bg-near-black text-cream font-bold text-base sm:text-lg uppercase tracking-wider border-2 border-near-black shadow-[4px_4px_0px_var(--color-gold)] active:shadow-[2px_2px_0px_var(--color-gold)] hover:bg-near-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <span>Explore all 18 student priorities</span>
          <span className="ml-2 font-display text-xl leading-none" aria-hidden="true">&darr;</span>
        </a>
      </div>
    </section>
  );
}
