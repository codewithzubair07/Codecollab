import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: 'Your data is encrypted'
    },
    {
      icon: 'Github',
      text: 'GitHub Integration',
      description: 'Seamless version control'
    },
    {
      icon: 'Users',
      text: '10K+ Developers',
      description: 'Trusted by professionals'
    },
    {
      icon: 'Award',
      text: 'SOC 2 Compliant',
      description: 'Enterprise security'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 pt-6 border-t border-border"
    >
      <div className="grid grid-cols-2 gap-4">
        {trustBadges.map((badge, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200"
          >
            <div className="flex-shrink-0">
              <Icon 
                name={badge.icon} 
                size={16} 
                color="var(--color-success)" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {badge.text}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {badge.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-4 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Protected by industry-standard security protocols
        </p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success">Secure Connection</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">256-bit Encryption</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrustSignals;