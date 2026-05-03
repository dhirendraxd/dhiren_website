import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const ConnectSection = () => {
  return (
    <section className="pt-2 pb-12 px-8 md:px-12 bg-card font-rajdhani">
      <div className="max-w-[84rem] mx-auto">
        <motion.div
          className="px-1 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start justify-center gap-6">
            <div className="w-full max-w-4xl">
              <div className="mt-4 flex w-full flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-0">
                <p className="text-xl font-semibold tracking-tight text-foreground">Connect with me</p>
                <div className="flex items-center justify-start gap-6 md:justify-end md:gap-8">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="group relative inline-flex items-center justify-center p-1 leading-none text-[#0A66C2] transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5"
                  >
                    <FaLinkedinIn size={26} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="group relative inline-flex items-center justify-center p-1 leading-none text-[#E4405F] transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5"
                  >
                    <FaInstagram size={26} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      Insta
                    </span>
                  </a>
                  <a
                    href="https://github.com/dhirendraxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="group relative inline-flex items-center justify-center p-1 leading-none text-[#181717] transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5"
                  >
                    <FaGithub size={26} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      GitHub
                    </span>
                  </a>
                </div>
              </div>

              <h3 className="mt-10 py-4 md:py-6 text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight leading-[1.8] text-foreground max-w-3xl mx-auto text-center font-sans">
                <span className="block text-muted-foreground">Half curiosity, half</span>
                <span className="mt-3 block">
                  <span className="text-[#6b1f1a] text-3xl md:text-4xl lg:text-5xl">"why not"</span>
                  <span className="text-muted-foreground">— that's most of what I do.</span>
                </span>
              </h3>
              <div className="mx-auto mt-2 h-px w-[80%] bg-border/70" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
