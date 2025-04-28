import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimationsStore } from '@/lib/animations';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedElementProps {
  sectionId: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
  animationDelay?: number;
}

export function AnimatedElement({
  sectionId,
  className,
  children,
  id,
  animationDelay = 0, // Additional delay to stagger animations
}: AnimatedElementProps) {
  const { getSectionAnimations, isPreviewMode } = useAnimationsStore();
  const [hasEntered, setHasEntered] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const animations = getSectionAnimations(sectionId);
  
  // For scroll animations
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: !isPreviewMode, // Only trigger once unless in preview mode
  });
  
  // Combined ref for the element
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Connect the two refs
  const setRefs = (node: HTMLDivElement) => {
    // for the intersection observer
    inViewRef(node);
    // for our component
    if (elementRef.current === null) {
      elementRef.current = node;
    }
  };
  
  // Track when animation has completed
  useEffect(() => {
    if (inView && !hasEntered) {
      setHasEntered(true);
    }
  }, [inView, hasEntered]);
  
  // Reset when entering preview mode
  useEffect(() => {
    if (isPreviewMode) {
      setHasEntered(false);
    }
  }, [isPreviewMode]);
  
  // Get animation values based on configuration
  const getAnimationVariants = () => {
    const variants = {
      hidden: {},
      visible: {},
      hover: {},
    };
    
    // Entrance animation
    if (animations.entrance.enabled && animations.entrance.type !== 'none') {
      // Starting position (hidden)
      switch (animations.entrance.type) {
        case 'fade':
          variants.hidden.opacity = 0;
          variants.visible.opacity = 1;
          break;
        case 'slide':
          switch (animations.entrance.direction) {
            case 'left':
              variants.hidden.x = -50;
              variants.visible.x = 0;
              break;
            case 'right':
              variants.hidden.x = 50;
              variants.visible.x = 0;
              break;
            case 'top':
              variants.hidden.y = -50;
              variants.visible.y = 0;
              break;
            case 'bottom':
              variants.hidden.y = 50;
              variants.visible.y = 0;
              break;
          }
          variants.hidden.opacity = 0;
          variants.visible.opacity = 1;
          break;
        case 'zoom':
          variants.hidden.scale = animations.entrance.direction === 'in' ? 0.8 : 1.2;
          variants.visible.scale = 1;
          variants.hidden.opacity = 0;
          variants.visible.opacity = 1;
          break;
        case 'bounce':
          variants.hidden.y = 10;
          variants.hidden.opacity = 0;
          variants.visible.y = 0;
          variants.visible.opacity = 1;
          variants.visible.transition = {
            type: 'spring',
            stiffness: 300,
            damping: 15,
          };
          break;
      }
    }
    
    // Hover animation
    if (animations.hover.enabled && animations.hover.type !== 'none') {
      switch (animations.hover.type) {
        case 'fade':
          variants.hover.opacity = animations.hover.direction === 'in' ? 1 : 0.7;
          break;
        case 'scale':
          variants.hover.scale = animations.hover.direction === 'up' ? 1.05 : 0.95;
          break;
        case 'lift':
          variants.hover.y = -5;
          variants.hover.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
          break;
        case 'pulse':
          // Pulse is handled with CSS animation
          break;
      }
    }
    
    return variants;
  };
  
  const variants = getAnimationVariants();
  
  // Generate entrance transition
  const getEntranceTransition = () => {
    return {
      duration: animations.entrance.duration,
      delay: animations.entrance.delay + animationDelay,
      ease: animations.entrance.curve,
    };
  };
  
  // Generate hover transition
  const getHoverTransition = () => {
    return {
      duration: animations.hover.duration,
      ease: animations.hover.curve,
    };
  };
  
  // Generate CSS classes for animations that require CSS instead of Framer
  const getAnimationClasses = () => {
    const classes = [];
    
    // Add pulse animation class if needed
    if (animations.hover.enabled && animations.hover.type === 'pulse' && isHovering) {
      classes.push('animate-pulse');
    }
    
    return classes.join(' ');
  };
  
  // Check if we're using scroll-triggered animation
  const useScrollAnimation = animations.scroll.enabled && animations.scroll.type !== 'none';
  
  // Handle scroll animations separately
  const getScrollAnimationProps = () => {
    if (!useScrollAnimation) return {};
    
    // Initial state
    const scrollProps: any = {
      initial: { opacity: 0 },
      animate: inView ? { opacity: 1 } : { opacity: 0 },
      transition: {
        duration: animations.scroll.duration,
        delay: animations.scroll.delay,
        ease: animations.scroll.curve,
      }
    };
    
    // Add specific animation properties
    switch(animations.scroll.type) {
      case 'fade':
        // Already covered by default opacity settings
        break;
      case 'slide':
        switch(animations.scroll.direction) {
          case 'left':
            scrollProps.initial.x = -50;
            scrollProps.animate.x = inView ? 0 : -50;
            break;
          case 'right':
            scrollProps.initial.x = 50;
            scrollProps.animate.x = inView ? 0 : 50;
            break;
          case 'top':
            scrollProps.initial.y = -50;
            scrollProps.animate.y = inView ? 0 : -50;
            break;
          case 'bottom':
            scrollProps.initial.y = 50;
            scrollProps.animate.y = inView ? 0 : 50;
            break;
        }
        break;
      case 'zoom':
        scrollProps.initial.scale = animations.scroll.direction === 'in' ? 0.8 : 1.2;
        scrollProps.animate.scale = inView ? 1 : scrollProps.initial.scale;
        break;
    }
    
    return scrollProps;
  };
  
  // Decide which animation approach to use
  // If scroll animation is enabled, use that, otherwise use entrance animation
  const animationProps = useScrollAnimation 
    ? getScrollAnimationProps() 
    : {
        initial: "hidden",
        animate: (hasEntered || inView) ? "visible" : "hidden",
        whileHover: animations.hover.enabled ? "hover" : undefined,
        variants,
        transition: getEntranceTransition(),
      };
  
  return (
    <motion.div
      ref={setRefs}
      id={id}
      className={cn(className, getAnimationClasses())}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
} 