'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

type AnimationType = 'fade' | 'slide' | 'zoom' | 'flip' | 'bounce' | 'none';
type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type AnimationCurve = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

type AnimationConfig = {
  type: AnimationType;
  direction: AnimationDirection;
  duration: number;
  delay: number;
  curve: AnimationCurve;
  enabled: boolean;
};

type AnimatedSectionProps = {
  children: React.ReactNode;
  sectionId: string;
  entranceAnimation?: AnimationConfig;
  hoverAnimation?: AnimationConfig;
  scrollAnimation?: AnimationConfig;
  className?: string;
};

const getEntranceVariants = (animation: AnimationConfig) => {
  if (!animation.enabled || animation.type === 'none') {
    return { initial: {}, animate: {} };
  }

  const initialState: any = {};
  const animateState: any = {};

  // Define initial states based on animation type
  switch (animation.type) {
    case 'fade':
      initialState.opacity = 0;
      animateState.opacity = 1;
      break;
    case 'slide':
      initialState.opacity = 0;
      animateState.opacity = 1;
      
      switch (animation.direction) {
        case 'up':
          initialState.y = 50;
          animateState.y = 0;
          break;
        case 'down':
          initialState.y = -50;
          animateState.y = 0;
          break;
        case 'left':
          initialState.x = 50;
          animateState.x = 0;
          break;
        case 'right':
          initialState.x = -50;
          animateState.x = 0;
          break;
      }
      break;
    case 'zoom':
      initialState.opacity = 0;
      initialState.scale = 0.9;
      animateState.opacity = 1;
      animateState.scale = 1;
      break;
    case 'flip':
      initialState.opacity = 0;
      animateState.opacity = 1;
      
      switch (animation.direction) {
        case 'up':
          initialState.rotateX = 90;
          animateState.rotateX = 0;
          break;
        case 'down':
          initialState.rotateX = -90;
          animateState.rotateX = 0;
          break;
        case 'left':
          initialState.rotateY = -90;
          animateState.rotateY = 0;
          break;
        case 'right':
          initialState.rotateY = 90;
          animateState.rotateY = 0;
          break;
      }
      break;
    case 'bounce':
      initialState.y = 0;
      animateState.y = [0, -20, 0, -10, 0, -5, 0];
      break;
  }

  return {
    initial: initialState,
    animate: animateState,
  };
};

const getHoverVariants = (animation: AnimationConfig) => {
  if (!animation?.enabled || animation?.type === 'none') {
    return {};
  }

  const hoverState: any = {};

  switch (animation.type) {
    case 'zoom':
      hoverState.scale = 1.05;
      break;
    case 'fade':
      hoverState.opacity = 0.8;
      break;
    case 'slide':
      switch (animation.direction) {
        case 'up':
          hoverState.y = -5;
          break;
        case 'down':
          hoverState.y = 5;
          break;
        case 'left':
          hoverState.x = -5;
          break;
        case 'right':
          hoverState.x = 5;
          break;
      }
      break;
    case 'bounce':
      // Bounce is handled by CSS animation
      hoverState.y = -5;
      break;
  }

  return {
    whileHover: hoverState
  };
};

const getScrollVariants = (animation: AnimationConfig) => {
  if (!animation?.enabled || animation?.type === 'none') {
    return {};
  }

  const initialState: any = {};
  const animateState: any = {};

  switch (animation.type) {
    case 'fade':
      initialState.opacity = 0;
      animateState.opacity = 1;
      break;
    case 'slide':
      initialState.opacity = 0;
      animateState.opacity = 1;
      
      switch (animation.direction) {
        case 'up':
          initialState.y = 50;
          animateState.y = 0;
          break;
        case 'down':
          initialState.y = -50;
          animateState.y = 0;
          break;
        case 'left':
          initialState.x = 50;
          animateState.x = 0;
          break;
        case 'right':
          initialState.x = -50;
          animateState.x = 0;
          break;
      }
      break;
    case 'zoom':
      initialState.opacity = 0;
      initialState.scale = 0.95;
      animateState.opacity = 1;
      animateState.scale = 1;
      break;
  }

  return {
    initial: initialState,
    animate: animateState,
  };
};

const getTransition = (animation: AnimationConfig) => {
  const transition: any = {
    duration: animation.duration,
    delay: animation.delay,
  };

  switch (animation.curve) {
    case 'linear':
      transition.ease = 'linear';
      break;
    case 'ease':
      transition.ease = 'easeInOut';
      break;
    case 'ease-in':
      transition.ease = 'easeIn';
      break;
    case 'ease-out':
      transition.ease = 'easeOut';
      break;
    case 'ease-in-out':
      transition.ease = 'easeInOut';
      break;
    case 'spring':
      transition.type = 'spring';
      transition.stiffness = 150;
      transition.damping = 20;
      break;
  }

  return transition;
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  sectionId,
  entranceAnimation = {
    type: 'fade',
    direction: 'up',
    duration: 0.5,
    delay: 0.2,
    curve: 'ease-out',
    enabled: true
  },
  hoverAnimation,
  scrollAnimation,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [hasPlayed, setHasPlayed] = useState(false);

  // Effects for entrance animations
  useEffect(() => {
    if (!entranceAnimation?.enabled || hasPlayed) return;
    
    controls.start('animate');
    setHasPlayed(true);
  }, [controls, entranceAnimation, hasPlayed]);

  // Effects for scroll animations
  useEffect(() => {
    if (!scrollAnimation?.enabled) return;
    
    if (isInView) {
      controls.start('animate');
    } else if (!hasPlayed) {
      controls.start('initial');
    }
  }, [controls, isInView, scrollAnimation, hasPlayed]);

  // Use appropriate animation settings
  const variants = entranceAnimation?.enabled
    ? getEntranceVariants(entranceAnimation)
    : scrollAnimation?.enabled
    ? getScrollVariants(scrollAnimation)
    : { initial: {}, animate: {} };

  const transition = entranceAnimation?.enabled
    ? getTransition(entranceAnimation)
    : scrollAnimation?.enabled
    ? getTransition(scrollAnimation)
    : { duration: 0.5 };

  const hoverVariants = hoverAnimation?.enabled
    ? getHoverVariants(hoverAnimation)
    : {};

  // Combine all animation properties
  const animationProps = {
    ref,
    initial: 'initial',
    animate: controls,
    variants,
    transition,
    ...hoverVariants,
    className
  };

  // Apply special bounce hover animation if specified
  const isBounceHover = hoverAnimation?.enabled && hoverAnimation.type === 'bounce';
  const hoverClassName = isBounceHover ? 'hover:animate-bounce' : '';

  return (
    <motion.div
      {...animationProps}
      className={`${className} ${hoverClassName}`}
      data-section-id={sectionId}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 