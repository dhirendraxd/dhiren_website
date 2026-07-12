export type ProjectDetail = {
  slug: string;
  title: string;
  serviceSlug: "digital-marketing" | "advocacy-community" | "tech-projects";
  category: string;
  date: string;
  summary: string;
  challenge: string;
  approach: string;
  outcomes: string[];
  tags: string[];
  image?: string;
  gallery?: string[];
  sourceHref?: string;
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

export const issueHiveHeroImage = assetPath('issue-hive.webp');
export const issueHiveThumbnail = assetPath('issue-hive-thumb.webp');

const images = {
  mitraSmart: assetPath('reference-image.webp'),
  eduConnect: assetPath('civic-tech.webp'),
  devBus: assetPath('untitled-design.webp'),
  volunteerPlatform: assetPath('2nd-new.webp'),
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=960&h=640&fit=crop&auto=format&fm=webp&q=80`;

const netImages = {
  communityWorkshop: unsplash('1522202176988-66273c2fd55f'),  // people collaborating around table
  youthCommunity:    unsplash('1529156069898-49953e39b3ac'),  // diverse group of young people
  sustainability:    unsplash('1542601906990-b4d3fb778b09'),  // hands holding green plant
  techCloud:         unsplash('1451187580459-43490279c0fa'),  // earth from space / cloud tech
  webDev:            unsplash('1467232004584-a241de8bcf5d'),  // laptop / web development
  dialogue:          unsplash('1573497019940-1c28c88b4f3e'),  // professional meeting discussion
  digitalRights:     unsplash('1516321318423-f06f85e504b3'),  // digital screen / interface
  greenInnovation:   unsplash('1473341304170-971dccb5ac1e'),  // wind turbines / clean energy
  socialMedia:       unsplash('1611162617213-7d7a39e9b1d7'),  // social media on phone
  analytics:         unsplash('1551288049-bebda4e38f71'),     // data analytics dashboard
  design:            unsplash('1626785774573-4b799315345d'),  // graphic design workspace
  fellowshipLab:     unsplash('1517245386807-bb43f82c33c4'),  // workshop / group ideation
  mentoring:         unsplash('1573496359142-b8d87734a5a2'),  // two people in mentoring session
  civicMission:      unsplash('1563986768494-4dee2763ff3f'),  // digital connection / cyber
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "seo-smm-content-strategy",
    title: "SEO & SMM Strategy",
    serviceSlug: "digital-marketing",
    category: "SEO / SMM",
    date: "16 Apr 2025",
    summary: "Integrated SEO and social media strategy for CtrlBits — keyword targeting, content themes, and platform-specific publishing to build compounding organic reach.",
    challenge: "The channels were active, but they were not yet working as one connected funnel, which limited compounding growth and made performance harder to interpret.",
    approach: "I built a unified monthly framework that connected keyword planning, social publishing, and performance reporting into one consistent rhythm, with weekly optimization loops.",
    outcomes: [
      "Improved search visibility for core service pages.",
      "Standardized reporting across SEO and social channels.",
      "Established a repeatable process for content and keyword iteration."
    ],
    tags: ["SEO", "SEM", "SMM", "Content Strategy", "Analytics"],
    image: netImages.socialMedia,
    sourceHref: "https://www.ctrlbits.com/",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504868584819-0a05a73e4dc8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "graphics-design-brand-identity",
    title: "Graphics Design & Brand Identity",
    serviceSlug: "digital-marketing",
    category: "Design",
    date: "10 Mar 2025",
    summary: "Visual design execution across brand kits, social assets, and campaign creatives — building a consistent visual language across every digital touchpoint.",
    challenge: "Brand visuals were inconsistent across platforms, weakening recognition and diluting campaign impact.",
    approach: "Built a reusable visual system with templates, brand guidelines, and platform-specific asset libraries for faster creative turnaround.",
    outcomes: [
      "Consistent visual identity across all brand touchpoints.",
      "Faster creative turnaround with reusable asset templates.",
      "Improved brand recall in social campaign performance."
    ],
    tags: ["Graphics Design", "Branding", "Visual Identity"],
    image: netImages.design,
    sourceHref: "https://www.ctrlbits.com/",
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526f30ee1b4?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bba4?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1534447677209-da0980d0a105?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "analytics-paid-ads-performance",
    title: "Analytics & Paid Ads",
    serviceSlug: "digital-marketing",
    category: "Paid Media",
    date: "22 May 2025",
    summary: "Performance marketing setup combining paid media campaigns with analytics dashboards — turning ad spend into measurable, data-backed decisions.",
    challenge: "Ad spend was active but lacked clear attribution and optimization feedback loops.",
    approach: "Set up conversion tracking, audience segmentation, and weekly reporting to align spend with measurable outcomes across channels.",
    outcomes: [
      "Improved ROAS across active paid campaigns.",
      "Clearer attribution model for conversion events.",
      "Structured reporting cadence for budget decisions."
    ],
    tags: ["Analytics", "Paid Ads", "PPC", "Performance Marketing"],
    image: netImages.analytics,
    sourceHref: "https://www.ctrlbits.com/",
    gallery: [
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504868584819-0a05a73e4dc8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "digital-rights-awareness-series",
    title: "Digital Rights Awareness Series",
    serviceSlug: "advocacy-community",
    category: "Advocacy",
    date: "19 Jan 2026",
    summary: "Local-first awareness sessions designed to make digital rights concepts understandable and actionable for youth participants.",
    challenge: "Most policy language felt too technical for first-time participants.",
    approach: "Converted policy terms into practical case-based mini sessions and shared takeaways through lightweight community content.",
    outcomes: [
      "Higher participant confidence in discussing digital rights topics.",
      "Improved community engagement across follow-up sessions.",
      "Created reusable session material for future cohorts."
    ],
    tags: ["Advocacy", "Community", "Digital Rights"],
    image: netImages.civicMission,
    sourceHref: "https://netmission.asia",
    gallery: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1531482615286-7188771f0a3d?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "fellowship-community-labs",
    title: "Fellowship Community Labs",
    serviceSlug: "advocacy-community",
    category: "Community",
    date: "14 Mar 2026",
    summary: "Lab-style sessions where fellows framed real social problems and tested early-stage intervention ideas together.",
    challenge: "Participants had strong motivation but lacked a shared structure for ideation and validation.",
    approach: "Used guided facilitation with problem statements, quick field validation, and feedback rounds to sharpen project direction.",
    outcomes: [
      "Faster movement from ideas to pilot-ready concepts.",
      "Clearer collaboration roles inside fellowship teams.",
      "Documented lab workflow for reuse in later cycles."
    ],
    tags: ["Fellowship", "Facilitation", "Social Impact"],
    image: netImages.fellowshipLab,
    gallery: [
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=960&h=640&fit=crop&auto=format&q=80",
    ],
    sourceHref: "https://www.facebook.com/allinfoundationnp/"
  },
  {
    slug: "youth-civic-program-rollout",
    title: "Youth Civic Program Rollout",
    serviceSlug: "advocacy-community",
    category: "Leadership",
    date: "28 Jul 2025",
    summary: "Operational support for youth-focused civic programs including activity planning, volunteer coordination, and communication.",
    challenge: "Execution quality varied across activities due to inconsistent preparation.",
    approach: "Introduced standard pre-event checklists, role assignments, and simple after-action reviews.",
    outcomes: [
      "More predictable delivery quality for recurring events.",
      "Improved volunteer onboarding clarity.",
      "Better continuity between program cycles."
    ],
    tags: ["Youth Leadership", "Operations", "Civic Programs"],
    image: netImages.youthCommunity,
    sourceHref: "https://rotary.org",
    gallery: [
      "https://images.unsplash.com/photo-1580582932707-520aef1e7625?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1506869640319-fe1a20fd4ca2?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1517457373958-bac9ebd2f4e8?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "sustainable-idea-mentoring",
    title: "Sustainable Idea Mentoring",
    serviceSlug: "advocacy-community",
    category: "Sustainability",
    date: "03 Nov 2025",
    summary: "Mentored early-stage sustainability ideas with focus on practical design thinking and implementable business models.",
    challenge: "Ideas were creative but often lacked validation and delivery constraints.",
    approach: "Applied structured mentoring around value proposition, feasibility, and user feedback loops.",
    outcomes: [
      "Stronger idea framing with clearer value narratives.",
      "Reduced risk through early assumption testing.",
      "Improved confidence in pilot planning."
    ],
    tags: ["Mentoring", "Sustainability", "Design Thinking"],
    image: netImages.mentoring,
    sourceHref: "https://sustainability.com.np/",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1500829242034-e6a0de0c6aee?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1416339426682-caa3a2640c1b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1442850473887-3c39d36b9e94?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "community-dialogue-forum",
    title: "Community Dialogue Forum",
    serviceSlug: "advocacy-community",
    category: "Community",
    date: "09 Aug 2025",
    summary: "Dialogue format connecting fellows, volunteers, and civic contributors to align efforts around shared community priorities.",
    challenge: "Stakeholder groups were active but not consistently coordinated.",
    approach: "Designed a recurring forum format with guided prompts, common agenda, and documented action points.",
    outcomes: [
      "Improved cross-group collaboration.",
      "Better continuity of ideas between meetings.",
      "Higher clarity on ownership of next steps."
    ],
    tags: ["Community", "Coordination", "Facilitation"],
    image: netImages.dialogue,
    sourceHref: "https://aws.amazon.com",
    gallery: [
      "https://images.unsplash.com/photo-1521737604082-bf3dcfca0dc3?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "volunteer-coordination-hub",
    title: "Volunteer Coordination Hub",
    serviceSlug: "advocacy-community",
    category: "Leadership",
    date: "10 Oct 2024",
    summary: "Volunteer pipeline planning to support recurring outreach and event delivery with better role clarity.",
    challenge: "Volunteer drop-offs and communication gaps reduced consistency.",
    approach: "Mapped volunteer journey stages and introduced streamlined role-matching with recurring check-ins.",
    outcomes: [
      "Improved volunteer retention between events.",
      "Faster assignment of relevant responsibilities.",
      "Higher program execution reliability."
    ],
    tags: ["Volunteering", "Leadership", "Program Ops"],
    image: images.volunteerPlatform,
    gallery: [
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1531482615286-7188771f0a3d?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1506869640319-fe1a20fd4ca2?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1517457373958-bac9ebd2f4e8?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "policy-literacy-mini-sessions",
    title: "Policy Literacy Mini-Sessions",
    serviceSlug: "advocacy-community",
    category: "Advocacy",
    date: "11 Feb 2026",
    summary: "Short-format public sessions translating complex policy concepts into clear action-oriented guidance.",
    challenge: "Policy information was often perceived as inaccessible.",
    approach: "Designed bite-sized sessions focused on one concept at a time with practical examples and open Q&A.",
    outcomes: [
      "Higher accessibility of policy topics.",
      "Improved session completion and participation.",
      "Reusable session format for future campaigns."
    ],
    tags: ["Policy", "Advocacy", "Education"],
    image: images.mitraSmart,
    gallery: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aef1e7625?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "local-sustainability-challenge",
    title: "Local Sustainability Challenge",
    serviceSlug: "advocacy-community",
    category: "Sustainability",
    date: "17 Dec 2025",
    summary: "Community challenge model encouraging participants to submit and test practical sustainability ideas.",
    challenge: "Many ideas were shared informally but rarely documented or tested.",
    approach: "Created a challenge structure with clear criteria, submission format, and lightweight mentoring checkpoints.",
    outcomes: [
      "Increased participation in sustainability initiatives.",
      "Better quality of documented project proposals.",
      "Clearer path from idea to pilot concept."
    ],
    tags: ["Sustainability", "Community Challenge", "Innovation"],
    image: images.eduConnect,
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1500829242034-e6a0de0c6aee?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1416339426682-caa3a2640c1b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1442850473887-3c39d36b9e94?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "issue-hive-awarded-3rd-prize-at-kist-fair-2082",
    title: "Issue Hive - Awarded 3rd Prize at KIST Fair 2082",
    serviceSlug: "tech-projects",
    category: "Campus Innovation",
    date: "Feb 2026",
    summary: "A campus reporting platform where students can raise, support, and track issues — built for visibility and won 3rd Prize at KIST Fair 2082.",
    challenge: "Campus concerns were easy to raise informally but difficult to track, prioritize, and resolve in a visible way.",
    approach: "Designed a minimal student-first reporting flow with community moderation, issue visibility, and simple status tracking.",
    outcomes: [
      "Won 3rd Prize at KIST Fair 2082.",
      "Created a clearer path for students to raise and follow campus issues.",
      "Established a lightweight model for transparent community moderation."
    ],
    tags: ["Campus Innovation", "Community", "Student Platform"],
    image: issueHiveHeroImage,
    gallery: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1509062522246-d23e4e59e61c?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1531945086322-65f4b0f0c2e1?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=960&h=640&fit=crop&auto=format&q=80",
    ]
  },
  {
    slug: "university-fit-engine",
    title: "University Fit Engine",
    serviceSlug: "tech-projects",
    category: "AI",
    date: "20 Feb 2025",
    summary: "Recommendation model concept to match student profiles with suitable university options.",
    challenge: "Prospective students needed clearer, data-backed guidance for shortlisting institutions.",
    approach: "Designed profile-based matching logic with transparent criteria and explainable fit factors.",
    outcomes: [
      "Improved relevance of suggested options.",
      "More structured decision-making experience.",
      "Prototype-ready matching framework."
    ],
    tags: ["AI", "Recommendation", "Education Tech"],
    image: images.eduConnect,
    gallery: [
      "https://images.unsplash.com/photo-1580582932707-520aef1e7625?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1509062522246-d23e4e59e61c?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "ai-hiring-assessment-flow",
    title: "AI Hiring Assessment Flow",
    serviceSlug: "tech-projects",
    category: "AI",
    date: "16 Apr 2025",
    summary: "Prompt-assisted recruitment flow concept for role-based screening and ranked candidate shortlisting.",
    challenge: "Small teams needed a quicker and more consistent first-pass assessment process.",
    approach: "Built a modular flow for criteria-based prompts, score normalization, and reviewer-friendly summaries.",
    outcomes: [
      "Faster initial evaluation cycle.",
      "Improved screening consistency across reviewers.",
      "Reusable model for role-specific hiring tracks."
    ],
    tags: ["AI", "HR Tech", "Assessment"],
    image: images.devBus,
    gallery: [
      "https://images.unsplash.com/photo-1534972195531-d236584f74d8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504868584819-0a05a73e4dc8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "ngo-volunteer-management",
    title: "NGO Volunteer Management",
    serviceSlug: "tech-projects",
    category: "Web Platform",
    date: "04 Oct 2024",
    summary: "A platform concept that connects NGOs with volunteers — handling event publishing, role matching, and basic stipend tracking.",
    challenge: "Volunteer coordination and event communication were fragmented across tools.",
    approach: "Created an integrated flow for role matching, event lifecycle updates, and basic stipend status visibility.",
    outcomes: [
      "Improved volunteer-event fit in test scenarios.",
      "Reduced coordination overhead for organizers.",
      "Clear path for phased product expansion."
    ],
    tags: ["Web Platform", "NGO", "Volunteer Ops"],
    image: images.volunteerPlatform,
    gallery: [
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1531482615286-7188771f0a3d?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1506869640319-fe1a20fd4ca2?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1517457373958-bac9ebd2f4e8?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "cloud-community-toolkit",
    title: "Cloud Community Toolkit",
    serviceSlug: "tech-projects",
    category: "Hackathon",
    date: "09 Jul 2025",
    summary: "Toolkit and support assets for technical workshops and community learning sessions.",
    challenge: "Workshop resources were scattered, making facilitator handover difficult.",
    approach: "Centralized templates, session checklists, and documentation patterns into a reusable kit.",
    outcomes: [
      "Faster workshop setup for new facilitators.",
      "Improved consistency of participant experience.",
      "Better documentation quality across sessions."
    ],
    tags: ["Cloud", "Community", "Workshop"],
    image: netImages.techCloud,
    sourceHref: "https://aws.amazon.com",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1534972195531-d236584f74d8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "impact-program-microsite",
    title: "Impact Program Microsite",
    serviceSlug: "tech-projects",
    category: "Web Platform",
    date: "27 Mar 2026",
    summary: "Fast microsite prototype for social initiative updates, onboarding guidance, and program visibility.",
    challenge: "Program communication lacked a single trusted destination.",
    approach: "Built a concise information architecture with high-priority updates, onboarding steps, and clear calls to action.",
    outcomes: [
      "Improved discoverability of key program information.",
      "Better onboarding clarity for new participants.",
      "Reduced repetitive admin inquiries."
    ],
    tags: ["Microsite", "Information Design", "Community"],
    image: netImages.webDev,
    sourceHref: "https://www.facebook.com/allinfoundationnp/",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504868584819-0a05a73e4dc8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1509062522246-d23e4e59e61c?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "digital-rights-resource-portal",
    title: "Digital Rights Resource Portal",
    serviceSlug: "tech-projects",
    category: "Civic Tech",
    date: "06 Feb 2026",
    summary: "Knowledge portal concept for making internet governance and rights resources easier to navigate.",
    challenge: "Reference materials existed, but users struggled to find contextual and actionable content.",
    approach: "Organized resources by intent and difficulty level, then added simple navigation pathways for newcomers.",
    outcomes: [
      "Improved usability of rights-related resources.",
      "Higher clarity for first-time learners.",
      "Scalable structure for future content additions."
    ],
    tags: ["Civic Tech", "Knowledge Portal", "Digital Rights"],
    image: netImages.digitalRights,
    sourceHref: "https://netmission.asia",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-db01c2d7e43c?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  },
  {
    slug: "sustainability-idea-sandbox",
    title: "Sustainability Idea Sandbox",
    serviceSlug: "tech-projects",
    category: "Hackathon",
    date: "30 Dec 2025",
    summary: "Interactive concept space for experimenting with and refining sustainable business hypotheses.",
    challenge: "Early sustainability ideas needed a safer environment for rapid testing and iteration.",
    approach: "Created a sandbox model with hypothesis cards, quick feedback loops, and iteration checkpoints.",
    outcomes: [
      "Faster concept validation cycles.",
      "Better documentation of assumptions and learnings.",
      "Improved readiness for pilot execution."
    ],
    tags: ["Sustainability", "Innovation", "Prototyping"],
    image: netImages.greenInnovation,
    sourceHref: "https://sustainability.com.np/",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1442850473887-3c39d36b9e94?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1500829242034-e6a0de0c6aee?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1561070791-2526f30ee1b4?w=960&h=640&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=960&h=640&fit=crop&auto=format&q=80",
    ],
  }
];

const projectDetailBySlug = new Map(projectDetails.map((project) => [project.slug, project]));
const projectSlugByTitle = new Map(projectDetails.map((project) => [project.title, project.slug]));

export const getProjectBySlug = (slug: string) => projectDetailBySlug.get(slug);
export const getProjectSlugByTitle = (title: string) => projectSlugByTitle.get(title);
