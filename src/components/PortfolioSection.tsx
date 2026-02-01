import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Finance", "Food & Beverage", "Fashion", "Tech", "Hospitality"];

const portfolioItems = [
  { id: 1, name: "Brand Identity", category: "Fashion", color: "bg-rose-100" },
  { id: 2, name: "App Design", category: "Tech", color: "bg-blue-100" },
  { id: 3, name: "Packaging", category: "Food & Beverage", color: "bg-amber-100" },
  { id: 4, name: "Web Design", category: "Finance", color: "bg-emerald-100" },
  { id: 5, name: "Logo Design", category: "Hospitality", color: "bg-violet-100" },
  { id: 6, name: "UI/UX", category: "Tech", color: "bg-cyan-100" },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="work" className="section-spacing px-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">BRANDS</h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Following are some of the major brands that I have worked with, for various projects
            that included but not only limited to marketing, promotion, and collaboration.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-chip ${
                activeCategory === category ? "filter-chip-active" : ""
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Horizontal Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-card rounded-full shadow-card flex items-center justify-center hover:shadow-hover transition-shadow duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-card rounded-full shadow-card flex items-center justify-center hover:shadow-hover transition-shadow duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0"
              >
                <div
                  className={`portfolio-item w-64 h-48 ${item.color} flex items-center justify-center group`}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
