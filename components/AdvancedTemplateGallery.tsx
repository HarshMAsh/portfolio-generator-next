'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Search, Star, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Template categories
const categories = ['All', 'Minimal', 'Creative', 'Corporate', 'Developer', 'Designer', 'Marketing'];

// Sample templates with thumbnails - in a real implementation these would be actual images
const templates = [
  {
    id: 'modern-1',
    name: 'Modern Portfolio',
    thumbnail: '/images/templates/modern-1.jpg',
    category: 'Minimal',
    new: true,
    popular: true,
  },
  {
    id: 'creative-1',
    name: 'Creative Studio',
    thumbnail: '/images/templates/creative-1.jpg',
    category: 'Creative',
    new: false,
    popular: true,
  },
  {
    id: 'corporate-1',
    name: 'Corporate Pro',
    thumbnail: '/images/templates/corporate-1.jpg',
    category: 'Corporate',
    new: false,
    popular: false,
  },
  {
    id: 'dev-1',
    name: 'Developer Hub',
    thumbnail: '/images/templates/dev-1.jpg',
    category: 'Developer',
    new: true,
    popular: false,
  },
  {
    id: 'minimal-1',
    name: 'Minimal Resume',
    thumbnail: '/images/templates/minimal-1.jpg',
    category: 'Minimal',
    new: false,
    popular: true,
  },
  {
    id: 'designer-1',
    name: 'Design Portfolio',
    thumbnail: '/images/templates/designer-1.jpg',
    category: 'Designer',
    new: true,
    popular: true,
  },
  {
    id: 'marketing-1',
    name: 'Marketing Pro',
    thumbnail: '/images/templates/marketing-1.jpg',
    category: 'Marketing',
    new: false,
    popular: false,
  },
  {
    id: 'modern-2',
    name: 'Modern Elegant',
    thumbnail: '/images/templates/modern-2.jpg',
    category: 'Minimal',
    new: true,
    popular: false,
  },
];

type AdvancedTemplateGalleryProps = {
  onSelectTemplate: (templateId: string) => void;
};

export default function AdvancedTemplateGallery({ onSelectTemplate }: AdvancedTemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'name'>('popular');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  // Filter templates based on active category and search query
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort templates based on sort option
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'popular') {
      return a.popular === b.popular ? 0 : a.popular ? -1 : 1;
    } else if (sortBy === 'newest') {
      return a.new === b.new ? 0 : a.new ? -1 : 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  // Filter options component
  const FilterOptions = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="relative max-w-xs">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input 
          type="text"
          placeholder="Search templates..."
          className="pl-8 h-9 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-9 flex items-center gap-1"
          onClick={() => setSortBy(sortBy === 'popular' ? 'newest' : 'popular')}
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span>{sortBy === 'popular' ? 'Popular' : sortBy === 'newest' ? 'Newest' : 'A-Z'}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-9 flex items-center gap-1"
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="p-5 shadow-md border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-medium mb-4 text-zinc-800 dark:text-zinc-200">
        Choose a Template
      </h3>
      
      <FilterOptions />
      
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-4 w-full flex overflow-x-auto hide-scrollbar">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => setActiveCategory(category)}
              className="flex-shrink-0"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedTemplates.map(template => (
              <motion.div
                key={template.id}
                className="relative cursor-pointer rounded-md overflow-hidden group"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => onSelectTemplate(template.id)}
              >
                {/* Template thumbnail */}
                <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                  {/* This would be a real image in production */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-xs">
                    {template.name}
                  </div>
                  
                  {/* New badge */}
                  {template.new && (
                    <div className="absolute top-2 left-2 bg-[var(--color-primary)] text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                      NEW
                    </div>
                  )}
                  
                  {/* Popular star */}
                  {template.popular && (
                    <div className="absolute top-2 right-2 text-amber-400">
                      <Star size={14} fill="currentColor" />
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-200 ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'}`}>
                    <Button size="sm" variant="default" className="text-xs">
                      Use This Template
                    </Button>
                  </div>
                </div>
                
                {/* Template name */}
                <div className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {template.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {template.category}
                </div>
              </motion.div>
            ))}
          </div>
          
          {sortedTemplates.length === 0 && (
            <div className="text-center py-10">
              <p className="text-zinc-500 dark:text-zinc-400">
                No templates found for your search criteria.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
} 