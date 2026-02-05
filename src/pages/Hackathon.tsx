import { motion } from "framer-motion";

const Hackathon = () => {
  const hackathons = [
    {
      id: 1,
      name: "Mitra Smart",
      image: new URL("@/assets/hackathon&evets/1736784796315.jpeg", import.meta.url).href,
      credit: "100x Nepal Hackathon 2025",
      description: "Government document validation and smart form-filling application. AI-powered document checks with context-aware form-filling hints to simplify government processes.",
    },
    {
      id: 2,
      name: "Edu Connect Global",
      image: new URL("@/assets/hackathon&evets/kec_lite_2081-thumbnail-1000x525.png", import.meta.url).href,
      credit: "KIST HackFest 2025 - 3rd Place",
      description: "AI-powered university recommendation platform that matches students with best-fit universities based on verified data, interests, and academic profiles.",
    },
    {
      id: 3,
      name: "DevBus",
      image: new URL("@/assets/hackathon&evets/logo.png", import.meta.url).href,
      credit: "CodeYatra 2025",
      description: "AI job assessment tool for SME hiring. Built a platform using AI and skill-based assessments with prompt-based technology to match talent with opportunities.",
    },
    {
      id: 4,
      name: "Volunteer Recruitment Platform",
      image: new URL("@/assets/hackathon&evets/SXC SANDBOX Logo.jpg", import.meta.url).href,
      credit: "KEC Hack-a-LITE 2024",
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
            A collection of hackathons, events, and community gatherings where ideas transform into reality through teamwork and innovation.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              className="rounded-lg overflow-hidden space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={hackathon.image}
                  alt={hackathon.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1">
                  {hackathon.credit}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{hackathon.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{hackathon.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathon;
