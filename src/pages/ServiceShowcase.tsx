import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import ScrollProgressBar from "@/components/ScrollProgressBar";

type ServiceSlug = "digital-marketing" | "advocacy-community" | "tech-projects";

type ShowcaseMetric = {
  label: string;
  value: string;
};

type ShowcaseCard = {
  title: string;
  description: string;
  image: string;
  date: string;
  href?: string;
  category: string;
  external?: boolean;
};

type ShowcasePageConfig = {
  badge: string;
  heroTitle: string;
  heroSummary: string;
  skillHighlights?: string[];
  featured: ShowcaseCard[];
  statsLabel: string;
  statsTitle: string;
  statsSummary: string;
  statsImage: string;
  stats: ShowcaseMetric[];
  filters: string[];
  projects: ShowcaseCard[];
};

const imageAssets = {
  mitraSmart: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
  eduConnect: new URL("@/assets/hackathon&evets/kec_lite_2081-thumbnail-1000x525.png", import.meta.url).href,
  devBus: new URL("@/assets/hackathon&evets/logo.png", import.meta.url).href,
  volunteerPlatform: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
  allInFoundation: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
  awsCloudClub: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href,
  netMission: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href,
  ctrlBits: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href,
  rotaract: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href,
  sustainabilitySolutions: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href,
};

const legacyOrganizationLinks: Record<string, string> = {
  "/affiliations/1": "https://www.facebook.com/allinfoundationnp/",
  "/affiliations/2": "https://aws.amazon.com",
  "/affiliations/3": "https://netmission.asia",
  "/affiliations/4": "https://rotary.org",
  "/affiliations/5": "https://www.ctrlbits.com/",
  "/affiliations/6": "https://sustainability.com.np/",
};

const getCardAction = (card: ShowcaseCard) => {
  if (!card.href) {
    return null;
  }

  if (card.href in legacyOrganizationLinks) {
    return {
      href: legacyOrganizationLinks[card.href],
      external: true,
    };
  }

  if (card.href.startsWith("/hackathon")) {
    return null;
  }

  return {
    href: card.href,
    external: Boolean(card.external),
  };
};

const serviceShowcases: Record<ServiceSlug, ShowcasePageConfig> = {
  "digital-marketing": {
    badge: "",
    heroTitle: "Crafting Campaigns, Building Measurable Growth",
    heroSummary:
      "A focused view of my full-stack digital marketing work across SEO, PPC, social media, content, design, and email automation. Each project highlights measurable gains in reach, engagement, and conversions.",
    skillHighlights: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click (PPC) & SEM",
      "Social Media Marketing",
      "Email Marketing & Automation",
      "Graphic Design",
      "Content Creation & Strategy",
    ],
    featured: [
      {
        title: "CtrlBits Organic Growth Sprint",
        description: "SEO-led blog strategy and technical optimization to lift discoverability for product and service pages.",
        image: imageAssets.ctrlBits,
        date: "Apr 2025",
        href: "https://www.ctrlbits.com/",
        category: "SEO & Technical Optimization",
        external: true,
      },
      {
        title: "AIF Awareness Content Series",
        description: "Story-driven social content that improved campaign clarity for fellowship and community initiatives.",
        image: imageAssets.allInFoundation,
        date: "Feb 2026",
        href: "/affiliations/1",
        category: "Content Storytelling",
      },
      {
        title: "AWS Event Promotion Funnel",
        description: "Community event promotion framework combining outreach posts, sign-up tracking, and follow-up loops.",
        image: imageAssets.awsCloudClub,
        date: "Mar 2025",
        href: "/affiliations/2",
        category: "Campaign Strategy",
      },
      {
        title: "NetMission Advocacy Media Plan",
        description: "Content calendar and publishing cadence designed to increase participation around digital rights topics.",
        image: imageAssets.netMission,
        date: "Dec 2025",
        href: "/affiliations/3",
        category: "Content Planning",
      },
    ],
    statsLabel: "Statistics",
    statsTitle: "Digital Marketing Impact in Numbers",
    statsSummary: "",
    statsImage: imageAssets.ctrlBits,
    stats: [
      { label: "SEO Projects", value: "20+" },
      { label: "Paid Media Campaigns", value: "15+" },
      { label: "Content Assets Published", value: "60+" },
      { label: "Email Automation Flows", value: "10+" },
    ],
    filters: ["Digital Marketing"],
    projects: [
      {
        title: "CtrlBits : Digital Marketing",
        description: "Led integrated digital marketing at CtrlBits covering SEO, SMM, SEM, and PPC, including on-page optimization, social media execution, ad campaign tuning, and performance tracking.",
        image: imageAssets.ctrlBits,
        date: "16 Apr 2025",
        href: "https://www.ctrlbits.com/",
        category: "Digital Marketing",
        external: true,
      },
    ],
  },
  "advocacy-community": {
    badge: "",
    heroTitle: "Community Programs with Real-World Social Impact",
    heroSummary:
      "This space highlights advocacy and community initiatives where collaboration, youth leadership, and digital rights engagement drive meaningful outcomes. The focus is on people, participation, and sustained community value.",
    skillHighlights: [
      "Community Program Design",
      "Digital Rights Advocacy",
      "Youth Leadership & Mobilization",
      "Volunteer Coordination",
      "Partnership & Stakeholder Engagement",
      "Sustainability Initiative Planning",
    ],
    featured: [
      {
        title: "ALL In Foundation Fellowship",
        description: "Community-centered fellowship work focused on social impact and collaborative learning initiatives.",
        image: imageAssets.allInFoundation,
        date: "Feb 2026",
        href: "/affiliations/1",
        category: "Community",
      },
      {
        title: "NetMission Digital Rights Track",
        description: "Advocacy projects and learning cohorts around internet governance and rights-based participation.",
        image: imageAssets.netMission,
        date: "Dec 2025",
        href: "/affiliations/3",
        category: "Advocacy",
      },
      {
        title: "Rotaract Youth Programs",
        description: "Service and leadership activities designed to support youth participation in civic projects.",
        image: imageAssets.rotaract,
        date: "Jun 2025",
        href: "/affiliations/4",
        category: "Leadership",
      },
      {
        title: "Sustainability Mentorship",
        description: "Structured mentorship for sustainable business model experimentation.",
        image: imageAssets.sustainabilitySolutions,
        date: "Aug 2025",
        href: "/affiliations/6",
        category: "Sustainability",
      },
    ],
    statsLabel: "Statistics",
    statsTitle: "Advocacy and Community Work in Numbers",
    statsSummary: "",
    statsImage: imageAssets.netMission,
    stats: [
      { label: "Programs and Cohorts", value: "6+" },
      { label: "Community Initiatives", value: "18+" },
      { label: "Collaborating Organizations", value: "8+" },
      { label: "Active Volunteer Hours", value: "250+" },
    ],
    filters: ["Advocacy", "Community", "Leadership", "Sustainability"],
    projects: [
      {
        title: "Digital Rights Awareness Series",
        description: "Local-first content sessions to simplify digital rights and internet governance topics.",
        image: imageAssets.netMission,
        date: "19 Jan 2026",
        href: "/affiliations/3",
        category: "Advocacy",
      },
      {
        title: "Fellowship Community Labs",
        description: "Facilitated collaboration tracks for social problem framing and solution ideation.",
        image: imageAssets.allInFoundation,
        date: "14 Mar 2026",
        href: "/affiliations/1",
        category: "Community",
      },
      {
        title: "Youth Civic Program Rollout",
        description: "Support operations for youth-focused events and volunteering programs.",
        image: imageAssets.rotaract,
        date: "28 Jul 2025",
        href: "/affiliations/4",
        category: "Leadership",
      },
      {
        title: "Sustainable Idea Mentoring",
        description: "Mentorship project around design thinking and practical sustainability models.",
        image: imageAssets.sustainabilitySolutions,
        date: "03 Nov 2025",
        href: "/affiliations/6",
        category: "Sustainability",
      },
      {
        title: "Community Dialogue Forum",
        description: "Cross-group dialogue format connecting volunteers, fellows, and civic contributors.",
        image: imageAssets.awsCloudClub,
        date: "09 Aug 2025",
        href: "/affiliations/2",
        category: "Community",
      },
      {
        title: "Volunteer Coordination Hub",
        description: "Community volunteer pipeline planning for local outreach and recurring events.",
        image: imageAssets.volunteerPlatform,
        date: "10 Oct 2024",
        href: "/hackathon/4",
        category: "Leadership",
      },
      {
        title: "Policy Literacy Mini-Sessions",
        description: "Short-format sessions translating policy language into practical action points.",
        image: imageAssets.mitraSmart,
        date: "11 Feb 2026",
        href: "/hackathon/1",
        category: "Advocacy",
      },
      {
        title: "Local Sustainability Challenge",
        description: "Community challenge model encouraging idea submissions for sustainable living projects.",
        image: imageAssets.eduConnect,
        date: "17 Dec 2025",
        href: "/hackathon/2",
        category: "Sustainability",
      },
    ],
  },
  "tech-projects": {
    badge: "",
    heroTitle: "Hackathons and Builds",
    heroSummary:
      "A focused view of the technical side of hackathons: coding core features, integrating APIs, debugging issues, and shipping functional prototypes under tight timelines.",
    skillHighlights: [
      "Rapid Prototyping & MVP Delivery",
      "AI Integration & Workflow Design",
      "Web Platform Development",
      "API Integration",
      "Debugging & Performance Tuning",
      "Hackathon Execution",
    ],
    featured: [
      {
        title: "Mitra Smart",
        description: "AI-powered document validation and smart form guidance for public service workflows.",
        image: imageAssets.mitraSmart,
        date: "2025",
        href: "/hackathon/1",
        category: "Civic Tech",
      },
      {
        title: "Edu Connect Global",
        description: "University matching platform combining profile intelligence and recommendation logic.",
        image: imageAssets.eduConnect,
        date: "2025",
        href: "/hackathon/2",
        category: "AI",
      },
      {
        title: "DevBus",
        description: "SME recruitment workflow using AI-assisted assessment and matching mechanisms.",
        image: imageAssets.devBus,
        date: "2025",
        href: "/hackathon/3",
        category: "AI",
      },
      {
        title: "Volunteer Recruitment Platform",
        description: "Web platform for NGO volunteer matching, event posting, and stipend flow management.",
        image: imageAssets.volunteerPlatform,
        date: "2024",
        href: "/hackathon/4",
        category: "Web Platform",
      },
    ],
    statsLabel: "Statistics",
    statsTitle: "Technical Delivery in Numbers",
    statsSummary: "",
    statsImage: imageAssets.mitraSmart,
    stats: [
      { label: "Hackathon Builds", value: "12+" },
      { label: "Rapid Prototypes", value: "25+" },
      { label: "Collaborative Teams", value: "15+" },
      { label: "Production Concepts", value: "8+" },
    ],
    filters: ["Hackathon", "Web Platform", "AI", "Civic Tech"],
    projects: [
      {
        title: "Government Workflow Assistant",
        description: "AI check-flow for documents and context-aware public form completion support.",
        image: imageAssets.mitraSmart,
        date: "13 Jan 2025",
        href: "/hackathon/1",
        category: "Civic Tech",
      },
      {
        title: "University Fit Engine",
        description: "Recommendation logic and student profile matching for admission discovery.",
        image: imageAssets.eduConnect,
        date: "20 Feb 2025",
        href: "/hackathon/2",
        category: "AI",
      },
      {
        title: "AI Hiring Assessment Flow",
        description: "Prompt-based assessment sequence with role-matching and ranking support.",
        image: imageAssets.devBus,
        date: "16 Apr 2025",
        href: "/hackathon/3",
        category: "AI",
      },
      {
        title: "NGO Volunteer Management",
        description: "Event publishing and volunteer matching system with stipend processing support.",
        image: imageAssets.volunteerPlatform,
        date: "04 Oct 2024",
        href: "/hackathon/4",
        category: "Web Platform",
      },
      {
        title: "Cloud Community Toolkit",
        description: "Workshop support resources and platform docs for technical community sessions.",
        image: imageAssets.awsCloudClub,
        date: "09 Jul 2025",
        href: "/affiliations/2",
        category: "Hackathon",
      },
      {
        title: "Impact Program Microsite",
        description: "Fast prototype structure for social initiative updates and onboarding flows.",
        image: imageAssets.allInFoundation,
        date: "27 Mar 2026",
        href: "/affiliations/1",
        category: "Web Platform",
      },
      {
        title: "Digital Rights Resource Portal",
        description: "Knowledge-sharing interface to present governance resources in digestible format.",
        image: imageAssets.netMission,
        date: "06 Feb 2026",
        href: "/affiliations/3",
        category: "Civic Tech",
      },
      {
        title: "Sustainability Idea Sandbox",
        description: "Interactive concept board for testing sustainable business solution hypotheses.",
        image: imageAssets.sustainabilitySolutions,
        date: "30 Dec 2025",
        href: "/affiliations/6",
        category: "Hackathon",
      },
    ],
  },
};

const isServiceSlug = (value: string): value is ServiceSlug => value in serviceShowcases;
const defaultServiceSlug: ServiceSlug = "digital-marketing";

const ServiceShowcase = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState("All");

  const resolvedSlug = !slug ? defaultServiceSlug : isServiceSlug(slug) ? slug : null;

  useEffect(() => {
    setActiveFilter("All");
  }, [resolvedSlug]);

  if (!resolvedSlug) {
    return <Navigate to="/services/digital-marketing" replace />;
  }

  const showcase = serviceShowcases[resolvedSlug];
  const projectFilters = ["All", ...showcase.filters];
  const visibleProjects =
    activeFilter === "All"
      ? showcase.projects
      : showcase.projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-card">
      <ScrollProgressBar />

      <motion.main
        className="mx-auto max-w-[84rem] bg-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="px-4 pb-12 pt-10 font-rajdhani sm:px-6 sm:pt-12 md:px-12 md:pt-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center justify-start gap-1.5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-[#6e635b] sm:mb-6 sm:gap-2 sm:text-[11px] sm:tracking-[0.14em]"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <a href="/#about" className="hover:text-foreground transition-colors">
              What I Work On
            </a>
            <span>/</span>
            <a href="/#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
            {showcase.badge && (
              <>
                <span>/</span>
                <span className="text-[#7A3A30] font-semibold">{showcase.badge}</span>
              </>
            )}
          </nav>

          <div className="grid gap-6 sm:gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
            <div className="space-y-4">
              {showcase.badge && (
                <p className="text-xs uppercase tracking-widest font-semibold text-[#7A3A30]">{showcase.badge}</p>
              )}
              <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {showcase.heroTitle}
              </h1>
            </div>

            <div className="space-y-4">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {showcase.heroSummary}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5 sm:mt-10">

            <div
              id="statistics"
              className="mt-4 grid gap-8 sm:mt-6 sm:gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-center"
            >
              <motion.div
                className="border border-[#ddd2c8] bg-[#ede2d6] p-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <img src={showcase.statsImage} alt={showcase.statsTitle} className="h-[220px] w-full object-cover sm:h-[300px] md:h-[470px]" />
              </motion.div>

              <motion.div
                className="min-w-0 space-y-5 sm:space-y-7"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <h3 className="font-nekst text-[2rem] font-semibold leading-tight tracking-tight text-[#1f1815] sm:text-[2.3rem] md:text-[3.35rem]">
                  {showcase.statsTitle}
                </h3>

                {showcase.statsSummary && (
                  <p className="text-sm leading-relaxed text-[#5f5550] md:text-base">{showcase.statsSummary}</p>
                )}

                {showcase.skillHighlights && showcase.skillHighlights.length > 0 && (
                  <div className="space-y-4 border-t border-[#dccfc5] pt-5">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4f443d]">Core Skills</p>
                    <div className="flex flex-wrap gap-2.5">
                      {showcase.skillHighlights.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex max-w-full break-words border border-[#d8cbc0] bg-[#f7f2eb] px-3 py-1.5 text-xs font-semibold leading-snug tracking-[0.03em] text-[#3f352f] md:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-x-7 gap-y-7 pt-2 sm:grid-cols-2">
                  {showcase.stats.map((metric) => (
                    <div key={metric.label} className="space-y-2 border-t border-[#dccfc5] pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6e635b] sm:text-[11px] sm:tracking-[0.14em]">{metric.label}</p>
                      <p className="font-sans tabular-nums text-3xl font-semibold leading-none text-[#211915] sm:text-4xl md:text-5xl">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-[#dbd0c6] px-4 py-12 sm:px-6 sm:py-14 md:px-12">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <h3 className="font-nekst text-3xl font-semibold tracking-tight text-[#221a16] sm:text-4xl md:text-[3.1rem]">Projects</h3>

            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => {
                const active = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors md:text-xs ${
                      active
                        ? "border-[#7A3A30] bg-[#7A3A30] text-[#f7f2eb]"
                        : "border-[#d9cdc2] bg-transparent text-[#5d544d] hover:border-[#7A3A30] hover:text-[#7A3A30]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={`${project.title}-${activeFilter}`}
                className="border border-[#ddd2c8] bg-[#faf5ef] transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(39,29,23,0.12)]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <div className="h-[176px] overflow-hidden border-b border-[#e4d9cf] bg-[#eee4d8]">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" />
                </div>
                <div className="space-y-2.5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A3A30]">{project.category}</p>
                  <h4 className="font-nekst text-[1.35rem] font-semibold leading-tight tracking-tight text-[#211915] sm:text-[1.68rem]">{project.title}</h4>
                  <p className="text-sm leading-relaxed text-[#60564f]">{project.description}</p>

                  <div className="flex items-center justify-between pt-1">
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8a7c71]">
                      <Sparkles size={12} />
                      {project.date}
                    </p>

                    {(() => {
                      const action = getCardAction(project);

                      if (!action) {
                        return <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a7c71]">Selected Work</span>;
                      }

                      if (action.external) {
                        return (
                          <a
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2e2520] transition-colors hover:text-[#7A3A30]"
                          >
                            Open
                            <ArrowUpRight size={13} />
                          </a>
                        );
                      }

                      return (
                        <Link
                          to={action.href}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2e2520] transition-colors hover:text-[#7A3A30]"
                        >
                          Open
                          <ArrowUpRight size={13} />
                        </Link>
                      );
                    })()}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default ServiceShowcase;
