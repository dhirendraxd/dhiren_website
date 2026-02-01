import { motion } from "framer-motion";
import ismailIllustration from "@/assets/ismail-illustration.png";

const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-80px)] flex items-center px-8 md:px-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground"
            >
              HI - I'M ISMAIL
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-muted-foreground"
            >
              I'M DOING DESIGN
            </motion.h2>
          </div>

          {/* Sketch Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative flex flex-col items-center">
              <img 
                src={ismailIllustration} 
                alt="Ismail illustration" 
                className="w-56 md:w-72 lg:w-80 h-auto"
              />
              <p className="text-sm text-muted-foreground italic font-light mt-3" style={{ fontFamily: 'cursive' }}>
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
