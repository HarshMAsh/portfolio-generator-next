'use client';

import React, { createContext, useContext } from 'react';
import { useAnimationsStore } from '@/lib/animations';

// Create a context to provide animation controls
export const AnimationContext = createContext<ReturnType<typeof useAnimationsStore> | null>(null);

export function useAnimations() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
}

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  // Get animations state from zustand
  const animationsStore = useAnimationsStore();
  
  return (
    <AnimationContext.Provider value={animationsStore}>
      {children}
    </AnimationContext.Provider>
  );
} 