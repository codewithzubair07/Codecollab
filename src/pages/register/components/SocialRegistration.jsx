import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialRegister }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'bg-[#333] hover:bg-[#444]',
      description: 'Connect with your GitHub account'
    },
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-[#4285f4] hover:bg-[#3367d6]',
      description: 'Sign up with Google'
    }
  ];

  const handleSocialRegister = async (provider) => {
    setLoadingProvider(provider.id);
    try {
      await onSocialRegister(provider.id);
    } catch (error) {
      console.error(`${provider.name} registration failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <motion.div
            key={provider.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialRegister(provider)}
              loading={loadingProvider === provider.id}
              disabled={loadingProvider !== null}
              className="relative overflow-hidden group"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <Icon 
                    name={provider.icon} 
                    size={20} 
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  {loadingProvider === provider.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <span className="font-medium">Continue with {provider.name}</span>
              </div>
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Privacy Policy
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SocialRegistration;