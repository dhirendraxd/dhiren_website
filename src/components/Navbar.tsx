import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navLinks = [
    { name: "Hackathon & Event", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center pt-12 pb-12 px-8 md:px-12"
    >
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
    </motion.nav>
  );
};

export default Navbar;
