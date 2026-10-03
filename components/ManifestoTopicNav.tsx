import type { ManifestoBox } from "@/types/manifesto";

interface ManifestoTopicNavProps {
  boxes: ManifestoBox[];
}

export default function ManifestoTopicNav({ boxes }: ManifestoTopicNavProps) {
  return (
    <nav
      aria-label="Manifesto topics"
      className="sticky top-0 z-20 bg-cream border-y-2 border-near-black -mx-4 px-4 py-2.5 sm:py-3 mb-8 shadow-[0_2px_0_0_var(--color-near-black)]"
    >
      <div className="max-w-4xl mx-auto overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 sm:gap-3 py-1 w-max min-w-full">
          {boxes.map((box) => (
            <a
              key={box.id}
              href={`#manifesto-topic-${box.id}`}
              className="pressable inline-flex items-center min-h-[44px] sm:min-h-[48px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-near-black bg-cream border-2 border-near-black shadow-[2px_2px_0px_var(--color-near-black)] active:shadow-none hover:bg-gold hover:text-near-black transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {box.heading}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
