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

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dhirendra Singh Dhami",
    alternateName: ["Dhiren"],
    jobTitle: "Digital Marketer, SEO Specialist, Youth Advocate, and Communication Trainer",
    description:
      "Kathmandu-based digital marketer focused on SEO, content, campaigns, and analytics. Also a communication trainer and youth advocate working across climate action and justice, digital rights, internet governance, civic engagement, and community initiatives.",
    url: "https://dhirendrasinghdhami.com.np/",
    image: "https://dhirendrasinghdhami.com.np/optimized_images/untitled-design.webp",
    sameAs: [
      "https://www.linkedin.com/in/dhirendraxd/",
      "https://github.com/dhirendraxd",
      "https://www.instagram.com/dhirendraxd/",
      "https://www.behance.net/dhirendraxd",
    ],
    knowsAbout: [
      "Digital Marketing",
      "Search Engine Optimization",
      "Content Strategy",
      "Campaign Analytics",
      "Communication Training",
      "Climate Action",
      "Climate Justice",
      "Digital Rights",
      "Internet Governance",
      "Youth Leadership",
      "Civic Engagement",
      "Civic Technology",
      "Sustainability",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dhirendra Singh Dhami Portfolio",
    url: "https://dhirendrasinghdhami.com.np/",
    description:
      "Portfolio of Dhirendra Singh Dhami (Dhiren), a digital marketer, communication trainer, and youth advocate in Kathmandu, Nepal.",
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
      <Seo
        title="Dhirendra Singh Dhami (Dhiren) | Digital Marketer & SEO Specialist"
        description="Dhirendra Singh Dhami (Dhiren) is a Kathmandu-based digital marketer specializing in SEO, content and campaigns, and a communication trainer and youth advocate."
        canonicalPath="/"
        image={heroImage}
        imageAlt="Portrait illustration of Dhiren on the homepage"
        type="website"
        keywords={["Dhirendra Singh Dhami", "Dhiren", "digital marketer Nepal", "SEO specialist", "communication trainer", "content strategy", "youth advocacy", "climate justice", "digital rights", "internet governance"]}
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
