import profileImage from "@/assets/ismail-illustration.png";

const skills = [
  "UI DESIGN",
  "UX DESIGN",
  "PROTOTYPING",
  "BRANDING",
  "HTML/CSS",
  "WIREFRAMING",
  "INFORMATION ARCHITECTURE",
  "USER RESEARCH",
  "USER INTERVIEWS",
  "LEADERSHIP",
  "SKETCH",
  "ADOBE SUITE",
];

const About = () => {
  return (
    <main className="min-h-screen bg-[#eceef2] px-6 py-14 sm:px-10 md:px-14 lg:px-20 lg:py-20">
      <div className="mx-auto w-full max-w-[1140px] space-y-20 md:space-y-24">
        <section className="grid items-center gap-9 md:grid-cols-[240px_1fr] md:gap-12">
          <div className="mx-auto h-[210px] w-[210px] overflow-hidden rounded-[8px] md:mx-0">
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="max-w-[560px] text-center md:text-left">
            <h1 className="font-sans text-[54px] font-semibold leading-[0.95] tracking-[-0.03em] text-[#151821] sm:text-[66px]">
              Hi there!
            </h1>
            <p className="mt-4 text-[21px] leading-[1.45] text-[#5a606a] sm:text-[31px] sm:leading-[1.38] md:text-[33px]">
              Fuelled by a passion for designing compelling products, I have a deep desire to excel and continuously improve in my work. Learn more about my journey below.
            </p>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-[1fr_1.05fr] md:gap-16">
          <div className="max-w-[560px]">
            <h2 className="font-sans text-[42px] font-semibold leading-[1.02] tracking-[-0.02em] text-[#151821] sm:text-[54px]">
              My Career So Far
            </h2>
            <p className="mt-4 text-[22px] leading-[1.52] text-[#5a606a] sm:text-[27px]">
              Always up for a challenge, I have worked for lean start-ups and was a member of the first New Zealand start-up to attend Y Combinator, the largest start-up accelerator in the world. From there, I worked my way up to Art Director and Team Lead at Appster where I oversaw the design of 30+ mobile and desktop apps. Currently, I lead UI/UX design at SaaS start-up VideoMyJob.
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-2.5 sm:gap-3 md:pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex rounded-[4px] border border-[#d5d8df] bg-[#f3f4f7] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#2d3138] sm:text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;