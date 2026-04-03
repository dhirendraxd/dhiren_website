import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Megaphone, Code2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getRelevantExperiences } from "@/data/affiliations";

const AboutSection = () => {
  const workAreas = [
    {
      title: "Digital Marketing",
      description: "SEO, PPC, content marketing, and visual design to scale your reach and drive growth.",
      icon: Megaphone,
      href: "/digital-marketing",
    },
    {
      title: "Advocacy & Community Projects",
      description: "Advocacy and community-centered initiatives focused on awareness, collaboration, and social impact.",
      icon: Users,
      href: "/advocacy-community",
    },
    {
      title: "Hackathons & Builds",
      description: "Technical hackathon work in short: coding core features, integrating APIs, debugging flows, and shipping prototypes.",
      icon: Code2,
      href: "/tech-projects",
    },
  ];

  const experiments = getRelevantExperiences();

  const projects = [
    {
      id: 1,
      type: "Tech Project",
      title: "AI-assisted web solution for public document workflows.",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
      href: "/projects/government-workflow-assistant",
    },
    {
      id: 2,
      type: "Community Project",
      title: "Community fellowship initiatives for collaborative social impact.",
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      href: "/projects/fellowship-community-labs",
    },
    {
      id: 3,
      type: "Tech Project",
      title: "Volunteer platform design for NGOs and youth programs.",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
      href: "/projects/ngo-volunteer-management",
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 pt-24 pb-10 md:pb-12 px-8 md:px-12 bg-card font-rajdhani">
      <div className="max-w-[84rem] mx-auto">
        <div className="space-y-10">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">My Services</p>

            <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-8 items-start">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-md">
                What I Work On
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Focused on three core areas: digital marketing, advocacy and community projects, and hackathons and builds.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {workAreas.map((area, index) => {
              const Icon = area.icon;
              const isHighlighted = index === 0;

              return (
                <motion.div
                  key={area.title}
                  className={`border min-h-[260px] p-7 flex flex-col justify-between ${
                    isHighlighted
                      ? "bg-[#7A3A30] border-[#7A3A30] text-[#FFF5F0]"
                      : "bg-card border-border text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-5">
                    <Icon
                      size={24}
                      className={isHighlighted ? "text-[#FFF5F0]" : "text-foreground"}
                      strokeWidth={1.75}
                    />
                    <h3 className="text-2xl font-semibold tracking-tight leading-tight">{area.title}</h3>
                    <p className={`text-sm leading-relaxed ${isHighlighted ? "text-[#F4D8CF]" : "text-muted-foreground"}`}>
                      {area.description}
                    </p>
                  </div>

                  <Link
                    to={area.href}
                    className={`group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isHighlighted
                        ? "text-[#FFF5F0] hover:text-[#FDE8DD]"
                        : "text-foreground/80 hover:text-[#7A3A30]"
                    }`}
                  >
                    <span className="relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                      Read More
                    </span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 space-y-10">
          <motion.div
            className="flex flex-col items-center text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Relevant Experience</h3>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Hands-on experience across SEO, content, campaign execution, and performance analytics to improve reach, engagement, and conversions.
            </p>
          </motion.div>

          <div className="space-y-4">
            {experiments.map((item, index) => {
              const isHighlighted = index === 0;

              return (
                <motion.div
                  key={item.title}
                  className={`border px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                    isHighlighted
                      ? "bg-foreground border-foreground text-background"
                      : "bg-card border-border text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`h-8 w-8 shrink-0 inline-flex items-center justify-center text-sm font-bold ${
                        isHighlighted ? "bg-background/15 text-background" : "bg-foreground text-background"
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="space-y-1">
                      <h4 className="text-xl font-semibold tracking-tight">{item.title}</h4>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm leading-relaxed underline underline-offset-4 decoration-transparent transition-colors hover:decoration-current ${
                          isHighlighted ? "text-background/80 hover:text-background" : "text-muted-foreground hover:text-[#7A3A30]"
                        }`}
                      >
                        {item.company}
                      </a>
                      {item.suffix ? (
                        <span className={`text-sm leading-relaxed ${isHighlighted ? "text-background/80" : "text-muted-foreground"}`}>
                          {item.suffix}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className={`md:pl-6 md:border-l whitespace-nowrap flex items-center gap-1.5 ${
                      isHighlighted ? "border-background/35" : "border-border"
                    }`}
                  >
                    <span className={`text-sm font-semibold tracking-wide ${isHighlighted ? "text-background" : "text-foreground"}`}>
                      {item.dateRange}
                    </span>
                    <span className={`text-xs font-medium ${isHighlighted ? "text-background/60" : "text-muted-foreground"}`}>
                      · {item.duration}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div id="projects" className="mt-28 space-y-14">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Selected Projects</p>

            <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-8 items-start">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-md">
                Projects
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Selected tech and community projects focused on outcomes, execution, and measurable impact.
              </p>
            </div>
          </motion.div>

          <div className="space-y-14">
            {projects.map((project, index) => {
              const isReverse = index % 2 === 1;

              return (
                <motion.article
                  key={project.id}
                  className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className={isReverse ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
                    <span className="inline-flex items-center rounded-none bg-foreground text-background px-4 py-1 text-[11px] font-semibold uppercase tracking-wider">
                      {project.type}
                    </span>

                    <h4 className="mt-5 text-4xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-foreground max-w-xl">
                      {project.title}
                    </h4>

                    <div className="mt-10 flex items-center justify-between">
                      <Link
                        to={project.href}
                        className="group inline-flex items-center gap-2 text-lg font-medium text-foreground/90 transition-colors duration-300 hover:text-[#7A3A30]"
                      >
                        <span className="relative inline-block tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#7A3A30] after:transition-all after:duration-300 group-hover:after:w-full">
                          Explore Work
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </div>
                    <div className="h-px w-28 bg-border mt-2.5" />
                  </div>

                  <div className={`overflow-hidden ${isReverse ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}>
                    {project.id === 3 ? (
                      <motion.div
                        className="relative w-full h-[250px] md:h-[320px] border border-border/60 bg-gradient-to-br from-slate-100 via-sky-50 to-emerald-50"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] [background-size:20px_20px]" />
                        <div className="absolute left-6 top-8 h-20 w-20 rounded-full bg-emerald-300/40 blur-xl" />
                        <div className="absolute right-10 top-14 h-16 w-16 rounded-full bg-sky-300/40 blur-lg" />
                        <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-emerald-200/80 bg-white/90 p-5 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                              <Users size={20} />
                            </div>
                            <div className="space-y-1">
                              <div className="h-2.5 w-32 rounded bg-slate-300/80" />
                              <div className="h-2 w-24 rounded bg-slate-200" />
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="h-7 rounded-md bg-emerald-100" />
                            <div className="h-7 rounded-md bg-sky-100" />
                            <div className="h-7 rounded-md bg-amber-100" />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-[250px] md:h-[320px] object-cover border border-border/60"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;