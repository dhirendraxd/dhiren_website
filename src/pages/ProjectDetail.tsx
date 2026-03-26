import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
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

const serviceLabelMap = {
  "digital-marketing": "Digital Marketing",
  "advocacy-community": "Advocacy & Community",
  "tech-projects": "Tech Projects",
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

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
    const previousTwitterTitle = getMetaTag('meta[name="twitter:title"]')?.getAttribute("content") || "";
    const previousTwitterDescription = getMetaTag('meta[name="twitter:description"]')?.getAttribute("content") || "";
    const previousCanonical = getCanonical()?.getAttribute("href") || "";

    const pageTitle = `${project.title} | Project Case Study | Dhirendra Singh Dhami`;
    document.title = pageTitle;

    upsertMetaTag('meta[name="description"]', { name: "description", content: project.summary });
    upsertMetaTag('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    upsertMetaTag('meta[property="og:description"]', { property: "og:description", content: project.summary });
    upsertMetaTag('meta[property="og:url"]', { property: "og:url", content: projectUrl });
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    upsertMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: project.summary });
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
      upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: previousTwitterTitle });
      upsertMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: previousTwitterDescription });
      upsertCanonical(previousCanonical || BASE_URL);
      document.getElementById(jsonLdId)?.remove();
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/services/tech-projects" replace />;
  }

  return (
    <div className="min-h-screen bg-card">
      <ScrollProgressBar />

      <main className="mx-auto max-w-[84rem] px-4 pb-16 pt-10 font-rajdhani sm:px-6 md:px-12 md:pt-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6e635b]"
        >
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/services/${project.serviceSlug}`} className="hover:text-foreground transition-colors">
            {serviceLabelMap[project.serviceSlug]}
          </Link>
          <span>/</span>
          <span className="text-[#7A3A30]">{project.title}</span>
        </nav>

        <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[#7A3A30]">{project.category}</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">{project.title}</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{project.summary}</p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex border border-[#d8cbc0] bg-[#f7f2eb] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-[#3f352f]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="pt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#6e635b]">Project Date: {project.date}</p>
          </div>

          <div className="overflow-hidden border border-[#ddd2c8] bg-[#ede2d6] p-2">
            <img src={project.image} alt={project.title} className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px]" />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="border border-[#ddd2c8] bg-[#faf5ef] p-6">
            <h2 className="font-nekst text-2xl font-semibold tracking-tight text-[#1f1815]">Challenge</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#60564f]">{project.challenge}</p>
          </article>

          <article className="border border-[#ddd2c8] bg-[#faf5ef] p-6">
            <h2 className="font-nekst text-2xl font-semibold tracking-tight text-[#1f1815]">Approach</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#60564f]">{project.approach}</p>
          </article>
        </section>

        <section className="mt-8 border border-[#ddd2c8] bg-[#faf5ef] p-6">
          <h2 className="font-nekst text-2xl font-semibold tracking-tight text-[#1f1815]">Project Outcomes</h2>
          <ul className="mt-4 space-y-2">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="text-sm leading-relaxed text-[#60564f]">- {outcome}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to={`/services/${project.serviceSlug}`}
            className="inline-flex items-center justify-center border border-[#1f1815] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1f1815] transition-colors hover:bg-[#7A3A30] hover:border-[#7A3A30] hover:text-[#f7f2eb]"
          >
            Back to Service Projects
          </Link>

          {project.sourceHref && (
            <a
              href={project.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-[#7A3A30] bg-[#7A3A30] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#f7f2eb] transition-opacity hover:opacity-90"
            >
              Visit Related Source
              <ArrowUpRight size={13} />
            </a>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
