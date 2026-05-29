import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { assetPath } from '@/lib/assetPath';
const heroImage = assetPath('untitled-design.webp');
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PreContactSection from "@/components/PreContactSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.replace("#", "");

    if (!targetId) {
      return;
    }

    // Delay ensures the target section exists after route/page transitions.
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div id="home" className="min-h-screen bg-card scroll-mt-24">
      <Seo
        title="Dhirendra Singh Dhami | Digital Marketing, SEO, and Youth Advocacy"
        description="Portfolio of Dhirendra Singh Dhami, focused on digital marketing, SEO, content strategy, youth advocacy, and practical civic-tech projects."
        canonicalPath="/"
        image={heroImage}
        imageAlt="Portrait illustration of Dhiren on the homepage"
        type="website"
      />
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PreContactSection />
      <ConnectSection />
      <Footer />
    </div>
  );
};

export default Index;
