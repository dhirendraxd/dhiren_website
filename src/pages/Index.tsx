import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-card">
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
