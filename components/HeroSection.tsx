import Image from "next/image";
import type { Candidate } from "@/types/manifesto";

interface HeroSectionProps {
  candidate: Candidate;
}

export default function HeroSection({ candidate }: HeroSectionProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      {/* University & School Header Banner */}
      <div className="flex items-center gap-4 p-4 mb-8 bg-cream border-2 border-near-black shadow-[4px_4px_0px_var(--color-near-black)]">
        <div className="relative shrink-0 w-12 h-16 sm:w-16 sm:h-20">
          <Image
            src="/images/manuu-logo.jpg"
            alt={candidate.university}
            fill
            sizes="(max-width: 640px) 48px, 64px"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-near-black/80">
            {candidate.university}
          </span>
          <span className="text-xs sm:text-sm font-medium text-near-black/70">
            {candidate.school}
          </span>
        </div>
      </div>

      {/* Hero Main Content Card */}
      <div className="bg-cream border-2 border-near-black shadow-[6px_6px_0px_var(--color-near-black)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Candidate Photo */}
        <div className="shrink-0">
          <div className="relative hero-photo-float">
            {/* Small decorative gold accent blocks */}
            <div
              className="absolute -top-2.5 -right-2.5 w-5 h-5 sm:w-6 sm:h-6 bg-gold border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] z-10 hero-accent-pulse pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2.5 -left-2.5 w-5 h-5 sm:w-6 sm:h-6 bg-gold border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] z-10 hero-accent-pulse-delayed pointer-events-none"
              aria-hidden="true"
            />

            {/* Photo Card with subtle shadow pulse and desktop hover scale */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-2 border-near-black bg-cream overflow-hidden hero-shadow-pulse transition-transform duration-300 md:hover:scale-[1.018]">
              <Image
                src="/images/meraj.jpg"
                alt={candidate.name}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/* Candidate Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 space-y-4">
          <div className="inline-block px-3 py-1 bg-gold border-2 border-near-black text-near-black text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--color-near-black)]">
            Candidate for {candidate.position}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-wider text-near-black leading-none">
            {candidate.name}
          </h1>

          <p className="text-base sm:text-lg font-semibold text-near-black/90">
            {candidate.school}
          </p>

          <p className="text-xs sm:text-sm font-medium text-near-black/70 uppercase tracking-wide">
            {candidate.university}
          </p>

          {/* Slogan */}
          <div className="w-full border-2 border-near-black bg-gold/15 p-3 sm:p-4 shadow-[3px_3px_0px_var(--color-near-black)]">
            <p className="text-sm sm:text-base font-semibold text-near-black italic">
              {candidate.slogan}
            </p>
          </div>

          {/* Call to action button */}
          <div className="pt-2 w-full sm:w-auto">
            <a
              href="#manifesto"
              className="pressable inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-8 py-3 bg-near-black text-cream font-bold text-base sm:text-lg uppercase tracking-wider border-2 border-near-black shadow-[4px_4px_0px_var(--color-gold)] active:shadow-[2px_2px_0px_var(--color-gold)] hover:bg-near-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Read the manifesto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
