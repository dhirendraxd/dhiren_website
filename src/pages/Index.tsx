import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";

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
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
