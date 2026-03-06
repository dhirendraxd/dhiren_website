import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Navigation, Send } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [isSendAnimating, setIsSendAnimating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSendAnimating) {
      return;
    }

    const sanitizedData = {
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().toLowerCase().slice(0, 254),
      organization: formData.organization.trim().slice(0, 100),
      projectType: formData.projectType.trim().slice(0, 80),
      message: formData.message.trim().slice(0, 1000),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid email address",
        description: "Please enter a valid email and try again.",
      });
      return;
    }

    console.log("Form submitted:", sanitizedData);
    setIsSendAnimating(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer id="contact" className="py-16 px-8 md:px-12 bg-card font-sans">
      <div className="max-w-[76rem] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div className="rounded-2xl bg-muted/35 p-8 space-y-8">
            <div className="space-y-4">
              <p className="text-base font-semibold tracking-tight text-foreground">Dhirendra</p>
              <p className="text-sm text-foreground/80 max-w-xs">
                Performance marketing and digital growth strategy for meaningful products.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/70 bg-background text-muted-foreground">
                    <AtSign size={13} strokeWidth={1.8} />
                  </span>
                  <span>Email me</span>
                </div>
                <a
                  href="mailto:dhirendraxd@gmail.com"
                  className="block pl-9 text-muted-foreground leading-relaxed hover:text-foreground transition-colors"
                >
                  dhirendraxd@gmail.com
                </a>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/70 bg-background text-muted-foreground">
                    <Navigation size={13} strokeWidth={1.8} />
                  </span>
                  <span>Based in</span>
                </div>
                <p className="pl-9 text-muted-foreground leading-relaxed">
                  Kathmandu, Nepal
                  <br />
                  Open to remote &amp; hybrid collaboration
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">Get in touch.</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                    Your name <span className="text-foreground">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-0 border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                    placeholder="Enter name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                    Your email <span className="text-foreground">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-0 border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                    placeholder="Enter email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="text-xs font-medium text-muted-foreground">
                    Organization / Brand
                  </label>
                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                    placeholder="Team or brand name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-xs font-medium text-muted-foreground">
                    Project type
                  </label>
                  <input
                    id="projectType"
                    type="text"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground"
                    placeholder="SEO, content, web, collaboration"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground resize-none"
                  placeholder="Share your goals, timeline, and what support you need."
                />
              </div>

              <div className="flex justify-end pt-2">
                <div className="relative h-9 w-[96px] overflow-visible">
                  <AnimatePresence mode="wait">
                    {isSendAnimating ? (
                      <motion.div
                        key="send-plane"
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: [0, 16, 0, -16, 0, 320],
                          y: [0, -14, -28, -14, 0, -190],
                          rotate: [0, 90, 180, 270, 360, 402],
                          opacity: [1, 1, 1, 1, 1, 0],
                          scale: [1, 1.02, 1.03, 1.02, 1, 0.8],
                        }}
                        transition={{
                          duration: 0.92,
                          times: [0, 0.18, 0.36, 0.54, 0.72, 1],
                          ease: "easeIn",
                        }}
                        onAnimationComplete={() => {
                          setIsSendAnimating(false);
                          setFormData({
                            name: "",
                            email: "",
                            organization: "",
                            projectType: "",
                            message: "",
                          });
                          toast({
                            title: "Message sent",
                            description: "Thanks for reaching out. I will get back to you within 24 hours.",
                          });
                        }}
                        className="absolute inset-0 inline-flex items-center justify-center text-foreground pointer-events-none"
                      >
                        <Send size={18} />
                      </motion.div>
                    ) : (
                      <motion.button
                        key="send-button"
                        type="submit"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        transition={{ duration: 0.22 }}
                        className="absolute inset-0 inline-flex items-center justify-center rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Send
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/70">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center text-xs text-muted-foreground">
            <p className="text-center md:text-left">©2026 Dhiren - All rights reserved</p>

            <div className="flex items-center justify-center gap-5">
              <a href="/#about" className="hover:text-foreground transition-colors">What I Work On</a>
              <a href="/#projects" className="hover:text-foreground transition-colors">Projects</a>
              <a href="/#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>

            <div className="flex items-center justify-center md:justify-self-end gap-3 text-foreground/65">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors">
                <FaLinkedinIn size={14} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-foreground transition-colors">
                <FaXTwitter size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="https://github.com/dhirendraxd" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
                <FaGithub size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
