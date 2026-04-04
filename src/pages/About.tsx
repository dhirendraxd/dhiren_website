import heroImage from "@/assets/Untitled design.webp";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Link } from "react-router-dom";

const skills = [
  "SEO",
  "CONTENT STRATEGY",
  "CAMPAIGN PLANNING",
  "UI/UX DESIGN",
  "PROTOTYPING",
  "COMMUNITY ADVOCACY",
  "HTML/CSS",
  "WIREFRAMING",
  "USER RESEARCH",
  "TEAM COLLABORATION",
  "SKETCH",
  "ADOBE SUITE",
];

const workHighlights = [
  {
    title: "Issue Hive",
    text: "Built a student-first issue reporting platform that won 3rd Prize at KIST Fair 2082 and helps campus issues get tracked clearly.",
  },
  {
    title: "Digital Marketing Work",
    text: "Work across SEO, content, social campaigns, and growth planning to improve visibility and reach for brands and initiatives.",
  },
  {
    title: "Community Projects",
    text: "Contributed to advocacy and fellowship-driven work focused on collaboration, participation, and useful community impact.",
  },
];

const strengths = [
  {
    title: "Digital Growth",
    text: "SEO, content strategy, and campaign planning focused on measurable growth and quality audience reach.",
  },
  {
    title: "Community Impact",
    text: "Advocacy and fellowship work that turns ideas into practical community programs and collaborations.",
  },
  {
    title: "Rapid Builds",
    text: "Hackathon-driven execution: shipping prototypes quickly, validating concepts, and improving through feedback.",
  },
];

const values = [
  "Clarity over complexity",
  "Consistent execution",
  "Human-centered decisions",
  "Learning by shipping",
];

const About = () => {
  return (
    <main className="min-h-screen bg-card text-foreground">
      <Seo
        title="About Dhiren | Digital Marketing, UI/UX, and Community Projects"
        description="Learn more about Dhiren's background in digital marketing, product design, community advocacy, and hackathon projects like Issue Hive."
        canonicalPath="/about"
        image={heroImage}
        imageAlt="Portrait illustration of Dhiren for the About page"
        type="profile"
      />
      <ScrollProgressBar />
      <Navbar />

      <div className="mx-auto w-full max-w-[1220px] space-y-20 px-6 pb-14 pt-28 sm:px-10 md:space-y-24 md:px-14 lg:px-20 lg:pb-20 lg:pt-32">
        <section className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-12 lg:gap-16">
          <div className="mx-auto w-full max-w-[460px] md:mx-0">
            <img
              src={heroImage}
              alt="Portrait illustration of Dhiren for the About page"
              className="h-auto w-full object-contain"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="mx-auto w-full max-w-[580px] text-center md:mx-0 md:text-left">
            <h1 className="font-nekst text-[52px] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground sm:text-[62px]">
              Hi there!
            </h1>
            <p className="mt-4 text-[20px] leading-[1.48] text-muted-foreground sm:text-[24px] md:text-[29px]">
              I’m Dhiren, a digital marketer, UI/UX builder, and community-focused problem solver. I like creating work that is useful, clear, and tied to real outcomes.
            </p>
          </div>
        </section>

        <section className="grid items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-16 lg:gap-20">
          <div className="max-w-[580px]">
            <h2 className="font-nekst text-[42px] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[54px]">
              What I’ve Done
            </h2>
            <p className="mt-4 text-[21px] leading-[1.52] text-muted-foreground sm:text-[24px]">
              My work spans digital marketing, product design, and community initiatives. I focus on building practical things that people can actually use, from online campaigns and content systems to student-facing tools and advocacy projects.
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-2.5 sm:gap-3 md:pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex rounded-none border border-border bg-background/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/85 sm:text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3 md:gap-5">
          {strengths.map((item) => (
            <article key={item.title} className="border border-border bg-background/40 p-5 md:p-6">
              <h3 className="font-nekst text-2xl font-semibold tracking-tight text-foreground md:text-[1.9rem]">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="border-t border-border pt-10 md:pt-12">
          <h3 className="font-nekst text-4xl font-semibold tracking-tight text-foreground md:text-[3rem]">Selected Work</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {workHighlights.map((item) => (
              <article key={item.title} className="border border-border bg-background/40 p-5 md:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A3A30]">Featured</p>
                <h4 className="mt-3 font-nekst text-2xl font-semibold tracking-tight text-foreground md:text-[1.8rem]">{item.title}</h4>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid items-start gap-8 border-t border-border pt-10 md:grid-cols-[1.1fr_1fr] md:gap-14 md:pt-12">
          <div>
            <h3 className="font-nekst text-4xl font-semibold tracking-tight text-foreground md:text-[3rem]">How I Work</h3>
            <p className="mt-4 max-w-[46rem] text-lg leading-relaxed text-muted-foreground md:text-[1.22rem]">
              I usually start by understanding the problem, then map a practical plan, launch quickly, and improve using data, user feedback, and iteration.
            </p>
          </div>

          <div className="space-y-3">
            {values.map((value) => (
              <div key={value} className="border-b border-border pb-2 text-sm font-semibold uppercase tracking-[0.1em] text-foreground/80 md:text-base">
                {value}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-10 md:pt-12">
          <h3 className="font-nekst text-4xl font-semibold tracking-tight text-foreground md:text-[3rem]">Current Focus</h3>
          <p className="mt-4 max-w-[54rem] text-lg leading-relaxed text-muted-foreground md:text-[1.2rem]">
            Right now, I’m focused on growing strong digital campaigns, contributing to advocacy-led community projects, and building practical tech products like Issue Hive that solve real problems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/tech-projects"
              className="inline-flex items-center border border-foreground px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
            >
              View Projects
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center border border-border bg-background/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-foreground/85 transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]"
            >
              Contact Me
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;