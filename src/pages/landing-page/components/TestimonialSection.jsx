import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at TechCorp",
      company: "TechCorp",
      content: "Vibe Coding transformed how our team collaborates. The real-time features and private rooms make remote development seamless and efficient.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead at InnovateLabs",
      company: "InnovateLabs",
      content: "The integrated development tools and version control features have streamlined our workflow significantly. Best collaborative platform we've used.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      content: "Public rooms are amazing for learning and mentoring. I've improved my skills and helped others while working on real projects.",
      avatar: "EJ",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Engineering Manager",
      company: "DevSolutions",
      content: "The team communication features keep everyone connected. Code reviews and pair programming have never been easier.",
      avatar: "DK",
      rating: 5
    }
  ];

  const companies = [
    { name: "TechCorp", icon: "Building" },
    { name: "InnovateLabs", icon: "Zap" },
    { name: "StartupXYZ", icon: "Rocket" },
    { name: "DevSolutions", icon: "Code" },
    { name: "CloudTech", icon: "Cloud" },
    { name: "DataFlow", icon: "Database" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="testimonials" className="relative py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6"
          >
            Loved by{' '}
            <span className="text-primary">Developers Worldwide</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Join thousands of developers who trust Vibe Coding for their collaborative projects
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Logos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground mb-8"
          >
            Trusted by leading companies
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-8 opacity-60"
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 hover:opacity-100 transition-opacity"
              >
                <Icon name={company.icon} size={20} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;