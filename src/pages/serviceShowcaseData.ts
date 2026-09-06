import { BarChart3, Briefcase, LineChart, Megaphone, Search, Share2, Users } from "lucide-react";
import { getRelevantExperiences } from "@/data/affiliations";
import { issueHiveThumbnail } from "@/data/projectDetails";
import digitalMarketingAnalyticsIcon from "@/assets/digital-marketing-icons/analytics.webp";
import digitalMarketingBriefcaseIcon from "@/assets/digital-marketing-icons/briefcase.webp";
import digitalMarketingClimateChangeIcon from "@/assets/digital-marketing-icons/climate-change.webp";
import digitalMarketingCommunityIcon from "@/assets/digital-marketing-icons/community.webp";
import digitalMarketingContentCreationIcon from "@/assets/digital-marketing-icons/content-creation.webp";
import digitalMarketingDigitalRightsIcon from "@/assets/digital-marketing-icons/digital-rights.webp";
import digitalMarketingGraphicDesignIcon from "@/assets/digital-marketing-icons/graphic-design.webp";
import digitalMarketingPodcastingIcon from "@/assets/digital-marketing-icons/podcasting.webp";
import digitalMarketingPpcIcon from "@/assets/digital-marketing-icons/ppc.webp";
import digitalMarketingCivicTechIcon from "@/assets/digital-marketing-icons/civic-tech.webp";
import digitalMarketingGovernanceAndDemocracyIcon from "@/assets/digital-marketing-icons/governance-and-democracy.webp";
import digitalMarketingSeoIcon from "@/assets/digital-marketing-icons/seo-search-symbol.webp";
import digitalMarketingSocialMediaIcon from "@/assets/digital-marketing-icons/social-media-marketing.webp";
import digitalMarketingVolunteeringIcon from "@/assets/digital-marketing-icons/volunteering.webp";
import techProjectCivicTechIcon from "@/assets/tech-projects/civic-tech.webp";
import techProjectHackathonIcon from "@/assets/tech-projects/hackathon.webp";
import techProjectClimateTechIcon from "@/assets/tech-projects/climate-tech.webp";
import techProjectEdTechIcon from "@/assets/tech-projects/ed-tech.webp";
import techProjectOthersIcon from "@/assets/tech-projects/others.webp";
import { assetPath } from "@/lib/assetPath";

export type ServiceSlug = "digital-marketing" | "advocacy-community" | "tech-projects";

export type ShowcaseMetric = {
  label: string;
  value: string;
};

export type ShowcaseCard = {
  title: string;
  description: string;
  image?: string;
  date: string;
  href?: string;
  category: string;
  external?: boolean;
};

export type ShowcasePageConfig = {
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

export type ExperienceStep = {
  company?: string;
  title: string;
  description: string;
  dateLabel?: string;
  icon: typeof Search;
};

export type ExperienceSection = {
  badge: string;
  titleLineOne: string;
  titleLineTwo: string;
  summary: string;
  steps: ExperienceStep[];
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
  issueHive: createAbstractIllustration("IssueHive", "Issue reporting for campus voices", {
    bgStart: "#fee2e2",
    bgEnd: "#fecaca",
    accentA: "#7A3A30",
    accentB: "#991b1b",
    text: "#4c0519",
  }),
  fellowshipCommunityLabs: createAbstractIllustration("Fellowship Community Labs", "Collaborative social innovation sessions", {
    bgStart: "#d1fae5",
    bgEnd: "#99f6e4",
    accentA: "#0f766e",
    accentB: "#134e4a",
    text: "#042f2e",
  }),
  ngoVolunteerManagement: createAbstractIllustration("NGO Volunteer Management", "Event, matching, and operations platform", {
    bgStart: "#fee2e2",
    bgEnd: "#fecaca",
    accentA: "#be123c",
    accentB: "#881337",
    text: "#4c0519",
  }),
};

const imageAssets = {
  mitraSmart: assetPath("reference-image.webp"),
  eduConnect: assetPath("civic-tech.webp"),
  devBus: assetPath("untitled-design.webp"),
  volunteerPlatform: assetPath("2nd-new.webp"),
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
  { title: "Search Engine Optimization (SEO)", subtitle: "Organic Search", icon: digitalMarketingIcons.seo },
  { title: "Pay-Per-Click (PPC) & SEM", subtitle: "Paid Search", icon: digitalMarketingIcons.ppc },
  { title: "Social Media Marketing", subtitle: "Audience Growth", icon: digitalMarketingIcons.socialMedia },
  { title: "Analytics", subtitle: "Analytics and Monitoring", icon: digitalMarketingIcons.analytics },
  { title: "Graphic Design", subtitle: "Visual Identity", icon: digitalMarketingIcons.graphicDesign },
  { title: "Content Creation & Strategy", subtitle: "Content Studio", icon: digitalMarketingIcons.contentCreation },
] as const;

const digitalMarketingSkillCardIcons = digitalMarketingSkillCards.reduce(
  (accumulator, card) => {
    accumulator[card.title] = card.icon;
    return accumulator;
  },
  {} as Record<(typeof digitalMarketingSkillCards)[number]["title"], string>,
);

export const serviceShowcases: Record<ServiceSlug, ShowcasePageConfig> = {
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
      { title: "CtrlBits Organic Growth Sprint", description: "SEO-led blog strategy and technical optimization to lift discoverability for product and service pages.", date: "Apr 2025", href: "https://www.ctrlbits.com/", category: "SEO & Technical Optimization", external: true },
      { title: "AIF Awareness Content Series", description: "Story-driven social content that improved campaign clarity for fellowship and community initiatives.", date: "Feb 2026", href: "/affiliations/1", category: "Content Storytelling" },
      { title: "AWS Event Promotion Funnel", description: "Community event promotion framework combining outreach posts, sign-up tracking, and follow-up loops.", date: "Mar 2025", href: "/affiliations/2", category: "Campaign Strategy" },
      { title: "NetMission Advocacy Media Plan", description: "Content calendar and publishing cadence designed to increase participation around digital rights topics.", date: "Dec 2025", href: "/affiliations/3", category: "Content Planning" },
    ],
    statsLabel: "Skills",
    statsTitle: "Digital Marketing Skills",
    statsSummary: "",
    statsImage: imageAssets.mitraSmart,
    stats: [
      { label: "SEO Projects", value: "20+" },
      { label: "Paid Media Campaigns", value: "15+" },
      { label: "Content Assets Published", value: "60+" },
      { label: "Email Automation Flows", value: "10+" },
    ],
    filters: ["Digital Marketing"],
    projects: [
      { title: "CtrlBits : Digital Marketing", description: "Led integrated digital marketing at CtrlBits covering SEO, SMM, SEM, and PPC, including on-page optimization, social media execution, ad campaign tuning, and performance tracking.", date: "16 Apr 2025", href: "https://www.ctrlbits.com/", category: "Digital Marketing", external: true },
    ],
  },
  "advocacy-community": {
    badge: "",
    heroTitle: "Community Programs with Real-World Social Impact",
    heroSummary:
      "This space highlights advocacy and community initiatives where collaboration, youth leadership, and digital rights engagement drive meaningful outcomes. The focus is on people, participation, and sustained community value.",
    skillHighlights: [
      "Climate Change",
      "Podcast",
      "Digital Rights Advocacy",
      "Youth Leadership & Mobilization",
      "Volunteer Coordination",
      "Partnership & Stakeholder Engagement",
      "Sustainability Initiative Planning",
    ],
    featured: [
      { title: "ALL In Foundation Fellowship", description: "Community-centered fellowship work focused on social impact and collaborative learning initiatives.", date: "Feb 2026", href: "/affiliations/1", category: "Community" },
      { title: "NetMission Digital Rights Track", description: "Advocacy projects and learning cohorts around internet governance and rights-based participation.", date: "Dec 2025", href: "/affiliations/3", category: "Advocacy" },
      { title: "Rotaract Youth Programs", description: "Service and leadership activities designed to support youth participation in civic projects.", date: "Jun 2025", href: "/affiliations/4", category: "Leadership" },
      { title: "Sustainability Mentorship", description: "Structured mentorship for sustainable business model experimentation.", date: "Aug 2025", href: "/affiliations/6", category: "Sustainability" },
    ],
    statsLabel: "Statistics",
    statsTitle: "Advocacy and Community Work in Numbers",
    statsSummary: "",
    statsImage: imageAssets.mitraSmart,
    stats: [
      { label: "Civic Tech", value: "6+" },
      { label: "Governance and Democracy", value: "18+" },
      { label: "Volunteering", value: "250+" },
    ],
    filters: ["Advocacy", "Community", "Leadership", "Sustainability"],
    projects: [
      { title: "Digital Rights Awareness Series", description: "Local-first content sessions to simplify digital rights and internet governance topics.", date: "19 Jan 2026", href: "/affiliations/3", category: "Advocacy" },
      { title: "Fellowship Community Labs", description: "Facilitated collaboration tracks for social problem framing and solution ideation.", image: selectedProjectIllustrations.fellowshipCommunityLabs, date: "14 Mar 2026", href: "/affiliations/1", category: "Community" },
      { title: "Youth Civic Program Rollout", description: "Support operations for youth-focused events and volunteering programs.", date: "28 Jul 2025", href: "/affiliations/4", category: "Leadership" },
      { title: "Sustainable Idea Mentoring", description: "Mentorship project around design thinking and practical sustainability models.", date: "03 Nov 2025", href: "/affiliations/6", category: "Sustainability" },
      { title: "Community Dialogue Forum", description: "Cross-group dialogue format connecting volunteers, fellows, and civic contributors.", date: "09 Aug 2025", href: "/affiliations/2", category: "Community" },
      { title: "Volunteer Coordination Hub", description: "Community volunteer pipeline planning for local outreach and recurring events.", image: imageAssets.volunteerPlatform, date: "10 Oct 2024", href: "/hackathon/4", category: "Leadership" },
      { title: "Policy Literacy Mini-Sessions", description: "Short-format sessions translating policy language into practical action points.", image: imageAssets.mitraSmart, date: "11 Feb 2026", href: "/hackathon/1", category: "Advocacy" },
      { title: "Local Sustainability Challenge", description: "Community challenge model encouraging idea submissions for sustainable living projects.", image: imageAssets.eduConnect, date: "17 Dec 2025", href: "/hackathon/2", category: "Sustainability" },
    ],
  },
  "tech-projects": {
    badge: "",
    heroTitle: "Hackathons and Builds",
    heroSummary: "Hackathon experiments, civic tooling, and build work centered on practical delivery, validation, and iteration.",
    skillHighlights: ["Workflow Automation", "Others", "Research & Validation"],
    featured: [
      { title: "Document Validation Flow", description: "AI-powered document validation and smart form guidance for public service workflows.", image: imageAssets.mitraSmart, date: "2025", href: "/hackathon/1", category: "Civic Tech" },
      { title: "University Fit Engine", description: "University matching platform combining profile intelligence and recommendation logic.", image: imageAssets.eduConnect, date: "2025", href: "/hackathon/2", category: "AI" },
      { title: "AI Hiring Assessment Flow", description: "SME recruitment workflow using AI-assisted assessment and matching mechanisms.", image: imageAssets.devBus, date: "2025", href: "/hackathon/3", category: "AI" },
      { title: "Volunteer Recruitment Platform", description: "Volunteer recruitment and matching flow for web-based community operations.", image: imageAssets.volunteerPlatform, date: "2024", href: "/hackathon/4", category: "Web Platform" },
    ],
    statsLabel: "Statistics",
    statsTitle: "Technical Delivery in Numbers",
    statsSummary: "",
    statsImage: imageAssets.mitraSmart,
    stats: [
      { label: "Hackathon Builds", value: "12+" },
      { label: "Civic Tech", value: "6+" },
      { label: "Climate Tech", value: "4+" },
      { label: "Ed Tech", value: "8+" },
    ],
    filters: ["Hackathon", "Web Platform", "AI", "Civic Tech"],
    projects: [
      { title: "University Fit Engine", description: "Recommendation logic and student profile matching for admission discovery.", image: imageAssets.eduConnect, date: "20 Feb 2025", href: "/hackathon/2", category: "AI" },
      { title: "AI Hiring Assessment Flow", description: "Prompt-based assessment sequence with role-matching and ranking support.", image: imageAssets.devBus, date: "16 Apr 2025", href: "/hackathon/3", category: "AI" },
      { title: "Issue Hive - Awarded 3rd Prize at KIST Fair 2082", description: "College-focused platform for students to submit, support, and track campus issues transparently.", image: issueHiveThumbnail, date: "Feb 2026", href: "/hackathon/1", category: "Campus Innovation" },
      { title: "NGO Volunteer Management", description: "Event publishing and volunteer matching system with stipend processing support.", image: selectedProjectIllustrations.ngoVolunteerManagement, date: "04 Oct 2024", href: "/hackathon/4", category: "Web Platform" },
      { title: "Cloud Community Toolkit", description: "Workshop support resources and platform docs for technical community sessions.", date: "09 Jul 2025", href: "/affiliations/2", category: "Hackathon" },
      { title: "Impact Program Microsite", description: "Fast prototype structure for social initiative updates and onboarding flows.", date: "27 Mar 2026", href: "/affiliations/1", category: "Web Platform" },
      { title: "Digital Rights Resource Portal", description: "Knowledge-sharing interface to present governance resources in digestible format.", date: "06 Feb 2026", href: "/affiliations/3", category: "Civic Tech" },
      { title: "Sustainability Idea Sandbox", description: "Interactive concept board for testing sustainable business solution hypotheses.", date: "30 Dec 2025", href: "/affiliations/6", category: "Hackathon" },
    ],
  },
};

export const serviceExperienceSections: Record<ServiceSlug, ExperienceSection> = {
  "digital-marketing": {
    badge: "WORK EXPERIENCE",
    titleLineOne: "Work experience",
    titleLineTwo: "that powers digital growth",
    summary: "CtrlBits, Paramendo Nepal, AIF, AWS Cloud Club, and NetMission - SEO, operations, content, paid media, and reporting.",
    steps: [
      { company: "CtrlBits", title: "Digital Marketer", description: "I optimized pages, keywords, and structure so the right audience could find the brand and its services.", dateLabel: "Apr 2025 - Present", icon: Search },
      { company: "Paramendo Nepal", title: "Business Operations Intern", description: "I support business operations, coordination, and day-to-day execution across a hybrid team.", dateLabel: "Jun 2026 - Present", icon: Briefcase },
      { company: "ALL In Foundation", title: "Content Strategist", description: "I planned copy and campaign content that supported clarity, relevance, and consistent output.", dateLabel: "Feb 2026 - Present", icon: Megaphone },
      { company: "AWS Cloud Club", title: "Paid Media Specialist", description: "I tuned campaign budgets, targeting, and creatives to improve reach, clicks, and conversions.", dateLabel: "Mar 2025 - Present", icon: BarChart3 },
      { company: "NetMission", title: "Social Media Manager", description: "I managed posts, visual updates, and timing so campaign activity stayed active and aligned.", dateLabel: "Dec 2025 - Present", icon: Share2 },
      { company: "Cross-Project Work", title: "Reporting Analyst", description: "I read performance data from work across these projects and turned it into practical next steps for the next round.", dateLabel: "2025 - 2026", icon: LineChart },
      { company: "Client and Team Work", title: "Campaign Coordinator", description: "I worked with clients and teams across these workplaces to translate goals into campaigns, assets, and measurable progress.", dateLabel: "2025 - 2026", icon: Users },
    ],
  },
  "advocacy-community": {
    badge: "WORK EXPERIENCE",
    titleLineOne: "Work experience",
    titleLineTwo: "with community impact",
    summary: "A focused look at community programs, digital-rights advocacy, volunteer coordination, and partnership-driven work that complements the page.",
    steps: [
      { title: "Community Program Design", description: "Shaping initiatives that bring people together around clear goals and shared outcomes.", dateLabel: "2025", icon: Users },
      { title: "Digital Rights Advocacy", description: "Helping translate rights-based topics into accessible communication and campaign formats.", dateLabel: "2025", icon: Megaphone },
      { title: "Volunteer Coordination", description: "Organizing people, schedules, and responsibilities so community activity stays dependable.", dateLabel: "2024 - 2025", icon: Share2 },
      { title: "Stakeholder Alignment", description: "Keeping partners, contributors, and teams moving in the same direction.", dateLabel: "2025", icon: BarChart3 },
      { title: "Impact Tracking", description: "Monitoring participation and outcomes to understand what is working and what needs tuning.", dateLabel: "2025 - 2026", icon: LineChart },
      { title: "Sustained Delivery", description: "Carrying programs from planning into consistent, repeatable execution.", dateLabel: "2025 - Present", icon: Search },
    ],
  },
  "tech-projects": {
    badge: "WORK EXPERIENCE",
    titleLineOne: "Work experience",
    titleLineTwo: "behind every build",
    summary: "A snapshot of prototyping, API integration, delivery coordination, and debugging work that supports the technical side of the portfolio.",
    steps: [
      { title: "Rapid Prototyping", description: "Turning ideas into usable interfaces and working flows quickly enough to validate them early.", dateLabel: "2024 - 2025", icon: Search },
      { title: "Feature Implementation", description: "Building pages and interactions that keep the product focused and usable.", dateLabel: "2025", icon: Share2 },
      { title: "API Integration", description: "Connecting external data and services into the product without breaking the flow.", dateLabel: "2025", icon: BarChart3 },
      { title: "Debugging & Refinement", description: "Finding issues, tightening behavior, and improving performance under pressure.", dateLabel: "2025 - 2026", icon: LineChart },
      { title: "Team Delivery", description: "Keeping work coordinated across teammates, deadlines, and changing requirements.", dateLabel: "2024 - 2026", icon: Users },
      { title: "Launch Readiness", description: "Polishing the final build so it can be presented, tested, and shared with confidence.", dateLabel: "2025", icon: Megaphone },
    ],
  },
};

export const progressBarWidths = ["w-40", "w-20", "w-16", "w-12", "w-10", "w-8"];

export const normalizeCompanyName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

export const digitalMarketingSkillCardList = digitalMarketingSkillCards;
export const digitalMarketingSkillCardIconsMap = digitalMarketingSkillCardIcons;
export const digitalMarketingIconsMap = digitalMarketingIcons;
export const advocacyCommunityIconMap = {
  "Civic Tech": digitalMarketingCivicTechIcon,
  "Governance and Democracy": digitalMarketingGovernanceAndDemocracyIcon,
  Volunteering: digitalMarketingVolunteeringIcon,
  "Climate Change": digitalMarketingClimateChangeIcon,
  Podcast: digitalMarketingPodcastingIcon,
  "Digital Rights Advocacy": digitalMarketingDigitalRightsIcon,
  "Youth Leadership & Mobilization": digitalMarketingCommunityIcon,
  "Volunteer Coordination": digitalMarketingVolunteeringIcon,
  "Partnership & Stakeholder Engagement": digitalMarketingCommunityIcon,
  "Sustainability Initiative Planning": digitalMarketingClimateChangeIcon,
} as const;
export const techProjectIconMap = {
  "Hackathon Builds": techProjectHackathonIcon,
  "Civic Tech": techProjectCivicTechIcon,
  "Climate Tech": techProjectClimateTechIcon,
  "Ed Tech": techProjectEdTechIcon,
  Others: techProjectOthersIcon,
} as const;

export const getServicePageData = (resolvedSlug: ServiceSlug) => {
  const showcase = serviceShowcases[resolvedSlug];
  const experienceSection = serviceExperienceSections[resolvedSlug];
  const partnerItems = (
    resolvedSlug === "digital-marketing"
      ? digitalMarketingSkillCardList.map((card) => ({
          ...card,
          icon: digitalMarketingSkillCardIconsMap[card.title],
        }))
      : resolvedSlug === "advocacy-community"
        ? [
            ...showcase.stats.map((stat) => ({
              title: stat.label,
              subtitle: stat.value,
              icon: advocacyCommunityIconMap[stat.label as keyof typeof advocacyCommunityIconMap] ?? digitalMarketingIcons.analytics,
            })),
            ...(showcase.skillHighlights ?? []).map((skill) => ({
              title: skill,
              subtitle: "Focus Area",
              icon: advocacyCommunityIconMap[skill as keyof typeof advocacyCommunityIconMap] ?? digitalMarketingIcons.analytics,
            })),
          ]
        : [
            ...showcase.stats.map((stat) => ({
              title: stat.label,
              subtitle: stat.value,
              icon: techProjectIconMap[stat.label as keyof typeof techProjectIconMap] ?? digitalMarketingIcons.analytics,
            })),
            ...(showcase.skillHighlights ?? []).map((skill) => ({
              title: skill,
              subtitle: "Focus Area",
              icon: techProjectIconMap[skill as keyof typeof techProjectIconMap] ?? digitalMarketingIcons.analytics,
            })),
          ]
  ).slice(0, 6);

  const pageTitle = `${showcase.heroTitle} | Dhirendra Singh Dhami`;
  const pageDescription = showcase.heroSummary;

  return {
    showcase,
    experienceSection,
    partnerItems,
    pageTitle,
    pageDescription,
  };
};