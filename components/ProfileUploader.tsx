'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { UserCircleIcon, UploadCloudIcon, XCircleIcon } from 'lucide-react';

interface ProfileUploaderProps {
  onImageChange: (imageUrl: string | null) => void;
}

export default function ProfileUploader({ onImageChange }: ProfileUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setImage(imageUrl);
        onImageChange(imageUrl);
        toast.success('Profile picture uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please drop an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setImage(imageUrl);
        onImageChange(imageUrl);
        toast.success('Profile picture uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Profile picture removed');
  };

  return (
    <Card className="p-4 relative">
      <h2 className="text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
        Profile Picture
      </h2>
      
      {!image ? (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            isDragging
              ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: isDragging ? 1.1 : 1 }}
              className="text-zinc-400 dark:text-zinc-500 mb-2"
            >
              {isDragging ? (
                <UploadCloudIcon size={40} className="text-purple-500 dark:text-purple-400" />
              ) : (
                <UserCircleIcon size={40} />
              )}
            </motion.div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isDragging ? 'Drop your image here' : 'Click or drag to upload profile picture'}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
              PNG, JPG or GIF up to 2MB
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden h-40 group">
          <img 
            src={image} 
            alt="Profile preview" 
            className="w-full h-full object-cover"
          />
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ opacity: 1 }}
          >
            <Button 
              variant="destructive"
              size="sm"
              onClick={handleRemoveImage}
              className="gap-1"
            >
              <XCircleIcon size={16} />
              Remove
            </Button>
          </motion.div>
        </div>
      )}
    </Card>
  );
} 