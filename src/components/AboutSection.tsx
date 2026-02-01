import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-8 md:px-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-full aspect-square max-w-md mx-auto bg-muted/50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">👨‍💻</span>
                <p className="text-sm text-muted-foreground mt-4 italic">Profile Photo</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">ABOUT ME</h2>
            <div className="w-8 h-0.5 bg-accent"></div>
            <p className="text-muted-foreground leading-relaxed">
              I'm a creative designer with over 5 years of experience in branding, UI/UX design, and visual communication. I believe in creating designs that not only look beautiful but also solve real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My approach combines minimalist aesthetics with functional design principles, ensuring every project delivers both visual impact and user satisfaction.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="text-2xl font-bold text-foreground">50+</h4>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">30+</h4>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
