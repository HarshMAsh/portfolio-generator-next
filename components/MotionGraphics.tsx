'use client';

import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ParticlesRenderer from './ParticlesRenderer';

// Particle style options
export type ParticleStyle = 'circles' | 'squares' | 'stars' | 'confetti';

// Configuration interface for particles
export interface ParticleConfig {
  enabled: boolean;
  particleCount: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  style: ParticleStyle;
}

// Default configuration
const defaultConfig: ParticleConfig = {
  enabled: true,
  particleCount: 50,
  size: 3,
  speed: 0.5,
  color: '#3b82f6', // Blue
  opacity: 0.7,
  style: 'circles',
};

interface MotionGraphicsProps {
  config?: Partial<ParticleConfig>;
  showControls?: boolean;
}

export default function MotionGraphics({ 
  config = {}, 
  showControls = true 
}: MotionGraphicsProps) {
  // Merge provided config with default config
  const mergedConfig: ParticleConfig = { ...defaultConfig, ...config };
  
  // State for particle configuration
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>(mergedConfig);
  
  // State for color picker
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Reset to default configuration
  const resetConfig = () => {
    setParticleConfig(defaultConfig);
  };

  // Update a single config property
  const updateConfig = <K extends keyof ParticleConfig>(
    key: K, 
    value: ParticleConfig[K]
  ) => {
    setParticleConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full h-full">
      {/* Particle animation renderer */}
      <ParticlesRenderer config={particleConfig} />
      
      {/* Configuration Panel */}
      {showControls && (
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 p-4 rounded-lg shadow-lg backdrop-blur-sm w-72 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Motion Graphics</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetConfig}
            >
              Reset
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="particle-toggle" className="cursor-pointer">Enable Particles</Label>
              <Switch 
                id="particle-toggle"
                checked={particleConfig.enabled}
                onCheckedChange={(checked) => updateConfig('enabled', checked)}
              />
            </div>
            
            {/* Particle Style */}
            <div className="space-y-2">
              <Label htmlFor="particle-style">Particle Style</Label>
              <Select 
                value={particleConfig.style}
                onValueChange={(value) => updateConfig('style', value as ParticleStyle)}
              >
                <SelectTrigger id="particle-style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circles">Circles</SelectItem>
                  <SelectItem value="squares">Squares</SelectItem>
                  <SelectItem value="stars">Stars</SelectItem>
                  <SelectItem value="confetti">Confetti</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Particle Count */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="particle-count">Particle Count</Label>
                <span className="text-sm text-gray-500">{particleConfig.particleCount}</span>
              </div>
              <Slider 
                id="particle-count"
                min={10}
                max={200}
                step={10}
                value={[particleConfig.particleCount]}
                onValueChange={(value) => updateConfig('particleCount', value[0])}
              />
            </div>
            
            {/* Particle Size */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="particle-size">Size</Label>
                <span className="text-sm text-gray-500">{particleConfig.size}px</span>
              </div>
              <Slider 
                id="particle-size"
                min={1}
                max={10}
                step={0.5}
                value={[particleConfig.size]}
                onValueChange={(value) => updateConfig('size', value[0])}
              />
            </div>
            
            {/* Particle Speed */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="particle-speed">Speed</Label>
                <span className="text-sm text-gray-500">{particleConfig.speed.toFixed(1)}</span>
              </div>
              <Slider 
                id="particle-speed"
                min={0.1}
                max={2}
                step={0.1}
                value={[particleConfig.speed]}
                onValueChange={(value) => updateConfig('speed', value[0])}
              />
            </div>
            
            {/* Particle Opacity */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="particle-opacity">Opacity</Label>
                <span className="text-sm text-gray-500">{particleConfig.opacity.toFixed(1)}</span>
              </div>
              <Slider 
                id="particle-opacity"
                min={0.1}
                max={1}
                step={0.1}
                value={[particleConfig.opacity]}
                onValueChange={(value) => updateConfig('opacity', value[0])}
              />
            </div>
            
            {/* Particle Color */}
            <div className="space-y-2">
              <Label>Color</Label>
              <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: particleConfig.color }}
                    />
                    {particleConfig.color}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker 
                    color={particleConfig.color} 
                    onChange={(color) => updateConfig('color', color)} 
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 