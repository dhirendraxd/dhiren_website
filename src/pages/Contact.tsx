import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import ismailIllustration from "@/assets/ismail-illustration.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedData = {
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().toLowerCase().slice(0, 254),
      message: formData.message.trim().slice(0, 1000),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      console.error("Invalid email format");
      return;
    }

    console.log("Contact page form submitted:", sanitizedData);
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#5d5ae6] px-4 py-8 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(164,170,255,0.3),transparent_38%),radial-gradient(circle_at_90%_15%,rgba(146,152,255,0.25),transparent_32%),radial-gradient(circle_at_80%_90%,rgba(112,116,238,0.4),transparent_42%)]" />
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#8a86ff]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#7f7bff]/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[30px] bg-[#f8f9ff] px-6 py-8 shadow-[0_32px_70px_rgba(23,25,101,0.35)] sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute -left-9 top-14 h-11 w-20 rounded-full bg-[#5d5ae6]" />
          <div className="pointer-events-none absolute -left-9 top-[46%] h-11 w-20 rounded-full bg-[#5d5ae6]" />
          <div className="pointer-events-none absolute -left-9 bottom-14 h-11 w-20 rounded-full bg-[#5d5ae6]" />
          <div className="pointer-events-none absolute -right-9 top-10 h-11 w-20 rounded-full bg-[#5d5ae6]" />
          <div className="pointer-events-none absolute -right-9 top-[55%] h-11 w-20 rounded-full bg-[#5d5ae6]" />
          <div className="pointer-events-none absolute -right-9 bottom-12 h-11 w-20 rounded-full bg-[#5d5ae6]" />

          <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
            <div className="space-y-7">
              <div className="space-y-3">
                <h1 className="font-nekst text-4xl font-semibold tracking-tight text-[#4b45af] sm:text-5xl">Let&apos;s talk</h1>
                <p className="max-w-sm text-sm leading-relaxed text-[#7b7ea8]">
                  To request a quote or want to meet up for coffee contact us directly or fill out the form and we
                  will get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#8083aa]">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Type your name"
                    className="h-12 w-full rounded-2xl border border-transparent bg-[#ececf8] px-4 text-sm text-[#666b90] placeholder:text-[#a7abc5] transition-colors focus:border-[#8a82ff] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#8083aa]">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Type your email"
                    className="h-12 w-full rounded-2xl border border-transparent bg-[#ececf8] px-4 text-sm text-[#666b90] placeholder:text-[#a7abc5] transition-colors focus:border-[#8a82ff] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#8083aa]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Type something if you want..."
                    className="w-full resize-none rounded-2xl border border-transparent bg-[#ececf8] px-4 py-3 text-sm text-[#666b90] placeholder:text-[#a7abc5] transition-colors focus:border-[#8a82ff] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 h-12 w-full max-w-[190px] rounded-full bg-gradient-to-r from-[#6d66f8] to-[#6f8eff] text-sm font-semibold text-white shadow-[0_12px_22px_rgba(99,92,238,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(99,92,238,0.45)]"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="flex flex-col items-start gap-6 lg:pt-4">
              <div className="mx-auto w-full max-w-[270px] rounded-3xl bg-white/60 p-4 shadow-[0_14px_26px_rgba(99,92,238,0.14)]">
                <img
                  src={ismailIllustration}
                  alt="Contact illustration"
                  className="mx-auto h-auto w-full max-w-[220px] object-contain"
                />
              </div>

              <div className="space-y-3 text-sm text-[#7a7da5]">
                <p className="flex items-start gap-2 leading-relaxed">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#878ac0]" />
                  Kathmandu, Nepal
                  <br />
                  Open to remote collaboration
                </p>
                <a href="tel:+9779800000000" className="flex items-center gap-2 hover:text-[#5d5ae6]">
                  <Phone size={16} className="shrink-0 text-[#878ac0]" />
                  +977 9800000000
                </a>
                <a href="mailto:dhirendraxd@gmail.com" className="flex items-center gap-2 hover:text-[#5d5ae6]">
                  <Mail size={16} className="shrink-0 text-[#878ac0]" />
                  dhirendraxd@gmail.com
                </a>
              </div>

              <div className="mt-2 flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4f78dc] text-white transition-transform hover:-translate-y-0.5"
                >
                  <FaFacebookF size={15} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4ac0ef] text-white transition-transform hover:-translate-y-0.5"
                >
                  <FaTwitter size={15} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b673f2] text-white transition-transform hover:-translate-y-0.5"
                >
                  <FaInstagram size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
