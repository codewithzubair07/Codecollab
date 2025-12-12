import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userEmail, onResendVerification }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await onResendVerification(userEmail);
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error('Failed to resend verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success Animation */}
      <motion.div
        className="relative mx-auto w-24 h-24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-success to-success/70 rounded-full flex items-center justify-center">
          <Icon name="Check" size={32} color="white" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-success to-success/70 rounded-full blur-lg opacity-50 animate-pulse"></div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-success rounded-full"
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              x: Math.cos(i * 60 * Math.PI / 180) * 40,
              y: Math.sin(i * 60 * Math.PI / 180) * 40,
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              delay: 0.5 + i * 0.1,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </motion.div>

      {/* Success Message */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Welcome to CodeCollab!
        </h2>
        <p className="text-muted-foreground">
          Your account has been created successfully. We've sent a verification email to:
        </p>
        <p className="text-primary font-medium bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
          {userEmail}
        </p>
      </motion.div>

      {/* Email Verification Notice */}
      <motion.div
        className="bg-muted/30 border border-border rounded-lg p-4 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 text-warning">
          <Icon name="Mail" size={20} />
          <span className="font-medium">Email Verification Required</span>
        </div>
        <p className="text-sm text-muted-foreground text-left">
          Please check your email and click the verification link to activate your account. 
          Don't forget to check your spam folder if you don't see the email.
        </p>
      </motion.div>

      {/* Resend Verification */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-muted-foreground">
          Didn't receive the email?
        </p>
        
        {canResend ? (
          <Button
            variant="outline"
            onClick={handleResendVerification}
            loading={isResending}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resend Verification Email
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Resend available in {countdown}s</span>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="default"
          onClick={handleContinue}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
        >
          Continue to Dashboard
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/login')}
          iconName="LogIn"
          iconPosition="left"
          fullWidth
        >
          Sign In Instead
        </Button>
      </motion.div>

      {/* Help Text */}
      <motion.div
        className="text-center pt-4 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-xs text-muted-foreground">
          Need help? Contact our{' '}
          <button className="text-primary hover:text-primary/80 underline">
            support team
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationSuccess;