import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hackathons: Record<string, any> = {
    "1": {
      name: "Mitra Smart",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
      credit: "100x Nepal Hackathon 2025",
      date: "2025",
      description: "Government document validation and smart form-filling application. AI-powered document checks with context-aware form-filling hints to simplify government processes.",
      details: {
        about: "Mitra Smart is an innovative solution developed at 100x Nepal Hackathon 2025, designed to simplify government document processing. The application leverages AI to validate official documents and provide intelligent form-filling assistance, making government procedures more accessible to citizens.",
        problem: "Citizens often struggle with complex government document validation and lengthy form-filling processes. This leads to repeated submissions, delays, and frustration. The current system lacks intelligent guidance.",
        solution: "Mitra Smart uses AI-powered document validation and context-aware form-filling hints to guide users through government procedures with minimal effort and maximum accuracy.",
        features: [
          "AI-powered document validation and verification",
          "Context-aware form-filling suggestions",
          "Real-time document status tracking",
          "Multi-language support for accessibility",
          "Integration with government databases",
          "Error detection and prevention"
        ],
        technologies: "Python, TensorFlow, React, Node.js, MongoDB, Government APIs",
        team_role: "Full-stack Developer & AI Integration Lead",
        outcome: "Demonstrated at hackathon, received recognition for innovative approach to civic tech"
      }
    },
    "2": {
      name: "Edu Connect Global",
      image: new URL("@/assets/hackathon&evets/kec_lite_2081-thumbnail-1000x525.png", import.meta.url).href,
      credit: "KIST HackFest 2025 - 3rd Place",
      date: "2025",
      description: "AI-powered university recommendation platform that matches students with best-fit universities based on verified data, interests, and academic profiles.",
      details: {
        about: "Edu Connect Global is an intelligent university matching platform that earned 3rd place at KIST HackFest 2025. It helps students discover universities aligned with their academic goals, interests, and career aspirations by analyzing verified institutional data.",
        problem: "Students face overwhelming choices when selecting universities. Current methods rely on rankings or word-of-mouth, missing personalized fit. International options remain unexplored for many.",
        solution: "An AI-powered recommendation engine that analyzes student profiles and matches them with universities based on multiple factors including academics, facilities, culture, and career outcomes.",
        features: [
          "Personalized university recommendations",
          "Verified institutional data database",
          "Career path analysis and outcomes tracking",
          "Scholarship and funding information",
          "Peer reviews and student testimonials",
          "Virtual campus tours and webinars",
          "Application timeline management"
        ],
        technologies: "React, Node.js, Machine Learning (TensorFlow), PostgreSQL, Stripe for payments",
        team_role: "Product Lead & Full-stack Developer",
        outcome: "3rd Place at KIST HackFest 2025, User feedback: 4.8/5 stars for usability"
      }
    },
    "3": {
      name: "DevBus",
      image: new URL("@/assets/hackathon&evets/logo.png", import.meta.url).href,
      credit: "CodeYatra 2025",
      date: "2025",
      description: "AI job assessment tool for SME hiring. Built a platform using AI and skill-based assessments with prompt-based technology to match talent with opportunities.",
      details: {
        about: "DevBus is an innovative recruitment platform built at CodeYatra 2025, designed to help SMEs (Small and Medium Enterprises) find the right talent using AI-powered skill assessments. The platform uses prompt-based evaluations to assess candidates' technical and soft skills.",
        problem: "SMEs lack resources for comprehensive hiring processes. Traditional interviews miss skill gaps. Talent-job matching is inefficient, leading to mismatches and high turnover.",
        solution: "An AI-powered assessment platform that evaluates candidates through intelligent prompt-based questioning, identifying skills gaps and predicting job fit with high accuracy.",
        features: [
          "AI-powered skill assessment engine",
          "Prompt-based technical evaluations",
          "Soft skill assessment module",
          "Job-candidate matching algorithm",
          "Real-time feedback for candidates",
          "Performance analytics dashboard",
          "Automated report generation"
        ],
        technologies: "React, Python, OpenAI API, Express.js, MongoDB",
        team_role: "AI/ML Engineer & Backend Developer",
        outcome: "Demonstrated effective AI implementation for talent assessment with 85% accuracy"
      }
    },
    "4": {
      name: "Volunteer Recruitment Platform",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
      credit: "KEC Hack-a-LITE 2024",
      date: "2024",
      description: "Platform helping NGOs recruit volunteers efficiently. Features include event posting, volunteer matching, and stipend disbursement system. Built with HTML, CSS, JavaScript and hosted on Vercel.",
      details: {
        about: "Volunteer Recruitment Platform is a comprehensive solution built at KEC Hack-a-LITE 2024 to help NGOs streamline volunteer recruitment and management. The platform connects organizations with passionate volunteers and provides tools for efficient event management and compensation.",
        problem: "NGOs struggle with volunteer recruitment and coordination. Manual management of volunteer databases, event scheduling, and payment processing is time-consuming and error-prone.",
        solution: "A centralized platform where NGOs can post volunteer opportunities, match them with interested volunteers, track participation, and manage stipend disbursement automatically.",
        features: [
          "NGO and volunteer registration systems",
          "Event posting and discovery",
          "Smart volunteer-opportunity matching",
          "Application management dashboard",
          "Attendance tracking and verification",
          "Automated stipend disbursement system",
          "Ratings and feedback system",
          "Impact analytics and reporting"
        ],
        technologies: "HTML5, CSS3, JavaScript, Vercel, Firebase Backend",
        team_role: "Full-stack Developer & UI/UX Designer",
        outcome: "Successfully deployed platform helping 50+ NGOs manage 500+ volunteers with 95% satisfaction rate"
      }
    }
  };

  const hackathon = hackathons[id || ""];

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-card">
        <ScrollProgressBar />
        <Navbar />
        <section className="pt-28 pb-20 px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/hackathon")}
              className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-8"
            >
              <ChevronLeft size={20} />
              Back to Hackathons & Events
            </button>
            <p className="text-muted-foreground">Project not found.</p>
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
            onClick={() => navigate("/hackathon")}
            className="hover:text-foreground transition-colors"
          >
            Hackathons & Events
          </button>
          <span>/</span>
          <span className="text-foreground font-semibold">{hackathon.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/hackathon")}
          className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-12 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ChevronLeft size={20} />
          Back to Hackathons & Events
        </motion.button>

        {/* Main Content */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={hackathon.image}
              alt={hackathon.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {hackathon.credit}
            </div>
            <div className="absolute top-4 right-4 bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {hackathon.date}
            </div>
          </div>

          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              {hackathon.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {hackathon.description}
            </p>
          </div>

          {/* Detailed Information */}
          <div className="border-t border-border/20 pt-12">
            <div className="space-y-8">
              {/* About */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  About the Project
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {hackathon.details.about}
                </p>
              </div>

              {/* Problem */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Problem Statement
                </h2>
                <div className="bg-red-900/10 border border-red-900/20 rounded-lg p-6">
                  <p className="text-muted-foreground">
                    {hackathon.details.problem}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Our Solution
                </h2>
                <div className="bg-green-700/10 border border-green-700/20 rounded-lg p-6">
                  <p className="text-muted-foreground">
                    {hackathon.details.solution}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {hackathon.details.features.map((feature: string, idx: number) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <span className="text-green-700 font-bold mt-1">✓</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Technologies Used
                </h2>
                <p className="text-muted-foreground">
                  {hackathon.details.technologies}
                </p>
              </div>

              {/* Team Role */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  My Role
                </h2>
                <p className="text-muted-foreground">
                  {hackathon.details.team_role}
                </p>
              </div>

              {/* Outcome */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Outcome & Impact
                </h2>
                <div className="bg-yellow-700/10 border border-yellow-700/20 rounded-lg p-6">
                  <p className="text-muted-foreground">
                    {hackathon.details.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
    </div>
  );
};

export default HackathonDetail;
