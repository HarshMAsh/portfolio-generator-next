import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

// Define available theme colors
export const themeColors = [
  { name: 'purple', primary: '#9333ea', secondary: '#c084fc' },
  { name: 'blue', primary: '#2563eb', secondary: '#60a5fa' },
  { name: 'green', primary: '#16a34a', secondary: '#4ade80' },
  { name: 'red', primary: '#dc2626', secondary: '#f87171' },
  { name: 'amber', primary: '#d97706', secondary: '#fbbf24' },
  { name: 'pink', primary: '#db2777', secondary: '#f472b6' },
  { name: 'teal', primary: '#0d9488', secondary: '#5eead4' },
  { name: 'indigo', primary: '#4f46e5', secondary: '#818cf8' },
];

type ThemeColorPickerProps = {
  selectedColor: string;
  onColorChange: (colorName: string) => void;
};

export default function ThemeColorPicker({ selectedColor, onColorChange }: ThemeColorPickerProps) {
  useEffect(() => {
    // Get the root element to update CSS variables
    const root = document.documentElement;
    
    // Find the selected color object
    const color = themeColors.find(c => c.name === selectedColor);
    
    if (color) {
      // Update CSS variables for primary colors
      root.style.setProperty('--color-primary', color.primary);
      root.style.setProperty('--color-primary-foreground', '#ffffff');
      
      // Update accent colors (secondary)
      root.style.setProperty('--color-accent', color.secondary);
      root.style.setProperty('--color-accent-foreground', '#ffffff');
    }
  }, [selectedColor]);

  return (
    <Card className="p-3 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          Theme Color
        </p>
        
        <div className="flex flex-wrap gap-2">
          {themeColors.map((color) => (
            <ColorButton
              key={color.name}
              color={color.primary}
              isSelected={selectedColor === color.name}
              onClick={() => onColorChange(color.name)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

function ColorButton({ color, isSelected, onClick }: ColorButtonProps) {
  return (
    <motion.button
      className="relative w-6 h-6 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.1 }}
    >
      {isSelected && (
        <motion.div
          layoutId="selectedColorRing"
          className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950"
          style={{ ringColor: color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
} 