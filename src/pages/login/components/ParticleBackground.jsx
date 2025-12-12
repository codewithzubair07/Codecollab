import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? 'var(--color-primary)' : 
             i % 3 === 1 ? 'var(--color-secondary)': 'var(--color-accent)'
    }));
    setParticles(newParticles);

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(particle.id) * 10, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Interactive Glow Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)`,
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-primary/20"
        style={{ transform: 'rotate(45deg)' }}
        animate={{
          rotate: [45, 90, 45],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/20"
        style={{ transform: 'rotate(12deg)' }}
        animate={{
          rotate: [12, 57, 12],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10"
        style={{ transform: 'rotate(45deg)' }}
        animate={{
          rotate: [45, 135, 45],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Code-themed Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/3 text-6xl font-mono text-primary transform rotate-12">
          {'</>'}
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl font-mono text-secondary transform -rotate-12">
          {'{}'}
        </div>
        <div className="absolute top-2/3 left-1/6 text-5xl font-mono text-accent transform rotate-45">
          {'()'}
        </div>
      </div>

      {/* Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    </div>
  );
};

export default ParticleBackground;