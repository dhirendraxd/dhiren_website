import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const AffiliationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const affiliations: Record<string, any> = {
    "1": {
      name: "ALL In Foundation (AIF)",
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      role: "Fellow",
      date: "Feb 2026 - Present · 2 mos",
      description: "Selected as a fellow to contribute to social impact initiatives, community-driven programs, and collaborative learning.",
      link: "https://allfoundation.org",
      details: {
        about: "All in Foundation is a non-profit organization dedicated to creating social impact through education, technology, and community development. As a Fellow, I work on identifying and scaling sustainable solutions for underserved communities.",
        responsibilities: [
          "Research and identify social impact initiatives",
          "Develop community-centered tech solutions",
          "Collaborate with stakeholders on project implementation",
          "Document and share learnings with the community"
        ],
        skills: "Project Management, Social Impact Analysis, Community Engagement, Strategic Planning",
        impact: "Contributing to initiatives that directly benefit 500+ community members across Nepal"
      }
    },
    "2": {
      name: "AWS Cloud Club Nepal",
      image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href,
      role: "College Representative",
      date: "Mar 2025 - Present · 1 yr 1 mo",
      description: "Organizing sessions on AWS and cloud tools. Promoting community-focused learning and cloud skill adoption.",
      link: "https://aws.amazon.com",
      details: {
        about: "AWS Cloud Club Nepal is a community-driven initiative to promote cloud computing knowledge and skills among students and professionals in Nepal. As College Representative, I lead sessions and community engagement at KIST College.",
        responsibilities: [
          "Organize and conduct AWS training sessions",
          "Build cloud computing community at college",
          "Mentor students on cloud skills and certifications",
          "Facilitate networking between AWS professionals and students"
        ],
        skills: "AWS Cloud Services, Community Leadership, Technical Training, Workshop Facilitation",
        impact: "Reached 100+ students with cloud computing education and AWS certification preparation"
      }
    },
    "3": {
      name: "NetMission.Asia",
      image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href,
      role: "NetMission Ambassador",
      date: "Dec 2025 - Mar 2026 · 4 mos",
      description: "2026 cohort participant in online training, webinars, and projects focused on Internet governance and digital rights advocacy.",
      link: "https://netmission.asia",
      details: {
        about: "NetMission.Asia is an initiative focused on Internet governance, digital rights, and online safety advocacy across Asia Pacific. Selected for the 2026 cohort, I participate in structured training and regional projects.",
        responsibilities: [
          "Participate in Internet governance training programs",
          "Advocate for digital rights in local communities",
          "Contribute to regional policy discussions",
          "Share learnings through webinars and workshops"
        ],
        skills: "Digital Rights Advocacy, Internet Governance, Policy Analysis, Community Mobilization",
        impact: "Contributing to digital rights awareness across Nepal and Asia Pacific region"
      }
    },
    "4": {
      name: "Rotaract Club of Kirtipur",
      image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href,
      role: "Member",
      date: "Jun 2025 - Present",
      description: "Supporting civic, tech-forward, and sustainability initiatives. Involved in planning youth and community programs.",
      link: "https://rotary.org",
      details: {
        about: "Rotaract Club of Kirtipur is part of Rotary International, focusing on service and community development for young professionals. As a member, I contribute to civic tech and sustainability initiatives.",
        responsibilities: [
          "Plan and execute community service projects",
          "Support sustainability and environmental initiatives",
          "Engage in youth leadership development",
          "Coordinate civic tech projects for community benefit"
        ],
        skills: "Community Service, Project Coordination, Leadership, Sustainability Planning",
        impact: "Supported 3+ community service projects benefiting 200+ community members"
      }
    },
    "5": {
      name: "CtrlBits",
      image: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href,
      role: "Digital Marketer",
      date: "Apr 2025 - Present · 1 yr",
      description: "Writing optimized blogs and managing analytics & content strategy. Leading digital marketing for internal and client web apps.",
      link: "https://ctrlbits.com",
      details: {
        about: "Ctrl Bits is a digital marketing and web development agency. As Digital Marketer, I lead content strategy, SEO optimization, and analytics-driven marketing campaigns for internal and client projects.",
        responsibilities: [
          "Develop and execute content strategy",
          "Conduct on-page and technical SEO optimization",
          "Manage analytics and performance tracking",
          "Create optimized blog content and web copy",
          "Lead digital marketing campaigns for client web apps"
        ],
        skills: "SEO, Content Strategy, Analytics, Digital Marketing, Blog Writing, Google Search Console",
        impact: "Improved client website traffic by 40% through SEO optimization and content strategy"
      }
    },
    "6": {
      name: "Sustainability Solutions",
      image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href,
      role: "Sustainability Mentee",
      date: "Aug 2025 - Dec 2025 · 5 mos",
      description: "Design Thinking and Sustainable Business Model development through structured mentorship program.",
      link: "https://sustainabilitysolutions.org",
      details: {
        about: "Sustainability Solutions provides mentorship and training in sustainable business practices and design thinking. As a mentee, I develop sustainable business models and innovative solutions for environmental challenges.",
        responsibilities: [
          "Complete design thinking training modules",
          "Develop sustainable business models",
          "Conduct market research for sustainability solutions",
          "Present solutions to mentors and peers",
          "Implement learnings in real-world projects"
        ],
        skills: "Design Thinking, Sustainable Business Model, Environmental Analysis, Innovation",
        impact: "Developed 2 sustainable business models with potential market applications"
      }
    }
  };

  const affiliation = affiliations[id || ""];

  if (!affiliation) {
    return (
      <div className="min-h-screen bg-card">
        <ScrollProgressBar />
        <Navbar />
        <section className="pt-28 pb-20 px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/affiliations")}
              className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-8"
            >
              <ChevronLeft size={20} />
              Back to Affiliations
            </button>
            <p className="text-muted-foreground">Organization not found.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card">
      <ScrollProgressBar />
      <Navbar />
      <section className="pt-28 pb-20 px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate("/")}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/affiliations")}
            className="hover:text-foreground transition-colors"
          >
            Affiliations
          </button>
          <span>/</span>
          <span className="text-foreground font-semibold">{affiliation.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/affiliations")}
          className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-12 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ChevronLeft size={20} />
          Back to Affiliations
        </motion.button>

        {/* Main Content */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl bg-background/50 p-6 flex items-center justify-center">
                <img
                  src={affiliation.image}
                  alt={affiliation.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-xs text-green-700 font-semibold uppercase tracking-widest mb-2">
                  {affiliation.date}
                </p>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {affiliation.name}
                </h1>
                <p className="text-xl text-red-900 font-semibold uppercase">
                  {affiliation.role}
                </p>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                {affiliation.description}
              </p>
              <a
                href={affiliation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Visit Official Website
              </a>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="border-t border-border/20 pt-12">
            <div className="space-y-8">
              {/* About */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {affiliation.details.about}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {affiliation.details.responsibilities.map((resp: string, idx: number) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <span className="text-green-700 font-bold mt-1">•</span>
                      <span className="text-muted-foreground">{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Skills & Expertise
                </h2>
                <p className="text-muted-foreground">
                  {affiliation.details.skills}
                </p>
              </div>

              {/* Impact */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Impact & Achievements
                </h2>
                <div className="bg-green-700/10 border border-green-700/20 rounded-lg p-6">
                  <p className="text-muted-foreground">
                    {affiliation.details.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
      <BackToTop />
    </div>
  );
};

export default AffiliationDetail;
