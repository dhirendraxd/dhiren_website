import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Seo from "@/components/Seo";
import { assetPath } from "@/lib/assetPath";
import { getRelevantExperiences } from "@/data/affiliations";

const profileImage = assetPath("untitled-design.webp");

const stats = [
  { value: "100%", label: "Client Satisfaction" },
  { value: "+10",  label: "Projects Shipped"    },
  { value: "500+", label: "Community Reach"     },
];

const expertise = [
  { label: "SEO",                icon: "/optimized_images/digital-marketing-icons/seo-search-symbol.webp"      },
  { label: "Social Media",       icon: "/optimized_images/digital-marketing-icons/social-media-marketing.webp" },
  { label: "Content Strategy",   icon: "/optimized_images/digital-marketing-icons/content-creation.webp"      },
  { label: "PPC & Paid Ads",     icon: "/optimized_images/digital-marketing-icons/ppc.webp"                   },
  { label: "Graphic Design",     icon: "/optimized_images/digital-marketing-icons/graphic-design.webp"        },
  { label: "Community Building", icon: "/optimized_images/digital-marketing-icons/community.webp"             },
];

const orgs = ["Ctrl Bits", "Paramendo Nepal", "ALL In Foundation", "Sustainability Solutions"];

const projects = [
  {
    title:   "Fellowship Community Labs",
    type:    "Community",
    summary: "Fellowship initiatives for collaborative social impact across communities.",
    image:   assetPath("civic-tech.webp"),
    href:    "/projects/fellowship-community-labs",
  },
  {
    title:   "NGO Volunteer Management",
    type:    "Tech",
    summary: "Volunteer platform design for NGOs and youth programs.",
    image:   assetPath("2nd-new.webp"),
    href:    "/projects/ngo-volunteer-management",
  },
  {
    title:   "Issue Hive — 3rd Prize KIST Fair",
    type:    "Tech",
    summary: "Civic issue tracker that won 3rd prize at KIST Science Fair 2082.",
    image:   assetPath("issue-hive-thumb.webp"),
    href:    "/projects/issue-hive-awarded-3rd-prize-at-kist-fair-2082",
  },
];

const testimonials = [
  {
    quote: "Dhiren was a real pleasure to work with. He doesn't just execute — he genuinely cares about the impact and pushes the work to be better. Definitely the kind of person you can trust with a project from start to finish. Great services & Recommended!",
    name:  "Team Lead",
    role:  "ALL In Foundation",
  },
  {
    quote: "Working with Dhiren was smooth from start to finish. His ability to connect community goals with digital strategy made a real difference. Great collaborator and highly reliable.",
    name:  "Program Manager",
    role:  "Sustainability Solutions",
  },
];

const gridImages = [
  assetPath("civic-tech.webp"),
  assetPath("2nd-new.webp"),
  assetPath("issue-hive.webp"),
  assetPath("reference-image.webp"),
];

const Divider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e9e1d6] to-transparent" />
);

const SectionLabel = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className="h-px w-5 bg-[#7A3A30]" aria-hidden="true" />
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7A3A30]">{label}</p>
  </div>
);

const About = () => {
  const experiences = getRelevantExperiences();
  const mid     = Math.ceil(experiences.length / 2);
  const expCols = [experiences.slice(0, mid), experiences.slice(mid)];
  const [quoteIdx, setQuoteIdx] = useState(0);
  const prev = () => setQuoteIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setQuoteIdx((i) => (i + 1) % testimonials.length);

  return (
    <div className="min-h-screen bg-[#f5f1eb] font-rajdhani">
      <Seo
        title="About Dhirendra Singh Dhami | SEO & Digital Marketing Expert in Nepal"
        description="Learn about Dhirendra Singh Dhami’s background in SEO, digital marketing, community advocacy, and civic-tech projects rooted in Nepal."
        canonicalPath="/about"
        image={profileImage}
        imageAlt="Portrait of Dhirendra Singh Dhami"
        type="profile"
        keywords={["about Dhirendra Singh Dhami", "SEO expert Nepal", "digital marketer Nepal", "youth advocate", "civic tech", "portfolio"]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dhirendra Singh Dhami",
            "alternateName": "Dhiren",
            "jobTitle": "Digital Marketing Specialist and Youth Advocate",
            "description": "Digital marketer and youth advocate focused on SEO, growth strategy, and community-led impact projects.",
            "url": "https://dhirendrasinghdhami.com.np/about",
            "image": profileImage,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kathmandu",
              "addressCountry": "NP"
            },
            "sameAs": ["https://github.com/dhirendraxd"]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About Dhirendra Singh Dhami",
            "description": "Learn about Dhirendra Singh Dhami’s background in SEO, digital marketing, advocacy, and civic-tech work.",
            "url": "https://dhirendrasinghdhami.com.np/about"
          }
        ]}
      />
      <ScrollProgressBar />
      <Navbar />

      <main className="pb-20">
        <div className="max-w-[84rem] mx-auto px-6 md:px-10 lg:px-12">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <section className="pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-5 bg-[#7A3A30]" aria-hidden="true" />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7A3A30]">About</p>
              </div>

              {/* Name + role */}
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-14">
                <h1 className="font-rajdhani text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[0.92] tracking-[-0.02em] text-[#3a3a3a]">
                  Dhirendra<br />Singh Dhami
                </h1>
                <p className="text-[0.9rem] leading-[1.8] text-[#6f655a] max-w-[32ch] md:text-right">
                  Digital Marketer &amp; Youth Advocate<br />
                  Based in Kathmandu, Nepal
                </p>
              </div>

              {/* 3-col: bio | portrait | stats */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_300px_1fr] lg:grid-cols-[1fr_340px_1fr] gap-10 lg:gap-14 items-stretch">

                {/* Left — bio details */}
                <div className="flex flex-col justify-between py-1 space-y-8">
                  {[
                    {
                      heading: "Who I Am",
                      body: "I'm Dhiren — a digital marketer and youth advocate based in Nepal. I run campaigns, grow online presence, and build community programs that create real-world impact.",
                    },
                    {
                      heading: "Contact",
                      body: "Kathmandu, Nepal\nctrlbits85@gmail.com",
                    },
                    {
                      heading: "Focus Areas",
                      body: "Digital Marketing\nCommunity & Advocacy\nPrototype Builds",
                    },
                  ].map((item) => (
                    <div key={item.heading}>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/30 mb-2">{item.heading}</p>
                      <p className="text-[1.05rem] leading-[1.9] text-[#5f574d] whitespace-pre-line">{item.body}</p>
                    </div>
                  ))}
                </div>

                {/* Center — portrait */}
                <div className="relative">
                  {/* thin corner marks */}
                  <span className="absolute -top-2 -left-2 w-5 h-5 border-t border-l border-[#c8bdb4] pointer-events-none" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 border-t border-r border-[#c8bdb4] pointer-events-none" aria-hidden="true" />
                  <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b border-l border-[#c8bdb4] pointer-events-none" aria-hidden="true" />
                  <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b border-r border-[#c8bdb4] pointer-events-none" aria-hidden="true" />

                  <div className="overflow-hidden aspect-[3/4] w-full border border-[#e4dbcf]">
                    <img
                      src={profileImage}
                      alt="Portrait of Dhirendra Singh Dhami"
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* caption tag */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#f5f1eb] px-3 py-0.5 border border-[#e4dbcf]">
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-[#a89f96] whitespace-nowrap">Kathmandu, Nepal</p>
                  </div>
                </div>

                {/* Right — stats */}
                <div className="flex flex-col border border-[#e4dbcf]">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      className={`flex-1 py-8 px-8 flex flex-col justify-center ${i === 1 ? "bg-[#3a3a3a]" : ""} ${i < stats.length - 1 ? "border-b border-[#e4dbcf]" : ""}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    >
                      <p className={`font-rajdhani text-[clamp(2.8rem,5vw,5rem)] font-bold leading-none tabular-nums tracking-tight ${i === 1 ? "text-[#f5f1eb]" : "text-[#3a3a3a]"}`}>
                        {s.value}
                      </p>
                      <p className={`mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#a89f96]`}>
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── ORG STRIP ─────────────────────────────────────────────── */}
          <div className="py-7 border-y border-[#e9e1d6] mb-20">
            <div className="flex flex-wrap items-center justify-between gap-y-4">
              {orgs.map((org) => (
                <span key={org} className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/25 hover:text-[#3a3a3a]/50 transition-colors duration-200 select-none">
                  {org}
                </span>
              ))}
            </div>
          </div>

          {/* ── EXPERTISE ─────────────────────────────────────────────── */}
          <section className="mb-20">
            <Divider />
            <div className="pt-12">
              <SectionLabel label="Expertise" />
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                <h2 className="font-rajdhani text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#3a3a3a]">
                  What I Bring
                </h2>
                <p className="text-[0.88rem] text-[#6f655a] leading-[1.75] max-w-[36ch] md:text-right">
                  A mix of digital marketing skills and community-driven execution.
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 border border-[#e4dbcf]">
                {expertise.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className={`flex flex-col items-center gap-4 py-10 px-4 border-r border-[#e4dbcf] last:border-r-0 ${i >= 3 ? "border-t border-[#e4dbcf] sm:border-t-0" : ""}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <img src={s.icon} alt="" aria-hidden="true" className="w-10 h-10 object-contain" />
                    <p className="font-rajdhani text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#6f655a] text-center leading-snug">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── EDUCATION & EXPERIENCE ────────────────────────────────── */}
          <section className="mb-20">
            <Divider />
            <div className="pt-12">
              <SectionLabel label="Background" />
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                <h2 className="font-rajdhani text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#3a3a3a]">
                  Education &amp; Experience
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#e4dbcf]">

                {/* Education */}
                <div className="border-b md:border-b-0 md:border-r border-[#e4dbcf] p-8">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/30 mb-8">Education</p>
                  <div className="space-y-10">
                    {[
                      { date: "2022 – Present", title: "BSc. CSIT", org: "KIST College" },
                      { date: "2082 BS",         title: "3rd Prize — Tech Fair", org: "KIST College" },
                    ].map((item) => (
                      <motion.div key={item.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.35 }} viewport={{ once: true }}>
                        <p className="text-[0.65rem] text-[#7A3A30] uppercase tracking-[0.16em] mb-1.5">{item.date}</p>
                        <h4 className="font-rajdhani text-[1.1rem] font-bold tracking-tight text-[#3a3a3a] leading-snug">{item.title}</h4>
                        <p className="text-[0.88rem] text-[#6f655a] mt-0.5">{item.org}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Experience col 1 */}
                <div className="border-b md:border-b-0 md:border-r border-[#e4dbcf] p-8">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/30 mb-8">Experience</p>
                  <div className="space-y-10">
                    {expCols[0].map((exp, i) => (
                      <motion.div key={exp.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.35, delay: i * 0.07 }} viewport={{ once: true }}>
                        <p className="text-[0.65rem] text-[#7A3A30] uppercase tracking-[0.16em] mb-1.5">{exp.dateRange}</p>
                        <h4 className="font-rajdhani text-[1.1rem] font-bold tracking-tight text-[#3a3a3a] leading-snug">{exp.title}</h4>
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-[0.88rem] text-[#6f655a] hover:text-[#7A3A30] transition-colors mt-0.5 inline-block">
                          {exp.company}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Experience col 2 */}
                <div className="p-8">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-transparent mb-8 select-none" aria-hidden="true">Experience</p>
                  <div className="space-y-10">
                    {expCols[1].map((exp, i) => (
                      <motion.div key={exp.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.35, delay: i * 0.07 }} viewport={{ once: true }}>
                        <p className="text-[0.65rem] text-[#7A3A30] uppercase tracking-[0.16em] mb-1.5">{exp.dateRange}</p>
                        <h4 className="font-rajdhani text-[1.1rem] font-bold tracking-tight text-[#3a3a3a] leading-snug">{exp.title}</h4>
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-[0.88rem] text-[#6f655a] hover:text-[#7A3A30] transition-colors mt-0.5 inline-block">
                          {exp.company}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── SELECTED PROJECTS ─────────────────────────────────────── */}
          <section className="mb-20">
            <Divider />
            <div className="pt-12">
              <SectionLabel label="Selected Projects" />
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <h2 className="font-rajdhani text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#3a3a3a]">
                  Things I've Made
                </h2>
                <p className="text-[0.88rem] text-[#6f655a] leading-[1.75] max-w-[38ch] md:text-right">
                  A mix of community programs, civic tools, and prototypes — each with a full case study.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e4dbcf]">
                {projects.map((p, i) => (
                  <motion.article
                    key={p.href}
                    className="group bg-[#f5f1eb] flex flex-col"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: i * 0.07 }}
                    viewport={{ once: true }}
                  >
                    <Link to={p.href} className="flex flex-col flex-1">
                      {/* Image */}
                      <div className="overflow-hidden aspect-[4/3] bg-[#e4dbcf]">
                        <img src={p.image} alt={p.title} loading="lazy" decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 px-5 pt-5 pb-6 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="h-px w-4 bg-[#7A3A30]" aria-hidden="true" />
                          <p className="inline-flex bg-[#2d2a28] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#f5f1eb]">
                            {p.type}
                          </p>
                        </div>

                        <h3 className="font-rajdhani text-[1.15rem] font-bold tracking-tight text-[#3a3a3a] leading-snug group-hover:text-[#7A3A30] transition-colors duration-200">
                          {p.title}
                        </h3>

                        <p className="text-[0.82rem] leading-[1.7] text-[#6f655a] flex-1">
                          {p.summary}
                        </p>

                        {/* CTA — inline link style matching rest of site */}
                        <span className="mt-1 inline-flex items-center gap-1.5 self-start font-rajdhani text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#3a3a3a]/50 group-hover:text-[#7A3A30] transition-colors duration-200">
                          <span className="relative after:absolute after:left-0 after:-bottom-px after:h-px after:w-0 after:bg-[#7A3A30] after:transition-all after:duration-300 group-hover:after:w-full">
                            Explore Work
                          </span>
                          <ArrowUpRight size={11} strokeWidth={2} className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform duration-200" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

            </div>
          </section>

          {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
          <section className="mb-20">
            <Divider />
            <div className="pt-12">
              <SectionLabel label="Testimonials" />
              <div className="flex items-center gap-8 max-w-[52rem] mx-auto">
                <button onClick={prev} className="shrink-0 text-[#3a3a3a]/20 hover:text-[#3a3a3a]/55 transition-colors" aria-label="Previous testimonial">
                  <ChevronLeft size={28} strokeWidth={1.2} />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={quoteIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-center flex-1"
                  >
                    <span className="font-rajdhani text-[2.4rem] leading-none text-[#e4dbcf] select-none" aria-hidden="true">"</span>
                    <p className="font-rajdhani text-[clamp(1rem,2vw,1.3rem)] leading-[1.85] text-[#3a3a3a] -mt-3">
                      {testimonials[quoteIdx].quote}
                    </p>
                    <div className="mt-6 border-t border-[#e9e1d6] pt-5">
                      <p className="font-rajdhani font-bold text-[0.85rem] uppercase tracking-[0.18em] text-[#3a3a3a]">
                        {testimonials[quoteIdx].name}
                      </p>
                      <p className="font-rajdhani text-[0.78rem] text-[#7A3A30] mt-1 tracking-wide">
                        {testimonials[quoteIdx].role}
                      </p>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-5">
                      {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setQuoteIdx(i)} aria-label={`Go to testimonial ${i + 1}`}
                          className={`rounded-full transition-all duration-300 ${i === quoteIdx ? "w-5 h-1.5 bg-[#7A3A30]" : "w-1.5 h-1.5 bg-[#c8bdb4] hover:bg-[#a89f96]"}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button onClick={next} className="shrink-0 text-[#3a3a3a]/20 hover:text-[#3a3a3a]/55 transition-colors" aria-label="Next testimonial">
                  <ChevronRight size={28} strokeWidth={1.2} />
                </button>
              </div>
            </div>
          </section>

          {/* ── GRAPHIC DESIGN ────────────────────────────────────────── */}
          <section className="mb-4">
            <Divider />
            <div className="pt-12">
              <SectionLabel label="Creative Work" />

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <h2 className="font-rajdhani text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#3a3a3a]">
                  Graphic Design
                </h2>
                <a
                  href="https://instagram.com/dhirendraxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start sm:self-auto"
                >
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#a89f96] group-hover:text-[#7A3A30] transition-colors duration-200">
                    @dhirendraxd
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-[#c8bdb4] group-hover:text-[#7A3A30] transition-colors duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
                  />
                </a>
              </div>

              {/* Editorial grid: tall hero on left, 3 tiles on right */}
              <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-3 sm:h-[560px]">

                {/* Hero tile — spans full height */}
                <motion.div
                  className="group relative overflow-hidden bg-[#e4dbcf] sm:row-span-2 aspect-[4/5] sm:aspect-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={gridImages[0]}
                    alt="Graphic design work"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#3a3a3a]/0 group-hover:bg-[#3a3a3a]/20 transition-colors duration-400 pointer-events-none" />
                </motion.div>

                {/* Top-right — wide landscape */}
                <motion.div
                  className="group relative overflow-hidden bg-[#e4dbcf] sm:col-span-2 aspect-video sm:aspect-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.07 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={gridImages[1]}
                    alt="Graphic design work"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#3a3a3a]/0 group-hover:bg-[#3a3a3a]/20 transition-colors duration-400 pointer-events-none" />
                </motion.div>

                {/* Bottom-right col 1 */}
                <motion.div
                  className="group relative overflow-hidden bg-[#e4dbcf] aspect-square sm:aspect-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.14 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={gridImages[2]}
                    alt="Graphic design work"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#3a3a3a]/0 group-hover:bg-[#3a3a3a]/20 transition-colors duration-400 pointer-events-none" />
                </motion.div>

                {/* Bottom-right col 2 — dark accent tile */}
                <motion.div
                  className="group relative overflow-hidden bg-[#3a3a3a] aspect-square sm:aspect-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.21 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={gridImages[3]}
                    alt="Graphic design work"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  {/* Instagram CTA overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#3a3a3a]/60">
                    <ArrowUpRight size={18} className="text-[#f5f1eb] mb-1" />
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#f5f1eb]/80">View more</p>
                  </div>
                </motion.div>

              </div>

              {/* Bottom strip */}
              <div className="mt-4 flex items-center justify-between border-t border-[#e9e1d6] pt-4">
                <p className="text-[0.65rem] text-[#a89f96] tracking-wide">Design & visual work — social, brand, campaigns</p>
                <a
                  href="https://instagram.com/dhirendraxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f655a] hover:text-[#7A3A30] transition-colors duration-200"
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-px after:h-px after:w-0 after:bg-[#7A3A30] after:transition-all after:duration-200 group-hover:after:w-full">
                    Follow on Instagram
                  </span>
                  <ArrowUpRight size={10} className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform duration-200" />
                </a>
              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
