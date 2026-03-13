import DemoVid from "@/components/demoVideo";
import FAQs from "@/components/faqs";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroPage from "@/components/heroPage";
import Checkout from "@/components/payment";
import TryNap from "@/components/trySurfer";


export default function Home() {
  return (
    <div className="bg-white text-black">
      <Header />
      <h1 className="sr-only">Nap is an AI-powered code editor landing page highlighting speed, features, downloads, and trust, guiding developers to try it today.</h1>
      <HeroPage />
      <Features />

      <TryNap />
      <Footer />

    </div>
  );
}
