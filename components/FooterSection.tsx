import type { FooterContent } from "@/types/manifesto";

interface FooterSectionProps {
  footer: FooterContent;
}

export default function FooterSection({ footer }: FooterSectionProps) {
  return (
    <footer className="w-full border-t-2 border-near-black bg-cream py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm sm:text-base font-medium text-near-black/80 leading-relaxed">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
