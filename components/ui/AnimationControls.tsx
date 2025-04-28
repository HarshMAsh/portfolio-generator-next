import React from 'react';
import { 
  useAnimationsStore, 
  AnimationConfig, 
  getAnimationOptions,
  AnimationType,
  AnimationDirection,
  AnimationCurve
} from '@/lib/animations';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type AnimationControlsProps = {
  sectionId: string;
};

export function AnimationControls({ sectionId }: AnimationControlsProps) {
  const { 
    getSectionAnimations, 
    updateAnimationConfig, 
    resetSectionAnimations,
    setActiveSection 
  } = useAnimationsStore();
  
  // Initialize this section in the store
  React.useEffect(() => {
    setActiveSection(sectionId);
  }, [sectionId, setActiveSection]);
  
  const animations = getSectionAnimations(sectionId);
  const options = getAnimationOptions();

  const handleUpdate = (
    animationType: 'entrance' | 'hover' | 'scroll',
    field: keyof AnimationConfig,
    value: AnimationType | AnimationDirection | AnimationCurve | number | boolean
  ) => {
    updateAnimationConfig(sectionId, animationType, { [field]: value });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Animation Settings</h3>
        <button
          onClick={() => resetSectionAnimations(sectionId)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {(['entrance', 'hover', 'scroll'] as const).map((animationType) => (
          <AccordionItem key={animationType} value={animationType}>
            <AccordionTrigger className="capitalize">
              {animationType} Animation
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${animationType}-enabled`}>Enabled</Label>
                  <Switch
                    id={`${animationType}-enabled`}
                    checked={animations[animationType].enabled}
                    onCheckedChange={(checked) => 
                      handleUpdate(animationType, 'enabled', checked)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`${animationType}-type`}>Type</Label>
                  <Select
                    disabled={!animations[animationType].enabled}
                    value={animations[animationType].type}
                    onValueChange={(value) => 
                      handleUpdate(animationType, 'type', value as AnimationType)
                    }
                  >
                    <SelectTrigger id={`${animationType}-type`}>
                      <SelectValue placeholder="Select animation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.types.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {animations[animationType].type !== 'none' && (
                  <>
                    {animations[animationType].type !== 'zoom' && 
                     animations[animationType].type !== 'bounce' && (
                      <div className="space-y-2">
                        <Label htmlFor={`${animationType}-direction`}>Direction</Label>
                        <Select
                          disabled={!animations[animationType].enabled}
                          value={animations[animationType].direction}
                          onValueChange={(value) => 
                            handleUpdate(animationType, 'direction', value as AnimationDirection)
                          }
                        >
                          <SelectTrigger id={`${animationType}-direction`}>
                            <SelectValue placeholder="Select direction" />
                          </SelectTrigger>
                          <SelectContent>
                            {options.directions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor={`${animationType}-duration`}>Duration (s)</Label>
                        <span className="text-sm text-gray-500">
                          {animations[animationType].duration.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        id={`${animationType}-duration`}
                        disabled={!animations[animationType].enabled}
                        value={[animations[animationType].duration]}
                        min={0.1}
                        max={2}
                        step={0.1}
                        onValueChange={([value]) => 
                          handleUpdate(animationType, 'duration', value)
                        }
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor={`${animationType}-delay`}>Delay (s)</Label>
                        <span className="text-sm text-gray-500">
                          {animations[animationType].delay.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        id={`${animationType}-delay`}
                        disabled={!animations[animationType].enabled}
                        value={[animations[animationType].delay]}
                        min={0}
                        max={1}
                        step={0.1}
                        onValueChange={([value]) => 
                          handleUpdate(animationType, 'delay', value)
                        }
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`${animationType}-curve`}>Easing</Label>
                      <Select
                        disabled={!animations[animationType].enabled}
                        value={animations[animationType].curve}
                        onValueChange={(value) => 
                          handleUpdate(animationType, 'curve', value as AnimationCurve)
                        }
                      >
                        <SelectTrigger id={`${animationType}-curve`}>
                          <SelectValue placeholder="Select easing curve" />
                        </SelectTrigger>
                        <SelectContent>
                          {options.curves.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 