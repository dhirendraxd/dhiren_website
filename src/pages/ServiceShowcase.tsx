import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Square } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { getProjectSlugByTitle, issueHiveThumbnail } from "@/data/projectDetails";

type ServiceSlug = "digital-marketing" | "advocacy-community" | "tech-projects";

type ServiceShowcaseProps = {
  forcedSlug?: ServiceSlug;
};

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

const createAbstractIllustration = (
  title: string,
  subtitle: string,
  palette: { bgStart: string; bgEnd: string; accentA: string; accentB: string; text: string },
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bgStart}" />
      <stop offset="100%" stop-color="${palette.bgEnd}" />
    </linearGradient>
    <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${palette.accentA}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${palette.accentB}" stop-opacity="0.85" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="150" cy="110" r="120" fill="${palette.accentA}" fill-opacity="0.25" />
  <circle cx="1060" cy="520" r="170" fill="${palette.accentB}" fill-opacity="0.2" />
  <path d="M0,440 C220,360 420,510 650,440 C860,375 980,310 1200,355 L1200,630 L0,630 Z" fill="url(#wave)" />
  <path d="M0,305 C210,235 400,350 620,290 C830,235 980,160 1200,205" stroke="${palette.accentA}" stroke-opacity="0.45" stroke-width="8" fill="none" />
  <path d="M0,360 C180,300 370,390 590,345 C830,295 1000,235 1200,275" stroke="${palette.accentB}" stroke-opacity="0.5" stroke-width="6" fill="none" />
  <text x="74" y="510" font-family="Rajdhani, Arial, sans-serif" font-size="56" font-weight="700" fill="${palette.text}">${title}</text>
  <text x="74" y="558" font-family="Rajdhani, Arial, sans-serif" font-size="26" font-weight="600" fill="${palette.text}" fill-opacity="0.9">${subtitle}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const selectedProjectIllustrations = {
  issueHive: createAbstractIllustration(
    "IssueHive",
    "Issue reporting for campus voices",
    {
      bgStart: "#fee2e2",
      bgEnd: "#fecaca",
      accentA: "#7A3A30",
      accentB: "#991b1b",
      text: "#4c0519",
    },
  ),
  fellowshipCommunityLabs: createAbstractIllustration(
    "Fellowship Community Labs",
    "Collaborative social innovation sessions",
    {
      bgStart: "#d1fae5",
      bgEnd: "#99f6e4",
      accentA: "#0f766e",
      accentB: "#134e4a",
      text: "#042f2e",
    },
  ),
  ngoVolunteerManagement: createAbstractIllustration(
    "NGO Volunteer Management",
    "Event, matching, and operations platform",
    {
      bgStart: "#fee2e2",
      bgEnd: "#fecaca",
      accentA: "#be123c",
      accentB: "#881337",
      text: "#4c0519",
    },
  ),
};

import { assetPath } from '@/lib/assetPath';

const imageAssets = {
  mitraSmart: assetPath('reference image.jpg'),
  civicTech: assetPath('civic tech.webp'),
  eduConnect: assetPath('civic tech.webp'),
  devBus: assetPath('Untitled design.webp'),
  volunteerPlatform: assetPath('2nd new .webp'),
  allInFoundation: assetPath('affiliation/all_in_foundation_aif_logo.jpeg'),
  awsCloudClub: assetPath('affiliation/aws_cloud_club_at_tu_logo.jpeg'),
  netMission: assetPath('affiliation/netmission.jpeg'),
  ctrlBits: assetPath('affiliation/new logo fark blue grad in white.png'),
  rotaract: assetPath('affiliation/rac .jpg'),
  sustainabilitySolutions: assetPath('affiliation/sustainabilitysolutionsnepal_logo.jpeg'),
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
  const projectSlug = getProjectSlugByTitle(card.title);
  if (projectSlug) {
    return {
      href: `/projects/${projectSlug}`,
      external: false,
    };
  }

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
        image: selectedProjectIllustrations.fellowshipCommunityLabs,
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
        title: "University Fit Engine",
        description: "Recommendation logic and student profile matching for admission discovery.",
        image: imageAssets.civicTech,
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
        title: "Issue Hive - Awarded 3rd Prize at KIST Fair 2082",
        description: "College-focused platform for students to submit, support, and track campus issues transparently.",
        image: issueHiveThumbnail,
        date: "Feb 2026",
        href: "/hackathon/1",
        category: "Campus Innovation",
      },
      {
        title: "NGO Volunteer Management",
        description: "Event publishing and volunteer matching system with stipend processing support.",
        image: selectedProjectIllustrations.ngoVolunteerManagement,
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

const ServiceShowcase = ({ forcedSlug }: ServiceShowcaseProps) => {
  const { slug } = useParams<{ slug: string }>();
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  const routeSlug = forcedSlug ?? slug;
  const resolvedSlug = !routeSlug ? defaultServiceSlug : isServiceSlug(routeSlug) ? routeSlug : null;

  useEffect(() => {
    setActiveWorkIndex(0);
  }, [resolvedSlug]);

  if (!resolvedSlug) {
    return <Navigate to="/digital-marketing" replace />;
  }

  const showcase = serviceShowcases[resolvedSlug];
  const pageTitle = `${showcase.heroTitle} | Dhirendra Singh Dhami`;
  const pageDescription = showcase.heroSummary;
  const workItems = showcase.projects;
  const activeProject = workItems[activeWorkIndex] ?? workItems[0];
  const visibleWorkItems = workItems.slice(0, 6);
  const partnerItems = [
    ...showcase.stats.map((stat) => ({
      initial: stat.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 1) || stat.label.slice(0, 1),
      title: stat.label,
      subtitle: stat.value,
    })),
    ...(showcase.skillHighlights ?? []).map((skill) => ({
      initial: skill.slice(0, 1),
      title: skill,
      subtitle: "Focus Area",
    })),
  ].slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-[#231d18]">
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalPath={`/${resolvedSlug}`}
        image={showcase.statsImage}
        imageAlt={`${showcase.statsTitle} visual summary`}
      />
      <ScrollProgressBar />

      <motion.main
        className="font-rajdhani"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="mx-auto min-h-[38rem] max-w-[74rem] px-5 pb-16 pt-6 sm:px-8 md:px-12">
          <h1 className="sr-only">{showcase.heroTitle}</h1>
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#3f3932] transition-colors hover:text-[#7A3A30]"
            >
              <span aria-hidden="true" className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              <span className="leading-none border-b border-transparent transition-colors group-hover:border-[#7A3A30]">Back</span>
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border-b px-1 pb-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    activeFilter === filter
                      ? "border-[#7A3A30] text-[#7A3A30]"
                      : "border-transparent text-[#6b6259] hover:border-[#c7bbae] hover:text-[#231d18]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,34rem)_minmax(20rem,26rem)] lg:items-start lg:justify-center">
            <div className="space-y-0">
              {visibleWorkItems.map((project, index) => {
                  const action = getCardAction(project);
                  const isActive = index === activeWorkIndex;
                  const rowClass = `group block min-h-[4.45rem] border-b border-[#ded6cb] transition-colors ${
                    isActive
                      ? "border-transparent bg-white px-5 py-4 shadow-[0_14px_32px_rgba(35,29,24,0.05)]"
                      : "px-5 py-4 hover:bg-[#f0e9df]"
                  }`;
                  const rowContent = (
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#231d18]">
                        <ArrowUpRight className={`h-4 w-4 transition-colors ${isActive ? "text-[#7A3A30]" : "text-[#8d8378]"}`} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[1rem] font-bold leading-tight text-[#231d18]">{project.title}</span>
                        <span className="mt-1 block max-w-[29rem] text-[0.8rem] leading-relaxed text-[#71675d]">{project.description}</span>
                      </span>
                    </span>
                  );

                  return (
                    <div key={project.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5">
                      <button
                        type="button"
                        onClick={() => setActiveWorkIndex(index)}
                        className={`mt-4 flex h-8 w-8 items-center justify-center justify-self-center rounded-full text-[0.64rem] font-bold transition-colors ${
                          isActive
                            ? "bg-[#120e0b] text-[#f5f1eb]"
                            : "border border-[#d8cfc3] bg-[#f5f1eb] text-[#7b7066] hover:border-[#7A3A30] hover:text-[#7A3A30]"
                        }`}
                        aria-label={`Show work item ${index + 1}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </button>

                      {action?.external ? (
                        <a
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setActiveWorkIndex(index)}
                          onFocus={() => setActiveWorkIndex(index)}
                          className={rowClass}
                        >
                          {rowContent}
                        </a>
                      ) : (
                        <Link
                          to={action?.href ?? "#"}
                          onMouseEnter={() => setActiveWorkIndex(index)}
                          onFocus={() => setActiveWorkIndex(index)}
                          className={rowClass}
                        >
                          {rowContent}
                        </Link>
                      )}
                    </div>
                  );
                })}
            </div>

            {activeProject && (
              <aside className="pt-0 lg:sticky lg:top-8">
                <div className="border border-[#dfd6ca] bg-white p-8 shadow-[0_16px_42px_rgba(35,29,24,0.06)]">
                  <div className="text-[5.2rem] font-bold leading-none text-[#231d18]/10">
                    {String(activeWorkIndex + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A3A30]">{activeProject.category}</p>
                    <h2 className="mt-3 text-[1.35rem] font-bold leading-tight text-[#231d18]">{activeProject.title}</h2>
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-[#5f574d]">{activeProject.description}</p>
                    <div className="mt-8 flex items-center gap-2">
                      {visibleWorkItems.slice(0, 6).map((item, index) => (
                        <span
                          key={`${item.title}-progress`}
                          className={`h-0.5 flex-1 ${index === activeWorkIndex ? "bg-[#231d18]" : "bg-[#d8cfc3]"}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    {activeProjectAction && (
                      activeProjectAction.external ? (
                        <a
                          href={activeProjectAction.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-7 inline-flex items-center gap-2 border-b border-[#7A3A30] pb-1 text-sm font-bold text-[#7A3A30]"
                        >
                          View work <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          to={activeProjectAction.href}
                          className="mt-7 inline-flex items-center gap-2 border-b border-[#7A3A30] pb-1 text-sm font-bold text-[#7A3A30]"
                        >
                          View work <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>

        <section className="bg-[#100c09] px-5 py-20 text-[#f5f1eb] sm:px-8 md:px-12">
          <div className="mx-auto max-w-[74rem]">
            <div className="mx-auto max-w-[38rem] text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#bfa99a]">{showcase.statsLabel}</p>
              <h2 className="mt-4 font-rajdhani text-[2.35rem] font-bold leading-tight sm:text-[3rem]">
                {showcase.statsTitle.split(" ").slice(0, 3).join(" ")}
                <span className="block font-normal italic">{showcase.statsTitle.split(" ").slice(3).join(" ")}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[34rem] text-[0.92rem] leading-relaxed text-white/65">
                {showcase.heroSummary}
              </p>
            </div>

            <div className="mt-14 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {partnerItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex min-h-[10rem] flex-col items-center justify-center border-white/10 px-6 py-8 text-center sm:border-l sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(n+4)]:border-t"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[1.3rem] font-bold text-white">
                    {item.initial}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-white/55">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-2 border-b border-[#bfa99a] pb-1 text-sm font-bold text-[#f5f1eb] transition-colors hover:text-[#bfa99a]"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default ServiceShowcase;
