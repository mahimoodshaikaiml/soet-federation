import type { Candidate, AboutContent } from "@/types/manifesto";

interface AboutSectionProps {
  about: AboutContent;
  candidate: Candidate;
}

export default function AboutSection({ about, candidate }: AboutSectionProps) {
  return (
    <section id="about" className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-cream border-2 border-near-black shadow-[6px_6px_0px_var(--color-near-black)] p-6 sm:p-8 md:p-10 space-y-6">
        {/* Section Heading */}
        <div className="pb-4 border-b-2 border-near-black/15">
          <div className="inline-block px-3 py-1 bg-gold border-2 border-near-black text-near-black text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--color-near-black)] mb-3">
            {about.eyebrow}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-near-black leading-none">
            {about.title}
          </h2>
        </div>

        {/* Factual Candidate Details */}
        <div className="border-2 border-near-black bg-cream p-5 sm:p-6 shadow-[3px_3px_0px_var(--color-near-black)] space-y-2">
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-near-black">
            {candidate.name}
          </h3>
          <p className="text-base sm:text-lg font-bold text-near-black">
            {candidate.position}
          </p>
          <p className="text-sm sm:text-base font-medium text-near-black/85">
            {candidate.school}
          </p>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-near-black/70">
            {candidate.university}
          </p>
        </div>

        {/* About Body Text */}
        <div className="pt-2">
          <p className="text-base leading-relaxed text-near-black/85">
            {about.body}
          </p>
        </div>
      </div>
    </section>
  );
}
