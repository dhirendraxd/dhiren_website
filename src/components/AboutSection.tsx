import { motion } from "framer-motion";
import {
  SiFigma,
  SiNotion,
  SiSlack,
  SiConfluence,
  SiJira,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiOpenai,
} from "react-icons/si";

const AboutSection = () => {
  const tools = [
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Notion", icon: SiNotion, color: "#000000" },
    { name: "Jira", icon: SiJira, color: "#0052CC" },
    { name: "Confluence", icon: SiConfluence, color: "#172B4D" },
    { name: "Slack", icon: SiSlack, color: "#E01E5A" },
    { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
    { name: "After Effects", icon: SiAdobeaftereffects, color: "#9999FF" },
    { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "OpenAI", icon: SiOpenai, color: "#10A37F" },
  ];

  return (
    <section id="about" className="py-20 px-8 md:px-12 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Skills Intro with Tools */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Available for</h2>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">new opportunities</h2>
            <p className="text-sm text-muted-foreground mt-6">let's craft something great together.</p>
          </div>

          {/* Tools Icons Grid - Masonry on mobile, 5-column on desktop */}
          <div className="hidden md:grid grid-cols-5 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="w-20 h-20 rounded-2xl bg-card shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
                  aria-label={tool.name}
                  title={tool.name}
                >
                  <Icon style={{ color: tool.color }} size={28} />
                </div>
              );
            })}
          </div>

          {/* Mobile Masonry Layout */}
          <div className="md:hidden grid grid-cols-3 gap-3 auto-rows-max">
            {[
              { ...tools[0], mobileClass: "col-span-2 row-span-2" },
              { ...tools[1], mobileClass: "col-span-1 row-span-1" },
              { ...tools[2], mobileClass: "col-span-1 row-span-1" },
              { ...tools[3], mobileClass: "col-span-1 row-span-1" },
              { ...tools[4], mobileClass: "col-span-1 row-span-1" },
              { ...tools[5], mobileClass: "col-span-1 row-span-1" },
              { ...tools[6], mobileClass: "col-span-1 row-span-1" },
              { ...tools[7], mobileClass: "col-span-1 row-span-1" },
              { ...tools[8], mobileClass: "col-span-2 row-span-2" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className={`${tool.mobileClass} rounded-2xl bg-card shadow-sm flex items-center justify-center hover:shadow-md transition-shadow aspect-square`}
                  aria-label={tool.name}
                  title={tool.name}
                >
                  <Icon style={{ color: tool.color }} size={24} />
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
};

export default AboutSection;
