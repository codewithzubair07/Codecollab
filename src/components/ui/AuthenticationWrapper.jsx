import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationWrapper = ({ children }) => {
  const location = useLocation();
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    if (isAuthPage) {
      setIsVisible(true);
      // Generate floating particles for background effect
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 10
      }));
      setParticles(newParticles);
    } else {
      setIsVisible(false);
    }
  }, [isAuthPage]);

  if (!isAuthPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/10 rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/5 rotate-45 animate-float"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center transform-3d animate-pulse-glow">
                  <Icon name="Code2" size={24} color="var(--color-primary-foreground)" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-lg opacity-50"></div>
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">CodeCollab</h1>
                <p className="text-sm text-muted-foreground">Collaborative Coding Platform</p>
              </div>
            </div>
          </div>

          {/* Auth Form Container */}
          <div className="glass border border-border rounded-2xl p-8 shadow-focused animate-scale-in">
            {children}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-fade-in">
            <p className="text-xs text-muted-foreground">
              © 2025 CodeCollab. Empowering developers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Lighting Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
    </div>
  );
};

export default AuthenticationWrapper;