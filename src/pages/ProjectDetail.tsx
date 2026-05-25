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
  const heroThumbnail = project?.image || "";
  const [currentImage, setCurrentImage] = useState<string>(project?.image || "");
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const thumbnails: string[] = (() => {
    if (!project) return [];
    const g = (project as unknown as { gallery?: unknown }).gallery;
    if (Array.isArray(g)) return g.filter(Boolean) as string[];
    return [project.image].filter(Boolean) as string[];
  })();
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const heroSwipeStartXRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const displayThumbs = (() => {
    // Use random placeholder images (picsum) seeded by project slug for variety.
    const seedBase = project?.slug || 'placeholder';
    const result: string[] = [];
    for (let i = 0; i < 4; i++) {
      // 720x480 keeps aspect similar to other thumbnails
      result.push(`https://picsum.photos/seed/${encodeURIComponent(seedBase + '-' + i)}/720/480`);
    }
    return result;
  })();
  const activeThumbIndex = displayThumbs.findIndex((s) => (s || heroThumbnail) === (currentImage || heroThumbnail));
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 8 });

  const goToImage = useCallback((nextImage: string, direction: 1 | -1 = 1) => {
    if (!nextImage || nextImage === (currentImage || heroThumbnail)) return;
    setSlideDirection(direction);
    setCurrentImage(nextImage);
  }, [currentImage, heroThumbnail]);

  useEffect(() => {
    const update = () => {
      const container = dotsRef.current;
      if (!container) return;
      const btns = Array.from(container.querySelectorAll<HTMLButtonElement>('button'));
      const btn = btns[activeThumbIndex];
      if (btn) {
        const cRect = container.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        const left = Math.round(bRect.left - cRect.left + (bRect.width - 8) / 2);
        setIndicatorStyle({ left, width: 8 });
      } else {
        setIndicatorStyle({ left: 0, width: 8 });
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeThumbIndex, displayThumbs]);

  useEffect(() => {
    if (!displayThumbs || displayThumbs.length <= 1) return;
    if (isPaused) return;

    const id = setInterval(() => {
      if (isDraggingRef.current) return;
      const idx = displayThumbs.findIndex((s) => (s || heroThumbnail) === (currentImage || heroThumbnail));
      const next = displayThumbs[(idx + 1) % displayThumbs.length] || heroThumbnail;
      goToImage(next, 1);
    }, 10000);

    return () => clearInterval(id);
  }, [displayThumbs, currentImage, heroThumbnail, isPaused, goToImage]);
 

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
    <div className="min-h-screen overflow-auto bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_30%),linear-gradient(180deg,#f7f3ec_0%,#e6ddcf_100%)] text-[#2d261f]">
      <ScrollProgressBar />
      <main className="mx-auto flex h-full max-w-[96rem] flex-col overflow-visible px-6 py-6 font-rajdhani sm:px-8 sm:py-6 lg:px-12 lg:py-8">
        <section className="flex h-full min-h-0 flex-col overflow-visible">
          <button
            onClick={() => navigate(-1)}
            className="group mt-4 mb-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.24em] text-[#3f3932] transition-colors hover:text-[#7A3A30] sm:mt-4"
          >
            <span aria-hidden="true" className="flex leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span className="border-b border-transparent leading-none transition-colors group-hover:border-[#7A3A30]">Back</span>
          </button>

          <section className="mt-10 grid flex-1 min-h-0 gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
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
                    const idx = displayThumbs.findIndex((s) => (s || heroThumbnail) === (currentImage || heroThumbnail));
                    if (deltaX > 0) {
                      const prev = displayThumbs[(idx - 1 + displayThumbs.length) % displayThumbs.length] || heroThumbnail;
                      goToImage(prev, -1);
                    } else {
                      const next = displayThumbs[(idx + 1) % displayThumbs.length] || heroThumbnail;
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
                    <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                      <motion.img
                        key={currentImage || heroThumbnail}
                        custom={slideDirection}
                        variants={{
                          enter: (direction: 1 | -1) => ({ x: direction > 0 ? '100%' : '-100%' }),
                          center: { x: 0 },
                          exit: (direction: 1 | -1) => ({ x: direction > 0 ? '-100%' : '100%' }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        src={currentImage || heroThumbnail}
                        alt={`${project.title} project preview image`}
                        loading="eager"
                        decoding="async"
                        width={1400}
                        height={900}
                        className="absolute inset-0 h-full w-full object-contain object-center"
                      />
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
                          const idx = displayThumbs.findIndex((s) => (s || heroThumbnail) === (currentImage || heroThumbnail));
                          const prev = displayThumbs[(idx - 1 + displayThumbs.length) % displayThumbs.length] || heroThumbnail;
                          goToImage(prev, -1);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center text-[#231d18] hover:bg-[rgba(0,0,0,0.06)] hover:text-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => {
                          const idx = displayThumbs.findIndex((s) => (s || heroThumbnail) === (currentImage || heroThumbnail));
                          const next = displayThumbs[(idx + 1) % displayThumbs.length] || heroThumbnail;
                          goToImage(next, 1);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center text-[#231d18] hover:bg-[rgba(0,0,0,0.06)] hover:text-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30]"
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

              {/* Dots: small indicators above thumbnails (match thumbnail count) */}
              <div className="mt-3 flex justify-center" role="tablist" aria-label="Thumbnail pages">
                <div className="flex items-center gap-2">
                      {displayThumbs.length > 1 && (
                        <div className="relative">
                          <div ref={dotsRef} className="flex items-center gap-2 px-1">
                            {displayThumbs.map((s, d) => {
                              const isSelected = (s || heroThumbnail) === (currentImage || heroThumbnail);
                              return (
                                <button
                                  key={d}
                                  className={
                                    "h-2 w-2 rounded-full transition-colors duration-200 shrink-0 " +
                                    (isSelected ? "bg-[#7A3A30]" : "bg-neutral-300 dark:bg-neutral-700")
                                  }
                                  aria-label={`Go to image ${d + 1}`}
                                  onClick={() => {
                                    if (isDraggingRef.current) return;
                                    const nextImage = s || heroThumbnail;
                                    const direction: 1 | -1 = d >= activeThumbIndex ? 1 : -1;
                                    goToImage(nextImage, direction);
                                  }}
                                />
                              );
                            })}
                          </div>
                          <span
                            aria-hidden
                            style={{
                              left: indicatorStyle.left,
                              width: indicatorStyle.width,
                            }}
                            className="pointer-events-none absolute top-0 h-2 rounded-full bg-[#7A3A30] transition-left duration-300 ease-in-out"
                          />
                        </div>
                      )}
                </div>
              </div>

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
                  const direction: 1 | -1 = idx >= activeThumbIndex ? 1 : -1;
                  goToImage(nextImage, direction);
                  e.preventDefault();
                }}
              >
                {displayThumbs.map((t, idx) => {
                  const isSelected = (currentImage || heroThumbnail) === t;
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
                        const direction: 1 | -1 = idx >= activeThumbIndex ? 1 : -1;
                        goToImage(t, direction);
                      }}
                      aria-label={`Thumbnail ${idx + 1}`}
                      className={`relative h-16 min-w-[5rem] sm:min-w-[6rem] sm:w-24 overflow-hidden p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] ${isSelected ? '' : 'opacity-60'} rounded-none bg-transparent border-l border-[#e9e1d6]/40 first:border-l-0 px-2`}
                    >
                      <div className="h-full w-full">
                        <img src={t || heroThumbnail} alt={project?.title ? `${project.title} thumbnail` : ''} loading="lazy" decoding="async" className="h-full w-full object-contain object-center" />
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

            {/* Right: concise content block with title, summary and details */}
            <aside className="lg:sticky lg:top-20 flex flex-col gap-8 self-start pr-0 lg:pr-8 max-w-[56rem]">
              <div className="pr-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7A3A30]">Selected Project</p>
                <h1 className="mt-2 text-[2.8rem] font-rajdhani font-bold leading-[1.02] text-[#231d18] sm:text-[3.6rem]">{project.title}</h1>
                <p className="mt-4 max-w-[56ch] text-[1.02rem] leading-[1.7] text-[#554b41]">{project.summary}</p>
              </div>

              <div className="w-full border-l-2 border-[#e9e1d6] pl-6 pb-6">
                <dl className="grid grid-cols-[10.5rem_1fr] gap-y-6 text-base">
                  <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">Type</dt>
                  <dd className="text-[1rem] leading-[1.8] text-[#231d18]">{project.category}</dd>

                  <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">Location</dt>
                  <dd className="text-[1rem] leading-[1.8] text-[#231d18]">{project.serviceSlug === 'advocacy-community' ? 'Nepal' : 'Remote'}</dd>

                  <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">Completion Year</dt>
                  <dd className="text-[1rem] leading-[1.8] text-[#231d18]">{(project.date.match(/\d{4}$/) || [project.date])[0]}</dd>

                  <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">Size</dt>
                  <dd className="text-[1rem] leading-[1.8] text-[#231d18]">{project.category}</dd>

                  <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">Design Style</dt>
                  <dd className="text-[1rem] leading-[1.8] text-[#231d18]">{project.tags.join(', ')}</dd>

                  <ProjectClient
                    sourceHref={project.sourceHref}
                    title={project.title}
                    showGithub={project.serviceSlug === 'tech-projects' || project.serviceSlug === 'digital-marketing'}
                  />
                </dl>
              </div>

              {/* View source intentionally removed per design */}
            </aside>
          </section>
        </section>

        {/* Footer-only: nothing should render after social icons per design */}

        <MeetTheTeam members={teamMembers} />

        <section className="mt-8 py-3 sm:py-4">
          <div className="mx-auto max-w-[88rem] px-6">
            <div className="border-t border-[#e4dbcf] pt-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-[44rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7A3A30]">Impact Snapshot</p>
                  <h2 className="mt-2 text-[1.6rem] font-rajdhani font-bold leading-tight text-[#231d18] sm:text-[2rem]">
                    A concise view of the project’s credibility
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f574d]">
                    Built only from the details already listed on this page.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[34rem] lg:grid-cols-4">
                  {impactSnapshot.map((item) => (
                    <div key={item.label} className="border-l border-[#e4dbcf] pl-3">
                      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#6b6259]">{item.label}</div>
                      <div className="mt-1 text-[1rem] font-rajdhani font-bold text-[#231d18]">{item.value}</div>
                      <div className="mt-1 text-[0.82rem] leading-relaxed text-[#675d52]">{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-sm text-[#4f453b]">
                {outcomes.slice(0, 3).map((outcome) => (
                  <span key={outcome} className="border border-[#e0d6c8] px-3 py-1.5 rounded-none bg-[#faf7f2]">
                    {outcome}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#6b6259]">
                Public source reference available when provided.
              </p>
            </div>
          </div>
        </section>

        {/* CTA: Have a project in mind? */}
        <section className="mt-8 py-12">
          <div className="mx-auto max-w-[88rem] px-6 text-center">
            <h2 className="mb-4 text-[2rem] font-rajdhani font-bold leading-tight text-[#231d18] sm:text-[2.8rem]">HAVE A PROJECT IN MIND?</h2>
            <p className="mx-auto mb-6 max-w-[68ch] text-[1rem] leading-relaxed text-[#5f574d]">Together, we can create something clear and impactful. Let’s collaborate to bring ideas to life in a way that resonates with everyone.</p>

            <div className="mb-6">
              <a
                href="#contact"
                className="group inline-block px-6 py-3 text-sm font-rajdhani font-semibold text-[#3f3932] underline underline-offset-4 decoration-[#cfc6bb] transition-colors"
              >
                <span className="group-hover:text-[#7A3A30] group-hover:decoration-[#7A3A30]">Contact Me</span>
                <span className="ml-2 inline-block opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[#7A3A30]">→</span>
              </a>
            </div>

            {/* social links intentionally removed from CTA box; placed under page footer line */}
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