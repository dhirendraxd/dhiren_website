import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { getProjectBySlug } from "@/data/projectDetails";

const BASE_URL = "https://dhirendrasinghdhami.com.np";

const socialLinks = [
  {
    href: "https://github.com/dhirendraxd",
    label: "GitHub",
    title: "GitHub",
    icon: FaGithub,
    color: "text-[#1f1f1f] hover:text-[#15120d]",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    title: "Instagram",
    icon: FaInstagram,
    color: "text-[#d33f68] hover:text-[#b63156]",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    title: "LinkedIn",
    icon: FaLinkedinIn,
    color: "text-[#0a66c2] hover:text-[#08539d]",
  },
];

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

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const navigate = useNavigate();
  const heroThumbnail = project?.image || "";

  const focusPanels = useMemo(() => {
    if (!project) {
      return [];
    }

    return [
      {
        label: "Professionalism",
        caption: project.summary,
      },
      {
        label: "Problem Solving",
        caption: project.challenge,
      },
      {
        label: "Execution",
        caption: project.approach,
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

  const tagPills = project.tags.slice(0, 5);
  const outcomes = project.outcomes.slice(0, 3);

  return (
    <div className="h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_30%),linear-gradient(180deg,#f7f3ec_0%,#e6ddcf_100%)] text-[#2d261f]">
      <ScrollProgressBar />
      <main className="mx-auto flex h-full max-w-[84rem] flex-col overflow-hidden px-4 py-4 font-rajdhani sm:px-6 sm:py-5 lg:px-10 lg:py-6">
        <section className="flex h-full min-h-0 flex-col overflow-hidden">
          <button
            onClick={() => navigate(-1)}
            className="group mt-1 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.24em] text-[#3f3932] transition-colors hover:text-[#7A3A30] sm:mt-2"
          >
            <span aria-hidden="true" className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span className="border-b border-transparent leading-none transition-colors group-hover:border-[#7A3A30]">Back</span>
          </button>

          <section className="mt-4 grid flex-1 min-h-0 gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7A3A30]">
                  Project overview
                </p>
                <h1 className="max-w-[30rem] text-[2rem] font-bold leading-[1.05] text-[#231d18] sm:text-[2.55rem] lg:text-[3.35rem]">
                  {project.title}
                </h1>
                <p className="max-w-[31rem] text-[0.96rem] leading-relaxed text-[#554b41] sm:text-[1rem] lg:text-[1.08rem]">
                  {project.summary}
                </p>
              </div>

              <div className="relative w-full max-w-[34rem]">
                <img
                  src={heroThumbnail}
                  alt={`${project.title} project preview image`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1200}
                  height={630}
                  className="h-[13rem] w-full object-contain sm:h-[16rem] lg:h-[18rem]"
                />
              </div>

              <div className="space-y-3 max-w-[34rem]">
                <p className="text-[0.92rem] leading-relaxed text-[#5f574d] sm:text-[0.97rem] lg:text-[1rem]">
                  This project was about {project.challenge.toLowerCase()} It focused on {project.approach.toLowerCase()} The main result was {project.outcomes[0] || "high-impact delivery with clear ownership.".toLowerCase()}.
                </p>
                <p className="text-[0.92rem] leading-relaxed text-[#5f574d] sm:text-[0.97rem] lg:text-[1rem]">
                  In practice, the work brought together planning, communication, and delivery so the outcome felt practical, measurable, and directly useful for the people it was built for.
                </p>
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col gap-4 pt-1 sm:gap-5 sm:pt-2 lg:pt-4">
              <p className="text-center text-[1rem] leading-relaxed text-[#3d372f] sm:text-[1.1rem] lg:text-[1.3rem]">
                Click on different hats to see what I can do!
              </p>

              <div className="mx-auto grid max-w-[21.5rem] grid-cols-3 gap-2 sm:gap-2.5">
                {focusPanels.map((panel) => (
                  <div
                    key={panel.label}
                    className="flex h-[4.3rem] items-center justify-center p-0.5 sm:h-[4.65rem]"
                  >
                    <img
                      src={heroThumbnail}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>

              <div className="mx-auto max-w-[28rem] space-y-3">
                <div className="text-center">
                  <h2 className="text-[1.5rem] font-bold leading-tight text-[#25211b] sm:text-[1.8rem]">
                    Professionalism
                  </h2>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#5f574d] sm:text-[0.98rem]">
                    Maintain integrity, accountability, and respect.
                  </p>
                </div>

                <ul className="space-y-1.5 text-left text-[0.82rem] leading-relaxed text-[#5f574d] sm:text-[0.92rem]">
                  <li>Category: {project.category}</li>
                  <li>Timeline: {project.date}</li>
                  <li>Core focus: {tagPills.join(" • ")}</li>
                  <li>Key outcome: {project.outcomes[0] || "High-impact delivery with clear ownership."}</li>
                </ul>
              </div>

              <div className="mt-auto overflow-hidden lg:flex-1">
                <img
                  src={project.image}
                  alt={`${project.title} detail preview image`}
                  loading="eager"
                  decoding="async"
                  width={1200}
                  height={630}
                  className="h-[9rem] w-full object-cover sm:h-[11rem] lg:h-full"
                />
              </div>
            </div>
          </section>
        </section>

          <section className="mt-auto pt-4 sm:pt-5">
            <div className="mx-auto max-w-[50rem]">
              <div className="h-px w-full bg-[#8b8377]/80" />
              <div className="mt-3 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4 sm:gap-5">
                  {socialLinks.map(({ href, label, title, icon: Icon, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={title}
                      className={`group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 ${color}`}
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>

                {project.sourceHref ? (
                  <a
                    href={project.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border-b border-transparent pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4b4035] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
                  >
                    View source
                  </a>
                ) : null}
              </div>
            </div>
          </section>
      </main>
    </div>
  );
};

export default ProjectDetail;