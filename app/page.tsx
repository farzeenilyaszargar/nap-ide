import DemoVid from "@/components/demoVideo";
import FAQs from "@/components/faqs";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroPage from "@/components/heroPage";
import Checkout from "@/components/payment";
import TrySurfers from "@/components/trySurfer";


export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroPage />
      <Features />
      <DemoVid />
      <TrySurfers />
      <Footer />

    </div>
  );
}
