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
import PageLoader from "@/components/PageLoader";

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dhirendra Singh Dhami",
    alternateName: ["Dhiren"],
    jobTitle: "Digital Marketing Specialist",
    description: "Digital marketer and youth advocate focused on SEO, campaign growth, and civic-tech initiatives.",
    url: "https://dhirendrasinghdhami.com.np/",
    image: heroImage,
    sameAs: ["https://github.com/dhirendraxd"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dhirendra Singh Dhami Portfolio",
    url: "https://dhirendrasinghdhami.com.np/",
    description: "Portfolio of Dhirendra Singh Dhami: digital marketing, SEO, and youth advocacy.",
  },
];

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
      <PageLoader />
      <Seo
        title="Dhirendra Singh Dhami | Digital Marketing, SEO, and Youth Advocacy"
        description="Portfolio of Dhirendra Singh Dhami, focused on digital marketing, SEO, content strategy, youth advocacy, and practical civic-tech projects."
        canonicalPath="/"
        image={heroImage}
        imageAlt="Portrait illustration of Dhiren on the homepage"
        type="website"
        schema={homeSchema}
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
