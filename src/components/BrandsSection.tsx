import { useState } from "react";
import { motion } from "framer-motion";

const BrandsSection = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = ["ALL", "FINANCE", "FOOD & BEVERAGE", "FASHION", "COMMUNICATION", "HOSPITALITY"];

  const brands = [
    { name: "FonePay", category: "FINANCE", type: "text", color: "text-red-600" },
    { name: "DANIEL WELLINGTON", category: "FASHION", type: "text", color: "text-foreground" },
    { name: "daraz", category: "COMMUNICATION", type: "box", bgColor: "bg-black", textColor: "text-white" },
    { name: "OYO", category: "HOSPITALITY", type: "box", bgColor: "bg-red-500", textColor: "text-white" },
    { name: "Rakuten Viber", category: "COMMUNICATION", type: "box", bgColor: "bg-purple-500", textColor: "text-white" },
    { name: "SOMERSBY", category: "FOOD & BEVERAGE", type: "text", color: "text-foreground" },
    { name: "NIC ASIA", category: "FINANCE", type: "box", bgColor: "bg-red-600", textColor: "text-white" },
    { name: "IME Pay", category: "FINANCE", type: "box", bgColor: "bg-purple-600", textColor: "text-white" },
    { name: "Ncell", category: "COMMUNICATION", type: "text", color: "text-purple-600" },
  ];

  const filteredBrands = activeFilter === "ALL" 
    ? brands 
    : brands.filter(brand => brand.category === activeFilter);

  return (
    <section className="py-20 px-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">BRANDS</h2>
          <div className="w-8 h-0.5 bg-accent mx-auto mt-3"></div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-muted-foreground text-sm max-w-3xl mx-auto mb-10"
        >
          Following are some of the major brands that I have worked with, for various projects that included but not only limited to marketing, promotion, and collaboration.
        </motion.p>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                activeFilter === filter
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Brands Grid - Masonry style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center justify-center p-8 rounded-lg ${
                brand.type === "box" 
                  ? `${brand.bgColor} ${brand.textColor} min-h-[120px] md:min-h-[160px]` 
                  : "min-h-[80px]"
              }`}
            >
              <span className={`text-xl md:text-2xl font-bold tracking-wide ${
                brand.type === "text" ? brand.color : ""
              }`}>
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
