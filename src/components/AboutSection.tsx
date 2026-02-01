import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-8 md:px-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="w-full aspect-square max-w-md mx-auto bg-muted/50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">👨‍💻</span>
                <p className="text-sm text-muted-foreground mt-4 italic">Profile Photo</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">ABOUT ME</h2>
            <div className="w-8 h-0.5 bg-[#8B3A3A]"></div>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate digital marketer specializing in data-driven strategies and creative campaigns that drive real business growth. With expertise in social media marketing, content strategy, SEO, and brand development, I help businesses connect with their audiences and achieve measurable results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My approach combines strategic thinking with creative execution, leveraging the latest digital tools and analytics to craft campaigns that not only engage but convert. From startups to established brands, I've helped clients scale their online presence and reach new markets.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="text-2xl font-bold text-foreground">25+</h4>
                <p className="text-sm text-muted-foreground">Campaigns Launched</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">15+</h4>
                <p className="text-sm text-muted-foreground">Brand Partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
