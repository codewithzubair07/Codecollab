import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  const features = [
    "Free tier available",
    "No credit card required",
    "Setup in 2 minutes",
    "24/7 support"
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
    <section className="relative py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-3xl border border-border p-8 lg:p-16 text-center bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6"
          >
            Ready to Transform Your{' '}
            <span className="text-primary">Development Workflow?</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Join thousands of developers who are already collaborating, learning, and building amazing things together.
          </motion.p>

          {/* Features List */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-card rounded-full px-4 py-2 border border-border"
              >
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              size="xl"
              onClick={() => navigate('/register')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
              iconName="Rocket"
              iconPosition="left"
            >
              Start Coding Now
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => navigate('/login')}
              className="border-border hover:bg-muted transform hover:scale-105 transition-all duration-300"
              iconName="LogIn"
              iconPosition="left"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground"
          >
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </button>
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-16 h-16 bg-primary/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotateZ: [0, -10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-10 w-20 h-20 bg-secondary/10 rounded-lg backdrop-blur-sm"
        />
      </div>
    </section>
  );
};

export default CTASection;