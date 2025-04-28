'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  type?: 'letter' | 'word';
  staggerDuration?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export default function TextReveal({
  text,
  className = '',
  type = 'letter',
  staggerDuration = 0.05,
  startDelay = 0,
  onComplete,
}: TextRevealProps) {
  // Split text by letters or words
  const elements = type === 'letter' 
    ? text.split('') 
    : text.split(' ').map(word => `${word} `);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: startDelay,
        when: 'beforeChildren',
        staggerDirection: 1,
        onComplete: onComplete,
      },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={elementVariants}
        >
          {element}
        </motion.span>
      ))}
    </motion.span>
  );
} 