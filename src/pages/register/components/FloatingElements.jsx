import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FloatingElements = () => {
  const codeElements = [
    { icon: 'Code2', delay: 0, duration: 8 },
    { icon: 'Braces', delay: 1, duration: 10 },
    { icon: 'Terminal', delay: 2, duration: 12 },
    { icon: 'GitBranch', delay: 3, duration: 9 },
    { icon: 'Database', delay: 4, duration: 11 },
    { icon: 'Cpu', delay: 5, duration: 7 }
  ];

  const geometricShapes = [
    { type: 'square', size: 32, delay: 0.5 },
    { type: 'circle', size: 24, delay: 1.5 },
    { type: 'triangle', size: 28, delay: 2.5 },
    { type: 'hexagon', size: 36, delay: 3.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Code Icons */}
      {codeElements.map((element, index) => (
        <motion.div
          key={`code-${index}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            y: -100,
            opacity: [0, 0.6, 0.8, 0.6, 0],
            rotate: 360,
            scale: [0.5, 1, 0.8, 1, 0.5],
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 3,
            ease: "linear"
          }}
        >
          <div className="relative">
            <Icon 
              name={element.icon} 
              size={24} 
              color="var(--color-primary)" 
              className="opacity-30"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm animate-pulse"></div>
          </div>
        </motion.div>
      ))}

      {/* Geometric Shapes */}
      {geometricShapes.map((shape, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute"
          initial={{
            x: -50,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            rotate: 0,
            scale: 0.3
          }}
          animate={{
            x: window.innerWidth + 50,
            opacity: [0, 0.4, 0.6, 0.4, 0],
            rotate: 180,
            scale: [0.3, 0.8, 1, 0.8, 0.3],
            y: Math.random() * window.innerHeight
          }}
          transition={{
            duration: 15,
            delay: shape.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 5,
            ease: "linear"
          }}
        >
          {shape.type === 'square' && (
            <div 
              className="border-2 border-secondary/30 rotate-45"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'circle' && (
            <div 
              className="border-2 border-accent/30 rounded-full"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && (
            <div 
              className="border-l-2 border-r-2 border-b-2 border-transparent border-b-success/30"
              style={{ 
                width: 0, 
                height: 0,
                borderLeftWidth: shape.size / 2,
                borderRightWidth: shape.size / 2,
                borderBottomWidth: shape.size
              }}
            />
          )}
          {shape.type === 'hexagon' && (
            <div className="relative">
              <div 
                className="border-2 border-warning/30 transform rotate-45"
                style={{ width: shape.size * 0.7, height: shape.size * 0.7 }}
              />
              <div 
                className="absolute inset-0 border-2 border-warning/30 transform -rotate-45"
                style={{ width: shape.size * 0.7, height: shape.size * 0.7 }}
              />
            </div>
          )}
        </motion.div>
      ))}

      {/* Particle System */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-accent/10 to-success/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default FloatingElements;