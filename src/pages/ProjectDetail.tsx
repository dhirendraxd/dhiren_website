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
  const [activeSlide, setActiveSlide] = useState(0);
  const heroThumbnail = project ? homepageProjectThumbnails[project.slug] || project.image : "";

  const rolePanels = useMemo(() => {
    if (!project) {
      return [];
    }

    return [
      {
        key: "overview",
        hat: "🧢",
        label: "Professionalism",
        caption: project.summary,
      },
      {
        key: "challenge",
        hat: "🎩",
        label: "Problem Solving",
        caption: project.challenge,
      },
      {
        key: "approach",
        hat: "🎓",
        label: "Strategic Thinking",
        caption: project.approach,
      },
      {
        key: "outcomes",
        hat: "⛑️",
        label: "Execution",
        caption: project.outcomes.slice(0, 2).join(" "),
      },
      {
        key: "skills",
        hat: "🤠",
        label: "Adaptability",
        caption: `Worked across ${project.tags.slice(0, 3).join(", ")}.`,
      },
      {
        key: "timeline",
        hat: "👒",
        label: "Ownership",
        caption: `Delivered in ${project.date} with measurable accountability and consistency.`,
      },
    ];
  }, [project]);

  const activePanel = rolePanels[activeSlide] ?? rolePanels[0];

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

  useEffect(() => {
    setActiveSlide(0);
  }, [project?.slug]);

  if (!project) {
    return <Navigate to="/tech-projects" replace />;
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#e7e3da]">
      <ScrollProgressBar />
      <main className="mx-auto flex h-full max-w-[78rem] flex-col overflow-hidden px-4 pb-4 pt-4 font-rajdhani sm:px-7 md:px-12 md:pt-5">
        <section className="flex h-full min-h-0 flex-col">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-1 border-b border-transparent pb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#3f3932] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
          >
            <span aria-hidden="true" className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span className="leading-none">Back</span>
          </button>

          <div className="mt-3 grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-4">
            <div className="grid min-h-0 content-start gap-6 pt-1 lg:grid-cols-[1.08fr_1fr] lg:items-start lg:gap-12 lg:pt-3">
              <div className="space-y-4 sm:space-y-5 lg:pt-1">
                <h1 className="max-w-[31rem] text-[1.95rem] font-bold leading-tight text-[#2a251f] sm:text-[2.35rem] lg:text-[2.75rem]">
                  A good worker should be able to wear many hats...
                </h1>
                <p className="max-w-[31rem] text-[1rem] leading-relaxed text-[#6f675c] sm:text-[1.18rem] lg:text-[1.28rem]">
                  As a worker you will often need to adapt to different roles and responsibilities.
                </p>

                <div className="relative mt-4 hidden w-full max-w-[19rem] sm:block">
                  <img
                    src={heroThumbnail}
                    alt={`${project.title} project preview image`}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={1200}
                    height={630}
                    sizes="304px"
                    className="h-[9rem] w-full rounded-xl object-cover opacity-80 lg:h-[10rem]"
                  />
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-[#f8f6f0]/95 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#3f3932]">
                    Project Character
                  </div>
                </div>
              </div>

              <div className="space-y-4 lg:pt-1">
                <p className="text-center text-[1.25rem] leading-relaxed text-[#3d372f] sm:text-[1.55rem] lg:text-[1.7rem]">
                  Click on different hats to see what I can do!
                </p>

                <div className="mx-auto grid max-w-[20rem] grid-cols-3 gap-2.5 sm:gap-3">
                  {rolePanels.map((panel, index) => (
                    <button
                      key={panel.key}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`flex h-[4.35rem] items-center justify-center rounded-lg border-2 text-[2.15rem] transition-all duration-200 sm:h-[4.7rem] sm:text-[2.35rem] ${
                        activeSlide === index
                          ? "border-[#15120d] bg-[#fffdf8] shadow-[0_6px_16px_-10px_rgba(21,18,13,0.9)]"
                          : "border-[#d6cebf] bg-white/80 hover:-translate-y-0.5 hover:border-[#756d60]"
                      }`}
                      aria-label={`Show ${panel.label}`}
                    >
                      <span aria-hidden="true">{panel.hat}</span>
                    </button>
                  ))}
                </div>

                <div className="mx-auto max-w-[30rem] text-center">
                  <h2 className="text-[1.75rem] font-bold leading-tight text-[#25211b] sm:text-[2.05rem]">
                    {activePanel?.label}
                  </h2>
                  <p className="mt-2 line-clamp-4 text-[1rem] leading-relaxed text-[#5f574d] sm:text-[1.12rem]">
                    {activePanel?.caption}
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[56rem] text-[#4d463d]">
              <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
                <div className="space-y-2.5">
                <h3 className="text-[1.25rem] font-semibold leading-tight text-[#2e2923] sm:text-[1.45rem]">More About This Project</h3>
                <p className="line-clamp-3 text-[0.92rem] leading-relaxed sm:text-[1rem]">
                  This work sits at the intersection of planning, communication, and execution. The goal was to build outcomes
                  that were practical, measurable, and sustainable over time.
                </p>
                <p className="text-[0.9rem] leading-relaxed text-[#615a50] sm:text-[0.98rem]">
                  Category: {project.category} • Timeline: {project.date}
                </p>
              </div>

                <div className="space-y-2.5 border-[#c9c0b1]/70 md:border-l md:pl-6">
                <h4 className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#3b352d] sm:text-[0.95rem]">
                  Quick Snapshot
                </h4>
                <p className="line-clamp-1 text-[0.9rem] leading-relaxed text-[#615a50] sm:text-[0.98rem]">
                  Core focus: {project.tags.slice(0, 4).join(" • ")}
                </p>
                <p className="line-clamp-1 text-[0.9rem] leading-relaxed text-[#615a50] sm:text-[0.98rem]">
                  Key outcome: {project.outcomes[0] || "High-impact delivery with clear ownership."}
                </p>
                <p className="line-clamp-1 text-[0.9rem] leading-relaxed text-[#615a50] sm:text-[0.98rem]">
                  Approach: {project.approach.slice(0, 120)}...
                </p>
              </div>
            </div>

              <div className="mx-auto mt-3 w-full max-w-[44rem]">
                <div className="h-px w-full bg-[#8b8377]/70" />
                <div className="mt-3 flex items-center justify-center gap-5 sm:gap-7">
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
