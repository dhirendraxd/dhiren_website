import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f" },
    { name: "Twitter", icon: "y" },
    { name: "Instagram", icon: "ig" },
    { name: "Behance", icon: "Be" },
    { name: "Dribbble", icon: "Bb" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between pt-12 pb-6 px-8 md:px-12"
    >
      {/* Moon Icon */}
      <div className="flex items-center">
        <Moon size={24} className="text-foreground" />
      </div>

      {/* Navigation Links - Centered */}
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href="#"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
