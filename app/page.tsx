import DemoVid from "@/components/demoVideo";
import FAQs from "@/components/faqs";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroPage from "@/components/heroPage";
import TrySurfers from "@/components/trySurfer";


export default function Home() {
  return (
    <div className="">
      <Header/>
      <HeroPage/>
      <section id="features">
      <Features/>

      </section>
      <FAQs/>
      <DemoVid/>
      <TrySurfers/>
      <Footer/>
      
    </div>
  );
}
