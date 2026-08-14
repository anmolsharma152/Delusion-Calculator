'use client';

import { useEffect, useRef } from 'react';

type ItemType = 'CAT_BAG' | 'CHAIN' | 'DIAMOND' | 'COCKTAIL' | 'PALM' | 'YACHT' | 'ORB';

interface FloatingItem {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: ItemType;
  color: string;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const catImgRef = useRef<HTMLImageElement | null>(null);
  const spriteCache = useRef<Record<string, HTMLCanvasElement>>({});

  useEffect(() => {
    // 1. Load official Cat Litter Bag Image
    const img = new Image();
    img.src = '/Assets/cat_litter_bag.png';
    img.onload = () => {
      catImgRef.current = img;
    };

    // 2. Pre-render High-Resolution Vector Sprites into Offscreen Canvases for optimal 60fps performance
    const createOffscreenCanvas = (w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      if (ctx) draw(ctx);
      return c;
    };

    // Sprite: Diamond Gem
    spriteCache.current['DIAMOND'] = createOffscreenCanvas(100, 100, (ctx) => {
      ctx.translate(50, 50);
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#00F5FF';

      ctx.beginPath();
      ctx.moveTo(0, -38);
      ctx.lineTo(38, -12);
      ctx.lineTo(0, 42);
      ctx.lineTo(-38, -12);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 245, 255, 0.85)';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Facets
      ctx.beginPath();
      ctx.moveTo(-38, -12);
      ctx.lineTo(38, -12);
      ctx.moveTo(0, -38);
      ctx.lineTo(-15, -12);
      ctx.lineTo(0, 42);
      ctx.moveTo(0, -38);
      ctx.lineTo(15, -12);
      ctx.lineTo(0, 42);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Sprite: Cuban Gold Chain Links
    spriteCache.current['CHAIN'] = createOffscreenCanvas(110, 110, (ctx) => {
      ctx.translate(55, 55);
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#FFE600';

      const drawLink = (x: number, y: number, rot: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 14, 0, 0, Math.PI * 2);
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#FFE600';
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFF8B2';
        ctx.stroke();
        ctx.restore();
      };

      drawLink(-18, -12, -0.4);
      drawLink(0, 0, 0.3);
      drawLink(18, 12, -0.4);
    });

    // Sprite: Miami Cocktail Glass
    spriteCache.current['COCKTAIL'] = createOffscreenCanvas(100, 100, (ctx) => {
      ctx.translate(50, 50);
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#FF007F';

      // Stem & Base
      ctx.beginPath();
      ctx.moveTo(-16, 38);
      ctx.lineTo(16, 38);
      ctx.moveTo(0, 38);
      ctx.lineTo(0, 6);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Triangle Glass Cup
      ctx.beginPath();
      ctx.moveTo(-32, -26);
      ctx.lineTo(32, -26);
      ctx.lineTo(0, 6);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 0, 127, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Cocktail Umbrella / Garnish
      ctx.beginPath();
      ctx.arc(8, -26, 12, Math.PI, 0);
      ctx.fillStyle = '#FFE600';
      ctx.fill();
    });

    // Sprite: Miami Palm Tree Silhouette
    spriteCache.current['PALM'] = createOffscreenCanvas(110, 110, (ctx) => {
      ctx.translate(55, 55);
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#00F5FF';

      // Trunk
      ctx.beginPath();
      ctx.moveTo(-4, 40);
      ctx.quadraticCurveTo(-14, 0, 0, -16);
      ctx.quadraticCurveTo(8, 0, 6, 40);
      ctx.closePath();
      ctx.fillStyle = 'rgba(138, 43, 226, 0.85)';
      ctx.fill();

      // Fronds
      const drawFrond = (cx: number, cy: number, ex: number, ey: number) => {
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.quadraticCurveTo(cx, cy, ex, ey);
        ctx.lineWidth = 4.5;
        ctx.strokeStyle = '#00F5FF';
        ctx.stroke();
      };

      drawFrond(-25, -42, -42, -22);
      drawFrond(25, -42, 42, -22);
      drawFrond(-35, -20, -45, 2);
      drawFrond(35, -20, 45, 2);
      drawFrond(0, -45, 0, -48);
    });

    // Sprite: Miami Luxury Yacht
    spriteCache.current['YACHT'] = createOffscreenCanvas(120, 80, (ctx) => {
      ctx.translate(60, 40);
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#00F5FF';

      // Hull
      ctx.beginPath();
      ctx.moveTo(-45, 12);
      ctx.lineTo(35, 12);
      ctx.lineTo(48, 0);
      ctx.lineTo(-38, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cabin / Deck
      ctx.beginPath();
      ctx.moveTo(-24, 0);
      ctx.lineTo(15, 0);
      ctx.lineTo(8, -16);
      ctx.lineTo(-18, -16);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 0, 127, 0.85)';
      ctx.fill();

      // Tinted Windows
      ctx.beginPath();
      ctx.moveTo(-14, -4);
      ctx.lineTo(6, -4);
      ctx.lineTo(2, -12);
      ctx.lineTo(-10, -12);
      ctx.closePath();
      ctx.fillStyle = '#0c0721';
      ctx.fill();
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200, // Generous repulsion bubble
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initItems();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 0, 127, 0.55)', // Neon Pink
      'rgba(0, 245, 255, 0.55)', // Neon Cyan
      'rgba(255, 230, 0, 0.45)', // Gold
      'rgba(138, 43, 226, 0.5)',  // Purple
    ];

    let items: FloatingItem[] = [];

    const initItems = () => {
      items = [];
      const itemTypes: ItemType[] = [
        'CAT_BAG', 'CAT_BAG', 'CAT_BAG', 'CAT_BAG',
        'CHAIN', 'CHAIN',
        'DIAMOND', 'DIAMOND', 'DIAMOND',
        'COCKTAIL', 'COCKTAIL',
        'PALM', 'PALM',
        'YACHT',
        'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB'
      ];

      itemTypes.forEach((type) => {
        let size = 45;
        if (type === 'CAT_BAG') size = Math.random() * 25 + 55; // 55-80px
        else if (type === 'ORB') size = Math.random() * 20 + 16;  // 16-36px
        else if (type === 'YACHT') size = Math.random() * 25 + 65; // 65-90px
        else size = Math.random() * 20 + 40; // 40-60px for gems/cocktails/chains/palms

        items.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: Math.random() * 0.6 + 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.3 + 0.65,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      });
    };

    initItems();

    // 60FPS Physics & Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      items.forEach((item) => {
        // Mouse Repulsion Physics across ALL items
        const dx = mouse.x - item.x;
        const dy = mouse.y - item.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          item.x -= Math.cos(angle) * force * 8.5;
          item.y -= Math.sin(angle) * force * 8.5;
        } else {
          item.y += item.speedY;
          item.x += item.speedX;
        }

        item.rotation += item.rotSpeed;

        // Screen wrap-around
        if (item.y > height + 90) {
          item.y = -90;
          item.x = Math.random() * width;
        }
        if (item.x < -90) item.x = width + 90;
        if (item.x > width + 90) item.x = -90;

        // Render Item
        if (item.type === 'ORB') {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fillStyle = item.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = item.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (item.type === 'CAT_BAG') {
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.rotation);
          ctx.globalAlpha = item.opacity;
          if (catImgRef.current && catImgRef.current.complete) {
            const s = item.size;
            ctx.drawImage(catImgRef.current, -s / 2, -s / 2, s, s * 1.15);
          }
          ctx.restore();
        } else {
          const sprite = spriteCache.current[item.type];
          if (sprite) {
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate(item.rotation);
            ctx.globalAlpha = item.opacity;
            const s = item.size;
            ctx.drawImage(sprite, -s / 2, -s / 2, s, s);
            ctx.restore();
          }
        }
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
