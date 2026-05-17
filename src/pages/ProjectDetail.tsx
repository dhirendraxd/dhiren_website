import { useEffect, useMemo, useRef, useState } from "react";
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
  const [currentImage, setCurrentImage] = useState<string>(project?.image || "");
  const thumbnails: string[] = (() => {
    if (!project) return [];
    const g = (project as unknown as { gallery?: unknown }).gallery;
    if (Array.isArray(g)) return g.filter(Boolean) as string[];
    return [project.image].filter(Boolean) as string[];
  })();
  const thumbsRef = useRef<HTMLDivElement | null>(null);

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
  const analyticsStats = [
    {
      label: "Outcomes",
      value: `${String(project.outcomes.length).padStart(2, "0")}`,
      width: `${Math.min((project.outcomes.length / 3) * 100, 100)}%`,
    },
    {
      label: "Tags",
      value: `${String(tagPills.length).padStart(2, "0")}`,
      width: `${Math.min((tagPills.length / 5) * 100, 100)}%`,
    },
    {
      label: "Source",
      value: project.sourceHref ? "01" : "00",
      width: project.sourceHref ? "100%" : "34%",
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
            <div className="relative overflow-hidden">
              {thumbnails.length >= 3 ? (
                <div className="grid grid-cols-3 gap-4">
                  {thumbnails.slice(0, 3).map((t, i) => (
                    <button
                      key={t + i}
                      onClick={() => setCurrentImage(t)}
                      className="w-full h-[min(60vh,520px)] overflow-hidden rounded-sm border border-[#e9e1d6] p-0"
                    >
                      <img src={t} alt={`gallery-${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : (
                <img
                  src={currentImage || heroThumbnail}
                  alt={`${project.title} project preview image`}
                  loading="eager"
                  decoding="async"
                  width={1400}
                  height={900}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}

              {/* Thumbnails row */}
              <div
                ref={thumbsRef}
                role="tablist"
                aria-label="Project thumbnails"
                className="mt-4 flex gap-3"
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
                  setCurrentImage(btns[idx].getAttribute('data-src') || '');
                  e.preventDefault();
                }}
              >
                {(thumbnails.length ? thumbnails : [heroThumbnail]).map((t, idx) => (
                  <button
                    key={t + idx}
                    data-src={t}
                    data-selected={(currentImage || heroThumbnail) === t}
                    role="tab"
                    aria-selected={(currentImage || heroThumbnail) === t}
                    tabIndex={0}
                    onClick={() => setCurrentImage(t)}
                    aria-label={`Thumbnail ${idx + 1}`}
                    className={`h-16 w-24 overflow-hidden rounded-sm border p-0 focus:outline-none focus:ring-2 focus:ring-[#7A3A30] ${ (currentImage || heroThumbnail) === t ? 'border-[#7A3A30]' : 'border-[#d9d2c6]'}`}
                  >
                    <img src={t} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: concise content block with title, summary and details */}
            <aside className="lg:sticky lg:top-20 flex flex-col gap-8 self-start pr-8 max-w-[56rem]">
              <div className="pr-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7A3A30]">Selected Project</p>
                <h1 className="mt-2 text-[2.8rem] font-serif font-bold leading-[1.02] text-[#231d18] sm:text-[3.6rem]">{project.title}</h1>
                <p className="mt-4 max-w-[56ch] text-[1.02rem] leading-[1.7] text-[#554b41]">{project.summary}</p>
              </div>

              <div className="w-full border-l-2 border-[#e9e1d6] pl-6">
                <dl className="grid grid-cols-[8.5rem_1fr] gap-y-4 text-sm">
                  <dt className="text-[0.78rem] font-semibold uppercase text-[#6b6259]">Type</dt>
                  <dd className="text-[#231d18]">{project.category}</dd>

                  <dt className="text-[0.78rem] font-semibold uppercase text-[#6b6259]">Location</dt>
                  <dd className="text-[#231d18]">{project.serviceSlug === 'advocacy-community' ? 'Nepal' : 'Remote'}</dd>

                  <dt className="text-[0.78rem] font-semibold uppercase text-[#6b6259]">Completion Year</dt>
                  <dd className="text-[#231d18]">{(project.date.match(/\d{4}$/) || [project.date])[0]}</dd>

                  <dt className="text-[0.78rem] font-semibold uppercase text-[#6b6259]">Size</dt>
                  <dd className="text-[#231d18]">{project.category}</dd>

                  <dt className="text-[0.78rem] font-semibold uppercase text-[#6b6259]">Design Style</dt>
                  <dd className="text-[#231d18]">{project.tags.join(', ')}</dd>

                  <dt className="text-[0.78rem] font-semibold uppercase text-[#6b6259]">Client</dt>
                  <dd className="text-[#231d18]">{project.sourceHref ? new URL(project.sourceHref).hostname.replace('www.', '') : '—'}</dd>
                </dl>
              </div>

              {/* View source intentionally removed per design */}
            </aside>
          </section>
        </section>

        {/* Footer-only: nothing should render after social icons per design */}

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
                    .map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[#3f3932]"
                      >
                        <Icon size={20} />
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