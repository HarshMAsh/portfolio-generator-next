'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AnimatedElement } from '@/components/animations/AnimatedElement';

interface AnimatedCardProps {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  animationDelay?: number;
}

export function AnimatedCard({
  sectionId,
  title,
  children,
  footer,
  className = '',
  animationDelay = 0
}: AnimatedCardProps) {
  return (
    <AnimatedElement 
      sectionId={sectionId}
      className={className}
      animationDelay={animationDelay}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}
      </Card>
    </AnimatedElement>
  );
} 