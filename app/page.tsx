import manifestoData from "@/content/manifesto.json";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import SuggestIdeaSection from "@/components/SuggestIdeaSection";
import CommunitySection from "@/components/CommunitySection";
import FooterSection from "@/components/FooterSection";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream pb-24 md:pb-0">
      <HeroSection candidate={manifestoData.candidate} />
      <ManifestoSection manifesto={manifestoData.manifesto} />
      <SuggestIdeaSection suggestIdea={manifestoData.suggestIdea} />
      <CommunitySection community={manifestoData.community} />
      <FooterSection footer={manifestoData.footer} />
      <MobileBottomBar
        mobileBar={manifestoData.mobileBar}
        formUrl={manifestoData.suggestIdea.formUrl}
      />
    </main>
  );
}
