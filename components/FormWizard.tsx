import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import MotionElement from "./MotionElement";

type FormData = {
  name: string;
  title?: string;
  bio: string;
  skills: string;
  projects: string;
  education?: string;
  experience?: string;
  achievements?: string;
  languages?: string;
  certifications?: string;
};

type FormWizardProps = {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isLoading: boolean;
};

export default function FormWizard({ formData, onChange, onGenerate, isLoading }: FormWizardProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  // Check if the current step is valid to proceed
  const isStepValid = () => {
    if (step === 1) return formData.name.trim() !== '';
    if (step === 2) return formData.bio.trim() !== '';
    return true;
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Card className="p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 rounded-xl">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          {Array.from({length: totalSteps}).map((_, num) => (
            <motion.div 
              key={num}
              className={`h-2 rounded-full ${
                num+1 <= step ? 'bg-purple-600 dark:bg-purple-500' : 'bg-zinc-200 dark:bg-zinc-700'
              }`}
              style={{ width: `${95/totalSteps}%` }}
              animate={{
                width: `${95/totalSteps}%`,
                backgroundColor: num+1 <= step 
                  ? 'var(--color-primary)' 
                  : 'var(--color-muted)'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <MotionElement animation="fadeIn" duration={0.3}>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Step {step} of {totalSteps}: {
              step === 1 ? 'Basic Info' : 
              step === 2 ? 'Your Bio' : 
              step === 3 ? 'Skills & Education' : 
              step === 4 ? 'Experience' : 
              'Projects & Achievements'
            }
          </div>
        </MotionElement>
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {step === 1 && (
            <div className="space-y-4">
              <MotionElement animation="slideDown" delay={0.1}>
                <h2 className="text-lg font-medium">Personal Information</h2>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.2}>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={onChange}
                  className="bg-zinc-50 dark:bg-zinc-800 text-lg font-medium"
                />
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.3}>
                <Input
                  name="title"
                  placeholder="Professional Title (e.g. Frontend Developer)"
                  value={formData.title || ''}
                  onChange={onChange}
                  className="bg-zinc-50 dark:bg-zinc-800"
                />
              </MotionElement>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <MotionElement animation="slideDown" delay={0.1}>
                <h2 className="text-lg font-medium">Bio & Professional Summary</h2>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.2}>
                <Textarea
                  name="bio"
                  placeholder="Write a detailed summary of your professional background, interests, and career goals"
                  value={formData.bio}
                  onChange={onChange}
                  className="bg-zinc-50 dark:bg-zinc-800 min-h-[120px]"
                  rows={4}
                />
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.3}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Languages (comma separated)
                  </label>
                  <Input
                    name="languages"
                    placeholder="English (Native), Spanish (Fluent), French (Intermediate)"
                    value={formData.languages || ''}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
              </MotionElement>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <MotionElement animation="slideDown" delay={0.1}>
                <h2 className="text-lg font-medium">Skills & Education</h2>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.2}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Your skills (comma separated)
                  </label>
                  <Input
                    name="skills"
                    placeholder="JavaScript, React, UI/UX Design, Project Management, Communication"
                    value={formData.skills}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800 mb-4"
                  />
                </div>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.3}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Education (one per line)
                  </label>
                  <Textarea
                    name="education"
                    placeholder="Bachelor of Science in Computer Science, University of Example (2018-2022)"
                    value={formData.education || ''}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800"
                    rows={3}
                  />
                </div>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.4}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Certifications (one per line)
                  </label>
                  <Textarea
                    name="certifications"
                    placeholder="AWS Certified Developer, CompTIA Security+ (2023)"
                    value={formData.certifications || ''}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800"
                    rows={2}
                  />
                </div>
              </MotionElement>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <MotionElement animation="slideDown" delay={0.1}>
                <h2 className="text-lg font-medium">Work Experience</h2>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.2}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Professional Experience (one position per line)
                  </label>
                  <Textarea
                    name="experience"
                    placeholder="Senior Developer at Tech Company (2020-Present) - Led development of enterprise applications"
                    value={formData.experience || ''}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800"
                    rows={4}
                  />
                </div>
              </MotionElement>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <MotionElement animation="slideDown" delay={0.1}>
                <h2 className="text-lg font-medium">Projects & Achievements</h2>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.2}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Projects (one per line)
                  </label>
                  <Textarea
                    name="projects"
                    placeholder="E-commerce website with React and Node.js - Increased sales by 30%"
                    value={formData.projects}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800"
                    rows={3}
                  />
                </div>
              </MotionElement>
              <MotionElement animation="slideUp" delay={0.3}>
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-1 block">
                    Achievements & Awards (one per line)
                  </label>
                  <Textarea
                    name="achievements"
                    placeholder="First place in Hackathon 2022, Employee of the Year 2021"
                    value={formData.achievements || ''}
                    onChange={onChange}
                    className="bg-zinc-50 dark:bg-zinc-800"
                    rows={2}
                  />
                </div>
              </MotionElement>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 ? (
          <MotionElement animation="slideRight" delay={0.1} whileHover="grow" whileTap="shrink" className="w-1/3">
            <Button
              variant="outline"
              onClick={prevStep}
              className="w-full"
            >
              Back
            </Button>
          </MotionElement>
        ) : (
          <div className="w-1/3"></div> // Empty div to maintain flex spacing
        )}

        {step < totalSteps ? (
          <MotionElement animation="slideLeft" delay={0.1} whileHover="grow" whileTap="shrink" className="w-1/3">
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="w-full"
            >
              Next
            </Button>
          </MotionElement>
        ) : (
          <MotionElement animation="pulse" delay={0.1} whileHover="grow" whileTap="shrink" className="w-1/3">
            <Button
              onClick={onGenerate}
              disabled={isLoading || !isStepValid()}
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </MotionElement>
        )}
      </div>
    </Card>
  );
} 