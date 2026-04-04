import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
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
    <footer id="contact" className="scroll-mt-24 bg-card px-4 py-18 font-sans sm:px-8 md:px-12">
      <div className="mx-auto max-w-[76rem]">
        <div>
          <div className="mx-auto mb-8 max-w-[64rem] text-center space-y-3 md:space-y-4">
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Reach out and let&apos;s chat.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative mx-auto max-w-[64rem] space-y-7">
              <div className="absolute -right-1 -top-1 hidden h-12 w-12 grid-cols-6 grid-rows-6 gap-[2px] opacity-35 sm:grid">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-foreground/80" />
                ))}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Name.<span className="text-foreground">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-foreground focus:outline-none"
                    placeholder="Hello..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email.<span className="text-foreground">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-foreground focus:outline-none"
                    placeholder="Where can I reply"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="min-h-[72px] w-full border-b border-border bg-transparent px-0 py-2.5 text-sm leading-snug text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-foreground focus:outline-none resize-none"
                  placeholder="Share your project or idea in short"
                />
              </div>

              <div className="flex flex-col items-end gap-1 pt-0">
                <div className="relative h-10 w-[112px] overflow-visible">
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
                        className="group absolute inset-0 inline-flex items-center justify-center rounded-none border border-foreground bg-[#f7f4ee] text-foreground text-sm font-medium transition-colors duration-300 hover:bg-[#7A3A30] hover:text-white disabled:cursor-not-allowed disabled:opacity-75"
                      >
                        <span>{isSubmitting ? "Sending" : "Send Me"}</span>
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

        <div className="mt-6 border-t border-border/70 pt-4 pb-4 md:pb-5">
          <div className="flex flex-col gap-3 text-center text-xs text-muted-foreground">
            <p>"The rest I'll figure out mid-fall." </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
