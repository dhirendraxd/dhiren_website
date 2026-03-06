import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hackathon = () => {
  const navigate = useNavigate();
  const hackathons = [
    {
      id: 1,
      name: "Mitra Smart",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
      credit: "100x Nepal Hackathon 2025",
      date: "2025",
      description: "Government document validation and smart form-filling application. AI-powered document checks with context-aware form-filling hints to simplify government processes.",
    },
    {
      id: 2,
      name: "Edu Connect Global",
      image: new URL("@/assets/hackathon&evets/kec_lite_2081-thumbnail-1000x525.png", import.meta.url).href,
      credit: "KIST HackFest 2025 - 3rd Place",
      date: "2025",
      description: "AI-powered university recommendation platform that matches students with best-fit universities based on verified data, interests, and academic profiles.",
    },
    {
      id: 3,
      name: "DevBus",
      image: new URL("@/assets/hackathon&evets/logo.png", import.meta.url).href,
      credit: "CodeYatra 2025",
      date: "2025",
      description: "AI job assessment tool for SME hiring. Built a platform using AI and skill-based assessments with prompt-based technology to match talent with opportunities.",
    },
    {
      id: 4,
      name: "Volunteer Recruitment Platform",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
      credit: "KEC Hack-a-LITE 2024",
      date: "2024",
      description: "Platform helping NGOs recruit volunteers efficiently. Features include event posting, volunteer matching, and stipend disbursement system. Built with HTML, CSS, JavaScript and hosted on Vercel.",
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
          <p className="text-xs uppercase tracking-widest font-semibold text-green-700">From Our Community</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Hackathons & Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hackathons, events, and collaborations where I explore technology, digital innovation, and problem-solving through teamwork.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {hackathons.map((hackathon, index) => (
            <motion.button
              key={hackathon.id}
              onClick={() => navigate(`/hackathon/${hackathon.id}`)}
              className="rounded-2xl border border-border/30 bg-card/50 p-6 space-y-4 hover:border-border/60 hover:bg-card/70 transition-all duration-300 cursor-pointer block w-full text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-center justify-center h-40 rounded-xl bg-background/50 overflow-hidden">
                <img
                  src={hackathon.image}
                  alt={hackathon.name}
                  className="max-h-40 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide">{hackathon.date}</p>
                <h3 className="text-lg font-semibold text-foreground">{hackathon.name}</h3>
                <p className="text-xs text-red-900 font-semibold uppercase tracking-wide mb-2">{hackathon.credit}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{hackathon.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathon;
