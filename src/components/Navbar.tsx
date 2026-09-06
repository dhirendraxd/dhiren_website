import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Contact", href: null },
];

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileOpen) {
        setIsBarVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (!isHomePage) {
        const isScrollingUp = currentScrollY < lastScrollYRef.current;
        const isNearTop = currentScrollY < 32;
        setIsBarVisible(isScrollingUp || isNearTop);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const aboutSection = document.getElementById("about");
      const aboutRevealPoint = aboutSection ? Math.max(0, aboutSection.offsetTop - 72) : 0;
      const isScrollingUp = currentScrollY < lastScrollYRef.current;

      // Show only when user scrolls upward and has crossed above the services section.
      setIsBarVisible(isScrollingUp && currentScrollY <= aboutRevealPoint);
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, mobileOpen]);

  // Close mobile menu on nav click
  const handleNavClick = () => setMobileOpen(false);

  // Scroll to contact section without adding fragment to URL
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    handleNavClick();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent transition-all duration-500 ease-out ${
        isBarVisible || mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-[84rem] mx-auto px-8 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="font-nekst text-lg font-semibold text-foreground tracking-tight hover:opacity-75 transition-opacity"
          >
            Dhiren
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (link.name === "Contact" && !isHomePage) return null;
              return link.name === "Contact" ? (
                <button
                  key={link.name}
                  onClick={scrollToContact}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-card/95 backdrop-blur-md border-b border-border/50"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-8 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.name === "Contact" && !isHomePage) return null;
                return link.name === "Contact" ? (
                  <button
                    key={link.name}
                    onClick={scrollToContact}
                    className="block py-2.5 text-sm font-medium text-foreground/75 text-left hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={handleNavClick}
                    className="block py-2.5 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
