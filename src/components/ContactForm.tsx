import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    "Partner Program",
    "Employment",
    "Online Services",
    "Digital Payments",
    "Membership",
    "Delivery",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize inputs before processing
    const sanitizedData = {
      firstName: formData.firstName.trim().slice(0, 100),
      lastName: formData.lastName.trim().slice(0, 100),
      email: formData.email.trim().toLowerCase().slice(0, 254),
      phone: formData.phone.trim().slice(0, 20),
      message: formData.message.trim().slice(0, 1000),
      topics: selectedTopics,
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

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Form */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm text-muted-foreground">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-0 outline-none transition-colors duration-300"
              placeholder="E.g., Mauriel, Alarik, Phillips, etc..."
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="lastName" className="text-sm text-muted-foreground">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-0 outline-none transition-colors duration-300"
              placeholder="E.g., Zellizer, Johnson, Maverik, etc..."
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-0 outline-none transition-colors duration-300"
              placeholder="E.g., nickname@domain.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm text-muted-foreground">
              Phone
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-0 py-2 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-0 outline-none transition-colors duration-300"
                placeholder="+1 (800) 000-000"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-0 outline-none transition-colors duration-300 resize-none"
              placeholder="Leave us a message"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm text-muted-foreground">Topics of interests</label>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                    selectedTopics.includes(topic)
                      ? "bg-accent text-white"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {topic}
                </button>
              ))}
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary flex items-center justify-center transition-colors duration-300"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-accent/20 text-accent rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Send Message
          </button>
        </form>
      </div>

      {/* Right Column - Contact Info */}
      <div className="space-y-6">
        {/* Talk with us */}
        <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">Talk with us</h3>
          <p className="text-sm text-muted-foreground">
            Have any queries? Reach out to our experts by any means of communication you can opt into.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <a href="mailto:customer@iamdhriz.com" className="text-sm hover:text-accent transition-colors">
                customer@iamdhriz.com
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Whatsapp</p>
              <a href="https://wa.me" className="text-sm hover:text-accent transition-colors">
                Add us on whatsapp +
              </a>
            </div>
          </div>
        </div>

        {/* Give us a call */}
        <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">Give us a call</h3>
          <p className="text-sm text-muted-foreground">
            Call our team from Monday to Friday from 8:00 to 20:00.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Local</p>
              <a href="tel:+16504341755" className="text-sm hover:text-accent transition-colors">
                +1 (650) 434 - 1755
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">United</p>
              <a href="tel:+16845830015" className="text-sm hover:text-accent transition-colors">
                +1 (684) 583 - 0015
              </a>
            </div>
          </div>
        </div>

        {/* Come visit */}
        <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">Come visit</h3>
          <p className="text-sm text-muted-foreground">Meet us in person</p>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm">
              Av. Dr. Plinio Nybor Seixos Lote Jardines del Este Ciudadela Satélite, Santiago de los Caballeros Dominican Republic
            </p>
          </div>
          <div className="w-full h-32 bg-secondary/50 rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-blue-900/20 flex items-center justify-center">
              <MapPin className="text-muted-foreground" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
