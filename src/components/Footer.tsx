import { useState } from "react";
import { Mail } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize inputs before processing
    const sanitizedData = {
      fullName: formData.fullName.trim().slice(0, 100),
      email: formData.email.trim().toLowerCase().slice(0, 254),
      message: formData.message.trim().slice(0, 1000),
    };
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      console.error('Invalid email format');
      return;
    }
    
    // Handle form submission with sanitized data
    console.log("Form submitted:", sanitizedData);
    // TODO: Implement actual form submission to backend
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer id="contact" className="py-20 px-8 md:px-12 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Header */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Specialized in</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-[#8B3A3A]">Digital</span> Marketing
              </h2>
              <p className="text-base text-muted-foreground">
                Let's grow your brand with data-driven strategies and creative campaigns.
              </p>
            </div>

            <div className="py-6 border-t border-taupe/40">
              <p className="text-xl md:text-2xl font-light">
                Ready to scale your business and reach new audiences?
              </p>
            </div>

            {/* Contact Info - Clean and Elegant */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground tracking-wide mb-2">REACH OUT</h4>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail size={14} className="text-[#8B3A3A]" />
                  <a href="mailto:dhirendraxd@gmail.com" className="text-sm hover:text-[#8B3A3A] transition-colors">
                    dhirendraxd@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground tracking-wide mb-2">CONNECT</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-[#8B3A3A] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={24} />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-[#8B3A3A] transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-[#8B3A3A] transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={24} />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-[#8B3A3A] transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1 tracking-wide">Step 1 of 1</p>
              <h3 className="text-3xl font-bold mb-2">Contact Me</h3>
              <p className="text-sm text-muted-foreground">
                Share your project details and I'll respond quickly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-taupe/40 text-foreground placeholder:text-muted-foreground/50 focus:border-[#8B3A3A] focus:ring-0 outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-taupe/40 text-foreground placeholder:text-muted-foreground/50 focus:border-[#8B3A3A] focus:ring-0 outline-none transition-colors duration-300"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-taupe/40 text-foreground placeholder:text-muted-foreground/50 focus:border-[#8B3A3A] focus:ring-0 outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#556B2F] text-white font-medium hover:bg-[#8B3A3A] transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
