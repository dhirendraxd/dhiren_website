import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      icon: "🎨",
      title: "Brand Identity",
      description: "Creating unique visual identities that capture your brand essence and resonate with your audience."
    },
    {
      icon: "📱",
      title: "UI/UX Design",
      description: "Designing intuitive digital experiences that engage users and drive conversions."
    },
    {
      icon: "🖼️",
      title: "Graphic Design",
      description: "Crafting compelling visuals for print and digital media that communicate your message."
    },
    {
      icon: "📷",
      title: "Creative Direction",
      description: "Leading creative projects from concept to completion with strategic vision."
    }
  ];

  return (
    <section className="py-20 px-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-foreground">SERVICES</h2>
          <div className="w-8 h-0.5 bg-accent mx-auto mt-3"></div>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-6">
            I offer a range of creative services to help bring your vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:bg-secondary/50 transition-colors duration-300"
            >
              <span className="text-4xl">{service.icon}</span>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
