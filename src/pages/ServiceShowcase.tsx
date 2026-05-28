import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, LineChart, Megaphone, Search, Share2, Users } from "lucide-react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { getRelevantExperiences } from "@/data/affiliations";
import { issueHiveThumbnail } from "@/data/projectDetails";
import digitalMarketingAnalyticsIcon from "@/assets/digital marketing icons/analytics.png";
import digitalMarketingBriefcaseIcon from "@/assets/digital marketing icons/briefcase.png";
import digitalMarketingContentCreationIcon from "@/assets/digital marketing icons/content-creation.png";
import digitalMarketingGraphicDesignIcon from "@/assets/digital marketing icons/graphic-design.png";
import digitalMarketingPodcastingIcon from "@/assets/digital marketing icons/podcasting.png";
import digitalMarketingPpcIcon from "@/assets/digital marketing icons/ppc.png";
import digitalMarketingSeoIcon from "@/assets/digital marketing icons/seo-search-symbol.png";
import digitalMarketingSocialMediaIcon from "@/assets/digital marketing icons/social-media-marketing.png";

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
  ctrlBits: digitalMarketingBriefcaseIcon,
  // use the briefcase PNG as the small icon for CtrlBits rows
  // (file added at src/assets/briefcase.png)
  rotaract: assetPath('affiliation/rac .jpg'),
  sustainabilitySolutions: assetPath('affiliation/sustainabilitysolutionsnepal_logo.jpeg'),
};

const digitalMarketingIcons = {
  analytics: digitalMarketingAnalyticsIcon,
  briefcase: digitalMarketingBriefcaseIcon,
  contentCreation: digitalMarketingContentCreationIcon,
  graphicDesign: digitalMarketingGraphicDesignIcon,
  podcasting: digitalMarketingPodcastingIcon,
  ppc: digitalMarketingPpcIcon,
  seo: digitalMarketingSeoIcon,
  socialMedia: digitalMarketingSocialMediaIcon,
};

const digitalMarketingSkillCards = [
  {
    title: "Search Engine Optimization (SEO)",
    subtitle: "Organic Search",
    icon: digitalMarketingIcons.seo,
  },
  {
    title: "Pay-Per-Click (PPC) & SEM",
    subtitle: "Paid Search",
    icon: digitalMarketingIcons.ppc,
  },
  {
    title: "Social Media Marketing",
    subtitle: "Audience Growth",
    icon: digitalMarketingIcons.socialMedia,
  },
  {
    title: "Analytics",
    subtitle: "Analytics and Monitoring",
    icon: digitalMarketingIcons.analytics,
  },
  {
    title: "Graphic Design",
    subtitle: "Visual Identity",
    icon: digitalMarketingIcons.graphicDesign,
  },
  {
    title: "Content Creation & Strategy",
    subtitle: "Content Studio",
    icon: digitalMarketingIcons.contentCreation,
  },
] as const;

const digitalMarketingSkillCardIcons = digitalMarketingSkillCards.reduce(
  (accumulator, card) => {
    accumulator[card.title] = card.icon;
    return accumulator;
  },
  {} as Record<(typeof digitalMarketingSkillCards)[number]["title"], string>,
);

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
    statsLabel: "Skills",
    statsTitle: "Digital Marketing Skills",
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

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute left-4 top-4 z-40 group inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.24em] text-[#3f3932] transition-colors hover:text-[#7A3A30] sm:left-8 sm:top-8"
    >
      <span aria-hidden className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
      <span className="border-b border-transparent leading-none transition-colors group-hover:border-[#7A3A30]">Back</span>
    </button>
  );
};

const isServiceSlug = (value: string): value is ServiceSlug => value in serviceShowcases;
const defaultServiceSlug: ServiceSlug = "digital-marketing";

type ExperienceStep = {
  company?: string;
  title: string;
  description: string;
  dateLabel?: string;
  icon: typeof Search;
};

type ExperienceSection = {
  badge: string;
  titleLineOne: string;
  titleLineTwo: string;
  summary: string;
  steps: ExperienceStep[];
};

const serviceExperienceSections: Record<ServiceSlug, ExperienceSection> = {
  "digital-marketing": {
    badge: "WORK EXPERIENCE",
    titleLineOne: "Work experience",
    titleLineTwo: "that powers digital growth",
    summary:
      "CtrlBits, AIF, AWS Cloud Club, and NetMission - SEO, content, paid media, and reporting.",
    steps: [
      {
        company: "CtrlBits",
        title: "Digital Marketer",
        description: "I optimized pages, keywords, and structure so the right audience could find the brand and its services.",
        dateLabel: "Apr 2025 - Present",
        icon: Search,
      },
      {
        company: "ALL In Foundation",
        title: "Content Strategist",
        description: "I planned copy and campaign content that supported clarity, relevance, and consistent output.",
        dateLabel: "Feb 2026 - Present",
        icon: Megaphone,
      },
      {
        company: "AWS Cloud Club",
        title: "Paid Media Specialist",
        description: "I tuned campaign budgets, targeting, and creatives to improve reach, clicks, and conversions.",
        dateLabel: "Mar 2025 - Present",
        icon: BarChart3,
      },
      {
        company: "NetMission",
        title: "Social Media Manager",
        description: "I managed posts, visual updates, and timing so campaign activity stayed active and aligned.",
        dateLabel: "Dec 2025 - Present",
        icon: Share2,
      },
      {
        company: "Cross-Project Work",
        title: "Reporting Analyst",
        description: "I read performance data from work across these projects and turned it into practical next steps for the next round.",
        dateLabel: "2025 - 2026",
        icon: LineChart,
      },
      {
        company: "Client and Team Work",
        title: "Campaign Coordinator",
        description: "I worked with clients and teams across these workplaces to translate goals into campaigns, assets, and measurable progress.",
        dateLabel: "2025 - 2026",
        icon: Users,
      },
    ],
  },
  "advocacy-community": {
    badge: "WORK EXPERIENCE",
    titleLineOne: "Work experience",
    titleLineTwo: "with community impact",
    summary:
      "A focused look at community programs, digital-rights advocacy, volunteer coordination, and partnership-driven work that complements the page.",
    steps: [
      {
        title: "Community Program Design",
        description: "Shaping initiatives that bring people together around clear goals and shared outcomes.",
        dateLabel: "2025",
        icon: Users,
      },
      {
        title: "Digital Rights Advocacy",
        description: "Helping translate rights-based topics into accessible communication and campaign formats.",
        dateLabel: "2025",
        icon: Megaphone,
      },
      {
        title: "Volunteer Coordination",
        description: "Organizing people, schedules, and responsibilities so community activity stays dependable.",
        dateLabel: "2024 - 2025",
        icon: Share2,
      },
      {
        title: "Stakeholder Alignment",
        description: "Keeping partners, contributors, and teams moving in the same direction.",
        dateLabel: "2025",
        icon: BarChart3,
      },
      {
        title: "Impact Tracking",
        description: "Monitoring participation and outcomes to understand what is working and what needs tuning.",
        dateLabel: "2025 - 2026",
        icon: LineChart,
      },
      {
        title: "Sustained Delivery",
        description: "Carrying programs from planning into consistent, repeatable execution.",
        dateLabel: "2025 - Present",
        icon: Search,
      },
    ],
  },
  "tech-projects": {
    badge: "WORK EXPERIENCE",
    titleLineOne: "Work experience",
    titleLineTwo: "behind every build",
    summary:
      "A snapshot of prototyping, API integration, delivery coordination, and debugging work that supports the technical side of the portfolio.",
    steps: [
      {
        title: "Rapid Prototyping",
        description: "Turning ideas into usable interfaces and working flows quickly enough to validate them early.",
        dateLabel: "2024 - 2025",
        icon: Search,
      },
      {
        title: "Feature Implementation",
        description: "Building pages and interactions that keep the product focused and usable.",
        dateLabel: "2025",
        icon: Share2,
      },
      {
        title: "API Integration",
        description: "Connecting external data and services into the product without breaking the flow.",
        dateLabel: "2025",
        icon: BarChart3,
      },
      {
        title: "Debugging & Refinement",
        description: "Finding issues, tightening behavior, and improving performance under pressure.",
        dateLabel: "2025 - 2026",
        icon: LineChart,
      },
      {
        title: "Team Delivery",
        description: "Keeping work coordinated across teammates, deadlines, and changing requirements.",
        dateLabel: "2024 - 2026",
        icon: Users,
      },
      {
        title: "Launch Readiness",
        description: "Polishing the final build so it can be presented, tested, and shared with confidence.",
        dateLabel: "2025",
        icon: Megaphone,
      },
    ],
  },
};

const progressBarWidths = [
  "w-40",
  "w-20",
  "w-16",
  "w-12",
  "w-10",
  "w-8",
];

const normalizeCompanyName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const ServiceShowcase = ({ forcedSlug }: ServiceShowcaseProps) => {
  const { slug } = useParams<{ slug: string }>();
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  const routeSlug = forcedSlug ?? slug;
  const resolvedSlug = !routeSlug ? defaultServiceSlug : isServiceSlug(routeSlug) ? routeSlug : null;
  const experienceSection = serviceExperienceSections[resolvedSlug];
  const visibleWorkItems = experienceSection.steps;
  const activeProject = visibleWorkItems[activeWorkIndex] ?? visibleWorkItems[0];
  const relevantExperienceLookup = new Map(
    getRelevantExperiences().map((experience) => [normalizeCompanyName(experience.company), experience]),
  );
  const activeExperience = relevantExperienceLookup.get(normalizeCompanyName(activeProject.company ?? activeProject.title));
  const activeProjectDateLabel = activeExperience
    ? `${activeExperience.dateRange}${activeExperience.duration ? ` · ${activeExperience.duration}` : ""}`
    : activeProject.dateLabel ?? "2025 - 2026";

  useEffect(() => {
    setActiveWorkIndex(0);
  }, [resolvedSlug]);

  if (!resolvedSlug) {
    return <Navigate to="/digital-marketing" replace />;
  }

  const showcase = serviceShowcases[resolvedSlug];
  const pageTitle = `${showcase.heroTitle} | Dhirendra Singh Dhami`;
  const pageDescription = showcase.heroSummary;
  const partnerItems = (
    resolvedSlug === "digital-marketing"
      ? digitalMarketingSkillCards.map((card) => ({
          ...card,
          icon: digitalMarketingSkillCardIcons[card.title],
        }))
      : [
          ...showcase.stats.map((stat) => ({
            title: stat.label,
            subtitle: stat.value,
            icon: digitalMarketingIcons.analytics,
          })),
          ...(showcase.skillHighlights ?? []).map((skill) => ({
            title: skill,
            subtitle: "Focus Area",
            icon: digitalMarketingIcons.analytics,
          })),
        ]
  ).slice(0, 6);

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
        <section className="relative mx-auto min-h-[108svh] max-w-[74rem] px-5 pb-10 pt-18 sm:px-8 sm:pb-12 sm:pt-24 md:px-12 md:pt-28 lg:px-10 lg:pt-32">
          <BackButton />
          <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-[#90857a] sm:text-[0.68rem] sm:tracking-[0.38em]">{experienceSection.badge}</p>
              <h1 className="mt-4 max-w-[16rem] text-[2rem] font-normal leading-[0.92] tracking-[-0.04em] text-[#231d18] sm:max-w-[18rem] sm:text-[2.95rem] lg:text-[3.35rem]">
                <span className="block font-semibold sm:whitespace-nowrap">{experienceSection.titleLineOne}</span>
                <span className="block sm:whitespace-nowrap text-[0.9em] text-[#6f655a]">
                  {experienceSection.titleLineTwo}
                </span>
              </h1>
            </div>
            <p className="max-w-[22rem] text-[0.84rem] leading-[1.6] text-[#6f655a] sm:text-[0.92rem] lg:justify-self-end">
              {experienceSection.summary}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] lg:items-start lg:justify-center">
            <div className="space-y-0">
              {visibleWorkItems.map((project, index) => {
                const isActive = index === activeWorkIndex;
                const rowClass = `group block min-h-[4.65rem] text-left transition-colors ${
                  isActive
                    ? "bg-[#7A3A30] px-6 py-[1.125rem] shadow-[0_14px_32px_rgba(122,58,48,0.14)]"
                    : "border-b border-[#ddd3c7] px-6 py-[1.125rem]"
                }`;
                const rowContent = (
                  <span className="flex items-start gap-3.5">
                    <span className="mt-0.5 text-[#231d18]">
                      {project.company === "CtrlBits" ? (
                        <img
                          src={imageAssets.ctrlBits}
                          alt="CtrlBits"
                          className={`h-5 w-5 object-contain ${isActive ? "opacity-100" : "opacity-90"}`}
                        />
                      ) : (
                        (() => {
                          const WorkIcon = project.icon;
                          return (
                            <WorkIcon
                              className={`h-3 w-3 transition-colors sm:h-[0.85rem] sm:w-[0.85rem] ${
                                isActive ? "text-[#ffffff]" : "text-[#8d8378]"
                              }`}
                              strokeWidth={1.8}
                            />
                          );
                        })()
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-semibold leading-tight ${
                          index === 0
                            ? "text-[1.02rem] sm:text-[1.14rem]"
                            : index === 1
                              ? "text-[0.99rem] sm:text-[1.09rem]"
                              : index === 2
                                ? "text-[0.96rem] sm:text-[1.06rem]"
                                : "text-[0.94rem] sm:text-[1.02rem]"
                        } ${
                          isActive ? "text-[#ffffff]" : "text-[#231d18]"
                        }`}
                      >
                        {project.company ?? project.title}
                      </span>
                      <span
                        className={`mt-1 block max-w-[29rem] text-[0.76rem] leading-[1.55] sm:text-[0.88rem] ${
                          isActive ? "text-[#ffffff]/85" : "text-[#92877b]"
                        }`}
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </span>
                    </span>
                  </span>
                );

                return (
                  <div
                    key={project.title}
                    className="relative grid min-h-[6.5rem] grid-cols-[2.7rem_minmax(0,1fr)] gap-x-[1.35rem]"
                  >
                    {index < visibleWorkItems.length - 1 && (
                      <span aria-hidden="true" className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-[#ded6cb]" />
                    )}

                    <div className="relative flex justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveWorkIndex(index)}
                        className={`relative z-10 mt-4 flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full text-[0.68rem] font-semibold transition-colors sm:h-[2.35rem] sm:w-[2.35rem] sm:text-[0.74rem] ${
                          isActive
                            ? "bg-[#120e0b] text-[#f5f1eb]"
                            : "border border-[#d8cfc3] bg-[#f5f1eb] text-[#7b7066]"
                        }`}
                        aria-label={`Show work item ${index + 1}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveWorkIndex(index)}
                      onFocus={() => setActiveWorkIndex(index)}
                      className={`${rowClass} h-full`}
                    >
                      {rowContent}
                    </button>
                  </div>
                );
              })}
            </div>

            {activeProject && (
              <aside className="pt-0">
                <div className="relative flex min-h-[17.5rem] flex-col overflow-hidden border border-[#dfd6ca] bg-white p-6 shadow-[0_16px_42px_rgba(35,29,24,0.06)] sm:h-[19rem] sm:p-10 lg:h-[20rem] lg:p-11">
                  <div className="text-[3.4rem] font-normal leading-none text-[#231d18]/10 sm:text-[5rem]">
                    {String(activeWorkIndex + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-6 flex flex-1 flex-col sm:mt-8">
                    <div className="flex items-start justify-between gap-4 pr-20 sm:pr-28">
                      <h2 className="flex items-center gap-2.5 text-[1.05rem] font-semibold leading-tight text-[#231d18] sm:text-[1.45rem]">
                        {activeProject.company === "CtrlBits" ? (
                          <img src={imageAssets.ctrlBits} alt="CtrlBits" className="h-4 w-4 object-contain" />
                        ) : (
                          (() => {
                            const ActiveIcon = activeProject.icon;
                            return <ActiveIcon className="h-3.5 w-3.5" strokeWidth={1.7} />;
                          })()
                        )}
                        {activeProject.title}
                      </h2>
                      <span className="absolute right-3 top-3 max-w-[9.5rem] text-right text-[0.66rem] font-semibold uppercase tracking-[0.18em] leading-[1.15] text-[#7A3A30] sm:right-6 sm:top-6 sm:max-w-[11rem] sm:text-[0.74rem] sm:tracking-[0.2em] lg:right-8 lg:top-8">
                        <span className="block whitespace-nowrap">
                          {activeExperience?.dateRange ?? activeProjectDateLabel.split(" · ")[0]}
                        </span>
                        <span className="mt-1 block whitespace-nowrap normal-case tracking-[0.14em] text-[#7A3A30]/80">
                          {activeExperience?.duration ?? activeProjectDateLabel.split(" · ")[1] ?? ""}
                        </span>
                      </span>
                    </div>
                    <p
                      className="mt-4 max-w-[21rem] text-[0.8rem] leading-[1.58] text-[#5f574d] sm:text-[0.94rem]"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                    >
                      {activeProject.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-4 sm:pt-5">
                      {visibleWorkItems.slice(0, 6).map((item, index) => (
                        <span
                          key={`${item.title}-progress`}
                          className={`h-0.5 ${progressBarWidths[index] ?? "w-8"} ${index === activeWorkIndex ? "bg-[#231d18]" : "bg-[#d8cfc3]"}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>

        <section className="bg-[#f5f1eb] px-5 pb-8 pt-0 text-[#231d18] sm:px-8 sm:pb-10 sm:pt-0 md:px-12">
          <div className="mx-auto max-w-[74rem]">
            <div className="mx-auto max-w-[38rem] text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#7A3A30]">{showcase.statsLabel}</p>
              <h2 className="mt-4 font-rajdhani text-[2.25rem] font-normal leading-tight sm:text-[3rem] lg:text-[3.4rem]">
                {showcase.statsTitle.split(" ").slice(0, 1).join(" ")}{" "}
                <span className="font-semibold text-[#7A3A30]">{showcase.statsTitle.split(" ")[1]}</span>{" "}
                <span>{showcase.statsTitle.split(" ").slice(2).join(" ")}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[34rem] text-[0.92rem] leading-relaxed text-[#6f655a] sm:text-[1rem]">
                {resolvedSlug === "digital-marketing" ? "A visual summary of the core skills used in my digital marketing work." : showcase.heroSummary}
              </p>
            </div>

            <div className="mt-12 grid border-y border-[#dfd6ca] sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {partnerItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex min-h-[9rem] flex-col items-center justify-center border-[#dfd6ca] px-5 py-7 text-center sm:border-l sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(n+4)]:border-t"
                >
                  <img src={item.icon} alt="" aria-hidden="true" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
                  <p className="mt-4 text-[0.9rem] font-semibold text-[#231d18] sm:text-[0.98rem]">{item.title}</p>
                  <p className="mt-1 text-[0.78rem] text-[#7c7167] sm:text-[0.84rem]">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[0.95rem] text-[#6f655a]">Have a project or partnership in mind?</p>
              <div className="mt-3">
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#231d18] hover:text-[#7A3A30] border-b border-transparent hover:border-[#7A3A30]"
                >
                  Contact me
                  <span aria-hidden className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default ServiceShowcase;
