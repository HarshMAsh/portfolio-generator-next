import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedTemplateProps {
  children: ReactNode;
  isActive: boolean;
}

export default function AnimatedTemplate({ children, isActive }: AnimatedTemplateProps) {
  // Enhanced variants for more dynamic animations
  const containerVariants = {
    inactive: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98,
      filter: "blur(8px)"
    },
    active: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)"
    }
  };
  
  // Stagger child animations
  const childVariants = {
    inactive: { opacity: 0, y: 20 },
    active: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      variants={containerVariants}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 1,
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 }
      }}
      className="absolute w-full h-full top-0 left-0"
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <motion.div
        variants={childVariants}
        transition={{
          delay: 0.1,
          staggerChildren: 0.1
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
} 