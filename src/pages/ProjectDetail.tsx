import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
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

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [activeSlide, setActiveSlide] = useState(0);

  const gallery = useMemo(() => {
    if (!project) {
      return [];
    }

    return [
      {
        key: "overview",
        label: "Overview",
        caption: project.summary,
      },
      {
        key: "challenge",
        label: "Challenge",
        caption: project.challenge,
      },
      {
        key: "approach",
        label: "Approach",
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

  useEffect(() => {
    setActiveSlide(0);
  }, [project?.slug]);

  if (!project) {
    return <Navigate to="/tech-projects" replace />;
  }

  const currentPanel = gallery[activeSlide] ?? gallery[0];

  return (
    <div className="min-h-screen bg-[#e7e3da]">
      <ScrollProgressBar />
      <main className="mx-auto max-w-[78rem] px-4 pb-20 pt-10 font-rajdhani sm:px-7 md:px-12 md:pt-12">
        <section>
          <Link
            to={`/${project.serviceSlug}`}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.52em] text-[#15130f] transition-colors hover:text-[#1DA1F2]"
          >
            <span aria-hidden="true">&lt;</span>
            <span aria-hidden="true">-</span>
            <span>Back</span>
          </Link>

          <div className="relative mt-6 min-h-[82vh] border border-transparent bg-[#e7e3da]">
            <div className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto w-full max-w-[42rem] px-4">
              <div className="mx-auto overflow-hidden border border-[#cfb859]/35 bg-[#d8d2c6]/35 p-1">
                <img
                  src={project.image}
                  alt={`${project.title} project preview image`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1200}
                  height={630}
                  sizes="(max-width: 768px) 90vw, 640px"
                  className="h-[170px] w-full object-cover opacity-25 saturate-50 sm:h-[220px]"
                />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[34rem] px-2 sm:px-0">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {gallery.map((panel, index) => (
                <button
                  key={panel.key}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`group border border-[#c49300] bg-[#f5b400] p-2 text-left transition-colors ${
                    activeSlide === index ? "border-[#12110f]" : "border-[#c49300] hover:border-[#12110f]"
                  }`}
                  aria-label={`Show ${panel.label} visual`}
                >
                  <div className="overflow-hidden border border-[#2e2a21]">
                    <img
                      src={project.image}
                      alt={`${panel.label} thumbnail for ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      width={320}
                      height={180}
                      sizes="(max-width: 640px) 30vw, 180px"
                      className="h-14 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-20"
                    />
                  </div>
                  <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-[#12110f] sm:text-xs">Image</p>
                </button>
              ))}
              </div>

              <div className="mx-auto mt-8 flex max-w-[22rem] flex-col items-center pb-2">
                <div className="h-[4px] w-full bg-[#13110d]" />
                <div className="mt-4 flex items-center gap-3">
                {gallery.map((panel, index) => (
                  <button
                    key={`${panel.key}-dot`}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-6 w-6 border border-[#c49300] bg-[#f5b400] transition-colors hover:border-[#12110f] ${
                      activeSlide === index ? "border-[#12110f]" : "border-[#c49300]"
                    }`}
                    aria-label={`Go to ${panel.label}`}
                  />
                ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-[34rem] px-1 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A3A30]">{currentPanel?.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#3f3932]">{currentPanel?.caption}</p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ProjectDetail;
