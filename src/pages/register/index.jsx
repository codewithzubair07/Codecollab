import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';
import FloatingElements from './components/FloatingElements';
import Button from '../../components/ui/Button';


const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      setRegisteredEmail(formData.email);
      setCurrentStep('success');
      
      // Store user data in localStorage for demo
      localStorage.setItem('userRegistration', JSON.stringify({
        ...formData,
        registeredAt: new Date().toISOString(),
        verified: false
      }));
      
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockEmail = provider === 'github' ? 'user@github.com' : 'user@gmail.com';
      setRegisteredEmail(mockEmail);
      setCurrentStep('success');
      
      // Store social registration data
      localStorage.setItem('userRegistration', JSON.stringify({
        email: mockEmail,
        provider: provider,
        registeredAt: new Date().toISOString(),
        verified: true // Social logins are pre-verified
      }));
      
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async (email) => {
    // Simulate resend verification email
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Verification email resent to:', email);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <AuthenticationWrapper>
      <FloatingElements />
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 'form' && (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1 
                  className="text-3xl font-heading font-bold text-foreground mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Join CodeCollab
                </motion.h1>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Start collaborating with developers worldwide
                </motion.p>
              </div>

              {/* Social Registration */}
              <SocialRegistration onSocialRegister={handleSocialRegister} />

              {/* Registration Form */}
              <RegistrationForm 
                onSubmit={handleFormSubmit} 
                isLoading={isLoading}
              />

              {/* Login Link */}
              <motion.div 
                className="text-center mt-6 pt-6 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    onClick={handleBackToLogin}
                    className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                  >
                    Sign in here
                  </Button>
                </p>
              </motion.div>
            </motion.div>
          )}

          {currentStep === 'success' && (
            <motion.div
              key="registration-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <RegistrationSuccess 
                userEmail={registeredEmail}
                onResendVerification={handleResendVerification}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  className="w-16 h-16 mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"></div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-foreground font-medium">Creating your account...</p>
                  <p className="text-sm text-muted-foreground">This will only take a moment</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Button */}
        <motion.div
          className="absolute -bottom-16 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Need help?
          </Button>
        </motion.div>
      </div>
    </AuthenticationWrapper>
  );
};

export default Register;