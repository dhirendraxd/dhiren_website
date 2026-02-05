import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WorkSection = () => {
  const hackathons = [
    {
      id: 1,
      name: "Event 1",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
      credit: "@samanthakey"
    },
    {
      id: 2,
      name: "KEC Lite 2081",
      image: new URL("@/assets/hackathon&evets/kec_lite_2081-thumbnail-1000x525.png", import.meta.url).href,
      credit: "@yvonneleon"
    },
    {
      id: 3,
      name: "Event 3",
      image: new URL("@/assets/hackathon&evets/logo.png", import.meta.url).href,
      credit: "@event"
    },
    {
      id: 4,
      name: "SXC Sandbox",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
      credit: "@sxcsandbox"
    },
  ];

  return (
    <section id="work" className="py-24 px-8 md:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-green-700 mb-4">From Our Community</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Hackathons & Events</h2>
          <div className="w-12 h-1 bg-green-700 mx-auto mt-6"></div>
        </motion.div>

        {/* Feature Layout - Left Image, Right Info */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-stretch relative">
          {/* Vertical Separator Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 transform -translate-x-1/2"></div>

          {/* Left - Featured Large Image */}
          <motion.div
            className="relative aspect-square overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={hackathons[3].image}
              alt={hackathons[3].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium">
              {hackathons[3].credit}
            </div>
          </motion.div>

          {/* Right - Info Section */}
          <motion.div
            className="flex flex-col justify-between space-y-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <p className="text-xs text-green-700 font-semibold tracking-widest uppercase">Showcase</p>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                A collection of hackathons, events, and community gatherings where ideas transform into reality through teamwork and innovation.
              </p>
            </div>

            {/* Thumbnail Gallery with Enhanced Styling */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest">Featured Events</p>
              <div className="grid grid-cols-3 gap-5">
                {hackathons.slice(0, 3).map((hackathon, idx) => (
                  <motion.div
                    key={hackathon.id}
                    className="relative aspect-square overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={hackathon.image}
                      alt={hackathon.name}
                      className={`w-full h-full object-cover ${
                        idx === 2 ? 'brightness-50' : ''
                      }`}
                    />
                    {idx === 2 && (
                      <>
                        <div className="absolute inset-0 bg-black/25" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">+{hackathons.length - 3}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="/hackathon"
              className="inline-flex items-center gap-2 text-sm font-rajdhani font-semibold text-foreground underline underline-offset-4 decoration-transparent transition-colors hover:decoration-yellow-700 hover:gap-3 group w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Events
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
