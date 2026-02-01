import { motion } from "framer-motion";

const BrandsSection = () => {
  const affiliations = [
    { id: 1, name: "All in Foundation", image: new URL("@/assets/affiliation/all_in_foundation_aif_logo.jpeg", import.meta.url).href },
    { id: 2, name: "Aspire Leaders Program", image: new URL("@/assets/affiliation/aspire_leaders_program_logo.jpeg", import.meta.url).href },
    { id: 3, name: "AWS Cloud Club at TU", image: new URL("@/assets/affiliation/aws_cloud_club_at_tu_logo.jpeg", import.meta.url).href },
    { id: 4, name: "CtrlBits", image: new URL("@/assets/affiliation/ctrlbits.jpg", import.meta.url).href },
    { id: 5, name: "NetMission", image: new URL("@/assets/affiliation/netmission.jpeg", import.meta.url).href },
    { id: 6, name: "RAC", image: new URL("@/assets/affiliation/rac .jpg", import.meta.url).href },
    { id: 7, name: "Sustainability Solutions Nepal", image: new URL("@/assets/affiliation/sustainabilitysolutionsnepal_logo.jpeg", import.meta.url).href },
  ];

  return (
    <section className="py-20 px-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">AFFILIATIONS</h2>
          <div className="w-8 h-0.5 bg-accent mx-auto mt-3"></div>
        </div>

        {/* Description */}
        <p className="text-center text-muted-foreground text-sm max-w-3xl mx-auto mb-10">
          A curated list of organizations and programs I've been associated with through formal roles, fellowships, mentorships, and sustained involvement.
        </p>

        {/* Brands Grid - Masonry style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {affiliations.map((affiliation) => (
            <div
              key={affiliation.id}
              className="flex items-center justify-center p-8 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 min-h-[150px] md:min-h-[180px]"
            >
              <img
                src={affiliation.image}
                alt={affiliation.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
