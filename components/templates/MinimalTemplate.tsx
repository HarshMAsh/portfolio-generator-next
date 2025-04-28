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

export default function MinimalTemplate({ 
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

  return (
    <div className="font-sans max-w-2xl mx-auto text-zinc-800 dark:text-zinc-200 space-y-12">
      {/* Name & Bio */}
      <div className="text-center space-y-4">
        {profileImage && (
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 mx-auto">
              <img 
                src={profileImage} 
                alt={name || "Profile"} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <h1 className="text-4xl font-light tracking-tight">
          {name || "Your Name"}
        </h1>
        {title && (
          <p className="text-[var(--color-primary)] dark:text-[var(--color-primary)] opacity-80">
            {title}
          </p>
        )}
        <div className="h-px w-24 bg-zinc-300 dark:bg-zinc-700 mx-auto my-4"></div>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto">
          {bio || "Your bio goes here..."}
        </p>
        
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mt-4">
            {socialLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 text-center">
          Expertise
        </h2>
        {skillsList.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {skillsList.map((skill, index) => (
              <span
                key={index}
                className="text-sm hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-center">Add your skills...</p>
        )}
      </div>

      {/* Experience Section */}
      {experienceList.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 text-center">
            Experience
          </h2>
          <div className="space-y-6">
            {experienceList.map((exp, index) => (
              <div key={index} className="text-center">
                <p className="leading-relaxed">{exp}</p>
                {index < experienceList.length - 1 && (
                  <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800 mx-auto my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educationList.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 text-center">
            Education
          </h2>
          <div className="space-y-6">
            {educationList.map((edu, index) => (
              <div key={index} className="text-center">
                <p className="leading-relaxed">{edu}</p>
                {index < educationList.length - 1 && (
                  <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800 mx-auto my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 text-center">
          Selected Work
        </h2>
        {projectsList.length > 0 ? (
          <div className="space-y-8">
            {projectsList.map((project, index) => (
              <div
                key={index}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 p-4 rounded-lg transition-colors duration-300"
              >
                <p className="leading-relaxed">{project}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-center">Add your projects...</p>
        )}
      </div>

      {/* Achievements Section */}
      {achievementsList.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 text-center">
            Achievements
          </h2>
          <div className="space-y-4">
            {achievementsList.map((achievement, index) => (
              <div key={index} className="text-center">
                <p className="leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-8 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <div className="h-px w-16 bg-zinc-200 dark:bg-zinc-800 mx-auto mb-6"></div>
        <p>© {new Date().getFullYear()} {name || "Your Name"}</p>
      </div>
    </div>
  );
} 