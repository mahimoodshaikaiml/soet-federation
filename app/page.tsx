import manifestoData from "@/content/manifesto.json";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <HeroSection candidate={manifestoData.candidate} />
      <ManifestoSection manifesto={manifestoData.manifesto} />
    </main>
  );
}
