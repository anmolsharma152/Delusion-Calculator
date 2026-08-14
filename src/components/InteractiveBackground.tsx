'use client';

import { useEffect, useRef } from 'react';

type ItemType = 'CAT_BAG' | 'DOLLAR' | 'DIAMOND' | 'COCKTAIL' | 'PALM' | 'YACHT' | 'ORB';

interface FloatingItem {
  x: number;
  y: number;
  size: number;
  aspectRatio: number;
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
  const imageAssets = useRef<Record<string, HTMLImageElement>>({});
  const spriteCache = useRef<Record<string, { canvas: HTMLCanvasElement; aspect: number }>>({});

  useEffect(() => {
    // 1. Preload Dedicated High-Quality Assets
    const loadAsset = (key: string, src: string) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageAssets.current[key] = img;
      };
    };

    loadAsset('CAT_BAG', '/Assets/cat_litter_bag.png');
    loadAsset('DOLLAR', '/Assets/diamond_dollar.svg');
    loadAsset('YACHT', '/Assets/luxury_yacht.svg');

    // 2. Pre-render High-Resolution Vector Sprites into small offscreen canvases ONCE (zero per-frame shadowBlur)
    const createOffscreenCanvas = (w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      if (ctx) draw(ctx);
      return { canvas: c, aspect: w / h };
    };

    // 💎 Sprite 1: Multi-Faceted Brilliant Cut Diamond Gem
    spriteCache.current['DIAMOND'] = createOffscreenCanvas(100, 100, (ctx) => {
      ctx.translate(50, 50);
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#00F5FF';

      ctx.beginPath();
      ctx.moveTo(-20, -28);
      ctx.lineTo(20, -28);
      ctx.lineTo(42, -8);
      ctx.lineTo(0, 40);
      ctx.lineTo(-42, -8);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-30, -25, 30, 35);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#00F5FF');
      grad.addColorStop(0.7, '#8A2BE2');
      grad.addColorStop(1, '#00E5FF');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Facet Lines
      ctx.beginPath();
      ctx.moveTo(-42, -8);
      ctx.lineTo(42, -8);
      ctx.moveTo(-20, -28);
      ctx.lineTo(-12, -8);
      ctx.lineTo(0, -28);
      ctx.lineTo(12, -8);
      ctx.lineTo(20, -28);
      ctx.moveTo(-42, -8);
      ctx.lineTo(0, 40);
      ctx.moveTo(-12, -8);
      ctx.lineTo(0, 40);
      ctx.moveTo(12, -8);
      ctx.lineTo(0, 40);
      ctx.moveTo(42, -8);
      ctx.lineTo(0, 40);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-14, -18, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });

    // 🍸 Sprite 2: Miami Vice Tropical Cocktail Drink
    spriteCache.current['COCKTAIL'] = createOffscreenCanvas(100, 100, (ctx) => {
      ctx.translate(50, 50);
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#FF007F';

      // Stem & Base
      ctx.beginPath();
      ctx.ellipse(0, 36, 18, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.moveTo(0, 36);
      ctx.lineTo(0, 6);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Glass Body
      ctx.beginPath();
      ctx.moveTo(-32, -24);
      ctx.lineTo(32, -24);
      ctx.lineTo(0, 6);
      ctx.closePath();
      const drinkGrad = ctx.createLinearGradient(0, -24, 0, 6);
      drinkGrad.addColorStop(0, 'rgba(255, 0, 127, 0.9)');
      drinkGrad.addColorStop(0.6, 'rgba(138, 43, 226, 0.85)');
      drinkGrad.addColorStop(1, 'rgba(0, 245, 255, 0.9)');
      ctx.fillStyle = drinkGrad;
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Lime Wheel
      ctx.beginPath();
      ctx.arc(22, -24, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Umbrella
      ctx.beginPath();
      ctx.arc(-12, -30, 14, Math.PI, 0);
      ctx.fillStyle = '#FFE600';
      ctx.fill();
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // 🌴 Sprite 3: Vibrant Miami Palm Tree
    spriteCache.current['PALM'] = createOffscreenCanvas(110, 110, (ctx) => {
      ctx.translate(55, 55);
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#00F5FF';

      ctx.beginPath();
      ctx.moveTo(-5, 42);
      ctx.quadraticCurveTo(-14, 8, -2, -8);
      ctx.quadraticCurveTo(6, 8, 5, 42);
      ctx.closePath();
      const trunkGrad = ctx.createLinearGradient(-8, 40, 8, -8);
      trunkGrad.addColorStop(0, '#D97706');
      trunkGrad.addColorStop(0.5, '#F59E0B');
      trunkGrad.addColorStop(1, '#FFE600');
      ctx.fillStyle = trunkGrad;
      ctx.fill();
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      const drawLushFrond = (cx: number, cy: number, ex: number, ey: number, color: string) => {
        ctx.beginPath();
        ctx.moveTo(-2, -8);
        ctx.quadraticCurveTo(cx, cy, ex, ey);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + 5, cy + 6);
        ctx.moveTo((cx + ex) / 2, (cy + ey) / 2);
        ctx.lineTo((cx + ex) / 2 + 4, (cy + ey) / 2 + 6);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      };

      drawLushFrond(-24, -28, -45, -18, '#00F5FF');
      drawLushFrond(22, -28, 45, -16, '#00F5FF');
      drawLushFrond(-32, -12, -48, 5, '#10B981');
      drawLushFrond(30, -10, 48, 6, '#10B981');
      drawLushFrond(-10, -35, -14, -48, '#00F5FF');
      drawLushFrond(8, -35, 14, -48, '#10B981');
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
      radius: 180,
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 0, 127, 0.6)',
      'rgba(0, 245, 255, 0.6)',
      'rgba(255, 230, 0, 0.55)',
      'rgba(138, 43, 226, 0.55)',
    ];

    let items: FloatingItem[] = [];

    const initItems = () => {
      items = [];
      // Clean, ultra-performant set of 18 floating items:
      const itemTypes: ItemType[] = [
        'CAT_BAG', 'CAT_BAG', 'CAT_BAG',
        'DOLLAR', 'DOLLAR', 'DOLLAR',
        'DIAMOND', 'DIAMOND', 'DIAMOND',
        'COCKTAIL', 'COCKTAIL', 'COCKTAIL',
        'PALM', 'PALM', 'PALM',
        'YACHT', 'YACHT', 'YACHT',
      ];

      itemTypes.forEach((type) => {
        let size = 50;
        let aspectRatio = 1;

        if (type === 'CAT_BAG') {
          size = Math.random() * 15 + 55; // 55-70px
          aspectRatio = 1.15;
        } else if (type === 'YACHT') {
          size = Math.random() * 20 + 80; // 80-100px Superyacht
          aspectRatio = 320 / 140;
        } else if (type === 'DOLLAR') {
          size = Math.random() * 15 + 55; // 55-70px Diamond Dollar Sign
          aspectRatio = 180 / 200;
        } else if (type === 'PALM') {
          size = Math.random() * 15 + 60; // 60-75px Palm
          aspectRatio = 1;
        } else if (type === 'DIAMOND') {
          size = Math.random() * 12 + 48; // 48-60px Diamond
          aspectRatio = 1;
        } else if (type === 'COCKTAIL') {
          size = Math.random() * 15 + 48; // 48-63px Cocktail
          aspectRatio = 1;
        }

        items.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          aspectRatio,
          speedX: (Math.random() - 0.5) * 1.0,
          speedY: Math.random() * 2.0 + 1.8, // Snappy gravity fall speed (1.8 - 3.8 px/frame)
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.024,
          opacity: Math.random() * 0.2 + 0.8,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      });
    };

    initItems();

    // High-Performance 60FPS Render Loop (GPU-Accelerated drawImage only, zero per-frame shadow blur)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Cursor Repulsion Physics
        const dx = mouse.x - item.x;
        const dy = mouse.y - item.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          item.x -= Math.cos(angle) * force * 7.5;
          item.y -= Math.sin(angle) * force * 7.5;
        } else {
          item.y += item.speedY;
          item.x += item.speedX;
        }

        item.rotation += item.rotSpeed;

        // Screen Boundary Wrap
        if (item.y > height + 90) {
          item.y = -90;
          item.x = Math.random() * width;
        }
        if (item.x < -90) item.x = width + 90;
        if (item.x > width + 90) item.x = -90;

        // Render Item via GPU Blitting
        const dedicatedImg = imageAssets.current[item.type];
        if (dedicatedImg && dedicatedImg.complete) {
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.rotation);
          ctx.globalAlpha = item.opacity;
          const w = item.size;
          const h = w / item.aspectRatio;
          ctx.drawImage(dedicatedImg, -w / 2, -h / 2, w, h);
          ctx.restore();
        } else {
          const cached = spriteCache.current[item.type];
          if (cached) {
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate(item.rotation);
            ctx.globalAlpha = item.opacity;
            const w = item.size;
            const h = w / cached.aspect;
            ctx.drawImage(cached.canvas, -w / 2, -h / 2, w, h);
            ctx.restore();
          }
        }
      }

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
