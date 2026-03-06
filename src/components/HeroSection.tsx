import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ismailIllustration from "@/assets/ismail-illustration.png";

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
    <section className="relative h-screen pt-16 flex items-center px-8 md:px-12 lg:px-16">
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
              <span className="font-nekst">m Into Digital Marketing</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="flex items-center gap-4 pt-2"
            >
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-wider bg-foreground text-background hover:opacity-85 transition-opacity"
              >
                Get in touch
              </a>
              <a
                href="/#about"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                See my work ↓
              </a>
            </motion.div>
          </div>

          {/* Sketch Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center -mt-8 md:mt-0"
          >
            <div className="relative flex flex-col items-center">
              <img
                src={ismailIllustration}
                alt="Dhiren illustration"
                className="w-64 md:w-80 lg:w-96 xl:w-full xl:max-w-xl h-auto"
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
