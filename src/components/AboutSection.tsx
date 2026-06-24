import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Megaphone, Code2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getRelevantExperiences } from "@/data/affiliations";
import { issueHiveThumbnail } from "@/data/projectDetails";
import { assetPath } from '@/lib/assetPath';

const AboutSection = () => {
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const workAreas = [
    {
      title: "Digital Marketing",
      description: "SEO, PPC, content marketing, and visual design to scale reach and drive measurable growth.",
      icon: Megaphone,
      href: "/digital-marketing",
    },
    {
      title: "Advocacy & Community",
      description: "Awareness campaigns, fellowship programs, and civic initiatives focused on collaboration and social impact.",
      icon: Users,
      href: "/advocacy-community",
    },
    {
      title: "Hackathons & Builds",
      description: "Shipping working prototypes — core features, API integrations, and deployment under tight timelines.",
      icon: Code2,
      href: "/tech-projects",
    },
  ];

  const experiments = getRelevantExperiences();

  const projects = [
    {
      id: 2,
      type: "Community",
      title: "Community fellowship initiatives for collaborative social impact.",
      image: assetPath('civic-tech.webp'),
      href: "/projects/fellowship-community-labs",
    },
    {
      id: 3,
      type: "Tech",
      title: "Volunteer platform design for NGOs and youth programs.",
      image: assetPath('2nd-new.webp'),
      href: "/projects/ngo-volunteer-management",
    },
    {
      id: 1,
      type: "Tech",
      title: "Issue Hive — Awarded 3rd Prize at KIST Fair 2082",
      image: issueHiveThumbnail,
      href: "/projects/issue-hive-awarded-3rd-prize-at-kist-fair-2082",
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 pt-24 pb-12 px-8 md:px-12 bg-card font-rajdhani"
      role="region"
      aria-label="About section"
    >
      <div className="max-w-[84rem] mx-auto space-y-24">

        {/* — What I Work On — */}
        <div>
          <motion.div
            className="border-t border-[#e9e1d6] pt-8 mb-10"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-rajdhani text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#231d18]">
                What I Work On
              </h2>
              <p className="text-[0.88rem] text-[#6f655a] leading-[1.75] max-w-[36ch] md:text-right">
                Digital marketing, community and advocacy work, and building things — from campaigns to prototypes.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {workAreas.map((area, index) => {
              const Icon = area.icon;
              const isAccent = index === 0;

              return (
                <motion.div
                  key={area.title}
                  className={`group/card border min-h-[320px] p-10 flex flex-col justify-between transition-colors duration-300 ${
                    isAccent
                      ? "bg-[#7A3A30] border-[#7A3A30]"
                      : "bg-card border-[#e4dbcf] hover:border-[#7A3A30]/40"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Icon
                        size={20}
                        className={isAccent ? "text-[#FFF5F0]/75" : "text-[#7A3A30]"}
                        strokeWidth={1.75}
                      />
                      <span className={`font-mono text-[0.58rem] tabular-nums select-none ${isAccent ? "text-[#FFF5F0]/25" : "text-[#231d18]/20"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className={`text-[1.2rem] font-bold tracking-tight leading-snug ${isAccent ? "text-[#FFF5F0]" : "text-[#231d18]"}`}>
                      {area.title}
                    </h3>
                    <p className={`text-[0.86rem] leading-[1.72] ${isAccent ? "text-[#F4D8CF]" : "text-[#6f655a]"}`}>
                      {area.description}
                    </p>
                  </div>

                  <Link
                    to={area.href}
                    className={`group mt-6 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                      isAccent ? "text-[#FFF5F0]/70 hover:text-[#FFF5F0]" : "text-[#6f655a] hover:text-[#7A3A30]"
                    }`}
                  >
                    Explore
                    <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* — Relevant Experience — */}
        <div>
          <motion.div
            className="border-t border-[#e9e1d6] pt-8 mb-8"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-rajdhani text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-tight text-[#231d18]">
                Relevant Experience
              </h2>
              <p className="text-[0.88rem] text-[#6f655a] leading-[1.72] max-w-[36ch] md:text-right">
                Roles across marketing execution, community leadership, and civic-tech programs.
              </p>
            </div>
          </motion.div>

          <div className="space-y-2">
            {experiments.slice(0, showAllExperiences ? experiments.length : 3).map((item, index) => {
              const isDark = index === 0;
              return (
                <motion.div
                  key={item.title}
                  className={`group/exp flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
                    isDark
                      ? "bg-[#231d18] px-8 py-8"
                      : "border border-[#e4dbcf] px-6 py-5"
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.07 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-5">
                    <span className="shrink-0 font-mono text-[0.62rem] tabular-nums text-[#7A3A30]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className={`font-bold tracking-tight ${isDark ? "text-[1.15rem] text-white" : "text-[1.08rem] text-[#231d18]"}`}>{item.title}</h4>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${isDark ? "text-[1rem] text-[#c8bfb5] hover:text-white transition-colors duration-200 underline-offset-4 hover:underline" : "text-[0.94rem] text-[#6f655a]"}`}
                      >
                        {item.company}
                      </a>
                      {item.suffix && (
                        <span className={`ml-2 ${isDark ? "text-[0.88rem] text-[#6f655a]" : "text-[0.84rem] text-[#a89f96]"}`}>{item.suffix}</span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 whitespace-nowrap">
                    <span className={`font-semibold ${isDark ? "text-[1rem] text-white" : "text-[0.94rem] text-[#231d18]"}`}>{item.dateRange}</span>
                    <span className={`ml-1.5 ${isDark ? "text-[0.88rem] text-[#6f655a]" : "text-[0.84rem] text-[#a89f96]"}`}>· {item.duration}</span>
                  </div>
                </motion.div>
              );
            })}

            {!showAllExperiences && experiments.length > 3 && (
              <motion.div
                className="flex justify-center pt-4"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setShowAllExperiences(true)}
                  className="group inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#6b6259] transition-colors hover:text-[#7A3A30]"
                >
                  View More
                  <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* — Selected Projects — */}
        <div id="projects">
          <motion.div
            className="border-t border-[#e9e1d6] pt-8 mb-12"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-5 bg-[#7A3A30]" aria-hidden="true" />
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7A3A30]">Selected Projects</p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h3 className="font-rajdhani text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold tracking-tight text-[#231d18]">
                A few things I've built.
              </h3>
              <p className="text-[0.88rem] text-[#6f655a] leading-[1.72] max-w-[36ch] md:text-right">
                Community programs, platform concepts, and a campus tool that won an award.
              </p>
            </div>
          </motion.div>

          <div className="space-y-0">
            {projects.map((project, index) => {
              const isReverse = index % 2 === 1;

              return (
                <motion.article
                  key={project.id}
                  className="group/proj grid lg:grid-cols-2 gap-10 lg:gap-14 items-center border-t border-[#e9e1d6] py-10 last:border-b last:border-[#e9e1d6]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  viewport={{ once: true }}
                >
                  <div className={isReverse ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#7A3A30]">
                      {project.type}
                    </p>

                    <h4 className="mt-2.5 font-rajdhani text-[1.5rem] md:text-[1.85rem] font-bold tracking-tight leading-snug text-[#231d18] max-w-xl">
                      {project.title}
                    </h4>

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        to={project.href}
                        className="group inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#231d18] transition-colors hover:text-[#7A3A30]"
                      >
                        <span className="relative after:absolute after:left-0 after:-bottom-px after:h-px after:w-0 after:bg-[#7A3A30] after:transition-all after:duration-200 group-hover:after:w-full">
                          Explore Work
                        </span>
                        <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>

                      {index === projects.length - 1 && (
                        <Link
                          to="/projects"
                          className="group inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#6f655a] transition-colors hover:text-[#7A3A30]"
                        >
                          <span className="relative after:absolute after:left-0 after:-bottom-px after:h-px after:w-0 after:bg-[#7A3A30] after:transition-all after:duration-200 group-hover:after:w-full">
                            View All Projects
                          </span>
                          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className={`overflow-hidden ${isReverse ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}>
                    <Link to={project.href} aria-label={project.title} className="block w-full max-w-[34rem] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} project thumbnail`}
                        loading="lazy"
                        decoding="async"
                        width={544}
                        height={340}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 544px"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover/proj:scale-[1.03]"
                      />
                    </Link>
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
