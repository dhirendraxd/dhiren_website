import { motion } from "framer-motion";

const WorkSection = () => {
  const projects = [
    {
      id: 1,
      title: "Brand Identity Design",
      category: "Branding",
      color: "bg-gradient-to-br from-orange-400 to-rose-500",
    },
    {
      id: 2,
      title: "Mobile App UI",
      category: "UI/UX",
      color: "bg-gradient-to-br from-blue-400 to-indigo-600",
    },
    {
      id: 3,
      title: "E-commerce Website",
      category: "Web Design",
      color: "bg-gradient-to-br from-emerald-400 to-teal-600",
    },
    {
      id: 4,
      title: "Marketing Campaign",
      category: "Graphic Design",
      color: "bg-gradient-to-br from-purple-400 to-pink-600",
    },
    {
      id: 5,
      title: "Product Photography",
      category: "Creative Direction",
      color: "bg-gradient-to-br from-amber-400 to-orange-600",
    },
    {
      id: 6,
      title: "Social Media Design",
      category: "Digital Marketing",
      color: "bg-gradient-to-br from-cyan-400 to-blue-600",
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
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">SELECTED WORK</h2>
          <div className="w-8 h-0.5 bg-accent mx-auto mt-3"></div>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-6">
            A collection of projects I've worked on across various industries and disciplines.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className={`${project.color} aspect-[4/3] rounded-xl overflow-hidden relative`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium px-4 py-2 bg-black/50 rounded-full">
                    View Project
                  </span>
                </div>
              </div>
              
              {/* Info */}
              <div className="mt-4 space-y-1">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
