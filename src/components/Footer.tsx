import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { name: "Dribbble", href: "#" },
    { name: "Behance", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="section-spacing px-8 md:px-12 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm max-w-xs">
              Creating beautiful digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/#work"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
              >
                Work
              </Link>
              <Link
                to="/#about"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider">CONNECT</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Alex Designer. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
