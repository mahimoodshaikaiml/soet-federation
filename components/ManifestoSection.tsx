import type { ManifestoContent } from "@/types/manifesto";
import ManifestoCard from "@/components/ManifestoCard";

interface ManifestoSectionProps {
  manifesto: ManifestoContent;
}

export default function ManifestoSection({ manifesto }: ManifestoSectionProps) {
  return (
    <section id="manifesto" className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12 text-center md:text-left border-2 border-near-black bg-cream p-6 sm:p-8 shadow-[6px_6px_0px_var(--color-near-black)]">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-near-black leading-none mb-4">
          {manifesto.title}
        </h2>
        <p className="text-base sm:text-lg font-medium text-near-black/90 leading-relaxed max-w-3xl">
          {manifesto.opening}
        </p>
      </div>

      {/* 5 Manifesto Topic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {manifesto.boxes.map((box) => (
          <div
            key={box.id}
            className={box.id === 5 ? "md:col-span-2" : undefined}
          >
            <ManifestoCard box={box} />
          </div>
        ))}
      </div>
    </section>
  );
}
