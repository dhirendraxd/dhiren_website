import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Affiliations = () => {
  const navigate = useNavigate();
  const affiliations = [
    {
      id: 1,
      name: "ALL In Foundation (AIF)",
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      role: "Fellow",
      date: "Feb 2026 - Present · 2 mos",
      description: "Selected as a fellow to contribute to social impact initiatives, community-driven programs, and collaborative learning.",
      link: "https://allfoundation.org"
    },
    {
      id: 2,
      name: "AWS Cloud Club Nepal",
      image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href,
      role: "College Representative",
      date: "Mar 2025 - Present · 1 yr 1 mo",
      description: "Organizing sessions on AWS and cloud tools. Promoting community-focused learning and cloud skill adoption.",
      link: "https://aws.amazon.com"
    },
    {
      id: 3,
      name: "NetMission.Asia",
      image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href,
      role: "NetMission Ambassador",
      date: "Dec 2025 - Mar 2026 · 4 mos",
      description: "2026 cohort participant in online training, webinars, and projects focused on Internet governance and digital rights advocacy.",
      link: "https://netmission.asia"
    },
    {
      id: 4,
      name: "Rotaract Club of Kirtipur",
      image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href,
      role: "Member",
      date: "Jun 2025 - Present",
      description: "Supporting civic, tech-forward, and sustainability initiatives. Involved in planning youth and community programs.",
      link: "https://rotary.org"
    },
    {
      id: 5,
      name: "CtrlBits",
      image: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href,
      role: "Digital Marketer",
      date: "Apr 2025 - Present · 1 yr",
      description: "Writing optimized blogs and managing analytics & content strategy. Leading digital marketing for internal and client web apps.",
      link: "https://ctrlbits.com"
    },
    {
      id: 6,
      name: "Sustainability Solutions",
      image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href,
      role: "Sustainability Mentee",
      date: "Aug 2025 - Dec 2025 · 5 mos",
      description: "Design Thinking and Sustainable Business Model development through structured mentorship program.",
      link: "https://sustainabilitysolutions.org"
    },
  ];

  return (
    <section className="py-20 px-8 md:px-12 bg-card min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-green-700">My Journey</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Communities & Collaborations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Organizations, fellowships, and networks where I collaborate, learn, and contribute to technology, sustainability, and digital innovation.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {affiliations.map((affiliation, index) => (
            <motion.button
              key={affiliation.id}
              onClick={() => navigate(`/affiliations/${affiliation.id}`)}
              className="rounded-2xl border border-border/30 bg-card/50 p-6 space-y-4 hover:border-border/60 hover:bg-card/70 transition-all duration-300 cursor-pointer block w-full text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-center justify-center h-40 rounded-xl bg-background/50">
                <img
                  src={affiliation.image}
                  alt={affiliation.name}
                  className="max-h-32 max-w-full object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide">{affiliation.date}</p>
                <h3 className="text-lg font-semibold text-foreground">{affiliation.name}</h3>
                <p className="text-xs text-red-900 font-semibold uppercase tracking-wide mb-2">{affiliation.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{affiliation.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Affiliations;
