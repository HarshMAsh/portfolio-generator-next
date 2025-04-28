'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number; // 0-1, percentage of element that must be visible to trigger animation
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  distance = 50,
  duration = 0.6,
  delay = 0,
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  // Initial animation states based on direction
  const initialStates = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
    none: { opacity: 0, scale: 0.95 },
  };

  // Animation variants
  const variants = {
    hidden: initialStates[direction],
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
} 