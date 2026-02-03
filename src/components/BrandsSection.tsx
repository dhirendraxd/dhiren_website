import { motion } from "framer-motion";

const BrandsSection = () => {
  const affiliations = [
    { id: 1, name: "All in Foundation", image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href },
    { id: 2, name: "Aspire Leaders Program", image: new URL("@/assets/affiliation/aspire_leaders_program_logo.jpeg", import.meta.url).href },
    { id: 3, name: "CtrlBits", image: new URL("@/assets/affiliation/new logo fark blue grad in white.png", import.meta.url).href },
    { id: 4, name: "AWS Cloud Club at TU", image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href },
    { id: 5, name: "NetMission", image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href },
    { id: 6, name: "RAC", image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href },
    { id: 7, name: "Sustainability Solutions Nepal", image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href },
  ];

  const affiliationLayout = [
    { ...affiliations[0], desktopClass: "col-span-1 row-span-1", mobileClass: "col-span-1 row-span-1" },
    { ...affiliations[1], desktopClass: "col-span-1 row-span-1", mobileClass: "col-span-1 row-span-1" },
    { ...affiliations[2], desktopClass: "col-span-2 row-span-1", mobileClass: "col-span-2 row-span-1" },
    { ...affiliations[3], desktopClass: "col-span-1 row-span-1", mobileClass: "col-span-1 row-span-1" },
    { ...affiliations[4], desktopClass: "col-span-1 row-span-1", mobileClass: "col-span-1 row-span-1" },
    { ...affiliations[5], desktopClass: "col-span-1 row-span-1", mobileClass: "col-span-2 row-span-1" },
  ];

  return (
    <section className="py-20 px-8 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Organizations & Communities
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              A curated list of organizations and programs I've been associated with through formal roles, fellowships, mentorships, and sustained involvement.
            </p>
          </motion.div>

          {/* Right - Team Grid */}
          <motion.div
            className="hidden md:grid grid-cols-3 gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {affiliationLayout.map((affiliation) => (
              <div
                key={affiliation.id}
                className={`${affiliation.desktopClass} rounded-xl bg-card/50 border border-border/40 p-5 flex items-center justify-center hover:border-border/60 hover:bg-card/70 transition-all duration-300`}
              >
                <img
                  src={affiliation.image}
                  alt={affiliation.name}
                  className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>

          {/* Mobile - Team Grid */}
          <motion.div
            className="md:hidden grid grid-cols-2 gap-4 auto-rows-max"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {affiliationLayout.map((affiliation) => (
              <div
                key={affiliation.id}
                className={`${affiliation.mobileClass} rounded-xl bg-card/50 border border-border/40 p-4 flex items-center justify-center aspect-square hover:border-border/60 hover:bg-card/70 transition-all duration-300`}
              >
                <img
                  src={affiliation.image}
                  alt={affiliation.name}
                  className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
