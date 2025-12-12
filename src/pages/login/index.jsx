import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import ParticleBackground from './components/ParticleBackground';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <AuthenticationWrapper>
      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground />

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Login Form Container */}
            <div className="glass border border-border rounded-2xl p-8 shadow-focused">
              <LoginForm />
              <TrustSignals />
            </div>
          </motion.div>
        </div>

        {/* Additional Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80 pointer-events-none" />
      </div>
    </AuthenticationWrapper>
  );
};

export default LoginPage;