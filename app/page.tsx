import manifestoData from "@/content/manifesto.json";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import AboutSection from "@/components/AboutSection";
import SuggestIdeaSection from "@/components/SuggestIdeaSection";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream pb-24 md:pb-0">
      <HeroSection candidate={manifestoData.candidate} />
      <ManifestoSection manifesto={manifestoData.manifesto} />
      <AboutSection
        about={manifestoData.about}
        candidate={manifestoData.candidate}
      />
      <SuggestIdeaSection suggestIdea={manifestoData.suggestIdea} />
      <MobileBottomBar
        mobileBar={manifestoData.mobileBar}
        formUrl={manifestoData.suggestIdea.formUrl}
      />
    </main>
  );
}
