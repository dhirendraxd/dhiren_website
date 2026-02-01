import { motion } from "framer-motion";

const WorkSection = () => {
  const hackathons = [
    {
      id: 1,
      name: "Event 1",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
    },
    {
      id: 2,
      name: "KEC Lite 2081",
      image: new URL("@/assets/hackathon&evets/kec_lite_2081-thumbnail-1000x525.png", import.meta.url).href,
    },
    {
      id: 3,
      name: "Event 3",
      image: new URL("@/assets/hackathon&evets/logo.png", import.meta.url).href,
    },
    {
      id: 4,
      name: "SXC Sandbox",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
    },
  ];

  return (
    <section id="work" className="py-20 px-8 md:px-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">HACKATHON & EVENT</h2>
          <div className="w-8 h-0.5 bg-accent mx-auto mt-3"></div>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-6">
            Experiments in teamwork, time pressure, and turning ideas into something real.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-secondary/50">
                <img
                  src={hackathon.image}
                  alt={hackathon.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium px-4 py-2 bg-black/50 rounded-full">
                    View
                  </span>
                </div>
              </div>
              
              {/* Info */}
              <div className="mt-4 space-y-1">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {hackathon.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
