import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Megaphone, PencilLine, Code2, Users } from "lucide-react";

const AboutSection = () => {
  const workAreas = [
    {
      title: "Digital Marketing",
      description: "SEO, content strategy, and data-driven campaigns to help brands grow online.",
      icon: Megaphone,
    },
    {
      title: "Content & Storytelling",
      description: "Creating blogs, narratives, and digital content that connect ideas with audiences.",
      icon: PencilLine,
    },
    {
      title: "Tech & Web Projects",
      description: "Collaborating on digital platforms, MVPs, and experiments with startups and teams.",
      icon: Code2,
    },
    {
      title: "Community & Sustainability",
      description: "Actively involved in fellowships, community programs, and sustainability initiatives that create collaborative social impact.",
      icon: Users,
    },
  ];

  const experiments = [
    {
      title: "Digital Marketer",
      subtitle: "CtrlBits · Full-time",
      dateRange: "Apr 2025 - Present",
      duration: "1 yr",
    },
    {
      title: "Fellow",
      subtitle: "ALL In Foundation (AIF)",
      dateRange: "Feb 2026 - Present",
      duration: "2 mos",
    },
    {
      title: "Sustainability Mentee",
      subtitle: "Sustainability Solutions",
      dateRange: "Aug 2025 - Dec 2025",
      duration: "5 mos",
    },
  ];

  const projects = [
    {
      id: 1,
      type: "Tech Project",
      title: "AI-assisted web solution for public document workflows.",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
      href: "/hackathon/1",
    },
    {
      id: 2,
      type: "Non-Tech Project",
      title: "Community fellowship initiatives for collaborative social impact.",
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      href: "/affiliations/1",
    },
    {
      id: 3,
      type: "Tech Project",
      title: "Volunteer platform design for NGOs and youth programs.",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
      href: "/hackathon/4",
    },
  ];

  return (
    <section id="about" className="py-24 px-8 md:px-12 bg-card">
      <div className="max-w-[84rem] mx-auto">
        <div className="space-y-10">
          <motion.div
            className="grid xl:grid-cols-[1.1fr_1fr_auto] gap-6 xl:gap-8 items-start"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">My Services</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-md">
                What I Work On
              </h2>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Focused on digital marketing, storytelling, collaborative tech projects, and community-driven initiatives that turn ideas into practical results.
            </p>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-wider border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              All Services
            </button>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {workAreas.map((area, index) => {
              const Icon = area.icon;
              const isHighlighted = index === 0;

              return (
                <motion.div
                  key={area.title}
                  className={`border min-h-[260px] p-7 flex flex-col justify-between ${
                    isHighlighted
                      ? "bg-foreground border-foreground text-background"
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
                      className={isHighlighted ? "text-background" : "text-foreground"}
                      strokeWidth={1.75}
                    />
                    <h3 className="text-2xl font-semibold tracking-tight leading-tight">{area.title}</h3>
                    <p className={`text-sm leading-relaxed ${isHighlighted ? "text-background/80" : "text-muted-foreground"}`}>
                      {area.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </div>
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
            <div className="h-3 w-3 rounded-full bg-foreground/70 shadow-md" />
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Digital Marketing Experiments</h3>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Hands-on digital marketing work and growth-focused initiatives across SEO, content, campaigns, and performance analysis.
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
                      <p className={`text-sm leading-relaxed ${isHighlighted ? "text-background/80" : "text-muted-foreground"}`}>
                        {item.subtitle}
                      </p>
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

        <div id="projects" className="mt-28 space-y-14 font-rajdhani">
          <motion.div
            className="relative flex flex-col items-center text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="hidden md:grid grid-cols-5 gap-1 absolute left-0 top-2">
              {Array.from({ length: 25 }).map((_, index) => (
                <span key={index} className="h-1 w-1 rounded-full bg-foreground/30" />
              ))}
            </div>

            <div className="h-3 w-3 rounded-full bg-foreground/70 shadow-md" />
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">Case Study</h3>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              Selected tech and non-tech projects with a clean focus on outcomes and execution.
            </p>
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
                    <span className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-1 text-[11px] font-semibold uppercase tracking-wider">
                      {project.type}
                    </span>

                    <h4 className="mt-5 text-4xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-foreground max-w-xl">
                      {project.title}
                    </h4>

                    <a
                      href={project.href}
                      className="mt-10 inline-flex items-center gap-2 text-lg font-medium text-foreground"
                    >
                      See Details
                      <ArrowUpRight size={18} />
                    </a>
                    <div className="h-px w-28 bg-border mt-2.5" />
                  </div>

                  <div className={isReverse ? "order-1 lg:order-2" : "order-1 lg:order-1"}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[250px] md:h-[320px] object-cover border border-border/60"
                    />
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
