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
          <div className="max-w-7xl mx-auto">
            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
