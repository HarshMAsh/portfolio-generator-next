'use client';

import React from 'react';
import { AnimatedElement } from '@/components/animations/AnimatedElement';
import { AnimatedCard } from '@/components/animations/AnimatedCard';

type Skill = {
  name: string;
  level: number; // 1-100
  category: string;
};

interface SkillsSectionProps {
  skills: Skill[];
  title?: string;
  description?: string;
}

export function SkillsSection({ 
  skills, 
  title = "Skills & Expertise", 
  description = "Here are some of the skills I've developed over the years."
}: SkillsSectionProps) {
  // Group skills by category
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  return (
    <section id="skills" className="py-10">
      <AnimatedElement sectionId="skills-header" className="container space-y-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground max-w-3xl">{description}</p>}
      </AnimatedElement>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            
            return (
              <AnimatedCard
                key={category}
                sectionId="skills"
                title={category}
                animationDelay={categoryIndex * 0.1}
                className="col-span-1"
              >
                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
} 