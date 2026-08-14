'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

interface CatBag {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const catImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Load the provided cat bag image asset: /Assets/cat_litter_bag.png
    const img = new Image();
    img.src = '/Assets/cat_litter_bag.png';
    img.onload = () => {
      catImgRef.current = img;
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for cursor repulsion (Expanded radius for larger objects)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 190, // Generous repulsion radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
      initCatBags();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Particle Colors matching Fresh & Fit palette
    const colors = [
      'rgba(255, 0, 127, 0.55)', // Neon Pink
      'rgba(0, 245, 255, 0.55)', // Neon Cyan
      'rgba(255, 230, 0, 0.45)', // Gold
      'rgba(138, 43, 226, 0.5)', // Purple
    ];

    let particles: Particle[] = [];
    let catBags: CatBag[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(35, Math.floor(width / 35));
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 22 + 14; // Larger circular particles (14px to 36px)
        const vx = (Math.random() - 0.5) * 0.8;
        const vy = (Math.random() - 0.5) * 0.8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx,
          vy,
        });
      }
    };

    const initCatBags = () => {
      catBags = [];
      const catBagCount = 14; // Falling cat food bags
      for (let i = 0; i < catBagCount; i++) {
        catBags.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 30 + 55, // Enlarged cat bags (55px to 85px)
          speedY: Math.random() * 0.7 + 0.4,
          speedX: (Math.random() - 0.5) * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.25 + 0.65, // Vibrant opacity
        });
      }
    };

    initParticles();
    initCatBags();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Mouse-Repelling Floating Glowing Orbs (Enlarged)
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 7;
          p.y -= Math.sin(angle) * force * 7;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Screen boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Mouse-Repelling Falling Cat Litter Bags (Enlarged)
      catBags.forEach((bag) => {
        const dx = mouse.x - bag.x;
        const dy = mouse.y - bag.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          bag.x -= Math.cos(angle) * force * 8;
          bag.y -= Math.sin(angle) * force * 8;
        } else {
          bag.y += bag.speedY;
          bag.x += bag.speedX;
        }

        bag.rotation += bag.rotSpeed;

        // Reset to top when drifting off bottom
        if (bag.y > height + 90) {
          bag.y = -90;
          bag.x = Math.random() * width;
        }
        if (bag.x < -90) bag.x = width + 90;
        if (bag.x > width + 90) bag.x = -90;

        ctx.save();
        ctx.translate(bag.x, bag.y);
        ctx.rotate(bag.rotation);
        ctx.globalAlpha = bag.opacity;

        if (catImgRef.current && catImgRef.current.complete) {
          const s = bag.size;
          ctx.drawImage(catImgRef.current, -s / 2, -s / 2, s, s * 1.15);
        } else {
          const s = bag.size;
          ctx.fillStyle = '#FFE600';
          ctx.fillRect(-s / 2, -s / 2, s, s * 1.2);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
