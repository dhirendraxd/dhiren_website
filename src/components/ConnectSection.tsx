import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

type Fields = { name: string; subject: string; email: string };
type Errors = Partial<Fields>;
type Touched = Partial<Record<keyof Fields, boolean>>;
type Status = "idle" | "sending" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Fields): Errors {
  const errs: Errors = {};
  if (!data.name.trim()) errs.name = "Name is required";
  if (!data.email.trim()) errs.email = "Email is required";
  else if (!emailRegex.test(data.email.trim())) errs.email = "Enter a valid email";
  if (!data.subject.trim()) errs.subject = "Subject is required";
  return errs;
}

const ConnectSection = () => {
  const [formData, setFormData] = useState<Fields>({ name: "", subject: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot: real users never see or fill this field; bots that auto-fill every input do.
  const [company, setCompany] = useState("");

  const isReady =
    formData.name.trim().length > 0 &&
    formData.subject.trim().length > 0 &&
    emailRegex.test(formData.email.trim());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (touched[e.target.name as keyof Fields]) {
      setErrors(validate(updated));
    }
    if (status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true });
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Bot filled the honeypot field — silently pretend success without sending.
    if (company.trim()) {
      setSubmitted(true);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS is not configured: missing VITE_EMAILJS_* environment variables.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim().slice(0, 100),
          subject: formData.subject.trim().slice(0, 200),
          email: formData.email.trim().toLowerCase().slice(0, 254),
        },
        { publicKey },
      );
      setStatus("idle");
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to send contact message:", err);
      setStatus("error");
    }
  };

  const fieldClass = (key: keyof Fields) =>
    `w-full bg-transparent border-0 border-b pb-4 text-[1.4rem] font-rajdhani tracking-tight placeholder:font-light placeholder:tracking-normal focus:outline-none transition-colors duration-200 ${
      touched[key] && errors[key]
        ? "border-[#7A3A30] text-[#3a3a3a] placeholder:text-[#c8bfb8] focus:border-[#7A3A30]"
        : "border-[#d4cbc0] text-[#3a3a3a] placeholder:text-[#c8bfb8] focus:border-[#3a3a3a]"
    }`;

  return (
    <section id="contact" className="pt-4 pb-0 px-8 md:px-12 bg-card font-rajdhani">
      <div className="max-w-[84rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center gap-12">

            <blockquote className="flex flex-col items-center gap-3">
              <span className="font-rajdhani text-[3.2rem] leading-none text-[#e4dbcf] select-none" aria-hidden="true">"</span>
              <p className="font-rajdhani text-[clamp(1.8rem,3.2vw,2.8rem)] tracking-tight text-[#3a3a3a] leading-snug max-w-[28ch] -mt-5">
                Half curiosity, half <span className="text-[#7A3A30]">"why not"</span> —<br /> that's most of what I do.
              </p>
            </blockquote>

            <div className="w-full flex items-center gap-6">
              <p className="shrink-0 font-rajdhani text-[1.5rem] font-bold tracking-tight text-[#3a3a3a]">Connect</p>
              <span className="flex-1 h-px bg-[#e9e1d6]/60" aria-hidden="true" />
              <nav className="flex items-center gap-6 shrink-0" role="navigation" aria-label="Social links">
                <a href="https://github.com/dhirendraxd" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="group inline-flex flex-col items-center gap-1 text-[#231d18] transition-opacity duration-200 hover:opacity-60">
                  <FaGithub size={22} />
                  <span className="h-px w-0 bg-[#231d18] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
                <a href="https://instagram.com/dhirendraxd" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="group inline-flex flex-col items-center gap-1 text-[#E4405F] transition-opacity duration-200 hover:opacity-60">
                  <FaInstagram size={22} />
                  <span className="h-px w-0 bg-[#E4405F] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
                <a href="https://linkedin.com/in/dhirendraxd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="group inline-flex flex-col items-center gap-1 text-[#0A66C2] transition-opacity duration-200 hover:opacity-60">
                  <FaLinkedinIn size={22} />
                  <span className="h-px w-0 bg-[#0A66C2] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
              </nav>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-4xl flex flex-col items-center gap-4 py-10"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border border-[#3a3a3a]">
                    <Check size={18} strokeWidth={1.75} className="text-[#3a3a3a]" />
                  </div>
                  <p className="font-rajdhani text-[1.4rem] tracking-tight text-[#3a3a3a]">Message sent — I'll get back to you soon.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", subject: "", email: "" }); setTouched({}); setErrors({}); setStatus("idle"); setCompany(""); }}
                    className="text-[0.7rem] font-rajdhani tracking-[0.14em] text-[#a89f96] hover:text-[#3a3a3a] transition-colors duration-200 underline underline-offset-4"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative w-full max-w-4xl flex flex-col gap-10 text-left"
                  aria-label="Contact form"
                >
                  {/* Honeypot field: hidden from sighted users and screen readers, catches bots that auto-fill every field */}
                  <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    {/* Name */}
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name" className="font-rajdhani text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#a89f96] flex items-center gap-1">
                        Name <span className="text-[#7A3A30]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text" autoComplete="name"
                        value={formData.name} onChange={handleChange}
                        placeholder="Your name"
                        aria-required="true"
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                        className={fieldClass("name")}
                      />
                      <AnimatePresence>
                        {touched.name && errors.name && (
                          <motion.p id="name-error" role="alert"
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            className="text-[0.65rem] text-[#7A3A30] tracking-wide -mt-1"
                          >{errors.name}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-3">
                      <label htmlFor="email" className="font-rajdhani text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#a89f96] flex items-center gap-1">
                        Email <span className="text-[#7A3A30]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email" autoComplete="email"
                        value={formData.email} onChange={handleChange}
                        placeholder="your@email.com"
                        aria-required="true"
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                        className={fieldClass("email")}
                      />
                      <AnimatePresence>
                        {touched.email && errors.email && (
                          <motion.p id="email-error" role="alert"
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            className="text-[0.65rem] text-[#7A3A30] tracking-wide -mt-1"
                          >{errors.email}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="subject" className="font-rajdhani text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#a89f96] flex items-center gap-1">
                      Subject <span className="text-[#7A3A30]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="subject" name="subject" type="text"
                      value={formData.subject} onChange={handleChange}
                      placeholder="What's on your mind?"
                      aria-required="true"
                      aria-invalid={!!(touched.subject && errors.subject)}
                      aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                      className={fieldClass("subject")}
                    />
                    <AnimatePresence>
                      {touched.subject && errors.subject && (
                        <motion.p id="subject-error" role="alert"
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                          className="text-[0.65rem] text-[#7A3A30] tracking-wide -mt-1"
                        >{errors.subject}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p role="alert"
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        className="text-[0.72rem] text-[#7A3A30] tracking-wide -mt-4"
                      >
                        Something went wrong sending your message. Please try again, or email me directly at{" "}
                        <a href="mailto:dhirendraxd@gmail.com" className="underline underline-offset-2">dhirendraxd@gmail.com</a>.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between">
                    <p className="text-[0.62rem] text-[#c8bfb8] tracking-wide">
                      <span className="text-[#7A3A30]">*</span> required fields
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex items-center gap-2.5 bg-[#f5f1eb] hover:bg-[#3a3a3a] hover:text-[#f5f1eb] text-[#3a3a3a] border border-[#d4cbc0] hover:border-[#3a3a3a] font-rajdhani font-normal text-[0.85rem] tracking-[0.14em] px-7 py-3.5 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#f5f1eb] disabled:hover:text-[#3a3a3a]"
                    >
                      <span>{status === "sending" ? "Sending" : "Send"}</span>
                      <motion.span
                        animate={status !== "sending" && isReady ? { x: [0, 4, 0] } : { x: 0 }}
                        transition={status !== "sending" && isReady ? { repeat: Infinity, duration: 1.1, ease: "easeInOut" } : {}}
                        className="flex items-center"
                        aria-hidden="true"
                      >
                        {status === "sending" ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </motion.span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
