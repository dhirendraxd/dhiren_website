import { motion } from "framer-motion";

const stats = [
  { value: "3+", label: "Years of Practice" },
  { value: "12+", label: "Projects Shipped" },
  { value: "3", label: "Core Focus Areas" },
];

const PreContactSection = () => {
  return (
    <section className="pt-2 pb-14 px-8 md:px-12 bg-card font-rajdhani" role="region" aria-label="Overview stats">
      <div className="max-w-[84rem] mx-auto">
        <motion.div
          className="grid sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((item, i) => {
            const isMid = i === 1;
            return (
              <div
                key={item.label}
                className={`py-14 px-6 flex flex-col items-center justify-center gap-1 text-center border ${
                  isMid ? "bg-[#231d18] border-[#231d18]" : "border-[#e4dbcf]"
                }`}
              >
                <p className={`font-rajdhani text-[2.4rem] font-semibold leading-none tracking-tight ${isMid ? "text-[#f5f1eb]" : "text-[#231d18]"}`}>
                  {item.value}
                </p>
                <p className={`text-[0.75rem] font-normal uppercase tracking-[0.16em] ${isMid ? "text-[#a89f96]" : "text-[#a89f96]"}`}>{item.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PreContactSection;
