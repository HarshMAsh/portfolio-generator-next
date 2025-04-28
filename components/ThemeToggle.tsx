'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full w-10 h-10"
        aria-label="Toggle theme"
      >
        <motion.div
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative w-6 h-6"
        >
          {theme === 'dark' ? (
            <MoonIcon className="absolute inset-0 text-purple-300 dark:text-purple-300" />
          ) : (
            <SunIcon className="absolute inset-0 text-amber-500" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
} 