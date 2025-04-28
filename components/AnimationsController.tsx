'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw } from 'lucide-react';

type AnimationType = 'fade' | 'slide' | 'zoom' | 'flip' | 'bounce' | 'none';
type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type AnimationCurve = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

type AnimationConfig = {
  type: AnimationType;
  direction: AnimationDirection;
  duration: number;
  delay: number;
  curve: AnimationCurve;
  enabled: boolean;
};

type SectionAnimation = {
  sectionId: string;
  sectionName: string;
  animation: AnimationConfig;
  hover?: AnimationConfig;
  scroll?: AnimationConfig;
};

type AnimationsControllerProps = {
  initialAnimations?: SectionAnimation[];
  onUpdate: (animations: SectionAnimation[]) => void;
  previewMode?: boolean;
  sections: { id: string; name: string }[];
};

export default function AnimationsController({
  initialAnimations,
  onUpdate,
  previewMode = false,
  sections
}: AnimationsControllerProps) {
  // Default animations for each section if none provided
  const defaultAnimations: SectionAnimation[] = sections.map(section => ({
    sectionId: section.id,
    sectionName: section.name,
    animation: {
      type: 'fade',
      direction: 'up',
      duration: 0.5,
      delay: 0.2,
      curve: 'ease-out',
      enabled: true
    },
    hover: {
      type: 'none',
      direction: 'none',
      duration: 0.3,
      delay: 0,
      curve: 'ease',
      enabled: false
    },
    scroll: {
      type: 'none',
      direction: 'none',
      duration: 0.5,
      delay: 0,
      curve: 'ease',
      enabled: false
    }
  }));

  const [animations, setAnimations] = useState<SectionAnimation[]>(
    initialAnimations || defaultAnimations
  );
  
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    animations[0]?.sectionId || ''
  );
  
  const [activeTab, setActiveTab] = useState<'entrance' | 'hover' | 'scroll'>('entrance');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);

  // Get the selected section's animation
  const selectedSection = animations.find(a => a.sectionId === selectedSectionId);

  // Get the active animation config based on the selected tab
  const getActiveAnimationConfig = (): AnimationConfig | undefined => {
    if (!selectedSection) return undefined;
    
    switch (activeTab) {
      case 'entrance': return selectedSection.animation;
      case 'hover': return selectedSection.hover;
      case 'scroll': return selectedSection.scroll;
      default: return undefined;
    }
  };

  // Update the animation configuration
  const updateAnimationConfig = (config: Partial<AnimationConfig>) => {
    if (!selectedSection) return;
    
    const updatedAnimations = animations.map(anim => {
      if (anim.sectionId !== selectedSectionId) return anim;
      
      const updatedAnim = { ...anim };
      
      switch (activeTab) {
        case 'entrance':
          updatedAnim.animation = { ...updatedAnim.animation, ...config };
          break;
        case 'hover':
          updatedAnim.hover = { ...updatedAnim.hover!, ...config };
          break;
        case 'scroll':
          updatedAnim.scroll = { ...updatedAnim.scroll!, ...config };
          break;
      }
      
      return updatedAnim;
    });
    
    setAnimations(updatedAnimations);
    onUpdate(updatedAnimations);
  };

  // Toggle preview mode
  const togglePreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
    
    // Reset preview after animation completes
    if (!isPreviewPlaying) {
      setTimeout(() => {
        setIsPreviewPlaying(false);
      }, (getActiveAnimationConfig()?.duration || 0.5) * 1000 + 500);
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (!selectedSection) return;
    
    const defaultConfig: AnimationConfig = {
      type: 'fade',
      direction: 'up',
      duration: 0.5,
      delay: 0.2,
      curve: 'ease-out',
      enabled: true
    };
    
    updateAnimationConfig(defaultConfig);
  };

  return (
    <Card className="p-5 shadow-md border border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
          Animation Controls
        </h3>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePreview}
            className="flex items-center gap-1"
          >
            {isPreviewPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPreviewPlaying ? 'Stop' : 'Preview'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefaults}
            className="flex items-center gap-1"
          >
            <RotateCcw size={14} />
            Reset
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="section-select">Section</Label>
            <Select
              value={selectedSectionId}
              onValueChange={setSelectedSectionId}
            >
              <SelectTrigger id="section-select" className="w-full">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {animations.map(anim => (
                  <SelectItem key={anim.sectionId} value={anim.sectionId}>
                    {anim.sectionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="entrance">Entrance</TabsTrigger>
              <TabsTrigger value="hover">Hover</TabsTrigger>
              <TabsTrigger value="scroll">Scroll</TabsTrigger>
            </TabsList>
            
            <TabsContent value="entrance" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="entrance-enabled">Enable Animation</Label>
                <Switch
                  id="entrance-enabled"
                  checked={getActiveAnimationConfig()?.enabled}
                  onCheckedChange={(checked) => updateAnimationConfig({ enabled: checked })}
                />
              </div>
              
              {getActiveAnimationConfig()?.enabled && (
                <>
                  <div>
                    <Label htmlFor="animation-type">Animation Type</Label>
                    <Select
                      value={getActiveAnimationConfig()?.type}
                      onValueChange={(value) => updateAnimationConfig({ type: value as AnimationType })}
                    >
                      <SelectTrigger id="animation-type">
                        <SelectValue placeholder="Select animation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade">Fade</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="flip">Flip</SelectItem>
                        <SelectItem value="bounce">Bounce</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {getActiveAnimationConfig()?.type !== 'none' && getActiveAnimationConfig()?.type !== 'fade' && getActiveAnimationConfig()?.type !== 'zoom' && (
                    <div>
                      <Label htmlFor="animation-direction">Direction</Label>
                      <Select
                        value={getActiveAnimationConfig()?.direction}
                        onValueChange={(value) => updateAnimationConfig({ direction: value as AnimationDirection })}
                      >
                        <SelectTrigger id="animation-direction">
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="up">Up</SelectItem>
                          <SelectItem value="down">Down</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="animation-duration">Duration (s)</Label>
                      <span className="text-xs text-zinc-500">{getActiveAnimationConfig()?.duration}s</span>
                    </div>
                    <Slider
                      id="animation-duration"
                      min={0.1}
                      max={2}
                      step={0.1}
                      value={[getActiveAnimationConfig()?.duration || 0.5]}
                      onValueChange={([value]) => updateAnimationConfig({ duration: value })}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="animation-delay">Delay (s)</Label>
                      <span className="text-xs text-zinc-500">{getActiveAnimationConfig()?.delay}s</span>
                    </div>
                    <Slider
                      id="animation-delay"
                      min={0}
                      max={1}
                      step={0.1}
                      value={[getActiveAnimationConfig()?.delay || 0]}
                      onValueChange={([value]) => updateAnimationConfig({ delay: value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="animation-curve">Easing Curve</Label>
                    <Select
                      value={getActiveAnimationConfig()?.curve}
                      onValueChange={(value) => updateAnimationConfig({ curve: value as AnimationCurve })}
                    >
                      <SelectTrigger id="animation-curve">
                        <SelectValue placeholder="Select easing curve" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="ease">Ease</SelectItem>
                        <SelectItem value="ease-in">Ease In</SelectItem>
                        <SelectItem value="ease-out">Ease Out</SelectItem>
                        <SelectItem value="ease-in-out">Ease In-Out</SelectItem>
                        <SelectItem value="spring">Spring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="hover" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="hover-enabled">Enable Hover Animation</Label>
                <Switch
                  id="hover-enabled"
                  checked={getActiveAnimationConfig()?.enabled}
                  onCheckedChange={(checked) => updateAnimationConfig({ enabled: checked })}
                />
              </div>
              
              {getActiveAnimationConfig()?.enabled && (
                <>
                  <div>
                    <Label htmlFor="hover-animation-type">Animation Type</Label>
                    <Select
                      value={getActiveAnimationConfig()?.type}
                      onValueChange={(value) => updateAnimationConfig({ type: value as AnimationType })}
                    >
                      <SelectTrigger id="hover-animation-type">
                        <SelectValue placeholder="Select animation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Scale</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                        <SelectItem value="fade">Fade</SelectItem>
                        <SelectItem value="bounce">Bounce</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="hover-animation-duration">Duration (s)</Label>
                      <span className="text-xs text-zinc-500">{getActiveAnimationConfig()?.duration}s</span>
                    </div>
                    <Slider
                      id="hover-animation-duration"
                      min={0.1}
                      max={1}
                      step={0.1}
                      value={[getActiveAnimationConfig()?.duration || 0.3]}
                      onValueChange={([value]) => updateAnimationConfig({ duration: value })}
                    />
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="scroll" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="scroll-enabled">Enable Scroll Effects</Label>
                <Switch
                  id="scroll-enabled"
                  checked={getActiveAnimationConfig()?.enabled}
                  onCheckedChange={(checked) => updateAnimationConfig({ enabled: checked })}
                />
              </div>
              
              {getActiveAnimationConfig()?.enabled && (
                <>
                  <div>
                    <Label htmlFor="scroll-animation-type">Effect Type</Label>
                    <Select
                      value={getActiveAnimationConfig()?.type}
                      onValueChange={(value) => updateAnimationConfig({ type: value as AnimationType })}
                    >
                      <SelectTrigger id="scroll-animation-type">
                        <SelectValue placeholder="Select effect type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade">Fade In</SelectItem>
                        <SelectItem value="slide">Slide In</SelectItem>
                        <SelectItem value="zoom">Zoom In</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {getActiveAnimationConfig()?.type === 'slide' && (
                    <div>
                      <Label htmlFor="scroll-animation-direction">Direction</Label>
                      <Select
                        value={getActiveAnimationConfig()?.direction}
                        onValueChange={(value) => updateAnimationConfig({ direction: value as AnimationDirection })}
                      >
                        <SelectTrigger id="scroll-animation-direction">
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="up">Bottom to Top</SelectItem>
                          <SelectItem value="down">Top to Bottom</SelectItem>
                          <SelectItem value="left">Right to Left</SelectItem>
                          <SelectItem value="right">Left to Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="scroll-animation-duration">Duration (s)</Label>
                      <span className="text-xs text-zinc-500">{getActiveAnimationConfig()?.duration}s</span>
                    </div>
                    <Slider
                      id="scroll-animation-duration"
                      min={0.1}
                      max={1.5}
                      step={0.1}
                      value={[getActiveAnimationConfig()?.duration || 0.5]}
                      onValueChange={([value]) => updateAnimationConfig({ duration: value })}
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Animation Preview Box */}
      {previewMode && selectedSection && (
        <div className="mt-6 border rounded-md p-4 h-32 flex items-center justify-center">
          <div className={`w-full h-full flex items-center justify-center ${
            isPreviewPlaying ? 'animate-preview' : ''
          }`}>
            <div className="text-center">
              <div className="text-sm font-medium">{selectedSection.sectionName}</div>
              <div className="text-xs text-zinc-500">
                {getActiveAnimationConfig()?.enabled ? `${getActiveAnimationConfig()?.type} animation` : 'No animation'}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 