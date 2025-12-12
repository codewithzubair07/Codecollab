import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

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

  const benefits = [
    "Real-time collaboration",
    "Private & public rooms",
    "Integrated development tools",
    "Seamless team integration"
  ];

  return (
    <section className="relative pt-32 pb-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight"
          >
            Code Together,{' '}
            <span className="text-primary animate-pulse-glow">
              Create Amazing
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of developers in real-time collaborative coding. 
            Build, share, and innovate together on the world's most intuitive coding platform.
          </motion.p>

          {/* Benefits */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 glass rounded-full px-4 py-2 border border-border"
              >
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="xl"
              onClick={() => navigate('/register')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Start Coding Free
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

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by developers worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm">Active Developers</div>
              <div className="text-2xl font-bold">10M+</div>
              <div className="text-sm">Lines of Code</div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Companies</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateX: [0, 10, 0],
            rotateY: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-secondary/20 rounded-lg backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotateX: [0, -10, 0],
            rotateY: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary/20 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateZ: [0, 180, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-accent/20 rounded-full backdrop-blur-sm"
        />
      </div>
    </section>
  );
};

export default HeroSection;