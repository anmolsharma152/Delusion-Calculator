'use client';

import { useEffect, useRef } from 'react';

type ItemType =
  | 'CAT_BAG'
  | 'DOLLAR'
  | 'DIAMOND'
  | 'COCKTAIL'
  | 'PALM'
  | 'YACHT'
  | 'MIAMI_MAN'
  | 'MIAMI_WOMAN'
  | 'ORB';

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
    // 1. Preload Dedicated High-Quality Vector & Character Assets
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
    loadAsset('MIAMI_MAN', '/Assets/miami_man.svg');
    loadAsset('MIAMI_WOMAN', '/Assets/miami_woman.svg');

    // 2. Pre-render High-Resolution Vector Sprites for Remaining Items
    const createOffscreenCanvas = (w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      if (ctx) draw(ctx);
      return { canvas: c, aspect: w / h };
    };

    // 💎 Sprite 1: Multi-Faceted Brilliant Cut Diamond Gem
    spriteCache.current['DIAMOND'] = createOffscreenCanvas(120, 120, (ctx) => {
      ctx.translate(60, 60);
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#00F5FF';

      ctx.beginPath();
      ctx.moveTo(-24, -34);
      ctx.lineTo(24, -34);
      ctx.lineTo(50, -10);
      ctx.lineTo(0, 48);
      ctx.lineTo(-50, -10);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-40, -30, 40, 40);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#00F5FF');
      grad.addColorStop(0.7, '#8A2BE2');
      grad.addColorStop(1, '#00E5FF');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Facet Lines
      ctx.beginPath();
      ctx.moveTo(-50, -10);
      ctx.lineTo(50, -10);
      ctx.moveTo(-24, -34);
      ctx.lineTo(-14, -10);
      ctx.lineTo(0, -34);
      ctx.lineTo(14, -10);
      ctx.lineTo(24, -34);
      ctx.moveTo(-50, -10);
      ctx.lineTo(0, 48);
      ctx.moveTo(-14, -10);
      ctx.lineTo(0, 48);
      ctx.moveTo(14, -10);
      ctx.lineTo(0, 48);
      ctx.moveTo(50, -10);
      ctx.lineTo(0, 48);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Specular Glint
      ctx.beginPath();
      ctx.arc(-18, -22, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });

    // 🍸 Sprite 2: Miami Vice Tropical Cocktail Drink
    spriteCache.current['COCKTAIL'] = createOffscreenCanvas(120, 120, (ctx) => {
      ctx.translate(60, 60);
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#FF007F';

      ctx.beginPath();
      ctx.ellipse(0, 44, 22, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.moveTo(0, 44);
      ctx.lineTo(0, 8);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-38, -28);
      ctx.lineTo(38, -28);
      ctx.lineTo(0, 8);
      ctx.closePath();
      const drinkGrad = ctx.createLinearGradient(0, -28, 0, 8);
      drinkGrad.addColorStop(0, 'rgba(255, 0, 127, 0.9)');
      drinkGrad.addColorStop(0.6, 'rgba(138, 43, 226, 0.85)');
      drinkGrad.addColorStop(1, 'rgba(0, 245, 255, 0.9)');
      ctx.fillStyle = drinkGrad;
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(26, -28, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-14, -34, 16, Math.PI, 0);
      ctx.fillStyle = '#FFE600';
      ctx.fill();
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 🌴 Sprite 3: Vibrant Miami Palm Tree
    spriteCache.current['PALM'] = createOffscreenCanvas(140, 140, (ctx) => {
      ctx.translate(70, 70);
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#00F5FF';

      ctx.beginPath();
      ctx.moveTo(-6, 52);
      ctx.quadraticCurveTo(-18, 10, -2, -10);
      ctx.quadraticCurveTo(8, 10, 6, 52);
      ctx.closePath();
      const trunkGrad = ctx.createLinearGradient(-10, 50, 10, -10);
      trunkGrad.addColorStop(0, '#D97706');
      trunkGrad.addColorStop(0.5, '#F59E0B');
      trunkGrad.addColorStop(1, '#FFE600');
      ctx.fillStyle = trunkGrad;
      ctx.fill();
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 2;
      ctx.stroke();

      const drawLushFrond = (cx: number, cy: number, ex: number, ey: number, color: string) => {
        ctx.beginPath();
        ctx.moveTo(-2, -10);
        ctx.quadraticCurveTo(cx, cy, ex, ey);
        ctx.strokeStyle = color;
        ctx.lineWidth = 5.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + 6, cy + 8);
        ctx.moveTo((cx + ex) / 2, (cy + ey) / 2);
        ctx.lineTo((cx + ex) / 2 + 5, (cy + ey) / 2 + 8);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawLushFrond(-30, -36, -55, -22, '#00F5FF');
      drawLushFrond(26, -36, 55, -20, '#00F5FF');
      drawLushFrond(-40, -16, -58, 6, '#10B981');
      drawLushFrond(38, -14, 58, 8, '#10B981');
      drawLushFrond(-12, -44, -18, -58, '#00F5FF');
      drawLushFrond(10, -44, 18, -58, '#10B981');
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
      radius: 200, // Repulsion field radius
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
      'rgba(255, 0, 127, 0.6)',  // Neon Pink
      'rgba(0, 245, 255, 0.6)',  // Neon Cyan
      'rgba(255, 230, 0, 0.55)', // Gold
      'rgba(138, 43, 226, 0.55)', // Purple
    ];

    let items: FloatingItem[] = [];

    const initItems = () => {
      items = [];
      const itemTypes: ItemType[] = [
        'CAT_BAG', 'CAT_BAG', 'CAT_BAG',
        'DOLLAR', 'DOLLAR', 'DOLLAR', 'DOLLAR',
        'DIAMOND', 'DIAMOND', 'DIAMOND',
        'COCKTAIL', 'COCKTAIL', 'COCKTAIL',
        'PALM', 'PALM', 'PALM',
        'YACHT', 'YACHT', 'YACHT',
        'MIAMI_MAN', 'MIAMI_MAN', 'MIAMI_MAN',
        'MIAMI_WOMAN', 'MIAMI_WOMAN', 'MIAMI_WOMAN',
        'ORB', 'ORB', 'ORB', 'ORB'
      ];

      itemTypes.forEach((type) => {
        let size = 55;
        let aspectRatio = 1;

        if (type === 'CAT_BAG') {
          size = Math.random() * 20 + 60; // 60-80px
          aspectRatio = 1.15;
        } else if (type === 'YACHT') {
          size = Math.random() * 30 + 95; // 95-125px Superyacht
          aspectRatio = 320 / 140;
        } else if (type === 'DOLLAR') {
          size = Math.random() * 20 + 60; // 60-80px Diamond Dollar Sign
          aspectRatio = 180 / 200;
        } else if (type === 'MIAMI_MAN' || type === 'MIAMI_WOMAN') {
          size = Math.random() * 25 + 90; // 90-115px Character Full Body
          aspectRatio = 540 / 960;
        } else if (type === 'PALM') {
          size = Math.random() * 20 + 70; // 70-90px Palm
          aspectRatio = 1;
        } else if (type === 'DIAMOND') {
          size = Math.random() * 16 + 54; // 54-70px Diamond
          aspectRatio = 1;
        } else if (type === 'COCKTAIL') {
          size = Math.random() * 18 + 55; // 55-73px Cocktail
          aspectRatio = 1;
        } else {
          size = Math.random() * 16 + 20;  // 20-36px Orbs
          aspectRatio = 1;
        }

        items.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          aspectRatio,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: Math.random() * 0.5 + 0.25,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.012,
          opacity: Math.random() * 0.25 + 0.75,
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
        // Cursor Repulsion Physics
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

        // Wrap around screen boundaries
        if (item.y > height + 120) {
          item.y = -120;
          item.x = Math.random() * width;
        }
        if (item.x < -120) item.x = width + 120;
        if (item.x > width + 120) item.x = -120;

        // Render Item
        if (item.type === 'ORB') {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fillStyle = item.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = item.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          const dedicatedImg = imageAssets.current[item.type];
          if (dedicatedImg && dedicatedImg.complete) {
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate(item.rotation);
            ctx.globalAlpha = item.opacity;

            // Use screen blend mode for character illustrations to blend dark backgrounds seamlessly
            if (item.type === 'MIAMI_MAN' || item.type === 'MIAMI_WOMAN') {
              ctx.globalCompositeOperation = 'screen';
            }

            const w = item.size;
            const h = w / item.aspectRatio;
            ctx.drawImage(dedicatedImg, -w / 2, -h / 2, w, h);
            ctx.restore();
          } else {
            // Fallback to vector sprite cache
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
