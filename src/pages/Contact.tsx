import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Floating Card Container */}
      <div className="floating-card min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)]">
        <Navbar />

        {/* Contact Content */}
        <section className="section-spacing px-8 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left Column - Info */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Let's work together
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Have a project in mind? I'd love to hear about it. Send me a
                    message and let's create something amazing.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">
                      EMAIL
                    </h3>
                    <a
                      href="mailto:hello@alexdesigner.com"
                      className="text-foreground hover:text-accent transition-colors duration-300"
                    >
                      hello@alexdesigner.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">
                      LOCATION
                    </h3>
                    <p className="text-foreground">San Francisco, CA</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Form */}
              <ContactForm />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
