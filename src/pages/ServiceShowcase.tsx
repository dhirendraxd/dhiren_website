import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Navbar from "@/components/Navbar";

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
  href: string;
  category: string;
  external?: boolean;
};

type ShowcaseSkill = {
  title: string;
  description: string;
};

type ShowcasePageConfig = {
  badge: string;
  heroTitle: string;
  heroSummary: string;
  skills?: ShowcaseSkill[];
  featured: ShowcaseCard[];
  statsLabel: string;
  statsTitle: string;
  statsSummary: string;
  statsImage: string;
  stats: ShowcaseMetric[];
  filters: string[];
  projects: ShowcaseCard[];
  ctaTitle: string;
  ctaSummary: string;
  ctaImage: string;
  ctaHref: string;
  ctaLabel: string;
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

const serviceShowcases: Record<ServiceSlug, ShowcasePageConfig> = {
  "digital-marketing": {
    badge: "Digital Marketing Showcase",
    heroTitle: "Crafting Campaigns, Building Measurable Growth",
    heroSummary:
      "This page showcases marketing work across SEO, content strategy, outreach, and performance tracking. Each project here reflects how messaging, distribution, and analytics come together to improve reach, engagement, and conversions.",
    skills: [
      {
        title: "SEO & SEM",
        description:
          "Understanding keyword research, on-page, and off-page SEO to improve website visibility.",
      },
      {
        title: "Data Analysis",
        description:
          "Interpreting data from Google Analytics and other platforms to understand user behavior and campaign performance.",
      },
      {
        title: "Content Marketing",
        description:
          "Creating, managing, and distributing valuable content (blogs, videos, infographics) to engage audiences.",
      },
      {
        title: "Social Media Management",
        description:
          "Expertise in platforms like LinkedIn, Instagram, TikTok, and Facebook to grow brand presence.",
      },
      {
        title: "PPC Advertising",
        description:
          "Managing paid campaigns on Google Ads and social media to drive traffic and conversions.",
      },
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
    statsTitle: "Marketing Impact in Numbers",
    statsSummary:
      "A snapshot of active marketing work focused on structured content execution, campaign consistency, and measurable outcomes.",
    statsImage: imageAssets.eduConnect,
    stats: [
      { label: "Content Campaigns", value: "20+" },
      { label: "SEO Pieces Optimized", value: "60+" },
      { label: "Average Growth Lift", value: "40%" },
      { label: "Partner Teams", value: "10+" },
    ],
    filters: ["SEO", "Content", "Campaigns", "Analytics"],
    projects: [
      {
        title: "Search Visibility Upgrade",
        description: "On-page SEO refresh with internal linking and intent-based page clusters.",
        image: imageAssets.ctrlBits,
        date: "16 Apr 2025",
        href: "https://www.ctrlbits.com/",
        category: "SEO",
        external: true,
      },
      {
        title: "Campaign Story Framework",
        description: "Editorial system for campaign storytelling across social and web touchpoints.",
        image: imageAssets.allInFoundation,
        date: "12 Feb 2026",
        href: "/affiliations/1",
        category: "Content",
      },
      {
        title: "Student Outreach Funnel",
        description: "Structured awareness funnel for learning events and recurring workshops.",
        image: imageAssets.awsCloudClub,
        date: "11 Mar 2025",
        href: "/affiliations/2",
        category: "Campaigns",
      },
      {
        title: "Audience Insight Dashboard",
        description: "Analytics framework to monitor engagement and post-level performance patterns.",
        image: imageAssets.netMission,
        date: "07 Jan 2026",
        href: "/affiliations/3",
        category: "Analytics",
      },
      {
        title: "Community Engagement Boost",
        description: "Localized messaging and content repackaging for better response in civic circles.",
        image: imageAssets.rotaract,
        date: "21 Jun 2025",
        href: "/affiliations/4",
        category: "Campaigns",
      },
      {
        title: "Sustainability Content Hub",
        description: "Awareness content clusters around sustainable business and social innovation.",
        image: imageAssets.sustainabilitySolutions,
        date: "02 Sep 2025",
        href: "/affiliations/6",
        category: "Content",
      },
      {
        title: "Product Launch Messaging",
        description: "Landing copy and teaser content to support launch flow for a tech platform.",
        image: imageAssets.devBus,
        date: "10 May 2025",
        href: "/hackathon/3",
        category: "Content",
      },
      {
        title: "Campaign A/B Structure",
        description: "Test matrix for call-to-action and audience segment messaging improvements.",
        image: imageAssets.mitraSmart,
        date: "15 Jun 2025",
        href: "/hackathon/1",
        category: "Analytics",
      },
    ],
    ctaTitle: "Let us build your next growth story together",
    ctaSummary:
      "From SEO and content planning to campaign execution and analytics, I can help shape a marketing system that consistently compounds results.",
    ctaImage: imageAssets.ctrlBits,
    ctaHref: "/#contact",
    ctaLabel: "Start a Marketing Project",
  },
  "advocacy-community": {
    badge: "Advocacy and Community Showcase",
    heroTitle: "Community Programs with Real-World Social Impact",
    heroSummary:
      "This space highlights advocacy and community initiatives where collaboration, youth leadership, and digital rights engagement drive meaningful outcomes. The focus is on people, participation, and sustained community value.",
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
    statsSummary:
      "These figures represent hands-on participation in fellowships, advocacy cohorts, and community-led initiatives across different networks.",
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
    ctaTitle: "Scale your advocacy or community initiative with structure",
    ctaSummary:
      "I can help shape outreach, partnerships, and execution plans for purpose-driven programs that need strong community participation.",
    ctaImage: imageAssets.rotaract,
    ctaHref: "/#contact",
    ctaLabel: "Collaborate on Community Work",
  },
  "tech-projects": {
    badge: "Hackathons and Builds Showcase",
    heroTitle: "Hackathons and Builds",
    heroSummary:
      "A focused view of the technical side of hackathons: coding core features, integrating APIs, debugging issues, and shipping functional prototypes under tight timelines.",
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
    statsSummary:
      "A quick overview of hackathon participation, prototype output, and technical execution focus across project cycles.",
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
    ctaTitle: "Need a fast-moving team for your next technical build",
    ctaSummary:
      "From early prototyping to hackathon-grade MVPs, I can help shape and ship practical technical solutions quickly.",
    ctaImage: imageAssets.eduConnect,
    ctaHref: "/#contact",
    ctaLabel: "Launch a Tech Project",
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
    return <Navigate to="/services" replace />;
  }

  const showcase = serviceShowcases[resolvedSlug];
  const projectFilters = ["All", ...showcase.filters];
  const visibleProjects =
    activeFilter === "All"
      ? showcase.projects
      : showcase.projects.filter((project) => project.category === activeFilter);
  const digitalMarketingSkills = resolvedSlug === "digital-marketing" ? showcase.skills ?? [] : [];
  const shouldShowSkillList = digitalMarketingSkills.length > 0;

  return (
    <div className="min-h-screen bg-card">
      <ScrollProgressBar />
      <Navbar />

      <motion.main
        className="mx-auto max-w-[84rem] bg-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="px-8 pb-14 pt-28 md:px-12 font-rajdhani">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-[#7A3A30]">{showcase.badge}</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-4xl">
                {showcase.heroTitle}
              </h1>
            </div>

            <div className="space-y-4 lg:text-right lg:justify-self-end">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:justify-end"
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
                <span>/</span>
                <span className="text-[#7A3A30] font-semibold">{showcase.badge}</span>
              </nav>

              <p className="max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground lg:ml-auto">
                {showcase.heroSummary}
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-[#7A3A30]">
                {shouldShowSkillList ? "Digital Marketing Skills" : "Featured Highlights"}
              </p>
            </div>

            {shouldShowSkillList ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {digitalMarketingSkills.map((skill, index) => (
                  <motion.article
                    key={skill.title}
                    className="border border-border bg-card px-6 py-6 transition-colors duration-300 hover:border-[#7A3A30]/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 * index }}
                  >
                    <h2 className="text-2xl font-semibold tracking-tight leading-tight text-foreground">
                      {skill.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {showcase.featured.map((project, index) => (
                  <motion.article
                    key={project.title}
                    className="border border-border bg-card transition-colors duration-300 hover:border-[#7A3A30]/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 * index }}
                  >
                    <div className="h-[215px] overflow-hidden border-b border-border bg-muted/30">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      />
                    </div>
                    <div className="space-y-2.5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A3A30]">{project.category}</p>
                      <h2 className="text-2xl font-semibold tracking-tight leading-tight text-foreground">
                        {project.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                      <div className="flex items-center justify-between pt-1">
                        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          <Sparkles size={12} />
                          {project.date}
                        </p>

                        {project.external ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#7A3A30]"
                          >
                            View
                            <ArrowUpRight size={13} />
                          </a>
                        ) : (
                          <Link
                            to={project.href}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-[#7A3A30]"
                          >
                            View
                            <ArrowUpRight size={13} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="statistics" className="border-t border-[#dbd0c6] px-8 py-14 md:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div
              className="border border-[#ddd2c8] bg-[#ede2d6] p-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <img src={showcase.statsImage} alt={showcase.statsTitle} className="h-[300px] w-full object-cover md:h-[470px]" />
            </motion.div>

            <motion.div
              className="space-y-7"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-3 text-sm text-[#8c7b70]">
                <span className="inline-block h-px w-12 bg-[#ccbbae]" />
                <span className="font-rajdhani text-lg font-medium tracking-wide">{showcase.statsLabel}</span>
              </div>

              <h3 className="font-nekst text-[2.5rem] font-semibold leading-tight tracking-tight text-[#1f1815] md:text-[3.35rem]">
                {showcase.statsTitle}
              </h3>

              <p className="text-sm leading-relaxed text-[#5f5550] md:text-base">{showcase.statsSummary}</p>

              <div className="grid gap-x-7 gap-y-7 pt-2 sm:grid-cols-2">
                {showcase.stats.map((metric) => (
                  <div key={metric.label} className="space-y-2 border-t border-[#dccfc5] pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6e635b]">{metric.label}</p>
                    <p className="font-nekst text-5xl font-semibold leading-none text-[#211915]">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="border-t border-[#dbd0c6] px-8 py-14 md:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h3 className="font-nekst text-4xl font-semibold tracking-tight text-[#221a16] md:text-[3.1rem]">Projects</h3>

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
                  <h4 className="font-nekst text-[1.68rem] font-semibold leading-tight tracking-tight text-[#211915]">{project.title}</h4>
                  <p className="text-sm leading-relaxed text-[#60564f]">{project.description}</p>

                  <div className="flex items-center justify-between pt-1">
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8a7c71]">
                      <Sparkles size={12} />
                      {project.date}
                    </p>

                    {project.external ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2e2520] transition-colors hover:text-[#7A3A30]"
                      >
                        Open
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <Link
                        to={project.href}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2e2520] transition-colors hover:text-[#7A3A30]"
                      >
                        Open
                        <ArrowUpRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#dbd0c6]">
          <div className="relative h-[305px] overflow-hidden md:h-[345px]">
            <img src={showcase.ctaImage} alt={showcase.ctaTitle} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,11,0.24)_0%,rgba(20,14,11,0.64)_100%)]" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <h4 className="max-w-4xl font-nekst text-[2.35rem] font-semibold leading-tight tracking-tight text-[#f7f2eb] md:text-[3.35rem]">
                {showcase.ctaTitle}
              </h4>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#f5ece5] md:text-base">{showcase.ctaSummary}</p>

              <div className="mt-8 flex flex-col items-center gap-2">
                <Link
                  to={showcase.ctaHref}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#ddcbb9] bg-[#ddcbb9] text-[#2f241d] transition-colors hover:border-[#7A3A30] hover:bg-[#7A3A30] hover:text-[#f7f2eb]"
                >
                  <ArrowRight size={16} />
                </Link>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7efe7]">{showcase.ctaLabel}</span>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="border-t border-[#dbd0c6] bg-card px-8 py-12 md:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.7fr_1fr]">
            <div className="space-y-4">
              <p className="font-nekst text-2xl font-semibold tracking-tight text-[#1f1815]">Dhiren Portfolio</p>
              <p className="max-w-md text-sm leading-relaxed text-[#5e544d]">
                A curated showcase of marketing, community, and technical projects designed to turn ideas into practical outcomes.
              </p>

              <div className="pt-1 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-[#d7c9bd] text-[#5f544e] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-[#d7c9bd] text-[#5f544e] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://github.com/dhirendraxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-[#d7c9bd] text-[#5f544e] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
                  aria-label="GitHub"
                >
                  <Github size={15} />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-nekst text-xl font-semibold text-[#1f1815]">Quick Links</p>
              <div className="flex flex-col gap-2 text-sm text-[#5e544d]">
                <Link to="/" className="transition-colors hover:text-[#7A3A30]">
                  Home Page
                </Link>
                <a href="#projects" className="transition-colors hover:text-[#7A3A30]">
                  Projects
                </a>
                <Link to="/services" className="transition-colors hover:text-[#7A3A30]">
                  Services
                </Link>
                <a href="#contact" className="transition-colors hover:text-[#7A3A30]">
                  Contact
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <p className="font-nekst text-xl font-semibold text-[#1f1815]">Contact Us</p>
              <div className="space-y-2 text-sm text-[#5e544d]">
                <p className="inline-flex items-center gap-2">
                  <MapPin size={14} />
                  Kathmandu, Nepal
                </p>
                <a href="mailto:dhirendraxd@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-[#7A3A30]">
                  <Mail size={14} />
                  dhirendraxd@gmail.com
                </a>
              </div>

              <div className="flex w-full border border-[#d8cbc0] bg-[#f7f2eb]">
                <input
                  type="email"
                  placeholder="Email"
                  className="h-11 w-full bg-transparent px-3 text-sm text-[#2b221e] placeholder:text-[#8b7b70] focus:outline-none"
                />
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center border-l border-[#d8cbc0] text-[#5e544d] transition-colors hover:bg-[#7A3A30] hover:text-[#f7f2eb]"
                  aria-label="Submit email"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[#d8cbc0] pt-6 text-xs uppercase tracking-[0.14em] text-[#72675f] md:flex-row md:items-center md:justify-between">
            <p>Dhiren Portfolio all rights reserved</p>
            <p>Designed by Dhiren · 2026</p>
          </div>
        </footer>
      </motion.main>
    </div>
  );
};

export default ServiceShowcase;
