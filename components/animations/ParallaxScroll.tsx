'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number; // Positive values scroll slower, negative values scroll faster
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export default function ParallaxScroll({
  children,
  speed = 0.5,
  className = '',
  direction = 'vertical',
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // For vertical parallax
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, direction === 'vertical' ? 100 * speed : 0]
  );

  // For horizontal parallax
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, direction === 'horizontal' ? 100 * speed : 0]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ 
          y: direction === 'vertical' ? yTransform : 0,
          x: direction === 'horizontal' ? xTransform : 0
        }}
      >
        {children}
      </motion.div>
    </div>
  );
} 