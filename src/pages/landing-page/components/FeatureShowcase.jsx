import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeatureShowcase = () => {
  const features = [
    {
      icon: "Users",
      title: "Real-time Collaboration",
      description: "Code together in real-time with live cursors, instant synchronization, and seamless conflict resolution.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: "Lock",
      title: "Private Rooms",
      description: "Create secure private coding environments for your team with advanced permission controls and member management.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: "Globe",
      title: "Public Rooms",
      description: "Join open coding sessions, learn from others, and contribute to community projects in public collaborative spaces.",
      gradient: "from-accent to-success"
    },
    {
      icon: "Code",
      title: "Integrated Development Tools",
      description: "Full-featured code editor with syntax highlighting, auto-completion, debugging tools, and terminal access.",
      gradient: "from-success to-primary"
    },
    {
      icon: "GitBranch",
      title: "Version Control",
      description: "Built-in Git integration with branch management, commit history, and collaborative merge workflows.",
      gradient: "from-primary to-warning"
    },
    {
      icon: "MessageCircle",
      title: "Team Communication",
      description: "Integrated chat, voice calls, and screen sharing to keep your team connected while coding.",
      gradient: "from-warning to-secondary"
    }
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
    <section id="features" className="relative py-20 px-4 lg:px-8">
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
            Powerful Features for{' '}
            <span className="text-primary">Modern Development</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to collaborate, create, and ship amazing code together
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group glass rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature.icon} size={32} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect indicator */}
              <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium mr-2">Learn more</span>
                <Icon name="ArrowRight" size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Room Types Highlight */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass rounded-3xl border border-border p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Choose Your Collaboration Style
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Lock" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">Private Rooms</h4>
                      <p className="text-muted-foreground">
                        Secure, invitation-only spaces for your team with advanced access controls
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                      <Icon name="Globe" size={20} className="text-success" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">Public Rooms</h4>
                      <p className="text-muted-foreground">
                        Open communities where developers learn, share, and build together
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="glass rounded-2xl border border-border p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Active Rooms</span>
                      <span className="text-sm text-success">●Live</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                        <Icon name="Lock" size={16} className="text-secondary" />
                        <span className="text-sm font-medium">Team Alpha Project</span>
                        <span className="text-xs text-muted-foreground ml-auto">5 members</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                        <Icon name="Globe" size={16} className="text-success" />
                        <span className="text-sm font-medium">Open Source Hackathon</span>
                        <span className="text-xs text-muted-foreground ml-auto">23 members</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                        <Icon name="Lock" size={16} className="text-secondary" />
                        <span className="text-sm font-medium">Client Project Beta</span>
                        <span className="text-xs text-muted-foreground ml-auto">3 members</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;