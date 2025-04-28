'use client';

import React, { useState } from 'react';
import { useAnimationsStore } from '@/lib/animations';
import { AnimationControls } from '@/components/ui/AnimationControls';
import { AnimatedElement } from '@/components/animations/AnimatedElement';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Define some sample content sections
const sampleSections = [
  { id: 'header', title: 'Header Section' },
  { id: 'about', title: 'About Me' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

export default function AnimationsDemoPage() {
  const { resetAllAnimations, togglePreviewMode, previewMode } = useAnimationsStore();
  const [activeSection, setActiveSection] = useState(sampleSections[0].id);
  
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Animations Demo</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="preview-mode">Preview Mode</Label>
            <Switch 
              id="preview-mode" 
              checked={previewMode} 
              onCheckedChange={togglePreviewMode} 
            />
          </div>
          <Button 
            variant="outline" 
            onClick={resetAllAnimations}
          >
            Reset All Animations
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Animation Controls */}
        <div className="col-span-1">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Animation Controls</h2>
            <Tabs defaultValue={activeSection}>
              <TabsList className="mb-4 w-full grid" style={{ gridTemplateColumns: `repeat(${sampleSections.length}, 1fr)` }}>
                {sampleSections.map(section => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {sampleSections.map(section => (
                <TabsContent key={section.id} value={section.id}>
                  <AnimationControls sectionId={section.id} />
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>
        
        {/* Preview Area */}
        <div className="col-span-1 lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Animation Preview</h2>
            
            <div className="space-y-8">
              {/* Header Section */}
              <AnimatedElement sectionId="header" className="text-center p-8 bg-muted rounded-lg">
                <h2 className="text-3xl font-bold mb-4">Welcome to My Portfolio</h2>
                <p className="max-w-lg mx-auto text-muted-foreground">
                  This is an example of how animations can make your content more engaging.
                </p>
              </AnimatedElement>
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard
                  sectionId="about"
                  title="About Me"
                  className="col-span-1"
                >
                  <p className="text-muted-foreground">
                    I'm a passionate developer with experience in building web applications
                    using modern technologies.
                  </p>
                </AnimatedCard>
                
                <AnimatedCard
                  sectionId="skills"
                  title="My Skills"
                  className="col-span-1"
                  animationDelay={0.1}
                >
                  <div className="space-y-2">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map(skill => (
                      <div key={skill} className="flex justify-between">
                        <span>{skill}</span>
                        <span className="text-muted-foreground">Expert</span>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </div>
              
              {/* Projects Section */}
              <AnimatedElement sectionId="projects" className="space-y-4">
                <h3 className="text-xl font-semibold">Recent Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <AnimatedElement
                      key={index}
                      sectionId="projects"
                      className="p-4 bg-muted rounded-lg"
                      animationDelay={index * 0.1}
                    >
                      <h4 className="font-medium">Project {index + 1}</h4>
                      <p className="text-sm text-muted-foreground">A sample project to demonstrate animations</p>
                    </AnimatedElement>
                  ))}
                </div>
              </AnimatedElement>
              
              {/* Contact Section */}
              <AnimatedElement sectionId="contact" className="p-6 bg-muted rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Get In Touch</h3>
                <p className="text-muted-foreground mb-4">
                  Have a project in mind? Let's work together!
                </p>
                <Button>Contact Me</Button>
              </AnimatedElement>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 