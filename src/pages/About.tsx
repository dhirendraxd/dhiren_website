import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Seo from "@/components/Seo";
import { assetPath } from "@/lib/assetPath";
import { getRelevantExperiences } from "@/data/affiliations";

const profileImage = assetPath("untitled-design.webp");

// ── Expertise icon card ────────────────────────────────────────────────────
function ExpertiseCard({ label, icon, delay = 0 }: { label: string; icon: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-20 h-20 flex items-center justify-center">
        <img src={icon} alt="" aria-hidden="true" className="w-14 h-14 object-contain" />
      </div>
      <p className="font-rajdhani text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[#6f655a] text-center leading-snug max-w-[6rem]">
        {label}
      </p>
    </motion.div>
  );
}

// ── Section heading shared style ──────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true }}
      className="text-center font-cormorant font-normal text-[clamp(2rem,3.8vw,3rem)] tracking-wide text-[#3a3a3a] mb-14 leading-tight"
    >
      {children}
    </motion.h2>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────
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

const orgs = [
  "Ctrl Bits",
  "ALL In Foundation",
  "Sustainability Solutions",
  "Lovelac Talk",
];

const projects = [
  {
    title: "Fellowship Community Labs",
    type:  "Community",
    image: assetPath("civic-tech.webp"),
    href:  "/projects/fellowship-community-labs",
  },
  {
    title: "NGO Volunteer Management",
    type:  "Tech",
    image: assetPath("2nd-new.webp"),
    href:  "/projects/ngo-volunteer-management",
  },
  {
    title: "Issue Hive — 3rd Prize KIST Fair",
    type:  "Tech",
    image: assetPath("issue-hive-thumb.webp"),
    href:  "/projects/issue-hive-awarded-3rd-prize-at-kist-fair-2082",
  },
];

const testimonials = [
  {
    quote:
      "Dhiren was a real pleasure to work with. He doesn't just execute — he genuinely cares about the impact and pushes the work to be better. Definitely the kind of person you can trust with a project from start to finish. Great services & Recommended!",
    name:  "Team Lead",
    role:  "ALL In Foundation",
  },
  {
    quote:
      "Working with Dhiren was smooth from start to finish. His ability to connect community goals with digital strategy made a real difference. Great collaborator and highly reliable.",
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

// ── Page ──────────────────────────────────────────────────────────────────
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
        title="About Dhiren | Dhirendra Singh Dhami"
        description="Digital marketer, youth advocate, and builder based in Nepal. Explore Dhiren's background, skills, and work."
        canonicalPath="/about"
        image={profileImage}
        imageAlt="Portrait of Dhirendra Singh Dhami"
        type="profile"
      />
      <ScrollProgressBar />
      <Navbar />

      <main className="pb-20">
        <div className="max-w-[68rem] mx-auto px-6 md:px-10">

          {/* ── FIRST VIEWPORT: name + hero + orgs ──────────────────── */}
          <div className="min-h-screen flex flex-col pt-24">

            {/* NAME HEADER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center pt-4 pb-10"
            >
              <h1 className="font-cormorant font-medium text-[clamp(2.6rem,5.5vw,4.8rem)] tracking-wide text-[#3a3a3a] leading-[1.1]">
                Dhirendra Singh Dhami
              </h1>
              <p className="mt-3 font-rajdhani text-[clamp(0.95rem,1.9vw,1.3rem)] font-normal tracking-[0.14em] text-[#6f655a] uppercase">
                Digital Marketer &amp; Youth Advocate
              </p>
              <p className="font-rajdhani text-[clamp(0.95rem,1.9vw,1.3rem)] font-normal tracking-[0.14em] text-[#6f655a] uppercase">
                Based in Nepal
              </p>
            </motion.div>

            {/* 3-COL HERO — grows to fill remaining space */}
            <section className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_290px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] gap-10 md:gap-8 items-center pb-10">

              {/* Left: FOUNDED / CONTACT / PORTFOLIO */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="space-y-8"
              >
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/30 mb-3">
                    Founded
                  </p>
                  <p className="text-[1.15rem] leading-[1.9] text-[#5f574d] font-rajdhani">
                    I'm Dhiren — a digital marketer and youth advocate based in Nepal. I run campaigns, grow online presence, and build community programs that create real-world impact.
                  </p>
                </div>

                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/30 mb-3">
                    Contact
                  </p>
                  <p className="text-[1.15rem] text-[#5f574d] leading-[1.9] font-rajdhani">
                    Kathmandu, Nepal<br />
                    ctrlbits85@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/30 mb-3">
                    Portfolio
                  </p>
                  <p className="text-[1.15rem] text-[#5f574d] leading-[1.9] font-rajdhani">
                    Digital Marketing<br />
                    Community &amp; Advocacy<br />
                    Prototype Builds
                  </p>
                </div>
              </motion.div>

              {/* Center: oval portrait */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.07, ease: "easeOut" }}
                className="flex justify-center"
              >
                <div
                  className="overflow-hidden border-[3px] border-[#e4dbcf]"
                  style={{ width: "300px", height: "370px", borderRadius: "50%" }}
                >
                  <img
                    src={profileImage}
                    alt="Portrait of Dhirendra Singh Dhami"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top scale-[1.07]"
                  />
                </div>
              </motion.div>

              {/* Right: stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.14, ease: "easeOut" }}
                className="flex flex-col pl-6 md:pl-10"
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`py-5 ${i < stats.length - 1 ? "border-b border-[#e9e1d6]" : ""}`}
                  >
                    <p className="font-rajdhani text-[clamp(4.2rem,8vw,7.5rem)] font-bold text-[#3a3a3a] leading-none tabular-nums">
                      {s.value}
                    </p>
                    <p className="mt-2 text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-[#6f655a]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* ORG LOGOS STRIP — pinned to bottom of first viewport */}
            <section className="py-8 border-t border-b border-[#e9e1d6]">
              <div className="flex flex-wrap items-center justify-between gap-y-4">
                {orgs.map((org) => (
                  <span
                    key={org}
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#3a3a3a]/25 hover:text-[#3a3a3a]/50 transition-colors duration-200 select-none"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </section>

          </div>{/* end first viewport */}

          {/* ── MY EXPERTISE ────────────────────────────────────────── */}
          <section className="py-16 border-b border-[#e9e1d6]">
            <SectionHeading>My Expertise</SectionHeading>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-10 max-w-3xl mx-auto justify-items-center">
              {expertise.map((s, i) => (
                <ExpertiseCard key={s.label} label={s.label} icon={s.icon} delay={i * 0.07} />
              ))}
            </div>
          </section>

          {/* ── EDUCATION & EXPERIENCE ──────────────────────────────── */}
          <section className="py-16 border-b border-[#e9e1d6]">
            <SectionHeading>Education &amp; Experience</SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

              {/* Education */}
              <div>
                <p className="font-rajdhani text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#3a3a3a]/28 mb-6">
                  Education
                </p>
                <div className="space-y-8">
                  {[
                    { date: "2022 – Present", title: "BSc. CSIT", org: "KIST College" },
                    { date: "2082 BS",         title: "3rd Prize — Tech Fair", org: "KIST College" },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-rajdhani text-[0.68rem] text-[#7A3A30]/70 uppercase tracking-[0.16em] mb-1">
                        {item.date}
                      </p>
                      <h4 className="font-cormorant font-medium text-[1.25rem] text-[#3a3a3a] leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-rajdhani text-[0.95rem] text-[#6f655a] mt-0.5">{item.org}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experience col 1 */}
              <div>
                <p className="font-rajdhani text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#3a3a3a]/28 mb-6">
                  Experience
                </p>
                <div className="space-y-8">
                  {expCols[0].map((exp, i) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-rajdhani text-[0.68rem] text-[#7A3A30]/70 uppercase tracking-[0.16em] mb-1">
                        {exp.dateRange}
                      </p>
                      <h4 className="font-cormorant font-medium text-[1.25rem] text-[#3a3a3a] leading-snug">
                        {exp.title}
                      </h4>
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-rajdhani text-[0.95rem] text-[#6f655a] hover:text-[#7A3A30] transition-colors mt-0.5 inline-block"
                      >
                        {exp.company}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experience col 2 */}
              <div>
                <p className="font-rajdhani text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-transparent mb-6 select-none" aria-hidden="true">
                  Experience
                </p>
                <div className="space-y-8">
                  {expCols[1].map((exp, i) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-rajdhani text-[0.68rem] text-[#7A3A30]/70 uppercase tracking-[0.16em] mb-1">
                        {exp.dateRange}
                      </p>
                      <h4 className="font-cormorant font-medium text-[1.25rem] text-[#3a3a3a] leading-snug">
                        {exp.title}
                      </h4>
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-rajdhani text-[0.95rem] text-[#6f655a] hover:text-[#7A3A30] transition-colors mt-0.5 inline-block"
                      >
                        {exp.company}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── MY LATEST PROJECTS ──────────────────────────────────── */}
          <section className="py-16 border-b border-[#e9e1d6]">
            <SectionHeading>My Latest Projects</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {projects.map((p, i) => (
                <motion.div
                  key={p.href}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                  viewport={{ once: true }}
                >
                  <Link to={p.href} className="group block">
                    <div className="overflow-hidden aspect-[4/3] bg-[#e4dbcf]">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-3.5">
                      <p className="font-rajdhani text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6f655a]/60">
                        {p.type}
                      </p>
                      <h4 className="mt-1 font-cormorant font-medium text-[1.25rem] text-[#3a3a3a] leading-snug">
                        {p.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 mt-1.5 font-rajdhani text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#6f655a] group-hover:text-[#7A3A30] transition-colors duration-200">
                        View Project <ArrowUpRight size={11} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {projects.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full block transition-all duration-300 ${
                    i === 0 ? "w-5 h-1.5 bg-[#7A3A30]" : "w-1.5 h-1.5 bg-[#c8bdb4]"
                  }`}
                />
              ))}
            </div>
          </section>

          {/* ── TESTIMONIAL ─────────────────────────────────────────── */}
          <section className="py-16 border-b border-[#e9e1d6]">
            <div className="flex items-center gap-6 max-w-[48rem] mx-auto">
              <button
                onClick={prev}
                className="shrink-0 text-[#3a3a3a]/20 hover:text-[#3a3a3a]/55 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={32} strokeWidth={1.2} />
              </button>

              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="text-center flex-1"
              >
                <p className="font-cormorant font-normal italic text-[clamp(1.25rem,2.4vw,1.65rem)] leading-[1.85] text-[#3a3a3a]">
                  &ldquo;{testimonials[quoteIdx].quote}&rdquo;
                </p>
                <div className="mt-7">
                  <p className="font-rajdhani font-semibold text-[0.95rem] uppercase tracking-[0.18em] text-[#3a3a3a]">
                    {testimonials[quoteIdx].name}
                  </p>
                  <p className="font-rajdhani text-[0.85rem] text-[#7A3A30] mt-1 tracking-wide">
                    {testimonials[quoteIdx].role}
                  </p>
                </div>
              </motion.div>

              <button
                onClick={next}
                className="shrink-0 text-[#3a3a3a]/20 hover:text-[#3a3a3a]/55 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={32} strokeWidth={1.2} />
              </button>
            </div>
          </section>

          {/* ── PHOTO GRID (@dhirendraxd) ───────────────────────────── */}
          <section className="py-16">
            <p className="text-center font-rajdhani text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#3a3a3a]/35 mb-8">
              @dhirendraxd
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gridImages.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-[#e4dbcf]">
                  <img
                    src={img}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
