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

export default function ModernTemplate({ 
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

  return (
    <div className="font-sans text-zinc-800 dark:text-zinc-200 mx-auto max-w-4xl">
      {/* Hero Section with glass morphism effect */}
      <div className="mb-10 relative rounded-xl overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] blur-xl opacity-20"></div>
        <div className="relative bg-white/80 dark:bg-zinc-900/80 p-8 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {profileImage ? (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full blur opacity-70"></div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800">
                  <img 
                    src={profileImage} 
                    alt={name || "Profile"} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-20 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{name.charAt(0)}</span>
              </div>
            )}
            <div className="text-center md:text-left md:flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent leading-tight">
                {name || "Your Name"}
              </h1>
              {title && (
                <h2 className="text-xl text-[var(--color-primary)] opacity-80 mt-1 font-medium">
                  {title}
                </h2>
              )}
              <div className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                {bio || "Your bio goes here..."}
              </div>
              
              {socialLinks.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                  {socialLinks.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full text-sm bg-[var(--color-primary)] bg-opacity-10 hover:bg-opacity-20 text-[var(--color-primary)] transition-all"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout for desktops */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          {/* Skills Section */}
          <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsList.length > 0 ? (
                skillsList.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] dark:bg-opacity-25 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400">Add your skills...</p>
              )}
            </div>
          </section>

          {/* Languages Section */}
          {languagesList.length > 0 && (
            <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
                Languages
              </h2>
              <div className="space-y-2">
                {languagesList.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{language.split('(')[0].trim()}</span>
                    <span className="text-sm text-[var(--color-primary)]">
                      {language.includes('(') ? `(${language.split('(')[1]}` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certificationsList.length > 0 && (
            <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
                Certifications
              </h2>
              <div className="space-y-3">
                {certificationsList.map((cert, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-primary)] mr-2"></div>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="md:col-span-2 space-y-8">
          {/* Experience Section */}
          {experienceList.length > 0 && (
            <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
                Experience
              </h2>
              <div className="space-y-4">
                {experienceList.map((exp, index) => {
                  // Parse job title and company if possible
                  const hasAt = exp.includes(' at ');
                  const title = hasAt ? exp.split(' at ')[0] : '';
                  const rest = hasAt ? exp.split(' at ')[1] : exp;
                  
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/70 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 hover:shadow-md transition-shadow"
                    >
                      {hasAt ? (
                        <>
                          <h3 className="font-medium text-[var(--color-primary)]">{title}</h3>
                          <p className="text-zinc-600 dark:text-zinc-300">{rest}</p>
                        </>
                      ) : (
                        <p>{exp}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Education Section */}
          {educationList.length > 0 && (
            <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
                Education
              </h2>
              <div className="space-y-4">
                {educationList.map((edu, index) => {
                  // Parse degree and university if possible
                  const commaIndex = edu.indexOf(',');
                  const degree = commaIndex !== -1 ? edu.substring(0, commaIndex) : edu;
                  const university = commaIndex !== -1 ? edu.substring(commaIndex + 1) : '';
                  
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/70 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium text-[var(--color-primary)]">{degree}</h3>
                      {university && <p className="text-zinc-600 dark:text-zinc-300">{university}</p>}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Projects Section */}
          <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
              Projects
            </h2>
            {projectsList.length > 0 ? (
              <div className="space-y-4">
                {projectsList.map((project, index) => {
                  // Try to parse project title and description
                  const dashIndex = project.indexOf(' - ');
                  const title = dashIndex !== -1 ? project.substring(0, dashIndex) : project;
                  const description = dashIndex !== -1 ? project.substring(dashIndex + 3) : '';
                  
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/70 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium text-[var(--color-primary)]">{title}</h3>
                      {description && <p className="text-zinc-600 dark:text-zinc-300 mt-1">{description}</p>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400">Add your projects...</p>
            )}
          </section>

          {/* Achievements Section */}
          {achievementsList.length > 0 && (
            <section className="p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[var(--color-primary)]">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievementsList.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-white/70 dark:bg-zinc-800/50 border-l-4 border-[var(--color-primary)] hover:shadow-md transition-shadow"
                  >
                    <p>{achievement}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 