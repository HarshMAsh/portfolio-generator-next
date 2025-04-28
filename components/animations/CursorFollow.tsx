'use client';

import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorFollowProps {
  children: ReactNode;
  className?: string;
  strength?: number; // How strongly the element follows the cursor (1-10)
  delay?: number; // Follow delay in seconds
  active?: boolean; // Whether the effect is active
}

export default function CursorFollow({
  children,
  className = '',
  strength = 2,
  delay = 0.1,
  active = true,
}: CursorFollowProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementCenter, setElementCenter] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Calculate the element's center position
  useEffect(() => {
    const updateElementPosition = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setElementCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateElementPosition();
    window.addEventListener('resize', updateElementPosition);
    window.addEventListener('scroll', updateElementPosition);

    return () => {
      window.removeEventListener('resize', updateElementPosition);
      window.removeEventListener('scroll', updateElementPosition);
    };
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate x and y movement based on cursor position relative to element center
  const moveX = (mousePosition.x - elementCenter.x) / (10 / strength);
  const moveY = (mousePosition.y - elementCenter.y) / (10 / strength);

  return (
    <motion.div
      ref={elementRef}
      className={className}
      animate={
        active
          ? {
              x: moveX,
              y: moveY,
              scale: isHovering ? 1.05 : 1,
            }
          : { x: 0, y: 0 }
      }
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1, delay }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {children}
    </motion.div>
  );
} 