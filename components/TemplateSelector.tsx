import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import MotionElement from "./MotionElement";

export type TemplateType = "modern" | "minimal" | "elegant";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  return (
    <div className="w-full">
      <MotionElement animation="slideDown" delay={0.1}>
        <h2 className="text-lg font-medium mb-3 text-center text-zinc-700 dark:text-zinc-300">
          Choose a Template
        </h2>
      </MotionElement>
      
      <div className="grid grid-cols-3 gap-3">
        <MotionElement animation="slideUp" delay={0.2}>
          <TemplateCard
            name="modern"
            title="Modern"
            description="Clean, colorful design with modern gradients"
            isSelected={selectedTemplate === "modern"}
            onClick={() => onTemplateChange("modern")}
            gradientClass="from-purple-400 to-pink-400"
          />
        </MotionElement>
        
        <MotionElement animation="slideUp" delay={0.3}>
          <TemplateCard
            name="minimal"
            title="Minimal"
            description="Simple, typography-focused clean layout"
            isSelected={selectedTemplate === "minimal"}
            onClick={() => onTemplateChange("minimal")}
            gradientClass="from-zinc-400 to-zinc-600"
          />
        </MotionElement>
        
        <MotionElement animation="slideUp" delay={0.4}>
          <TemplateCard
            name="elegant"
            title="Elegant"
            description="Sophisticated design with refined details"
            isSelected={selectedTemplate === "elegant"}
            onClick={() => onTemplateChange("elegant")}
            gradientClass="from-amber-300 to-amber-600"
          />
        </MotionElement>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  name: TemplateType;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  gradientClass: string;
}

function TemplateCard({
  name,
  title,
  description,
  isSelected,
  onClick,
  gradientClass,
}: TemplateCardProps) {
  return (
    <motion.div
      whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
          isSelected 
            ? "ring-2 ring-zinc-900 dark:ring-zinc-100 shadow-lg" 
            : "hover:shadow-md"
        }`}
        onClick={onClick}
      >
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br dark:opacity-30" style={{
          background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
        }}></div>
        
        <div className={`h-1 w-full bg-gradient-to-r ${gradientClass}`}></div>
        
        <div className="p-3 h-full flex flex-col">
          <h3 className="font-medium text-sm mb-1">{title}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex-grow line-clamp-2">{description}</p>
          
          {isSelected && (
            <motion.div 
              className="absolute bottom-2 right-2 bg-zinc-900 dark:bg-white rounded-full h-4 w-4 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 15,
                duration: 0.5 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white dark:text-zinc-900">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
} 