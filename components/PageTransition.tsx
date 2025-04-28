'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  transition?: 'fade' | 'slide' | 'zoom' | 'slideUp' | 'slideDown';
  layoutId?: string;
}

export default function PageTransition({
  children,
  className = '',
  transition = 'fade',
  layoutId,
}: PageTransitionProps) {
  // Different transition variants
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.5 }
      },
      exit: { 
        opacity: 0,
        transition: { duration: 0.3 }
      }
    },
    slide: {
      hidden: { opacity: 0, x: -300 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          type: 'spring',
          damping: 30,
          stiffness: 300
        }
      },
      exit: { 
        opacity: 0, 
        x: 300,
        transition: { 
          type: 'spring',
          damping: 30,
          stiffness: 300
        }
      }
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          type: 'spring',
          damping: 25,
          stiffness: 300
        }
      },
      exit: { 
        opacity: 0, 
        scale: 1.1,
        transition: { duration: 0.2 }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: 'spring',
          damping: 25,
          stiffness: 300
        }
      },
      exit: { 
        opacity: 0, 
        y: -50,
        transition: { duration: 0.2 }
      }
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: 'spring',
          damping: 25,
          stiffness: 300
        }
      },
      exit: { 
        opacity: 0, 
        y: 50,
        transition: { duration: 0.2 }
      }
    }
  };

  // For layout animations
  if (layoutId) {
    return (
      <motion.div
        layoutId={layoutId}
        className={className}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    );
  }

  // For regular transitions
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants[transition]}
    >
      {children}
    </motion.div>
  );
} 