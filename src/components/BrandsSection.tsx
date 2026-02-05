import { motion } from "framer-motion";
import { Globe, Users, GraduationCap, BriefcaseBusiness, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const BrandsSection = () => {
  const affiliations = [
    { 
      id: 1, 
      name: "All in Foundation", 
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      role: "Community Partner",
      description: "Collaborated on social impact initiatives and community development programs."
    },
    { 
      id: 2, 
      name: "Aspire Leaders Program", 
      image: new URL("@/assets/affiliation/aspire_leaders_program_logo.jpeg", import.meta.url).href,
      role: "Participant & Mentor",
      description: "Developed leadership skills and mentored emerging talent in the ecosystem."
    },
    { 
      id: 3, 
      name: "CtrlBits", 
      image: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href,
      role: "Tech Advisor",
      description: "Guided digital transformation and marketing strategy initiatives."
    },
    { 
      id: 4, 
      name: "AWS Cloud Club at TU", 
      image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href,
      role: "Club Lead",
      description: "Founded and led cloud computing community with 200+ members."
    },
    { 
      id: 5, 
      name: "NetMission", 
      image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href,
      role: "Strategic Partner",
      description: "Supported digital literacy and internet accessibility campaigns."
    },
    { 
      id: 6, 
      name: "RAC", 
      image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href,
      role: "Growth Consultant",
      description: "Implemented data-driven marketing strategies and growth initiatives."
    },
    { 
      id: 7, 
      name: "Sustainability Solutions Nepal", 
      image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href,
      role: "Digital Lead",
      description: "Drove digital campaigns for environmental sustainability projects."
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
    <section className="min-h-screen py-32 px-8 md:px-12 bg-card flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 items-stretch auto-rows-max\">
          {/* Left Content */}
          <motion.div
            className="space-y-4 flex flex-col justify-between\"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-green-700">Organizations & Communities</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight max-w-lg">
                Trusted circles that shaped my growth
              </h2>
            </div>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              A curated list of organizations and programs I've been part of through formal roles, fellowships, mentorships, and sustained involvement.
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
