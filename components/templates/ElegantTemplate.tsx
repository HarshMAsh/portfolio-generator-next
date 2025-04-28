import React from "react";

type PortfolioProps = {
  name: string;
  bio: string;
  skills: string;
  projects: string;
  profileImage?: string | null;
  education?: string;
  experience?: string;
  achievements?: string;
  languages?: string;
  certifications?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  title?: string;
};

export default function ElegantTemplate({ 
  name, 
  bio, 
  skills, 
  projects,
  profileImage,
  education,
  experience,
  achievements,
  languages,
  certifications,
  socialLinks = [],
  title
}: PortfolioProps) {
  // Split skills and projects by commas or newlines
  const skillsList = skills.split(/,|\n/).filter(Boolean).map(s => s.trim());
  const projectsList = projects.split(/\n/).filter(Boolean).map(p => p.trim());
  const educationList = education?.split(/\n/).filter(Boolean).map(e => e.trim()) || [];
  const experienceList = experience?.split(/\n/).filter(Boolean).map(e => e.trim()) || [];
  const achievementsList = achievements?.split(/\n/).filter(Boolean).map(a => a.trim()) || [];
  const languagesList = languages?.split(/,|\n/).filter(Boolean).map(l => l.trim()) || [];
  const certificationsList = certifications?.split(/\n/).filter(Boolean).map(c => c.trim()) || [];

  // Use theme color accent instead of amber
  const accentColor = 'var(--color-primary)';
  const accentColorLight = 'var(--color-accent)';

  return (
    <div className="font-serif text-zinc-900 dark:text-zinc-100 max-w-4xl mx-auto">
      {/* Header with decorative elements */}
      <div className="relative mb-16">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[${accentColor}] via-[${accentColorLight}] to-transparent`}></div>
        <div className="text-center pt-20">
          {profileImage && (
            <div className="mb-8 mx-auto">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-primary)] mx-auto">
                <img 
                  src={profileImage} 
                  alt={name || "Profile"} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <h1 className="text-4xl font-normal tracking-wide mb-2">
            {name || "Your Name"}
          </h1>
          {title && (
            <h2 className="text-xl mb-4 italic text-[var(--color-primary)]">
              {title}
            </h2>
          )}
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {bio || "Your bio goes here..."}
          </p>
          
          {socialLinks.length > 0 && (
            <div className="mt-6 flex gap-4 justify-center">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills Section - Elegant cards */}
      <div className="mb-16">
        <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
          <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
          EXPERTISE
          <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
        </h2>
        
        {skillsList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skillsList.map((skill, index) => (
              <div 
                key={index} 
                className="p-4 border border-zinc-200 dark:border-zinc-800 text-center hover:border-[var(--color-primary)] dark:hover:border-[var(--color-primary)] transition-colors duration-300"
              >
                <p className="text-sm tracking-wide">{skill}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-center italic">Add your skills...</p>
        )}
      </div>

      {/* Languages Section */}
      {languagesList.length > 0 && (
        <div className="mb-16">
          <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
            <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
            LANGUAGES
            <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {languagesList.map((language, index) => (
              <div key={index} className="text-center">
                <p className="text-sm tracking-wide">{language}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experienceList.length > 0 && (
        <div className="mb-16">
          <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
            <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
            EXPERIENCE
            <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
          </h2>
          <div className="border-t border-b border-zinc-200 dark:border-zinc-800">
            {experienceList.map((exp, index) => (
              <div
                key={index}
                className={`py-6 px-4 ${
                  index !== experienceList.length - 1 ? "border-b border-zinc-100 dark:border-zinc-900/60" : ""
                }`}
              >
                <p className="leading-relaxed">{exp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educationList.length > 0 && (
        <div className="mb-16">
          <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
            <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
            EDUCATION
            <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
          </h2>
          <div className="border-t border-b border-zinc-200 dark:border-zinc-800">
            {educationList.map((edu, index) => (
              <div
                key={index}
                className={`py-6 px-4 ${
                  index !== educationList.length - 1 ? "border-b border-zinc-100 dark:border-zinc-900/60" : ""
                }`}
              >
                <p className="leading-relaxed">{edu}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section - Elegant list */}
      <div className="mb-16">
        <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
          <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
          PORTFOLIO
          <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
        </h2>
        
        {projectsList.length > 0 ? (
          <div className="border-t border-b border-zinc-200 dark:border-zinc-800">
            {projectsList.map((project, index) => (
              <div
                key={index}
                className={`py-6 px-4 ${
                  index !== projectsList.length - 1 ? "border-b border-zinc-100 dark:border-zinc-900/60" : ""
                }`}
              >
                <p className="leading-relaxed">{project}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-center italic">Add your projects...</p>
        )}
      </div>

      {/* Achievements Section */}
      {achievementsList.length > 0 && (
        <div className="mb-16">
          <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
            <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
            ACHIEVEMENTS
            <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementsList.map((achievement, index) => (
              <div 
                key={index} 
                className="p-4 border border-zinc-200 dark:border-zinc-800 text-center hover:border-[var(--color-primary)] transition-colors duration-300"
              >
                <p className="text-sm tracking-wide leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certificationsList.length > 0 && (
        <div className="mb-16">
          <h2 className="text-center text-lg mb-8 tracking-widest font-light flex items-center justify-center">
            <span className="w-12 h-px bg-[var(--color-primary)] mr-4"></span>
            CERTIFICATIONS
            <span className="w-12 h-px bg-[var(--color-primary)] ml-4"></span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certificationsList.map((cert, index) => (
              <div 
                key={index} 
                className="p-3 border border-zinc-200 dark:border-zinc-800 text-center hover:border-[var(--color-primary)] transition-colors duration-300"
              >
                <p className="text-sm tracking-wide">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with decorative elements */}
      <div className="mt-16 text-center">
        <div className="inline-block mb-4">
          <div className="w-8 h-8 rounded-full border border-[var(--color-primary)] dark:border-[var(--color-primary)] mx-auto flex items-center justify-center">
            <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full"></div>
          </div>
        </div>
        <p className="text-xs tracking-wider text-zinc-500 dark:text-zinc-500">
          {name || "Your Name"} • Portfolio {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
} 