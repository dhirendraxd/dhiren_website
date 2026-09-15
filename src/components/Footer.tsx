import { useLocation } from "react-router-dom";
import SvglIcon from "@/components/SvglIcon";

const socialLinks = [
  {
    href:  "https://github.com/dhirendraxd",
    label: "GitHub",
    svglName: "GitHub",
    color: "text-[#181717] group-hover:text-[#15120d]",
  },
  {
    href:  "https://instagram.com/dhirendraxd",
    label: "Instagram",
    svglName: "Instagram",
    color: "text-[#E4405F] group-hover:text-[#b63156]",
  },
  {
    href:  "https://linkedin.com/in/dhirendraxd",
    label: "LinkedIn",
    svglName: "LinkedIn",
    color: "text-[#0A66C2] group-hover:text-[#08539d]",
  },
  {
    href:  "https://www.behance.net/dhirendraxd",
    label: "Behance",
    svglName: "Behance",
    color: "text-[#1769ff] group-hover:text-[#1254cc]",
  },
];

const Footer = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <footer
      className="bg-[#f5f1eb] px-6 pb-8 pt-4 font-rajdhani"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[50rem]">
        {!isHome && <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8b8377]/40 to-transparent" aria-hidden="true" />}
        {!isHome && (
          <div className="mt-2 flex flex-col items-center">
            <div className="flex items-center gap-5">
              {socialLinks.map(({ href, label, svglName, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-6 w-6 items-center justify-center text-sm text-[#3f3932] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] focus-visible:ring-offset-2"
                >
                  <span className={`${color} transition-colors duration-200`}>
                    <SvglIcon name={svglName} alt="" className="h-[17px] w-[17px]" fallback={<span className="text-[10px] font-bold">{label.slice(0, 1)}</span>} />
                  </span>
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
