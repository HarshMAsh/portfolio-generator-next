'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Settings, 
  Plus, 
  Trash2,
  Wand2
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationControls } from '@/components/ui/AnimationControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types for portfolio sections
type SectionType = {
  id: string;
  name: string;
  visible: boolean;
  icon?: React.ReactNode;
};

type DragDropSectionEditorProps = {
  onSectionsUpdate: (sections: SectionType[]) => void;
  initialSections?: SectionType[];
};

export default function DragDropSectionEditor({ 
  onSectionsUpdate,
  initialSections
}: DragDropSectionEditorProps) {
  // Default sections if none provided
  const defaultSections: SectionType[] = [
    { id: 'header', name: 'Header & Bio', visible: true },
    { id: 'skills', name: 'Skills', visible: true },
    { id: 'experience', name: 'Experience', visible: true },
    { id: 'education', name: 'Education', visible: true },
    { id: 'projects', name: 'Projects', visible: true },
    { id: 'achievements', name: 'Achievements', visible: true },
    { id: 'certifications', name: 'Certifications', visible: true },
    { id: 'languages', name: 'Languages', visible: true },
    { id: 'contact', name: 'Contact', visible: true },
  ];

  const [sections, setSections] = useState<SectionType[]>(initialSections || defaultSections);
  const [editingSection, setEditingSection] = useState<SectionType | null>(null);
  const [activeTab, setActiveTab] = useState<'layout' | 'animations'>('layout');

  // Handle reorder when drag ends
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
    onSectionsUpdate(items);
  };

  // Toggle section visibility
  const toggleVisibility = (id: string) => {
    const updatedSections = sections.map(section => 
      section.id === id ? { ...section, visible: !section.visible } : section
    );
    
    setSections(updatedSections);
    onSectionsUpdate(updatedSections);
  };

  // Add a new custom section
  const addCustomSection = (name: string) => {
    const newSection: SectionType = {
      id: `custom-${Date.now()}`,
      name,
      visible: true
    };
    
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    onSectionsUpdate(updatedSections);
  };

  // Delete a section
  const deleteSection = (id: string) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);
    onSectionsUpdate(updatedSections);
  };

  return (
    <Card className="p-5 shadow-md border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-medium mb-4 text-zinc-800 dark:text-zinc-200">
        Customize Sections
      </h3>
      
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Drag and drop to reorder sections or toggle their visibility.
      </p>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              <AnimatePresence>
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center justify-between p-3 rounded-md border ${
                          section.visible 
                            ? 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700' 
                            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                          >
                            <GripVertical size={18} />
                          </div>
                          
                          <span className={`text-sm font-medium ${
                            section.visible 
                              ? 'text-zinc-700 dark:text-zinc-300' 
                              : 'text-zinc-400 dark:text-zinc-500'
                          }`}>
                            {section.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleVisibility(section.id)}
                          >
                            {section.visible ? (
                              <Eye size={16} className="text-zinc-600 dark:text-zinc-400" />
                            ) : (
                              <EyeOff size={16} className="text-zinc-400 dark:text-zinc-600" />
                            )}
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setEditingSection(section)}
                              >
                                <Settings size={16} className="text-zinc-600 dark:text-zinc-400" />
                              </Button>
                            </DialogTrigger>
                            
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit Section: {editingSection?.name}</DialogTitle>
                              </DialogHeader>
                              
                              <Tabs defaultValue="layout" value={activeTab} onValueChange={(val) => setActiveTab(val as 'layout' | 'animations')}>
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="layout">Layout</TabsTrigger>
                                  <TabsTrigger value="animations">Animations</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="layout">
                                  <div className="py-4">
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                      Section settings would go here (custom fields, layout options, etc.)
                                    </p>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="animations">
                                  <div className="py-4">
                                    {editingSection && (
                                      <AnimationControls sectionId={editingSection.id} />
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>
                              
                              <DialogFooter>
                                {!section.id.startsWith('header') && (
                                  <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    className="mr-auto"
                                    onClick={() => deleteSection(section.id)}
                                  >
                                    <Trash2 size={14} className="mr-1" />
                                    Remove Section
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">Cancel</Button>
                                <Button size="sm">Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Wand2 size={16} className="text-zinc-600 dark:text-zinc-400" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Section Animations</DialogTitle>
                              </DialogHeader>
                              <div className="py-2">
                                <AnimationControls sectionId={section.id} />
                              </div>
                              <DialogFooter>
                                <Button variant="outline" size="sm">Close</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 w-full flex items-center justify-center"
          >
            <Plus size={14} className="mr-1" />
            Add Custom Section
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Create a custom section for your portfolio. You can add any type of content you like.
            </p>
            
            {/* Section type buttons would go here */}
            <div className="grid grid-cols-2 gap-2">
              {['Custom Skills', 'Testimonials', 'Services', 'Publications', 'Awards'].map(type => (
                <Button 
                  key={type}
                  variant="outline" 
                  size="sm"
                  onClick={() => addCustomSection(type)}
                  className="justify-start h-auto py-3 px-3"
                >
                  <div className="text-left">
                    <div className="font-medium text-sm">{type}</div>
                    <div className="text-xs text-zinc-500">Add to portfolio</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
} 