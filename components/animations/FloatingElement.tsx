'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  amplitude?: number;
  delay?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  duration = 5,
  amplitude = 10,
  delay = 0,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
} 