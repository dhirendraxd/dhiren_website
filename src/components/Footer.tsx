import { useLocation } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    href:  "https://github.com/dhirendraxd",
    label: "GitHub",
    icon:  FaGithub,
    color: "text-[#181717] group-hover:text-[#15120d]",
  },
  {
    href:  "https://instagram.com/dhirendraxd",
    label: "Instagram",
    icon:  FaInstagram,
    color: "text-[#E4405F] group-hover:text-[#b63156]",
  },
  {
    href:  "https://linkedin.com/in/dhirendraxd",
    label: "LinkedIn",
    icon:  FaLinkedinIn,
    color: "text-[#0A66C2] group-hover:text-[#08539d]",
  },
];

const Footer = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <footer
      className="bg-[#f5f1eb] px-6 pt-4 pb-8 font-rajdhani"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[50rem]">
        {!isHome && <div className="h-px w-full bg-[#8b8377]/80" />}
        {!isHome && (
          <div className="mt-3 flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {socialLinks.map(({ href, label, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex items-center gap-2 text-sm text-[#3f3932]"
                >
                  <span className={`${color} transition-colors duration-200`}>
                    <Icon size={20} />
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
