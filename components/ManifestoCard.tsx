import type { ManifestoBox } from "@/types/manifesto";
import ManifestoAccordion from "@/components/ManifestoAccordion";

interface ManifestoCardProps {
  box: ManifestoBox;
}

export default function ManifestoCard({ box }: ManifestoCardProps) {
  return (
    <article className="bg-cream border-2 border-near-black border-t-4 border-t-gold shadow-[6px_6px_0px_var(--color-near-black)] p-6 sm:p-8 flex flex-col h-full relative">
      {/* Box Heading & Section Number */}
      <div className="mb-6 pb-4 border-b-2 border-near-black/15 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-near-black leading-tight flex-1">
          {box.heading}
        </h3>
        <span className="font-display text-2xl sm:text-3xl font-bold text-near-black/25 select-none shrink-0 leading-none">
          0{box.id}
        </span>
      </div>

      {/* Points Accordions */}
      <div className="space-y-4 flex-1">
        {box.points.map((point) => (
          <ManifestoAccordion key={point.number} point={point} />
        ))}
      </div>
    </article>
  );
}
