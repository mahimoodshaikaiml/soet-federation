import manifestoData from "@/content/manifesto.json";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import SuggestIdeaSection from "@/components/SuggestIdeaSection";
import CommunitySection from "@/components/CommunitySection";
import FooterSection from "@/components/FooterSection";
import MobileBottomBar from "@/components/MobileBottomBar";

function SectionDivider() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2 flex items-center justify-center" aria-hidden="true">
      <div className="h-px bg-near-black/20 flex-1" />
      <div className="w-2.5 h-2.5 bg-gold border border-near-black mx-4 rotate-45 shrink-0 shadow-[1px_1px_0px_var(--color-near-black)]" />
      <div className="h-px bg-near-black/20 flex-1" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-cream pb-24 md:pb-0">
      <HeroSection candidate={manifestoData.candidate} />
      <SectionDivider />
      <ManifestoSection manifesto={manifestoData.manifesto} />
      <SectionDivider />
      <SuggestIdeaSection suggestIdea={manifestoData.suggestIdea} />
      <SectionDivider />
      <CommunitySection community={manifestoData.community} />
      <FooterSection footer={manifestoData.footer} />
      <MobileBottomBar
        mobileBar={manifestoData.mobileBar}
        formUrl={manifestoData.suggestIdea.formUrl}
      />
    </main>
  );
}
