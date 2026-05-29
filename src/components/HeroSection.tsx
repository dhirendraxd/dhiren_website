import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { assetPath } from '@/lib/assetPath';
const untitledDesignImage = assetPath('Untitled design.webp');

const HeroSection = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 160);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen pt-16 flex items-center px-8 md:px-12 lg:px-16" role="banner" aria-label="Hero section">
      <div className="w-full max-w-[84rem] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-4 lg:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight text-foreground whitespace-nowrap"
            >
              <span className="font-nekst">HI </span>
              <span className="font-sans">- </span>
              <span className="font-nekst">I</span>
              <span className="font-sans">'</span>
              <span className="font-nekst">M DHIREN</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-muted-foreground"
            >
              <span className="font-nekst">I</span>
              <span className="font-sans">'</span>
              <span className="font-nekst">m Into </span>
              <span className="font-nekst text-muted-foreground">Digital </span>
              <span className="font-nekst text-[#7A3A30]">Marketing</span>
            </motion.h2>

          </div>

          {/* Sketch Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center -mt-16 md:-mt-8"
          >
            <div className="relative flex flex-col items-center">
              <img
                src={untitledDesignImage}
                alt="Portrait illustration of Dhiren on the homepage"
                loading="eager"
                decoding="async"
                  fetchPriority="high"
                width={800}
                height={800}
                className="w-[clamp(18rem,32vw,32rem)] md:w-[clamp(22rem,36vw,40rem)] lg:w-[clamp(26rem,40vw,46rem)] xl:w-[clamp(30rem,42vw,52rem)] h-auto"
              />
              <p
                className="text-base md:text-lg text-muted-foreground italic font-light mt-4"
                style={{ fontFamily: "cursive" }}
              >
                This is me!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-muted-foreground"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <ChevronDown size={16} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
