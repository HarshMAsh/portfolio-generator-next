'use client'
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Import components
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import TemplateSelector, { TemplateType } from "@/components/TemplateSelector";
import FormWizard from "@/components/FormWizard";
import AnimatedTemplate from "@/components/AnimatedTemplate";
import EmptyState from "@/components/EmptyState";
import ThemeColorPicker from "@/components/ThemeColorPicker";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileUploader from "@/components/ProfileUploader";
import PortfolioExporter from "@/components/PortfolioExporter";

import SocialLinksEditor, { SocialLink } from "@/components/SocialLinksEditor";
import MotionGraphics, { ParticleConfig } from "@/components/MotionGraphics";
import { TabletIcon, SmartphoneIcon, MonitorIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Import new animation components
import FloatingElement from "@/components/animations/FloatingElement";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import CursorFollow from "@/components/animations/CursorFollow";
import ParallaxScroll from "@/components/animations/ParallaxScroll";

// Animated Background Blobs with Pattern
const AnimatedBackground = () => {
  // Force a client-side render for dark mode to work correctly
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-repeat" 
        style={{ backgroundImage: `url('/images/bg-pattern.svg')` }} />
      
      {/* Animated Blobs */}
      <div className="absolute opacity-30 dark:opacity-20 blur-3xl">
        <motion.div
          className="absolute top-0 -left-10 w-72 h-72 bg-purple-500 dark:bg-purple-700 rounded-full"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute top-40 left-20 w-96 h-96 bg-blue-500 dark:bg-blue-700 rounded-full"
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-60 right-20 w-80 h-80 bg-pink-500 dark:bg-pink-700 rounded-full"
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 18,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-3xl" />
    </div>
  );
};

// Preview Device Frame Component
const DeviceFrame = ({ children, deviceType }: { children: React.ReactNode, deviceType: 'desktop' | 'tablet' | 'mobile' }) => {
  const frameStyles = {
    desktop: "w-full h-full rounded-lg border-8 border-zinc-200 dark:border-zinc-800 shadow-lg",
    tablet: "w-[768px] h-[1024px] max-h-full rounded-[20px] border-[12px] border-zinc-200 dark:border-zinc-800 shadow-lg mx-auto scale-[0.48] origin-top",
    mobile: "w-[375px] h-[812px] max-h-full rounded-[36px] border-[14px] border-zinc-200 dark:border-zinc-800 shadow-lg mx-auto scale-[0.45] origin-top"
  };
  
  return (
    <div className={`overflow-hidden bg-white dark:bg-zinc-900 ${frameStyles[deviceType]}`}>
      {children}
    </div>
  );
};

export default function PortfolioGenerator() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    projects: "",
    education: "",
    experience: "",
    achievements: "",
    languages: "",
    certifications: "",
  });
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("modern");
  const [aiGenerated, setAiGenerated] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [motionGraphicsEnabled, setMotionGraphicsEnabled] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>("purple");
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>({
    enabled: true,
    particleCount: 40,
    size: 3,
    speed: 0.3,
    color: '#3b82f6',
    opacity: 0.5,
    style: 'circles',
  });

  // Simulate loading skeleton on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setAiGenerated(false); // Reset AI generated flag when user makes changes
  };

  const handleGenerate = async () => {
    setLoading(true);
    setPortfolio(null);
    setError(null);
    
    // Show toast for starting generation
    toast.loading("Generating your portfolio...");
    
    try {
      // Add template style, social links and profile image to the generated content
      const enrichedForm = {
        ...form,
        profileImage: profileImage,
        socialLinks: socialLinks,
        templateStyle: selectedTemplate // Add the selected template style to the request
      };
      
      const res = await axios.post("/api/groq", enrichedForm);
      setPortfolio(res.data.content);
      setAiGenerated(true);
      
      // Show success toast
      toast.success("Portfolio successfully generated!");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to generate portfolio.";
      setError(errorMessage);
      
      // Show error toast
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template);
    toast.info(`Switched to ${template.charAt(0).toUpperCase() + template.slice(1)} template`);
  };

  const handleProfileImageChange = (imageUrl: string | null) => {
    setProfileImage(imageUrl);
  };

  const handleSocialLinksChange = (links: SocialLink[]) => {
    setSocialLinks(links);
  };

  const handleThemeColorChange = (color: string) => {
    setThemeColor(color);
  };

  // Function to check if we have enough data to render a template
  const hasFormData = () => {
    return form.name.trim() !== "";
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="portfolio-generator"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen bg-white dark:bg-zinc-950 pb-20"
      >
        {/* Background Elements */}
        <AnimatedBackground />
        
        {/* Motion Graphics Overlay - Only rendered when enabled */}
        {motionGraphicsEnabled && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <MotionGraphics config={particleConfig} showControls={false} />
          </div>
        )}
        
        {/* Header Section */}
        <motion.header
          variants={itemVariants}
          className="container mx-auto pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center">
            {motionGraphicsEnabled ? (
              <FloatingElement amplitude={8} duration={4} className="inline-block">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="bg-gradient-to-br from-blue-500 to-violet-600 w-10 h-10 rounded-lg mr-3 grid place-items-center shadow-md"
                >
                  <SparklesIcon className="w-6 h-6 text-white" />
                </motion.div>
              </FloatingElement>
            ) : (
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="bg-gradient-to-br from-blue-500 to-violet-600 w-10 h-10 rounded-lg mr-3 grid place-items-center shadow-md"
              >
                <SparklesIcon className="w-6 h-6 text-white" />
              </motion.div>
            )}
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-400 dark:to-violet-500">
              Portfolio Generator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Controls */}
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <ThemeColorPicker 
                selectedColor={themeColor} 
                onColorChange={handleThemeColorChange} 
              />
              <div className="flex items-center gap-2">
                <Switch
                  id="motion-graphics"
                  checked={motionGraphicsEnabled}
                  onCheckedChange={setMotionGraphicsEnabled}
                />
                <Label htmlFor="motion-graphics" className="flex items-center cursor-pointer">
                  <SparklesIcon className="w-4 h-4 mr-1" />
                  <span className="text-xs sm:text-sm">Effects</span>
                </Label>
              </div>
            </div>
            
            {/* Device Preview Buttons */}
            <div className="hidden sm:flex space-x-1 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-md">
              <Button
                size="icon"
                variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                onClick={() => setPreviewDevice('desktop')}
                className="h-8 w-8"
              >
                <MonitorIcon className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                onClick={() => setPreviewDevice('tablet')}
                className="h-8 w-8"
              >
                <TabletIcon className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                onClick={() => setPreviewDevice('mobile')}
                className="h-8 w-8"
              >
                <SmartphoneIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left side: Form & Tools */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <div className="space-y-4">
                {/* Form Wizard */}
                <FormWizard 
                  formData={form} 
                  onChange={handleChange} 
                  onGenerate={handleGenerate} 
                  isLoading={loading} 
                />
                
                {/* Profile Image Uploader */}
                <ProfileUploader onImageChange={handleProfileImageChange} />
                
                {/* Social Links Editor */}
                <SocialLinksEditor onChange={handleSocialLinksChange} />
                
                {/* Export Options */}
                {hasFormData() && (
                  <div className="mt-8 text-center">
                    <PortfolioExporter 
                      content={form} 
                      templateName={selectedTemplate}
                      socialLinks={socialLinks}
                      profileImage={profileImage}
                      themeColor={themeColor}
                    />
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Right side: Preview */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <Card className="p-4 sm:p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 rounded-xl min-h-[500px] md:min-h-[650px] flex flex-col backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1"
                  >
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      onTemplateChange={handleTemplateChange}
                    />
                  </motion.div>
                </div>
                
                <div className="mt-3 border-t pt-6 border-zinc-200 dark:border-zinc-800 flex-grow">
                  <motion.h2 
                    className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Preview <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">({previewDevice} view)</span>
                  </motion.h2>
                  
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 h-[450px] md:h-[500px] relative overflow-hidden backdrop-blur-sm">
                    <DeviceFrame deviceType={previewDevice}>
                      {/* Skeleton loading state */}
                      <AnimatePresence>
                        {showSkeleton && (
                          <motion.div 
                            className="absolute inset-0 flex flex-col p-8"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded-md w-3/4 mb-4 animate-pulse"></div>
                            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-full mb-2 animate-pulse"></div>
                            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-5/6 mb-8 animate-pulse"></div>
                            <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded-md w-1/2 mb-4 animate-pulse"></div>
                            <div className="flex gap-2 mb-8">
                              <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full w-16 animate-pulse"></div>
                              <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full w-20 animate-pulse"></div>
                              <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full w-24 animate-pulse"></div>
                            </div>
                            <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded-md w-1/2 mb-4 animate-pulse"></div>
                            <div className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-md w-full mb-4 animate-pulse"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* AI Generated content */}
                      {!showSkeleton && portfolio && aiGenerated ? (
                        <motion.div
                          className="prose dark:prose-invert max-w-none p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          dangerouslySetInnerHTML={{ __html: portfolio }}
                        />
                      ) : null}
                      
                      {/* Template previews with animations */}
                      {!showSkeleton && !aiGenerated && (
                        <div className="relative w-full h-full">
                          <AnimatedTemplate isActive={selectedTemplate === "modern"}>
                            <div className="p-6">
                              <ModernTemplate 
                                name={form.name} 
                                bio={form.bio} 
                                skills={form.skills} 
                                projects={form.projects}
                                profileImage={profileImage}
                                education={form.education}
                                experience={form.experience}
                                achievements={form.achievements}
                                languages={form.languages}
                                certifications={form.certifications}
                                socialLinks={socialLinks}
                                title={form.title}
                              />
                            </div>
                          </AnimatedTemplate>
                          
                          <AnimatedTemplate isActive={selectedTemplate === "minimal"}>
                            <div className="p-6">
                              <MinimalTemplate 
                                name={form.name} 
                                bio={form.bio} 
                                skills={form.skills} 
                                projects={form.projects}
                                profileImage={profileImage}
                                education={form.education}
                                experience={form.experience}
                                achievements={form.achievements}
                                languages={form.languages}
                                certifications={form.certifications}
                                socialLinks={socialLinks}
                                title={form.title}
                              />
                            </div>
                          </AnimatedTemplate>
                          
                          <AnimatedTemplate isActive={selectedTemplate === "elegant"}>
                            <div className="p-6">
                              <ElegantTemplate 
                                name={form.name} 
                                bio={form.bio} 
                                skills={form.skills} 
                                projects={form.projects}
                                profileImage={profileImage}
                                education={form.education}
                                experience={form.experience}
                                achievements={form.achievements}
                                languages={form.languages}
                                certifications={form.certifications}
                                socialLinks={socialLinks}
                                title={form.title}
                              />
                            </div>
                          </AnimatedTemplate>
                        </div>
                      )}
                      
                      {/* Empty state */}
                      {!showSkeleton && !hasFormData() && !portfolio && (
                        <EmptyState
                          title="No content yet"
                          message="Fill out the form to see your portfolio preview here"
                          icon={
                            motionGraphicsEnabled ? (
                              <FloatingElement amplitude={10} duration={3}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                              </FloatingElement>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                              </svg>
                            )
                          }
                        />
                      )}
                    </DeviceFrame>
                  </div>
                  
                  {portfolio && aiGenerated && (
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                        onClick={() => setAiGenerated(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Switch to Template View
                      </motion.button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-12 text-zinc-400 text-xs text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Powered by Next.js, Groq, and modern UI best practices.
        </motion.footer>
      </motion.main>
    </AnimatePresence>
  );
}
