import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Facebook, Twitter, Instagram, Dribbble } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { name: "Hackathon & Event", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Behance", icon: Dribbble, href: "https://behance.net" },
    { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between pt-12 pb-12 px-8 md:px-12"
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
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label={social.name}
            >
              <IconComponent size={18} />
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;
