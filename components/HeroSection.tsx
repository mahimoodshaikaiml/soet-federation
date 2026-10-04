import Image from "next/image";
import type { Candidate } from "@/types/manifesto";

interface HeroSectionProps {
  candidate: Candidate;
}

export default function HeroSection({ candidate }: HeroSectionProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      {/* University & School Header Banner */}
      <div className="flex items-center justify-between gap-3.5 sm:gap-5 p-3.5 sm:p-4 mb-8 bg-cream border-2 border-near-black border-b-4 border-b-gold shadow-[4px_4px_0px_var(--color-near-black)] transition-transform duration-200 md:hover:-translate-y-0.5">
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
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-near-black/80 leading-snug">
            {candidate.university}
          </span>
          <span className="text-xs sm:text-sm font-medium text-near-black/70 leading-snug">
            {candidate.school}
          </span>
        </div>
        <div className="relative shrink-0 w-16 h-16 sm:w-24 sm:h-24">
          <Image
            src="/images/soet-logo.png"
            alt={candidate.school}
            fill
            sizes="(max-width: 640px) 64px, 96px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Hero Main Content Card */}
      <div className="bg-cream border-2 border-near-black shadow-[6px_6px_0px_var(--color-near-black)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Candidate Photo */}
        <div className="shrink-0 hero-enter-photo">
          <div className="relative hero-photo-float">
            {/* Subtle decorative gold dot grid accents behind photo frame */}
            <div
              className="absolute -top-3 -left-3 w-16 h-16 bg-[radial-gradient(var(--color-gold)_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-40 -z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-3 -right-3 w-16 h-16 bg-[radial-gradient(var(--color-gold)_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-40 -z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Small decorative gold accent blocks */}
            <div
              className="absolute -top-2.5 -right-2.5 w-6 h-6 sm:w-7 sm:h-7 bg-gold border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] z-10 hero-accent-pulse pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2.5 -left-2.5 w-6 h-6 sm:w-7 sm:h-7 bg-gold border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] z-10 hero-accent-pulse-delayed pointer-events-none"
              aria-hidden="true"
            />

            {/* Photo Card with layered neo-brutalist shadow and desktop hover scale */}
            <div className="relative w-48 h-60 sm:w-52 sm:h-64 md:w-56 md:h-72 border-2 border-near-black bg-cream overflow-hidden shadow-[4px_4px_0px_var(--color-near-black),_7px_7px_0px_var(--color-gold)] transition-transform duration-300 md:hover:scale-[1.018]">
              <Image
                src="/images/meraj-leader.png"
                alt={candidate.name}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 768px) 208px, 224px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>

        {/* Candidate Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 space-y-4 hero-enter-text">
          <div className="inline-block px-3 py-1 bg-gold border-2 border-near-black text-near-black text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--color-near-black)]">
            Candidate for {candidate.position}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-wider text-near-black leading-none">
            {candidate.name}
          </h1>

          <div>
            <span className="inline-flex items-center px-3 py-1 bg-near-black text-gold text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-near-black shadow-[2px_2px_0px_var(--color-gold)]">
              {candidate.program}
            </span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-near-black/80">
            {candidate.school}
          </p>

          <p className="text-xs sm:text-sm font-medium text-near-black/60 uppercase tracking-wider">
            {candidate.university}
          </p>

          {/* Slogan */}
          <div className="w-full border-l-4 border-gold border-y border-r border-near-black/20 bg-gold/10 p-3.5 sm:p-4 shadow-[3px_3px_0px_var(--color-near-black)]">
            <p className="text-sm sm:text-base font-medium text-near-black italic leading-relaxed">
              &ldquo;{candidate.slogan}&rdquo;
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

      {/* Focus & Context Summary Strip */}
      <div className="mt-6 sm:mt-8 border-2 border-near-black bg-cream shadow-[4px_4px_0px_var(--color-near-black)] grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-near-black">
        <div className="py-3.5 px-4 flex items-center justify-center gap-2.5 text-center">
          <span className="font-display text-3xl sm:text-4xl text-near-black leading-none">18</span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black/80">Student Priorities</span>
        </div>
        <div className="py-3.5 px-4 flex items-center justify-center gap-2.5 text-center bg-gold/5">
          <span className="font-display text-3xl sm:text-4xl text-near-black leading-none">5</span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black/80">Focus Areas</span>
        </div>
        <div className="py-3.5 px-4 flex items-center justify-center text-center bg-gold/15">
          <span className="font-display text-3xl sm:text-4xl text-near-black tracking-widest leading-none">SOET</span>
        </div>
      </div>
    </section>
  );
}
