import type { ManifestoBox } from "@/types/manifesto";

interface ManifestoCardProps {
  box: ManifestoBox;
}

export default function ManifestoCard({ box }: ManifestoCardProps) {
  return (
    <article className="bg-cream border-2 border-near-black shadow-[6px_6px_0px_var(--color-near-black)] p-6 sm:p-8 flex flex-col h-full">
      {/* Box Heading */}
      <div className="mb-6 pb-4 border-b-2 border-near-black/15">
        <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-near-black leading-tight">
          {box.heading}
        </h3>
      </div>

      {/* Points List */}
      <ul className="space-y-6 flex-1 list-none p-0 m-0">
        {box.points.map((point) => (
          <li key={point.number} className="flex items-start gap-4">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 bg-near-black text-cream font-bold text-sm border-2 border-near-black shadow-[2px_2px_0px_var(--color-gold)]">
              {point.number}
            </span>
            <div className="space-y-1.5 flex-1">
              <h4 className="text-base font-bold uppercase tracking-wide text-near-black">
                {point.title}
              </h4>
              <p className="text-base leading-relaxed text-near-black/85">
                {point.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
