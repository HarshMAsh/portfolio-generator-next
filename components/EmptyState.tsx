import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <motion.div 
      className="h-full flex flex-col items-center justify-center text-center p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.div 
          className="mb-4 text-zinc-400 dark:text-zinc-500"
          animate={{ 
            y: [0, -5, 0],
            opacity: [0.8, 1, 0.8] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          {icon}
        </motion.div>
      )}
      
      <h3 className="text-xl font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        {title}
      </h3>
      
      <p className="text-zinc-500 dark:text-zinc-400 max-w-xs">
        {message}
      </p>
    </motion.div>
  );
} 