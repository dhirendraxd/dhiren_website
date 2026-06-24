import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const ConnectSection = () => {
  return (
    <section className="pt-2 pb-12 px-8 md:px-12 bg-card font-rajdhani">
      <div className="max-w-[84rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center gap-8">
            <blockquote className="flex flex-col items-center gap-3">
              <span className="font-rajdhani text-[2.8rem] leading-none text-[#e4dbcf] select-none" aria-hidden="true">"</span>
              <p className="font-rajdhani text-[clamp(1.5rem,2.8vw,2.4rem)] tracking-tight text-[#231d18] leading-snug max-w-[26ch] -mt-4">
                Half curiosity, half <span className="text-[#7A3A30]">"why not"</span> —<br /> that's most of what I do.
              </p>
            </blockquote>

            <div className="w-full flex items-center gap-6">
              <div className="shrink-0">
                <p className="font-rajdhani text-[1.4rem] font-bold tracking-tight text-[#231d18]">Connect</p>
              </div>

              <span className="flex-1 h-px bg-[#e9e1d6]/60" aria-hidden="true" />

              <nav className="flex items-center gap-6 shrink-0" role="navigation" aria-label="Social links">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="group inline-flex flex-col items-center gap-1 text-[#0A66C2] transition-opacity duration-200 hover:opacity-75"
                >
                  <FaLinkedinIn size={22} />
                  <span className="h-px w-0 bg-[#0A66C2] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="group inline-flex flex-col items-center gap-1 text-[#E4405F] transition-opacity duration-200 hover:opacity-75"
                >
                  <FaInstagram size={22} />
                  <span className="h-px w-0 bg-[#E4405F] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/dhirendraxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="group inline-flex flex-col items-center gap-1 text-[#231d18] transition-opacity duration-200 hover:opacity-75"
                >
                  <FaGithub size={22} />
                  <span className="h-px w-0 bg-[#231d18] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
