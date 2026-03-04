import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroPage from "@/components/heroPage";
import TryNap from "@/components/trySurfer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <HeroPage />
      <Features />
      <TryNap />
      <Footer />
    </main>
  );
}
