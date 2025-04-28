'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ParticleConfig, ParticleStyle } from './MotionGraphics';

// Particle interface
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  rotation: number;
}

// Helper function to generate random numbers
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function ParticlesRenderer({ config }: { config: ParticleConfig }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);

  // Initialize particles based on current config and dimensions
  const initParticles = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < config.particleCount; i++) {
      newParticles.push({
        x: random(0, dimensions.width),
        y: random(0, dimensions.height),
        size: random(config.size * 0.5, config.size * 1.5),
        speedX: random(-config.speed, config.speed),
        speedY: random(-config.speed, config.speed),
        color: config.color,
        opacity: random(config.opacity * 0.5, config.opacity),
        rotation: random(0, Math.PI * 2),
      });
    }
    setParticles(newParticles);
  };

  // Update canvas dimensions when window size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Initialize particles when dimensions or config changes
  useEffect(() => {
    initParticles();
  }, [dimensions, config.particleCount, config.size, config.speed, config.color, config.opacity]);

  // Draw a star shape
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    color: string,
    opacity: number
  ) => {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2;
    
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    
    for (let i = 0; i < spikes; i++) {
      const outerAngle = (Math.PI * 2 * i) / spikes;
      const innerAngle = (Math.PI * 2 * i + Math.PI) / spikes;
      
      ctx.lineTo(
        Math.cos(outerAngle) * outerRadius,
        Math.sin(outerAngle) * outerRadius
      );
      ctx.lineTo(
        Math.cos(innerAngle) * innerRadius,
        Math.sin(innerAngle) * innerRadius
      );
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // Draw a particle based on style
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle, style: ParticleStyle) => {
    const { x, y, size, rotation, color, opacity } = particle;
    
    ctx.globalAlpha = opacity;
    
    switch (style) {
      case 'circles':
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        break;
        
      case 'squares':
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = color;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
        break;
        
      case 'stars':
        drawStar(ctx, x, y, size, rotation, color, opacity);
        break;
        
      case 'confetti':
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = color;
        ctx.fillRect(-size / 4, -size / 2, size / 2, size);
        ctx.restore();
        break;
    }
    
    ctx.globalAlpha = 1;
  };

  // Animation loop
  useEffect(() => {
    if (!config.enabled || particles.length === 0 || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const updatedParticles = particles.map(particle => {
        // Update position
        let x = particle.x + particle.speedX;
        let y = particle.y + particle.speedY;
        
        // Bounce off edges
        if (x < 0 || x > canvas.width) {
          particle.speedX *= -1;
          x = x < 0 ? 0 : canvas.width;
        }
        
        if (y < 0 || y > canvas.height) {
          particle.speedY *= -1;
          y = y < 0 ? 0 : canvas.height;
        }
        
        // Slowly rotate the particle
        const rotation = (particle.rotation + 0.01) % (Math.PI * 2);
        
        // Draw the particle
        drawParticle(ctx, { ...particle, x, y, rotation }, config.style);
        
        // Return updated particle
        return { ...particle, x, y, rotation };
      });
      
      setParticles(updatedParticles);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, config.enabled, config.style]);

  if (!config.enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}