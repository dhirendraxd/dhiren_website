import { motion } from "framer-motion";

const Affiliations = () => {
  const affiliations = [
    {
      id: 1,
      name: "All in Foundation",
      image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href,
      role: "Community Partner",
      description: "Collaborated on social impact initiatives and community development programs.",
    },
    {
      id: 2,
      name: "Aspire Leaders Program",
      image: new URL("@/assets/affiliation/aspire_leaders_program_logo.jpeg", import.meta.url).href,
      role: "Participant & Mentor",
      description: "Developed leadership skills and mentored emerging talent in the ecosystem.",
    },
    {
      id: 3,
      name: "CtrlBits",
      image: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href,
      role: "Tech Advisor",
      description: "Guided digital transformation and marketing strategy initiatives.",
    },
    {
      id: 4,
      name: "AWS Cloud Club at TU",
      image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href,
      role: "Club Lead",
      description: "Founded and led cloud computing community with 200+ members.",
    },
    {
      id: 5,
      name: "NetMission",
      image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href,
      role: "Strategic Partner",
      description: "Supported digital literacy and internet accessibility campaigns.",
    },
    {
      id: 6,
      name: "RAC",
      image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href,
      role: "Growth Consultant",
      description: "Implemented data-driven marketing strategies and growth initiatives.",
    },
    {
      id: 7,
      name: "Sustainability Solutions Nepal",
      image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href,
      role: "Digital Lead",
      description: "Drove digital campaigns for environmental sustainability projects.",
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
            Organizations & Communities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A complete list of organizations and programs I've been part of through formal roles, fellowships, mentorships, and sustained involvement.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {affiliations.map((affiliation, index) => (
            <motion.div
              key={affiliation.id}
              className="rounded-2xl border border-border/30 bg-card/50 p-6 space-y-4 hover:border-border/60 hover:bg-card/70 transition-all duration-300"
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
                <h3 className="text-lg font-semibold text-foreground">{affiliation.name}</h3>
                <p className="text-sm font-medium text-green-700">{affiliation.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{affiliation.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Affiliations;
