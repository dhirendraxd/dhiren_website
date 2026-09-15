import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/assetPath";

const introImage = "/optimized_images/front%20viewabout%20me%20images.webp";
const portraitImage = "/optimized_images/about%20me.webp";
const closingImage = "/optimized_images/WhatsApp%20Image%202026-09-15%20at%209.55.40%20PM.webp";

const About = () => (
  <main className="min-h-screen bg-[#f5f1eb] text-[#3a3a3a]">
    <Seo
      title="About Me | Dhirendra Singh Dhami"
      description="A personal introduction to Dhirendra Singh Dhami, a digital marketer, community builder, and curious maker from Kathmandu, Nepal."
      canonicalPath="/about"
      image={portraitImage}
      imageAlt="Illustrated portrait of Dhiren"
      schema={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Dhirendra Singh Dhami",
        url: "https://dhirendrasinghdhami.com.np/about",
      }}
    />
    <ScrollProgressBar />
    <Navbar />

    <div className="mx-auto max-w-[82rem] px-6 pb-0 pt-24 sm:px-10 sm:pt-28 lg:px-12">
      <header className="border-b border-[#8b8377]/20 pb-8 pt-8 sm:pb-10 sm:pt-10">
        <h1 className="font-nekst text-[clamp(3rem,9vw,6rem)] font-bold uppercase leading-[0.82] tracking-tight text-[#3a3a3a]">
          About Me
        </h1>
      </header>

      <section className="grid border-b border-[#8b8377]/20 lg:grid-cols-[0.82fr_1.18fr]" aria-labelledby="about-intro">
        <div className="border-b border-[#8b8377]/20 p-3 sm:p-4 lg:border-b-0 lg:border-r">
          <img src={introImage} alt="A community gathering" width={1600} height={1200} fetchPriority="high" decoding="async" className="h-full min-h-[18rem] w-full object-cover sm:min-h-[23rem] lg:min-h-[20rem]" />
        </div>
        <div className="flex items-center p-7 sm:p-10 lg:p-12">
          <div className="max-w-[37rem] font-rajdhani text-[1.12rem] leading-[1.65] text-[#5f574d] sm:text-[1.28rem]">
            <h2 id="about-intro" className="sr-only">About Dhiren</h2>
            <p>
              I&apos;m Dhiren, a digital <span className="font-semibold text-[#7A3A30]">marketer</span> and <span className="font-semibold text-[#7A3A30]">designer</span> who likes turning ideas into work that people can feel, use, and remember.
            </p>
            <p className="mt-5">
              I work across SEO, content, advocacy, and practical digital projects. My goal is to make useful things clearer, more human, and easier to move forward.
            </p>
          </div>
        </div>
      </section>

      <section className="grid border-b border-[#8b8377]/20 lg:grid-cols-[1.18fr_0.82fr]" aria-labelledby="about-story">
        <div className="order-2 flex items-center border-t border-[#8b8377]/20 p-7 sm:p-10 lg:order-1 lg:border-r lg:border-t-0 lg:p-12">
          <div className="max-w-[37rem] font-rajdhani text-[1.12rem] leading-[1.65] text-[#5f574d] sm:text-[1.28rem]">
            <h2 id="about-story" className="sr-only">Dhiren&apos;s story</h2>
            <p>
              When I&apos;m not working on a campaign or building something, I&apos;m usually thinking about the next idea, learning from good people, or trying to understand how a small action can create a bigger change.
            </p>
            <p className="mt-5">
              I want to leave useful things behind: better questions, clearer systems, and work that gives someone else the confidence to begin.
            </p>
          </div>
        </div>
        <div className="order-1 p-3 sm:p-4 lg:order-2">
          <img src={portraitImage} alt="Illustrated portrait of Dhiren thinking" width={1024} height={1024} loading="lazy" decoding="async" className="h-full min-h-[22rem] w-full object-contain lg:min-h-[25rem]" />
        </div>
      </section>

      <section className="border-b border-[#8b8377]/20 pt-5" aria-label="Closing image">
        <img src={closingImage} alt="A visual from Dhiren&apos;s digital work" loading="lazy" decoding="async" className="h-auto w-full object-contain" />
      </section>

    </div>
    <Footer />
  </main>
);

export default About;
