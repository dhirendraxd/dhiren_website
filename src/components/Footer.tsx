import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-24 bg-card border-t border-[#e9e1d6] px-8 md:px-12 py-8 font-rajdhani"
      role="contentinfo"
    >
      <div className="max-w-[84rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[0.72rem] text-[#a89f96] tracking-wide">
          © {year} Dhirendra Singh Dhami
        </p>

        <nav className="flex items-center gap-6" aria-label="Social links">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#a89f96] hover:text-[#7A3A30] transition-colors duration-200"
          >
            <FaLinkedinIn size={16} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#a89f96] hover:text-[#7A3A30] transition-colors duration-200"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="https://github.com/dhirendraxd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#a89f96] hover:text-[#7A3A30] transition-colors duration-200"
          >
            <FaGithub size={16} />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
