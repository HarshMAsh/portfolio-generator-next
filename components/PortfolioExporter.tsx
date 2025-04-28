'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { DownloadIcon, FileIcon, EyeIcon, Share2Icon } from 'lucide-react';
import { themeColors } from './ThemeColorPicker';

interface PortfolioExporterProps {
  content: {
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
  templateName: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  profileImage?: string | null;
  themeColor: string;
}

export default function PortfolioExporter({ 
  content, 
  templateName,
  socialLinks = [],
  profileImage,
  themeColor = 'purple'
}: PortfolioExporterProps) {
  const [exporting, setExporting] = useState(false);

  // Find the selected theme color
  const currentTheme = themeColors.find(c => c.name === themeColor) || themeColors[0];

  // Generate complete HTML document for portfolio
  const generateFullHTML = () => {
    // Create a simple HTML representation of the portfolio
    const portfolioHTML = `
      <div class="portfolio ${templateName}-template">
        <header>
          ${profileImage ? `<div class="profile-image"><img src="${profileImage}" alt="${content.name}" /></div>` : ''}
          <h1>${content.name}</h1>
          ${content.title ? `<h2 class="title">${content.title}</h2>` : ''}
          <div class="bio">${content.bio}</div>
          
          ${socialLinks.length > 0 ? `
            <div class="social-links">
              ${socialLinks.map(link => `<a href="${link.url}" target="_blank">${link.platform}</a>`).join('')}
            </div>
          ` : ''}
        </header>
        
        ${content.skills ? `
          <section class="skills">
            <h2>Skills</h2>
            <div class="skills-list">
              ${content.skills.split(/,|\n/).filter(Boolean).map(skill => 
                `<span class="skill-tag">${skill.trim()}</span>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${content.education ? `
          <section class="education">
            <h2>Education</h2>
            <div class="education-list">
              ${content.education.split(/\n/).filter(Boolean).map(edu => 
                `<div class="education-item">${edu.trim()}</div>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${content.experience ? `
          <section class="experience">
            <h2>Experience</h2>
            <div class="experience-list">
              ${content.experience.split(/\n/).filter(Boolean).map(exp => 
                `<div class="experience-item">${exp.trim()}</div>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${content.projects ? `
          <section class="projects">
            <h2>Projects</h2>
            <div class="projects-list">
              ${content.projects.split(/\n/).filter(Boolean).map(project => 
                `<div class="project-item">${project.trim()}</div>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${content.achievements ? `
          <section class="achievements">
            <h2>Achievements</h2>
            <div class="achievements-list">
              ${content.achievements.split(/\n/).filter(Boolean).map(achievement => 
                `<div class="achievement-item">${achievement.trim()}</div>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${content.languages ? `
          <section class="languages">
            <h2>Languages</h2>
            <div class="languages-list">
              ${content.languages.split(/,/).filter(Boolean).map(language => 
                `<span class="language-tag">${language.trim()}</span>`
              ).join('')}
            </div>
          </section>
        ` : ''}
        
        ${content.certifications ? `
          <section class="certifications">
            <h2>Certifications</h2>
            <div class="certifications-list">
              ${content.certifications.split(/\n/).filter(Boolean).map(cert => 
                `<div class="certification-item">${cert.trim()}</div>`
              ).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    `;
    
    const cleanName = content.name.trim() || 'My Portfolio';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanName} - Portfolio</title>
  <style>
    :root {
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      --color-bg: #ffffff;
      --color-text: #171717;
      --color-primary: ${currentTheme.primary};
      --color-secondary: ${currentTheme.secondary};
      --color-muted: #d4d4d8;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #18181b;
        --color-text: #f4f4f5;
        --color-primary: ${currentTheme.primary};
        --color-secondary: ${currentTheme.secondary};
        --color-muted: #3f3f46;
      }
    }
    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-text);
      line-height: 1.5;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    a {
      color: var(--color-primary);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1, h2, h3 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: var(--color-primary);
    }
    p {
      margin-bottom: 1rem;
    }
    .container {
      padding: 1rem;
    }
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 1.5rem;
      border: 3px solid var(--color-primary);
    }
    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    header {
      margin-bottom: 2rem;
      text-align: center;
    }
    .title {
      color: var(--color-secondary);
      font-size: 1.25rem;
      margin-top: 0.5rem;
    }
    .bio {
      margin: 1.5rem 0;
    }
    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }
    section {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-muted);
    }
    .skills-list, .languages-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .skill-tag, .language-tag {
      background-color: var(--color-primary);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
    }
    .experience-item, .project-item, .education-item, .certification-item, .achievement-item {
      background-color: rgba(0,0,0,0.05);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.75rem;
    }
    @media (prefers-color-scheme: dark) {
      .experience-item, .project-item, .education-item, .certification-item, .achievement-item {
        background-color: rgba(255,255,255,0.1);
      }
    }
    .${templateName}-template {
      /* Special styling for the selected template */
    }
  </style>
</head>
<body>
  <div class="container">
    ${portfolioHTML}
    <footer style="margin-top: 3rem; border-top: 1px solid var(--color-muted); padding-top: 1rem; font-size: 0.875rem; color: #71717a;">
      <p>Generated with Portfolio Generator</p>
    </footer>
  </div>
</body>
</html>
    `.trim();
  };

  // Function to export as HTML file
  const exportHTML = () => {
    setExporting(true);
    toast.loading('Preparing HTML export...');

    try {
      const htmlContent = generateFullHTML();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${content.name.trim() || 'portfolio'}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Portfolio exported as HTML!');
    } catch (error) {
      toast.error('Failed to export portfolio');
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  // Function to preview portfolio in new tab
  const previewPortfolio = () => {
    try {
      const htmlContent = generateFullHTML();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      window.open(url, '_blank');
    } catch (error) {
      toast.error('Failed to preview portfolio');
      console.error('Preview error:', error);
    }
  };

  // Function to share portfolio (using Web Share API if available)
  const sharePortfolio = async () => {
    if (navigator.share) {
      try {
        const htmlContent = generateFullHTML();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const file = new File([blob], `${content.name.trim() || 'portfolio'}.html`, { type: 'text/html' });
        
        await navigator.share({
          title: `${content.name}'s Portfolio`,
          text: 'Check out my portfolio created with Portfolio Generator!',
          files: [file]
        });
        
        toast.success('Portfolio shared successfully!');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Failed to share portfolio');
          console.error('Share error:', error);
        }
      }
    } else {
      toast.error('Web Share API not supported by your browser');
    }
  };

  const hasContent = content.name || content.bio || content.skills || content.projects;

  return (
    <Card className="p-4">
      <h2 className="text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
        Export Portfolio
      </h2>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={exportHTML}
          disabled={!hasContent || exporting}
          className="flex items-center gap-1.5"
          variant="outline"
        >
          <DownloadIcon size={16} />
          <span>Export HTML</span>
        </Button>
        
        <Button
          onClick={previewPortfolio}
          disabled={!hasContent}
          className="flex items-center gap-1.5"
          variant="outline"
        >
          <EyeIcon size={16} />
          <span>Preview</span>
        </Button>
      </div>
      
      <motion.div 
        className="mt-3"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: hasContent ? 1 : 0,
          height: hasContent ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {hasContent && (
          <Button
            onClick={sharePortfolio}
            className="w-full flex items-center gap-1.5 mt-2"
            variant="default"
          >
            <Share2Icon size={16} />
            <span>Share Portfolio</span>
          </Button>
        )}
      </motion.div>
    </Card>
  );
} 