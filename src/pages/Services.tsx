import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const services = [
  {
    title: "Digital Marketing",
    description: "SEO, content strategy, and data-driven campaigns to help brands grow online.",
    href: "/#about",
  },
  {
    title: "Content & Storytelling",
    description: "Creating blogs, narratives, and digital content that connect ideas with audiences.",
    href: "/#about",
  },
  {
    title: "Tech & Web Projects",
    description: "Collaborating on digital platforms, MVPs, and experiments with startups and teams.",
    href: "/hackathon",
  },
  {
    title: "Community & Sustainability",
    description:
      "Actively involved in fellowships, community programs, and sustainability initiatives that create collaborative social impact.",
    href: "/affiliations",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-card">
      <ScrollProgressBar />
      <Navbar />

      <section className="pt-28 pb-20 px-8 md:px-12 font-rajdhani">
        <div className="max-w-[84rem] mx-auto space-y-12">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">My Services</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">All Services</h1>
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
              A brief overview of the areas I work on across digital growth, storytelling, collaborative tech, and
              community impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const isHighlighted = index === 0;

              return (
                <motion.article
                  key={service.title}
                  className={`border min-h-[240px] p-7 flex flex-col justify-between ${
                    isHighlighted
                      ? "bg-[#7A3A30] border-[#7A3A30] text-[#FFF5F0]"
                      : "bg-card border-border text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight leading-tight">{service.title}</h2>
                    <p className={`text-sm leading-relaxed ${isHighlighted ? "text-[#F4D8CF]" : "text-muted-foreground"}`}>
                      {service.description}
                    </p>
                  </div>

                  <Link
                    to={service.href}
                    className={`group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isHighlighted
                        ? "text-[#FFF5F0] hover:text-[#FDE8DD]"
                        : "text-foreground/80 hover:text-[#7A3A30]"
                    }`}
                  >
                    <span className="relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                      Read More
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
