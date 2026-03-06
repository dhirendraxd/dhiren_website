import { motion } from "framer-motion";
import { Globe, Users, GraduationCap, BriefcaseBusiness, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const BrandsSection = () => {
  const affiliations = [
    { 
      id: 1, 
      name: "ALL In Foundation (AIF)", 
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      role: "Fellow",
      date: "Feb 2026 - Present · 2 mos",
      description: "Selected as a fellow to contribute to social impact initiatives, community-driven programs, and collaborative learning."
    },
    { 
      id: 2, 
      name: "AWS Cloud Club Nepal", 
      image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href,
      role: "College Representative",
      date: "Mar 2025 - Present · 1 yr 1 mo",
      description: "Organizing sessions on AWS and cloud tools. Promoting community-focused learning and cloud skill adoption."
    },
    { 
      id: 3, 
      name: "NetMission.Asia", 
      image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href,
      role: "NetMission Ambassador",
      date: "Dec 2025 - Mar 2026 · 4 mos",
      description: "2026 cohort participant in online training, webinars, and projects focused on Internet governance and digital rights advocacy."
    },
    { 
      id: 4, 
      name: "Rotaract Club of Kirtipur", 
      image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href,
      role: "Member",
      date: "Jun 2025 - Present",
      description: "Supporting civic, tech-forward, and sustainability initiatives. Involved in planning youth and community programs."
    },
    { 
      id: 5, 
      name: "CtrlBits", 
      image: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href,
      role: "Digital Marketer",
      date: "Apr 2025 - Present · 1 yr",
      description: "Writing optimized blogs and managing analytics & content strategy. Leading digital marketing for internal and client web apps."
    },
    { 
      id: 6, 
      name: "Sustainability Solutions", 
      image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href,
      role: "Sustainability Mentee",
      date: "Aug 2025 - Dec 2025 · 5 mos",
      description: "Design Thinking and Sustainable Business Model development through structured mentorship program."
    },
  ];

  const highlights = [
    { id: 1, icon: Globe, label: "Global collaborations" },
    { id: 2, icon: Users, label: "Community leadership" },
    { id: 3, icon: GraduationCap, label: "Fellowships & programs" },
    { id: 4, icon: BriefcaseBusiness, label: "Professional networks" },
    { id: 5, icon: Handshake, label: "Nonprofit partnerships" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % affiliations.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [affiliations.length, isAutoPlay]);

  const currentAffiliation = affiliations[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % affiliations.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + affiliations.length) % affiliations.length);
  };

  return (
    <section id="communities" className="min-h-screen py-32 px-8 md:px-12 bg-card flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 items-stretch auto-rows-max">
          {/* Left Content */}
          <motion.div
            className="space-y-4 flex flex-col justify-between"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-green-700">Communities & Programs</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight max-w-lg">
                Communities & Collaborations
              </h2>
            </div>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              Organizations, fellowships, and networks where I collaborate, learn, and contribute to technology, sustainability, and digital innovation.
            </p>
            <div className="pt-2 flex flex-col gap-4 flex-grow">
              {highlights.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm font-rajdhani font-semibold text-foreground whitespace-nowrap">
                  <span className="inline-flex h-6 w-6 items-center justify-center text-red-900 flex-shrink-0">
                    <item.icon size={18} />
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
              
              <div className="pt-6 mt-auto">
                <a
                  href="/affiliations"
                  className="inline-flex text-sm font-rajdhani font-medium text-foreground underline underline-offset-4 decoration-transparent transition-colors hover:decoration-yellow-700"
                >
                  Explore all affiliations →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Carousel Card */}
          <motion.div
            className="flex flex-col h-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-2xl rounded-3xl">
              
              {/* Image Carousel */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 min-h-[500px] flex flex-col"
              >
                <div className="flex items-center justify-center h-80 flex-shrink-0">
                  <img
                    src={currentAffiliation.image}
                    alt={currentAffiliation.name}
                    className="max-h-80 max-w-full object-contain"
                  />
                </div>
                <div className="border-t border-border/50 flex-shrink-0" />
                {/* Details */}
                <div className="space-y-3 flex-shrink-0">
                  <h3 className="text-xl font-semibold text-foreground">{currentAffiliation.name}</h3>
                  <p className="text-sm font-medium text-green-700">{currentAffiliation.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{currentAffiliation.description}</p>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={goPrev}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/40 text-foreground hover:border-green-700 hover:text-green-700 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {affiliations.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex ? "w-8 bg-green-700" : "w-2 bg-muted"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/40 text-foreground hover:border-green-700 hover:text-green-700 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
