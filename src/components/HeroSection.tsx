import { motion } from "framer-motion";
import ismailIllustration from "@/assets/ismail-illustration.png";

const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-80px)] flex items-start px-8 md:px-12 lg:px-16 pt-2 md:pt-6">
      <div className="w-full max-w-[84rem] mx-auto -mt-4 md:-mt-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-4 lg:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-muted-foreground"
            >
              <span className="font-nekst">I</span>
              <span className="font-sans">'</span>
              <span className="font-nekst">m Into Digital Marketing</span>
            </motion.h2>
          </div>

          {/* Sketch Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center -mt-8 md:mt-0"
          >
            <div className="relative flex flex-col items-center">
              <img 
                src={ismailIllustration} 
                alt="Dhiren illustration" 
                className="w-64 md:w-80 lg:w-96 xl:w-full xl:max-w-xl h-auto"
              />
              <p className="text-base md:text-lg text-muted-foreground italic font-light mt-4" style={{ fontFamily: 'cursive' }}>
                This is me!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
