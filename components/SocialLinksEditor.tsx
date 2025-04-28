'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { PlusIcon, TrashIcon, LinkIcon, GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, YoutubeIcon, GlobeIcon } from 'lucide-react';

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

interface SocialLinksEditorProps {
  onChange: (links: SocialLink[]) => void;
}

const PLATFORM_OPTIONS = [
  { value: 'github', label: 'GitHub', icon: <GithubIcon size={16} /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <LinkedinIcon size={16} /> },
  { value: 'twitter', label: 'Twitter', icon: <TwitterIcon size={16} /> },
  { value: 'instagram', label: 'Instagram', icon: <InstagramIcon size={16} /> },
  { value: 'youtube', label: 'YouTube', icon: <YoutubeIcon size={16} /> },
  { value: 'website', label: 'Website', icon: <GlobeIcon size={16} /> },
];

export default function SocialLinksEditor({ onChange }: SocialLinksEditorProps) {
  const [links, setLinks] = useState<SocialLink[]>([]);

  const addLink = () => {
    if (links.length >= 6) {
      toast.error('Maximum 6 social links allowed');
      return;
    }
    
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'website',
      url: '',
    };
    
    const newLinks = [...links, newLink];
    setLinks(newLinks);
    onChange(newLinks);
  };

  const updateLink = (id: string, field: 'platform' | 'url', value: string) => {
    const newLinks = links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    setLinks(newLinks);
    onChange(newLinks);
  };

  const removeLink = (id: string) => {
    const newLinks = links.filter(link => link.id !== id);
    setLinks(newLinks);
    onChange(newLinks);
    toast.info('Social link removed');
  };

  const getIcon = (platform: string) => {
    const option = PLATFORM_OPTIONS.find(opt => opt.value === platform);
    return option?.icon || <LinkIcon size={16} />;
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Social Links
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={addLink}
          className="h-8 px-2"
          disabled={links.length >= 6}
        >
          <PlusIcon size={16} />
          <span className="ml-1">Add</span>
        </Button>
      </div>
      
      <AnimatePresence>
        {links.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6 text-zinc-500 dark:text-zinc-400 text-sm"
          >
            No social links added yet. Click "Add" to add your social media profiles.
          </motion.div>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2 items-center"
              >
                <div className="flex-shrink-0">
                  <select
                    value={link.platform}
                    onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                    className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md h-10 px-3 text-sm"
                  >
                    {PLATFORM_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-grow relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    {getIcon(link.platform)}
                  </div>
                  <Input
                    placeholder={`Enter ${link.platform} URL`}
                    value={link.url}
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                    className="pl-9 bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(link.id)}
                  className="flex-shrink-0 h-10 w-10 text-zinc-500 hover:text-red-500"
                >
                  <TrashIcon size={16} />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
} 