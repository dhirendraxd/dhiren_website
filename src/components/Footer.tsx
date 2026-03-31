import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const { toast } = useToast();
  const [isSendAnimating, setIsSendAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSendAnimating || isSubmitting) {
      return;
    }

    const sanitizedData = {
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().toLowerCase().slice(0, 254),
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

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        variant: "destructive",
        title: "Contact form unavailable",
        description: "Email service is not configured correctly. Please try again later.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: sanitizedData.name,
          from_name: sanitizedData.name,
          email: sanitizedData.email,
          from_email: sanitizedData.email,
          reply_to: sanitizedData.email,
          message: sanitizedData.message,
          submitted_at: new Date().toISOString(),
        },
        {
          publicKey,
        }
      );

      setIsSendAnimating(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Could not send message",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer id="contact" className="scroll-mt-24 py-16 px-8 md:px-12 bg-card font-sans">
      <div className="max-w-[76rem] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div className="space-y-8 pt-2">
            <div className="space-y-5 text-sm">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <span className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground">
                    <AtSign size={13} strokeWidth={1.8} />
                  </span>
                  <span>Email me</span>
                </div>
                <a
                  href="mailto:dhirendraxd@gmail.com"
                  className="block pl-9 text-muted-foreground leading-relaxed hover:text-[#7A3A30] transition-colors duration-200"
                >
                  dhirendraxd@gmail.com
                </a>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <span className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground">
                    <MapPin size={13} strokeWidth={1.8} />
                  </span>
                  <span>Based in</span>
                </div>
                <p className="pl-9 text-muted-foreground leading-relaxed">
                  Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>

          <div>
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
                        disabled={isSubmitting}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        transition={{ duration: 0.22 }}
                        className="group absolute inset-0 inline-flex items-center justify-center rounded-none border border-foreground bg-foreground text-background text-sm font-medium transition-colors duration-300 hover:bg-[#7A3A30] hover:border-[#7A3A30] hover:text-[#FFF5F0] disabled:cursor-not-allowed disabled:opacity-75"
                      >
                        <span>{isSubmitting ? "Sending" : "Send"}</span>
                        <Send
                          size={14}
                          className="ml-0 w-0 opacity-0 transition-all duration-300 group-hover:ml-1 group-hover:w-[14px] group-hover:opacity-100"
                        />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/70">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
            <p className="text-center md:text-left">© 2026 Dhiren. All rights reserved.</p>

            <nav className="flex items-center justify-center gap-5" aria-label="Footer quick links">
              <a href="/#about" className="hover:text-[#7A3A30] hover:underline underline-offset-4 decoration-2 decoration-[#7A3A30] transition-colors duration-200">What I Work On</a>
              <a href="/#projects" className="hover:text-[#7A3A30] hover:underline underline-offset-4 decoration-2 decoration-[#7A3A30] transition-colors duration-200">Projects</a>
              <a href="/#contact" className="hover:text-[#7A3A30] hover:underline underline-offset-4 decoration-2 decoration-[#7A3A30] transition-colors duration-200">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
