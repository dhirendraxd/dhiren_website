import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectClient from '@/components/ProjectClient';
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MeetTheTeam from "@/components/MeetTheTeam";
import { getProjectBySlug } from "@/data/projectDetails";

const BASE_URL = "https://dhirendrasinghdhami.com.np";

const socialLinks = [
  {
    href: "https://github.com/dhirendraxd",
    label: "GitHub",
    title: "GitHub",
    icon: FaGithub,
    // Icon-only colors (uses group-hover on the parent anchor)
    color: "text-[#181717] group-hover:text-[#15120d]",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    title: "Instagram",
    icon: FaInstagram,
    color: "text-[#E4405F] group-hover:text-[#b63156]",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    title: "LinkedIn",
    icon: FaLinkedinIn,
    color: "text-[#0A66C2] group-hover:text-[#08539d]",
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
  const [currentImage, setCurrentImage] = useState<string>("");
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const displayThumbs = useMemo(() => {
    if (!project) return [];

    const g = (project as unknown as { gallery?: unknown }).gallery;
    const galleryImages = Array.isArray(g) ? (g.filter(Boolean) as string[]) : [];
    const uniqueGalleryImages = galleryImages.filter((image, index, arr) => arr.indexOf(image) === index);

    if (uniqueGalleryImages.length > 0) {
      return uniqueGalleryImages.slice(0, 5);
    }

    return project.image ? [project.image] : [];
  }, [project]);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const heroSwipeStartXRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const activeThumbIndex = displayThumbs.findIndex((s) => s === currentImage);
  const selectedThumbIndex = activeThumbIndex >= 0 ? activeThumbIndex : 0;

  const goToImage = useCallback((nextImage: string, direction: 1 | -1 = 1) => {
    if (!nextImage || nextImage === currentImage) return;
    setSlideDirection(direction);
    setCurrentImage(nextImage);
  }, [currentImage]);

  useEffect(() => {
    setCurrentImage((image) => {
      if (displayThumbs.includes(image)) return image;
      return displayThumbs[0] || "";
    });
  }, [displayThumbs]);


  useEffect(() => {
    if (!displayThumbs || displayThumbs.length <= 1) return;
    if (isPaused) return;

    const id = setInterval(() => {
      if (isDraggingRef.current) return;
      const idx = displayThumbs.findIndex((s) => s === currentImage);
      const next = displayThumbs[((idx >= 0 ? idx : 0) + 1) % displayThumbs.length];
      goToImage(next, 1);
    }, 10000);

    return () => clearInterval(id);
  }, [displayThumbs, currentImage, isPaused, goToImage]);
 

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
    return <Navigate to="/projects" replace />;
  }

  const tagPills = project.tags.slice(0, 5);
  const outcomes = project.outcomes.slice(0, 3);
  const impactSnapshot = [
    {
      label: "Documented outcomes",
      value: String(project.outcomes.length).padStart(2, "0"),
      note: "Captured from the project record",
    },
    {
      label: "Focus areas",
      value: String(project.tags.length).padStart(2, "0"),
      note: "Strategy, delivery, and reporting lenses",
    },
    {
      label: "Delivery scope",
      value: project.category,
      note: project.serviceSlug === "digital-marketing" ? "Marketing and performance work" : "Community and program work",
    },
    {
      label: "Reference",
      value: project.sourceHref ? "Public" : "Internal",
      note: project.sourceHref ? "Live source link available" : "No public link provided",
    },
  ];
  const teamMembers = [
    {
      name: "Michael Brown",
      role: "Product Lead",
      projectWork: "Led product strategy, stakeholder interviews and roadmap definition.",
      img: "https://picsum.photos/seed/michael/440/640",
    },
    {
      name: "Rahul Mehta",
      role: "Design Lead",
      projectWork: "Designed UX flows and visual system; ran usability tests and iterations.",
      img: "https://picsum.photos/seed/rahul/440/640",
    },
    {
      name: "Sophia Lee",
      role: "Community Manager",
      projectWork: "Led community outreach and onboarding; managed volunteer coordination.",
      img: "https://picsum.photos/seed/sophia/440/640",
    },
    {
      name: "Daniel Carter",
      role: "Developer",
      projectWork: "Implemented frontend components, performance optimizations and CI.",
      img: "https://picsum.photos/seed/daniel/720/480",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_30%),linear-gradient(180deg,#f7f3ec_0%,#e6ddcf_100%)] text-[#2d261f]">
      <ScrollProgressBar />
      <main className="mx-auto max-w-[96rem] flex flex-col px-6 py-6 font-rajdhani sm:px-8 sm:py-6 lg:px-12 lg:py-8">
        <section className="flex flex-col">
          <button
            onClick={() => navigate(-1)}
            className="group mt-4 mb-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.24em] text-[#3f3932] transition-colors hover:text-[#7A3A30] sm:mt-4"
          >
            <span aria-hidden="true" className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span className="border-b border-transparent leading-none transition-colors group-hover:border-[#7A3A30]">Back</span>
          </button>

          <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            {/* Left: large gallery / hero image */}
            <div className="relative overflow-visible">
              <div
                className="w-full h-[min(48vh,420px)] sm:h-[min(64vh,560px)] relative group flex items-center justify-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
                  heroSwipeStartXRef.current = e.clientX;
                  isDraggingRef.current = true;
                }}
                onPointerUp={(e: React.PointerEvent<HTMLDivElement>) => {
                  if (heroSwipeStartXRef.current == null) {
                    isDraggingRef.current = false;
                    return;
                  }

                  const deltaX = e.clientX - heroSwipeStartXRef.current;
                  const threshold = 40;

                  if (Math.abs(deltaX) >= threshold) {
                    const idx = displayThumbs.findIndex((s) => s === currentImage);
                    const safeIdx = idx >= 0 ? idx : 0;
                    if (deltaX > 0) {
                      const prev = displayThumbs[(safeIdx - 1 + displayThumbs.length) % displayThumbs.length];
                      goToImage(prev, -1);
                    } else {
                      const next = displayThumbs[(safeIdx + 1) % displayThumbs.length];
                      goToImage(next, 1);
                    }
                  }

                  heroSwipeStartXRef.current = null;
                  isDraggingRef.current = false;
                }}
                onPointerCancel={() => {
                  heroSwipeStartXRef.current = null;
                  isDraggingRef.current = false;
                }}
                style={{ touchAction: 'pan-y' }}
              >
                  <div className="relative h-full w-full overflow-hidden">
                    <AnimatePresence initial={false} custom={slideDirection}>
                      {currentImage && (
                        <motion.img
                          key={currentImage}
                          custom={slideDirection}
                          variants={{
                            enter: (direction: 1 | -1) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
                            center: { x: 0, opacity: 1 },
                            exit: (direction: 1 | -1) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
                          }}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                          src={currentImage}
                          alt={`${project.title} project preview image`}
                          loading="eager"
                          decoding="async"
                          width={1400}
                          height={900}
                          className="absolute inset-0 h-full w-full object-contain object-center"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {displayThumbs.length > 1 && (
                    <>
                      {/* subtle warm vignette overlays to improve arrow contrast */}
                      <div className="absolute left-0 top-0 h-full w-8 sm:w-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-[#7A3A30]/08 to-transparent" aria-hidden />
                      <div className="absolute right-0 top-0 h-full w-8 sm:w-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-l from-[#7A3A30]/08 to-transparent" aria-hidden />
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() => {
                          const idx = displayThumbs.findIndex((s) => s === currentImage);
                          const safeIdx = idx >= 0 ? idx : 0;
                          const prev = displayThumbs[(safeIdx - 1 + displayThumbs.length) % displayThumbs.length];
                          goToImage(prev, -1);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center text-[#3a3a3a] hover:bg-[rgba(0,0,0,0.06)] hover:text-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => {
                          const idx = displayThumbs.findIndex((s) => s === currentImage);
                          const safeIdx = idx >= 0 ? idx : 0;
                          const next = displayThumbs[(safeIdx + 1) % displayThumbs.length];
                          goToImage(next, 1);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center text-[#3a3a3a] hover:bg-[rgba(0,0,0,0.06)] hover:text-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
              </div>

              {/* subtle separator between main image and thumbnails */}
              <div className="mt-4 h-px w-full bg-[#e9e1d6]/50" aria-hidden="true" />

              {/* Dots: small indicators above thumbnails */}
              {displayThumbs.length > 1 && (
                <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Thumbnail pages">
                  {displayThumbs.map((s, d) => {
                    const isSelected = s === currentImage;
                    return (
                      <button
                        key={d}
                        aria-label={`Go to image ${d + 1}`}
                        aria-selected={isSelected}
                        onClick={() => {
                          if (isDraggingRef.current) return;
                          const direction: 1 | -1 = d >= selectedThumbIndex ? 1 : -1;
                          goToImage(s, direction);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ease-out shrink-0 ${
                          isSelected ? "w-5 bg-[#7A3A30]" : "w-1.5 bg-[#c8bdb4] hover:bg-[#a89f96]"
                        }`}
                      />
                    );
                  })}
                </div>
              )}

              {/* Thumbnails row (show up to 4 small images) */}
              <div
                ref={thumbsRef}
                role="tablist"
                aria-label="Project thumbnails"
                className="mt-4 flex gap-3 overflow-x-auto py-1 -mx-1"
                onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
                  startXRef.current = e.clientX;
                  isDraggingRef.current = false;
                }}
                onPointerMove={(e: React.PointerEvent<HTMLDivElement>) => {
                  if (startXRef.current == null) return;
                  const cx = e.clientX;
                  if (Math.abs(cx - startXRef.current) > 6) {
                    isDraggingRef.current = true;
                  }
                }}
                onPointerUp={() => {
                  startXRef.current = null;
                  // small delay to ensure click event settles
                  setTimeout(() => (isDraggingRef.current = false), 0);
                }}
                onKeyDown={(e) => {
                  const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
                  if (!keys.includes(e.key)) return;
                  const btns = Array.from(thumbsRef.current?.querySelectorAll<HTMLButtonElement>('button') || []);
                  if (!btns.length) return;
                  const active = document.activeElement as HTMLElement | null;
                  let idx = btns.findIndex((b) => b === active);
                  if (idx === -1) idx = btns.findIndex((b) => (b.getAttribute('data-selected') === 'true')) || 0;

                  if (e.key === 'ArrowLeft') idx = (idx - 1 + btns.length) % btns.length;
                  if (e.key === 'ArrowRight') idx = (idx + 1) % btns.length;
                  if (e.key === 'Home') idx = 0;
                  if (e.key === 'End') idx = btns.length - 1;

                  btns[idx].focus();
                  const nextImage = btns[idx].getAttribute('data-src') || '';
                  const direction: 1 | -1 = idx >= selectedThumbIndex ? 1 : -1;
                  goToImage(nextImage, direction);
                  e.preventDefault();
                }}
              >
                {displayThumbs.map((t, idx) => {
                  const isSelected = currentImage === t;
                  return (
                    <button
                      key={t + idx}
                      data-src={t}
                      data-selected={isSelected}
                      role="tab"
                      aria-selected={isSelected}
                      tabIndex={0}
                      onClick={(e) => {
                        if (isDraggingRef.current) {
                          e.preventDefault();
                          return;
                        }
                        const direction: 1 | -1 = idx >= selectedThumbIndex ? 1 : -1;
                        goToImage(t, direction);
                      }}
                      aria-label={`Thumbnail ${idx + 1}`}
                      className={`relative h-16 min-w-[5rem] sm:min-w-[6rem] sm:w-24 overflow-hidden p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] ${isSelected ? '' : 'opacity-60'} rounded-none bg-transparent border-l border-[#e9e1d6]/40 first:border-l-0 px-2`}
                    >
                      <div className="h-full w-full">
                        <img src={t} alt={project?.title ? `${project.title} thumbnail` : ''} loading="lazy" decoding="async" className="h-full w-full object-contain object-center" />
                      </div>
                      {/* Underline for selected thumbnail */}
                      <span
                        className={`absolute left-2 right-2 bottom-1 h-0.5 rounded-sm transition-all duration-200 ${isSelected ? 'bg-[#7A3A30] scale-x-100' : 'bg-transparent scale-x-0'}`}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: project info */}
            <aside className="lg:sticky lg:top-20 flex flex-col gap-5 self-start pr-0 lg:pr-8 max-w-[56rem]">

              {/* Title block */}
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7A3A30]">Selected Project</p>
                <h1 className="mt-1.5 font-rajdhani text-[2.4rem] font-bold leading-[1.05] text-[#3a3a3a] sm:text-[3rem]">{project.title}</h1>
                <p className="mt-3 text-[0.93rem] leading-[1.7] text-[#5f574d]">{project.summary}</p>
              </div>

              {/* Tags + meta in one compact row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {tagPills.map((tag) => (
                  <span key={tag} className="border border-[#e4dbcf] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#6b6259]">
                    {tag}
                  </span>
                ))}
                <span className="h-3 w-px bg-[#d4ccc4]" aria-hidden="true" />
                <span className="text-[0.78rem] text-[#6b6259]">
                  {project.serviceSlug === 'advocacy-community' ? 'Nepal' : 'Remote'} · {(project.date.match(/\d{4}$/) || [project.date])[0]}
                </span>
              </div>

              {/* Explore links */}
              <ProjectClient
                sourceHref={project.sourceHref}
                title={project.title}
                showGithub={project.serviceSlug === 'tech-projects' || project.serviceSlug === 'digital-marketing'}
              />

              {/* Key Outcomes */}
              {outcomes.length > 0 && (
                <div className="border-t border-[#e9e1d6] pt-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6b6259] mb-4">Key Outcomes</p>
                  <div>
                    {outcomes.map((o, i) => (
                      <div key={o} className="flex items-start gap-4 border-b border-[#e9e1d6] py-4 last:border-b-0">
                        <span className="shrink-0 font-mono text-[0.68rem] tabular-nums text-[#7A3A30] mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                        <p className="text-[0.95rem] leading-[1.65] text-[#3a332c]">{o}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </section>
        </section>

        {/* Footer-only: nothing should render after social icons per design */}

        <MeetTheTeam members={teamMembers} />

        

        {/* CTA: Have a project in mind? */}
        

        {/* FAQ */}
        <section className="mt-12 py-10">
          <div className="mx-auto max-w-[88rem] px-6">
            <div className="border-t border-[#e4dbcf] pt-10">

              {/* Header */}
              <div className="mb-6 flex flex-col items-center gap-1.5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7A3A30]">FAQ</p>
                <h3 className="font-rajdhani text-[1.9rem] font-bold text-[#3a3a3a] text-center leading-tight tracking-tight">
                  Your questions, clearly answered here
                </h3>
                <p className="max-w-[44ch] text-center text-[0.83rem] text-[#6b6259]">
                  Quick answers about working together, timelines, and pricing.
                </p>
              </div>

              {/* Accordion */}
              {(() => {
                const faqs = [
                  { q: "What types of projects have you completed in the past?", a: "I’ve worked across digital marketing, community programs, and tech projects—ranging from campaign execution and SEO to community labs and campus innovation platforms.", idx: 0 },
                  { q: "Do you provide a guarantee for your work?", a: "I offer clear deliverables and a revision plan; ongoing support and performance-based guarantees are scoped into retainers or special agreements as needed.", idx: 1 },
                  { q: "How do we collaborate and communicate?", a: "I adapt to your workflow—Slack, email, or regular calls. Weekly check-ins are recommended during active sprints and concise updates between milestones.", idx: 2 },
                  { q: "What are typical timelines and costs?", a: "Most projects fall between 4–12 weeks; costs depend on scope. I share a clear proposal with milestones and pricing during discovery.", idx: 3 },
                ];
                const [openIdx, setOpenIdx] = React.useState<number | null>(null);
                const cols = [[faqs[0], faqs[2]], [faqs[1], faqs[3]]];
                return (
                  <div className="mx-auto max-w-3xl flex items-start divide-x divide-[#e9e1d6]">
                    {cols.map((col, colIdx) => (
                      <div key={colIdx} className={`flex-1 min-w-0 ${colIdx === 0 ? "pr-6" : "pl-6"}`}>
                        {col.map(({ q, a, idx }) => (
                          <div key={q} className="border-t border-[#e9e1d6]">
                            <button
                              type="button"
                              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                              className="flex w-full items-center justify-between gap-4 py-4 text-left"
                            >
                              <span className="text-[0.88rem] font-semibold text-[#3a3a3a] transition-colors duration-200 hover:text-[#7A3A30]">
                                {q}
                              </span>
                              <span
                                className="shrink-0 text-base font-light text-[#7A3A30] select-none leading-none transition-transform duration-300"
                                style={{ transform: openIdx === idx ? "rotate(45deg)" : "rotate(0deg)" }}
                              >
                                +
                              </span>
                            </button>
                            <AnimatePresence initial={false}>
                              {openIdx === idx && (
                                <motion.div
                                  key="answer"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                                  className="overflow-hidden"
                                >
                                  <p className="pb-4 text-[0.84rem] leading-[1.72] text-[#5f574d]">{a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          </div>
        </section>

          <section className="mt-auto pt-4 sm:pt-5">
            <div className="mx-auto max-w-[50rem]">
              <div className="h-px w-full bg-[#8b8377]/80" />
              <div className="mt-3 flex flex-col items-center gap-3">
                <div className="flex items-center gap-6">
                  {socialLinks
                    .filter((s) => ["GitHub", "Instagram", "LinkedIn"].includes(s.label))
                    .map(({ href, label, icon: Icon, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-[#3f3932]"
                      >
                        <span className={`${color} transition-colors duration-200`}>
                          <Icon size={20} />
                        </span>
                        <span className="font-rajdhani hidden sm:inline">{label}</span>
                      </a>
                    ))}
                </div>

                {/* View source removed per design request */}
              </div>
            </div>
          </section>

        {/* Footer-only: no content below social icons */}
      </main>
    </div>
  );
};

export default ProjectDetail;
