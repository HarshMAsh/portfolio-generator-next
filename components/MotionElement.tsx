'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MotionElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'pulse' | 'bounce';
  whileHover?: 'grow' | 'lift' | 'glow' | 'none';
  whileTap?: 'shrink' | 'push' | 'none';
  viewport?: boolean;
}

export default function MotionElement({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  animation = 'fadeIn',
  whileHover = 'none',
  whileTap = 'none',
  viewport = false,
}: MotionElementProps) {
  // Define animation variants
  const variants = {
    // Initial states
    hidden: {
      fadeIn: { opacity: 0 },
      slideUp: { opacity: 0, y: 30 },
      slideDown: { opacity: 0, y: -30 },
      slideLeft: { opacity: 0, x: 30 },
      slideRight: { opacity: 0, x: -30 },
      scale: { opacity: 0, scale: 0.8 },
      pulse: { opacity: 0, scale: 0.8 },
      bounce: { opacity: 0, y: 50 },
    },
    // Animated states
    visible: {
      fadeIn: { opacity: 1, transition: { duration } },
      slideUp: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25, duration } },
      slideDown: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25, duration } },
      slideLeft: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25, duration } },
      slideRight: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25, duration } },
      scale: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25, duration } },
      pulse: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
          opacity: { duration: duration * 0.5 },
          scale: { duration, type: 'spring', stiffness: 300, damping: 10 } 
        } 
      },
      bounce: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          opacity: { duration: duration * 0.5 }, 
          y: { type: 'spring', stiffness: 400, damping: 8 } 
        } 
      },
    },
  };

  // Define hover animations
  const hoverAnimations = {
    grow: { scale: 1.02 },
    lift: { y: -5 },
    glow: { boxShadow: '0 0 8px rgba(255,255,255,0.5)' },
    none: {},
  };

  // Define tap animations
  const tapAnimations = {
    shrink: { scale: 0.95 },
    push: { y: 2 },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: variants.hidden[animation],
        visible: {
          ...variants.visible[animation],
          transition: {
            ...variants.visible[animation].transition,
            delay,
          },
        },
      }}
      whileHover={hoverAnimations[whileHover]}
      whileTap={tapAnimations[whileTap]}
      viewport={viewport ? { once: true, amount: 0.2 } : undefined}
    >
      {children}
    </motion.div>
  );
} 