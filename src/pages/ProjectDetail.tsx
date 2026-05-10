import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { getProjectBySlug } from "@/data/projectDetails";

const BASE_URL = "https://dhirendrasinghdhami.com.np";

const getMetaTag = (selector: string) => document.head.querySelector(selector) as HTMLMetaElement | null;

const upsertMetaTag = (selector: string, attrs: Record<string, string>) => {
  let tag = getMetaTag(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    tag?.setAttribute(key, value);
  });
};

const getCanonical = () => document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

const upsertCanonical = (href: string) => {
  let canonical = getCanonical();
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", href);
};

const homepageProjectThumbnails: Record<string, string> = {
  "fellowship-community-labs": new URL("@/assets/civic tech.webp", import.meta.url).href,
  "ngo-volunteer-management": new URL("@/assets/2nd new .webp", import.meta.url).href,
  "issue-hive-awarded-3rd-prize-at-kist-fair-2082": new URL("@/assets/issue hive .webp", import.meta.url).href,
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const navigate = useNavigate();
  const heroThumbnail = project ? homepageProjectThumbnails[project.slug] || project.image : "";
  const [selectedPanelIndex, setSelectedPanelIndex] = useState(0);

  const introTitle = project
    ? `${project.title}: from strategy to execution.`
    : "";

  const introSupport = project
    ? `In this ${project.category.toLowerCase()} project, the focus was on practical delivery, clear ownership, and measurable outcomes.`
    : "";

  const rightSideIntro = project
    ? `Project breakdown for ${project.title}`
    : "";

  const rolePanels = useMemo(() => {
    if (!project) {
      return [];
    }

    return [
      {
        key: "overview",
        thumbPosition: "center 20%",
        label: "Project Summary",
        caption: project.summary,
      },
      {
        key: "challenge",
        thumbPosition: "center 35%",
        label: "Challenge",
        caption: project.challenge,
      },
      {
        key: "approach",
        thumbPosition: "center 50%",
        label: "Approach",
        caption: project.approach,
      },
      {
        key: "outcomes",
        thumbPosition: "center 65%",
        label: "Outcomes",
        caption: project.outcomes.slice(0, 2).join(" "),
      },
      {
        key: "skills",
        thumbPosition: "center 80%",
        label: "Focus Areas",
        caption: `Worked across ${project.tags.slice(0, 3).join(", ")}.`,
      },
      {
        key: "timeline",
        thumbPosition: "center 92%",
        label: "Timeline",
        caption: `Delivered in ${project.date} with measurable accountability and consistency.`,
      },
    ];
  }, [project]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const projectUrl = `${BASE_URL}/projects/${project.slug}`;
    const previousTitle = document.title;
    const previousDescription = getMetaTag('meta[name="description"]')?.getAttribute("content") || "";
    const previousOgTitle = getMetaTag('meta[property="og:title"]')?.getAttribute("content") || "";
    const previousOgDescription = getMetaTag('meta[property="og:description"]')?.getAttribute("content") || "";
    const previousOgUrl = getMetaTag('meta[property="og:url"]')?.getAttribute("content") || "";
    const previousOgImage = getMetaTag('meta[property="og:image"]')?.getAttribute("content") || "";
    const previousOgImageAlt = getMetaTag('meta[property="og:image:alt"]')?.getAttribute("content") || "";
    const previousTwitterTitle = getMetaTag('meta[name="twitter:title"]')?.getAttribute("content") || "";
    const previousTwitterDescription = getMetaTag('meta[name="twitter:description"]')?.getAttribute("content") || "";
    const previousTwitterImage = getMetaTag('meta[name="twitter:image"]')?.getAttribute("content") || "";
    const previousTwitterImageAlt = getMetaTag('meta[name="twitter:image:alt"]')?.getAttribute("content") || "";
    const previousCanonical = getCanonical()?.getAttribute("href") || "";

    const pageTitle = `${project.title} | Project Case Study | Dhirendra Singh Dhami`;
    document.title = pageTitle;

    upsertMetaTag('meta[name="description"]', { name: "description", content: project.summary });
    upsertMetaTag('meta[property="og:type"]', { property: "og:type", content: "article" });
    upsertMetaTag('meta[property="og:site_name"]', { property: "og:site_name", content: "Dhirendra Singh Dhami Portfolio" });
    upsertMetaTag('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    upsertMetaTag('meta[property="og:description"]', { property: "og:description", content: project.summary });
    upsertMetaTag('meta[property="og:url"]', { property: "og:url", content: projectUrl });
    upsertMetaTag('meta[property="og:image"]', { property: "og:image", content: project.image });
    upsertMetaTag('meta[property="og:image:alt"]', { property: "og:image:alt", content: `${project.title} project preview image` });
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    upsertMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: project.summary });
    upsertMetaTag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMetaTag('meta[name="twitter:image"]', { name: "twitter:image", content: project.image });
    upsertMetaTag('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: `${project.title} project preview image` });
    upsertCanonical(projectUrl);

    const jsonLdId = "project-jsonld";
    const previousJsonLd = document.getElementById(jsonLdId);
    const script = document.createElement("script");
    script.id = jsonLdId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        headline: project.title,
        description: project.summary,
        datePublished: project.date,
        image: project.image,
        url: projectUrl,
        keywords: project.tags,
        author: {
          "@type": "Person",
          name: "Dhirendra Singh Dhami",
          url: BASE_URL,
        },
      },
      null,
      2,
    );
    previousJsonLd?.remove();
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      upsertMetaTag('meta[name="description"]', { name: "description", content: previousDescription });
      upsertMetaTag('meta[property="og:title"]', { property: "og:title", content: previousOgTitle });
      upsertMetaTag('meta[property="og:description"]', { property: "og:description", content: previousOgDescription });
      upsertMetaTag('meta[property="og:url"]', { property: "og:url", content: previousOgUrl });
      upsertMetaTag('meta[property="og:image"]', { property: "og:image", content: previousOgImage });
      upsertMetaTag('meta[property="og:image:alt"]', { property: "og:image:alt", content: previousOgImageAlt });
      upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: previousTwitterTitle });
      upsertMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: previousTwitterDescription });
      upsertMetaTag('meta[name="twitter:image"]', { name: "twitter:image", content: previousTwitterImage });
      upsertMetaTag('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: previousTwitterImageAlt });
      upsertCanonical(previousCanonical || BASE_URL);
      document.getElementById(jsonLdId)?.remove();
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/tech-projects" replace />;
  }

  return (
    <div className="h-screen overflow-hidden bg-[#e7e3da]">
      <ScrollProgressBar />
      <main className="mx-auto h-full max-w-[86rem] px-4 pb-7 pt-8 font-rajdhani sm:px-7 md:px-12 md:pt-10">
        <section className="flex h-full min-h-0 flex-col">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-1 border-b border-transparent pb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#3f3932] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
          >
            <span aria-hidden="true" className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span className="leading-none">Back</span>
          </button>

          <div className="mt-5 flex min-h-0 flex-1 flex-col justify-between gap-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.18fr_1fr] lg:gap-12">
              <div className="mx-auto flex w-full max-w-[38rem] flex-col justify-center gap-6 sm:gap-7 lg:mx-0">
                <h1 className="max-w-[34rem] text-[1.95rem] font-bold leading-tight text-[#2a251f] sm:text-[2.3rem] lg:text-[2.55rem]">
                  {introTitle}
                </h1>
                <p className="max-w-[34rem] text-[1.2rem] leading-relaxed text-[#6a6257] sm:text-[1.34rem] lg:text-[1.45rem]">
                  {introSupport}
                </p>

                <div className="relative w-full max-w-[30rem] pt-1 sm:max-w-[32rem]">
                   <img
                     src={heroThumbnail}
                     alt={`${project.title} project preview image`}
                     loading="eager"
                     fetchPriority="high"
                     decoding="async"
                     width={1200}
                     height={630}
                     sizes="(max-width: 768px) 94vw, 520px"
                     className="h-[19.2rem] w-full rounded-xl object-cover opacity-80 sm:h-[21rem]"
                     style={{ objectPosition: rolePanels[selectedPanelIndex]?.thumbPosition || "center" }}
                  />
                  <div className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-[#f8f6f0]/95 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#3f3932]">
                    {rolePanels[selectedPanelIndex]?.label || "Project Preview"}
                  </div>
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[30rem] flex-col justify-center gap-6">
                <p className="text-center text-[1.35rem] leading-relaxed text-[#3d372f] sm:text-[1.7rem]">
                  {rightSideIntro}
                </p>

                <div className="mx-auto grid max-w-[26rem] grid-cols-3 gap-1.5">
                  {rolePanels.map((panel, index) => (
                    <button
                      key={panel.key}
                      onClick={() => setSelectedPanelIndex(index)}
                      className={`group overflow-hidden border transition-all duration-200 ${
                        index === selectedPanelIndex
                          ? "border-[#15120d] border-2 ring-2 ring-[#7A3A30] ring-offset-1"
                          : "border border-[#d6cebf] hover:border-[#7A3A30]"
                      } cursor-pointer bg-white/75`}
                      aria-label={`View ${panel.label}`}
                      type="button"
                    >
                      <img
                        src={heroThumbnail}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={180}
                        height={120}
                        className="h-[7rem] w-full object-cover"
                        style={{ objectPosition: panel.thumbPosition }}
                      />
                    </button>
                  ))}
                </div>

                <div className="mx-auto max-w-[28rem] text-center">
                  <div className="min-h-[9rem]">
                    <h2 className="text-[1.85rem] font-bold leading-tight text-[#25211b] sm:text-[2.1rem]">
                      {rolePanels[selectedPanelIndex]?.label}
                    </h2>
                    <p className="mt-2 text-[1.06rem] leading-relaxed text-[#5f574d] sm:text-[1.2rem]">
                      {rolePanels[selectedPanelIndex]?.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[70rem] text-[#4d463d]">
              <div className="grid items-start gap-10 px-2 sm:px-4 md:grid-cols-[1fr_1fr] md:gap-10 lg:gap-12 lg:px-8">
              <div className="flex flex-col gap-4 pr-5 sm:pr-6 md:pr-5 lg:pr-6 sm:gap-5">
                <h3 className="text-[1.35rem] font-semibold leading-tight text-[#2e2923] sm:text-[1.55rem]">More About This Project</h3>
                <p className="text-[1rem] leading-relaxed sm:text-[1.08rem]">
                  {project.summary}
                </p>
                <p className="text-[0.98rem] leading-relaxed text-[#615a50] sm:text-[1.04rem]">
                  Category: {project.category} • Timeline: {project.date}
                </p>
                <p className="text-[0.98rem] leading-relaxed text-[#615a50] sm:text-[1.04rem]">
                  Key challenge: {project.challenge}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-[1.35rem] font-semibold leading-tight text-[#3b352d] sm:text-[1.55rem]">
                    Project Metrics
                  </h4>
                </div>

                <div className="grid grid-cols-[1fr_1.2fr] gap-6 items-start">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[120px] h-[120px]">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e7e3da" strokeWidth="8" />
                        <circle 
                          cx="60" 
                          cy="60" 
                          r="50" 
                          fill="none" 
                          stroke="#7A3A30" 
                          strokeWidth="8" 
                          strokeDasharray={`${(83 / 100) * 314} 314`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[1.5rem] font-bold text-[#7A3A30]">83%</span>
                        <span className="text-[0.7rem] font-medium text-[#5f574d]">Overall</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[0.9rem] font-medium text-[#3b352d]">Impact</span>
                        <span className="text-[0.85rem] font-semibold text-[#7A3A30]">85%</span>
                      </div>
                      <div className="h-2 bg-[#e7e3da] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7A3A30]" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[0.9rem] font-medium text-[#3b352d]">Execution</span>
                        <span className="text-[0.85rem] font-semibold text-[#7A3A30]">90%</span>
                      </div>
                      <div className="h-2 bg-[#e7e3da] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7A3A30]" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#d6cebf]/50 pt-5">
                  <p className="text-[0.9rem] leading-relaxed text-[#5f574d]">
                    <span className="font-semibold text-[#3b352d]">Focus:</span> {project.tags.slice(0, 3).join(" • ")}
                  </p>
                </div>
              </div>
            </div>

              <div className="mt-5 flex justify-center">
                <div className="h-px w-[85%] max-w-[50rem] bg-[#999999]/50" />
              </div>
              <div className="mt-4 flex items-center justify-center gap-5 sm:gap-7">
              <a
                href={project.sourceHref || "https://github.com/dhirendraxd"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="group inline-flex items-center justify-center text-[#1f1f1f] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#15120d]"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="group inline-flex items-center justify-center text-[#d33f68] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#b63156]"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="group inline-flex items-center justify-center text-[#0a66c2] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#08539d]"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
