'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Eye, EyeOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';

// Section types
type SectionType = {
  id: string;
  title: string;
  visible: boolean;
  icon?: React.ReactNode;
};

type SectionReorderProps = {
  onSectionsChange: (sections: SectionType[]) => void;
};

export default function SectionReorder({ onSectionsChange }: SectionReorderProps) {
  // Default sections in a portfolio
  const [sections, setSections] = useState<SectionType[]>([
    { id: 'header', title: 'Header & Profile', visible: true },
    { id: 'about', title: 'About Me', visible: true },
    { id: 'skills', title: 'Skills', visible: true },
    { id: 'experience', title: 'Experience', visible: true },
    { id: 'education', title: 'Education', visible: true },
    { id: 'projects', title: 'Projects', visible: true },
    { id: 'achievements', title: 'Achievements', visible: true },
    { id: 'certifications', title: 'Certifications', visible: true },
    { id: 'contact', title: 'Contact', visible: true },
  ]);

  // Selected section for editing
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Handle drag end
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
    onSectionsChange(items);
  };

  // Toggle section visibility
  const toggleVisibility = (id: string) => {
    const updatedSections = sections.map(section => 
      section.id === id ? { ...section, visible: !section.visible } : section
    );
    setSections(updatedSections);
    onSectionsChange(updatedSections);
  };

  // Handle section click for editing
  const handleSectionClick = (id: string) => {
    setSelectedSection(selectedSection === id ? null : id);
  };

  return (
    <Card className="p-4 shadow-md border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium mb-4 text-zinc-700 dark:text-zinc-300">
        Customize Section Order
      </h3>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-3 rounded-md bg-white dark:bg-zinc-900 border ${
                        !section.visible ? 'border-zinc-200 dark:border-zinc-800 opacity-60' : 'border-[var(--color-primary)] dark:border-[var(--color-primary)]'
                      } flex items-center justify-between group hover:shadow-sm transition-all duration-200`}
                    >
                      <div className="flex items-center">
                        <div
                          {...provided.dragHandleProps}
                          className="mr-3 text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400 cursor-grab"
                        >
                          <GripVertical size={18} />
                        </div>
                        <span className={`${!section.visible ? 'text-zinc-400 dark:text-zinc-600' : ''}`}>
                          {section.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => toggleVisibility(section.id)}
                        >
                          {section.visible ? (
                            <Eye size={14} className="text-zinc-600 dark:text-zinc-400" />
                          ) : (
                            <EyeOff size={14} className="text-zinc-400 dark:text-zinc-600" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleSectionClick(section.id)}
                        >
                          <Settings size={14} className="text-zinc-600 dark:text-zinc-400" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden"
          >
            <Card className="p-3 bg-zinc-50 dark:bg-zinc-800/50">
              <h4 className="text-sm font-medium mb-2">
                {sections.find(s => s.id === selectedSection)?.title} Settings
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Visible</span>
                  <Switch
                    checked={sections.find(s => s.id === selectedSection)?.visible}
                    onCheckedChange={() => toggleVisibility(selectedSection)}
                  />
                </div>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-xs text-zinc-500">
                    More customization options would be available here in a full implementation.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        Drag and drop sections to reorder. Click the eye icon to toggle visibility.
      </div>
    </Card>
  );
} 