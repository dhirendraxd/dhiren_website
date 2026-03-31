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
  image: string;
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
  governmentWorkflowAssistant: createAbstractIllustration(
    "Government Workflow Assistant",
    "Civic AI and guided form automation",
    {
      bgStart: "#e9d5ff",
      bgEnd: "#c4b5fd",
      accentA: "#6d28d9",
      accentB: "#4c1d95",
      text: "#2e1065",
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

const images = {
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

export const projectDetails: ProjectDetail[] = [
  {
    slug: "ctrlbits-digital-marketing",
    title: "CtrlBits : Digital Marketing",
    serviceSlug: "digital-marketing",
    category: "Digital Marketing",
    date: "16 Apr 2025",
    summary: "Integrated digital marketing execution for CtrlBits, combining SEO, SEM, social publishing, and campaign optimization to strengthen organic and paid performance.",
    challenge: "Marketing channels were active but not consistently aligned to one funnel, limiting compounding growth and clear reporting.",
    approach: "Built a unified monthly plan across keyword targeting, ad groups, social content themes, and performance dashboards with weekly optimization loops.",
    outcomes: [
      "Improved search visibility for core service pages.",
      "Standardized campaign reporting across SEO and paid channels.",
      "Established a repeatable process for content and ad iteration."
    ],
    tags: ["SEO", "SEM", "SMM", "PPC", "Analytics"],
    image: images.ctrlBits,
    sourceHref: "https://www.ctrlbits.com/"
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
    image: images.netMission,
    sourceHref: "https://netmission.asia"
  },
  {
    slug: "fellowship-community-labs",
    title: "Fellowship Community Labs",
    serviceSlug: "advocacy-community",
    category: "Community",
    date: "14 Mar 2026",
    summary: "Facilitated collaborative lab-style sessions for fellows to frame social problems and test practical intervention ideas.",
    challenge: "Participants had strong motivation but lacked a shared structure for ideation and validation.",
    approach: "Used guided facilitation with problem statements, quick field validation, and feedback rounds to sharpen project direction.",
    outcomes: [
      "Faster movement from ideas to pilot-ready concepts.",
      "Clearer collaboration roles inside fellowship teams.",
      "Documented lab workflow for reuse in later cycles."
    ],
    tags: ["Fellowship", "Facilitation", "Social Impact"],
    image: selectedProjectIllustrations.fellowshipCommunityLabs,
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
    image: images.rotaract,
    sourceHref: "https://rotary.org"
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
    image: images.sustainabilitySolutions,
    sourceHref: "https://sustainability.com.np/"
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
    image: images.awsCloudClub,
    sourceHref: "https://aws.amazon.com"
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
    image: images.volunteerPlatform
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
    image: images.mitraSmart
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
    image: images.eduConnect
  },
  {
    slug: "government-workflow-assistant",
    title: "Government Workflow Assistant",
    serviceSlug: "tech-projects",
    category: "Civic Tech",
    date: "13 Jan 2025",
    summary: "AI-assisted workflow concept for document checks and context-aware guidance during public form completion.",
    challenge: "Public-facing workflows were slow due to repeated document and form errors.",
    approach: "Built an assistant flow to validate document requirements early and guide users step-by-step through submission stages.",
    outcomes: [
      "Reduced common user errors in early prototypes.",
      "Faster completion path for first-time users.",
      "Clear architecture for future integration."
    ],
    tags: ["Civic Tech", "AI", "Workflow Automation"],
    image: selectedProjectIllustrations.governmentWorkflowAssistant
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
    image: images.eduConnect
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
    image: images.devBus
  },
  {
    slug: "ngo-volunteer-management",
    title: "NGO Volunteer Management",
    serviceSlug: "tech-projects",
    category: "Web Platform",
    date: "04 Oct 2024",
    summary: "Platform concept for NGO event publishing, volunteer matching, and stipend-support tracking.",
    challenge: "Volunteer coordination and event communication were fragmented across tools.",
    approach: "Created an integrated flow for role matching, event lifecycle updates, and basic stipend status visibility.",
    outcomes: [
      "Improved volunteer-event fit in test scenarios.",
      "Reduced coordination overhead for organizers.",
      "Clear path for phased product expansion."
    ],
    tags: ["Web Platform", "NGO", "Volunteer Ops"],
    image: selectedProjectIllustrations.ngoVolunteerManagement
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
    image: images.awsCloudClub,
    sourceHref: "https://aws.amazon.com"
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
    image: images.allInFoundation,
    sourceHref: "https://www.facebook.com/allinfoundationnp/"
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
    image: images.netMission,
    sourceHref: "https://netmission.asia"
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
    image: images.sustainabilitySolutions,
    sourceHref: "https://sustainability.com.np/"
  }
];

const projectDetailBySlug = new Map(projectDetails.map((project) => [project.slug, project]));
const projectSlugByTitle = new Map(projectDetails.map((project) => [project.title, project.slug]));

export const getProjectBySlug = (slug: string) => projectDetailBySlug.get(slug);
export const getProjectSlugByTitle = (title: string) => projectSlugByTitle.get(title);
