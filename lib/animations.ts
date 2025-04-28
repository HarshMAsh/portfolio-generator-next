import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AnimationType = 'fade' | 'slide' | 'zoom' | 'flip' | 'bounce' | 'none';
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';
export type AnimationCurve = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

export type AnimationConfig = {
  type: AnimationType;
  direction: AnimationDirection;
  duration: number;
  delay: number;
  curve: AnimationCurve;
  enabled: boolean;
};

export type SectionAnimations = {
  entrance: AnimationConfig;
  hover: AnimationConfig;
  scroll: AnimationConfig;
};

export const DEFAULT_ENTRANCE_ANIMATION: AnimationConfig = {
  type: 'fade',
  direction: 'up',
  duration: 0.5,
  delay: 0.2,
  curve: 'ease-out',
  enabled: true
};

export const DEFAULT_HOVER_ANIMATION: AnimationConfig = {
  type: 'zoom',
  direction: 'none',
  duration: 0.3,
  delay: 0,
  curve: 'ease-out',
  enabled: false
};

export const DEFAULT_SCROLL_ANIMATION: AnimationConfig = {
  type: 'fade',
  direction: 'up',
  duration: 0.5,
  delay: 0,
  curve: 'ease-out',
  enabled: false
};

export type AnimationsState = {
  sections: Record<string, SectionAnimations>;
  activeSection: string | null;
  previewMode: boolean;
  setActiveSection: (sectionId: string) => void;
  updateAnimationConfig: (
    sectionId: string,
    animationType: 'entrance' | 'hover' | 'scroll',
    config: Partial<AnimationConfig>
  ) => void;
  togglePreviewMode: () => void;
  resetSectionAnimations: (sectionId: string) => void;
  resetAllAnimations: () => void;
  getSectionAnimations: (sectionId: string) => SectionAnimations;
};

export const useAnimationsStore = create<AnimationsState>()(
  persist(
    (set, get) => ({
      sections: {},
      activeSection: null,
      previewMode: false,

      setActiveSection: (sectionId) => {
        set({ activeSection: sectionId });
        
        // Initialize section animations if they don't exist
        const { sections } = get();
        if (!sections[sectionId]) {
          set({
            sections: {
              ...sections,
              [sectionId]: {
                entrance: { ...DEFAULT_ENTRANCE_ANIMATION },
                hover: { ...DEFAULT_HOVER_ANIMATION },
                scroll: { ...DEFAULT_SCROLL_ANIMATION }
              }
            }
          });
        }
      },

      updateAnimationConfig: (sectionId, animationType, config) => {
        const { sections } = get();
        const sectionAnimations = get().getSectionAnimations(sectionId);

        set({
          sections: {
            ...sections,
            [sectionId]: {
              ...sectionAnimations,
              [animationType]: {
                ...sectionAnimations[animationType],
                ...config
              }
            }
          }
        });
      },

      togglePreviewMode: () => {
        set((state) => ({ previewMode: !state.previewMode }));
      },

      resetSectionAnimations: (sectionId) => {
        const { sections } = get();
        
        set({
          sections: {
            ...sections,
            [sectionId]: {
              entrance: { ...DEFAULT_ENTRANCE_ANIMATION },
              hover: { ...DEFAULT_HOVER_ANIMATION },
              scroll: { ...DEFAULT_SCROLL_ANIMATION }
            }
          }
        });
      },

      resetAllAnimations: () => {
        set({ sections: {} });
      },

      getSectionAnimations: (sectionId) => {
        const { sections } = get();
        
        // Return existing section animations or defaults
        return sections[sectionId] || {
          entrance: { ...DEFAULT_ENTRANCE_ANIMATION },
          hover: { ...DEFAULT_HOVER_ANIMATION },
          scroll: { ...DEFAULT_SCROLL_ANIMATION }
        };
      }
    }),
    {
      name: 'portfolio-animations',
    }
  )
);

export const getAnimationOptions = () => {
  return {
    types: [
      { value: 'fade', label: 'Fade' },
      { value: 'slide', label: 'Slide' },
      { value: 'zoom', label: 'Zoom' },
      { value: 'flip', label: 'Flip' },
      { value: 'bounce', label: 'Bounce' },
      { value: 'none', label: 'None' }
    ],
    directions: [
      { value: 'up', label: 'Up' },
      { value: 'down', label: 'Down' },
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
      { value: 'none', label: 'None' }
    ],
    curves: [
      { value: 'linear', label: 'Linear' },
      { value: 'ease', label: 'Ease' },
      { value: 'ease-in', label: 'Ease In' },
      { value: 'ease-out', label: 'Ease Out' },
      { value: 'ease-in-out', label: 'Ease In Out' },
      { value: 'spring', label: 'Spring' }
    ]
  };
}; 