import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-card">
      <Navbar />
      <HeroSection />
      <BrandsSection />
      <WorkSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
