'use client';

import { useEffect, useRef } from 'react';

type ItemType = 'CAT_BAG' | 'CHAIN' | 'DIAMOND' | 'COCKTAIL' | 'PALM' | 'YACHT' | 'ORB';

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
  const catImgRef = useRef<HTMLImageElement | null>(null);
  const spriteCache = useRef<Record<string, { canvas: HTMLCanvasElement; aspect: number }>>({});

  useEffect(() => {
    // 1. Load official Cat Litter Bag Image
    const img = new Image();
    img.src = '/Assets/cat_litter_bag.png';
    img.onload = () => {
      catImgRef.current = img;
    };

    // 2. Pre-render High-Resolution Vector Sprites into Offscreen Canvases for 60fps performance
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
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00F5FF';

      // Outer Outline of Brilliant Cut
      ctx.beginPath();
      ctx.moveTo(-22, -32); // Top-left table
      ctx.lineTo(22, -32);  // Top-right table
      ctx.lineTo(46, -10);  // Right girdle
      ctx.lineTo(0, 44);    // Bottom culet point
      ctx.lineTo(-46, -10); // Left girdle
      ctx.closePath();

      const grad = ctx.createLinearGradient(-40, -30, 40, 40);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.3, 'rgba(0, 245, 255, 0.9)');
      grad.addColorStop(0.7, 'rgba(138, 43, 226, 0.85)');
      grad.addColorStop(1, 'rgba(0, 229, 255, 0.95)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Facet Lines: Table border & Kite facets
      ctx.beginPath();
      // Table horizontal line
      ctx.moveTo(-46, -10);
      ctx.lineTo(46, -10);

      // Crown facets
      ctx.moveTo(-22, -32);
      ctx.lineTo(-12, -10);
      ctx.lineTo(0, -32);
      ctx.lineTo(12, -10);
      ctx.lineTo(22, -32);

      // Pavilion facets to bottom point
      ctx.moveTo(-46, -10);
      ctx.lineTo(0, 44);
      ctx.moveTo(-12, -10);
      ctx.lineTo(0, 44);
      ctx.moveTo(12, -10);
      ctx.lineTo(0, 44);
      ctx.moveTo(46, -10);
      ctx.lineTo(0, 44);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Sparkling Specular Star Glint
      ctx.beginPath();
      ctx.arc(-16, -20, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });

    // ⛓️ Sprite 2: Heavy Cuban Link Gold Chain Loop
    spriteCache.current['CHAIN'] = createOffscreenCanvas(140, 140, (ctx) => {
      ctx.translate(70, 70);
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#FFE600';

      const drawGoldLink = (x: number, y: number, rot: number, scale = 1) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.scale(scale, scale);

        // Outer Link Ring
        ctx.beginPath();
        ctx.ellipse(0, 0, 26, 16, 0, 0, Math.PI * 2);
        const goldGrad = ctx.createLinearGradient(-26, -16, 26, 16);
        goldGrad.addColorStop(0, '#FFE600');
        goldGrad.addColorStop(0.3, '#FFF7A0');
        goldGrad.addColorStop(0.6, '#F59E0B');
        goldGrad.addColorStop(1, '#D97706');
        ctx.strokeStyle = goldGrad;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Inner Cutout / Dark Shadow
        ctx.beginPath();
        ctx.ellipse(0, 0, 18, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(12, 7, 33, 0.6)';
        ctx.fill();

        // Metallic Specular Bevel
        ctx.beginPath();
        ctx.ellipse(0, 0, 26, 16, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      };

      // Interlocking chain links in a stylish curve
      drawGoldLink(-36, -20, -0.5, 0.9);
      drawGoldLink(-18, -6, -0.2, 0.95);
      drawGoldLink(0, 8, 0.1, 1.0);
      drawGoldLink(20, 2, 0.4, 0.95);
      drawGoldLink(38, -12, 0.7, 0.9);

      // Specular shine star
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });

    // 🍸 Sprite 3: Miami Vice Tropical Cocktail Drink
    spriteCache.current['COCKTAIL'] = createOffscreenCanvas(120, 120, (ctx) => {
      ctx.translate(60, 60);
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#FF007F';

      // Stem & Round Base
      ctx.beginPath();
      ctx.ellipse(0, 44, 22, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.moveTo(0, 44);
      ctx.lineTo(0, 8);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // V-Shaped Martini Glass Body
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

      // Lime Wheel on Rim
      ctx.beginPath();
      ctx.arc(26, -28, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cocktail Umbrella
      ctx.beginPath();
      ctx.arc(-14, -34, 16, Math.PI, 0);
      ctx.fillStyle = '#FFE600';
      ctx.fill();
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 🌴 Sprite 4: Vibrant Miami Palm Tree
    spriteCache.current['PALM'] = createOffscreenCanvas(140, 140, (ctx) => {
      ctx.translate(70, 70);
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00F5FF';

      // High-Contrast Textured Trunk
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

      // 6 Lush Spreading Tropical Fronds
      const drawLushFrond = (cx: number, cy: number, ex: number, ey: number, color: string) => {
        ctx.beginPath();
        ctx.moveTo(-2, -10);
        ctx.quadraticCurveTo(cx, cy, ex, ey);
        ctx.strokeStyle = color;
        ctx.lineWidth = 5.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Leaflet details
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

    // 🛥️ Sprite 5: Miami Luxury Superyacht / Speedboat (16:9 Aspect Ratio)
    spriteCache.current['YACHT'] = createOffscreenCanvas(160, 90, (ctx) => {
      ctx.translate(80, 45);
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#00F5FF';

      // 1. Sleek Superyacht Hull
      ctx.beginPath();
      ctx.moveTo(-60, 18); // Stern bottom
      ctx.lineTo(44, 18);  // Bow keel
      ctx.lineTo(68, -2);  // Bow tip
      ctx.lineTo(48, -4);  // Bow deck
      ctx.lineTo(-56, -4); // Stern deck
      ctx.closePath();
      const hullGrad = ctx.createLinearGradient(-60, -4, 60, 18);
      hullGrad.addColorStop(0, '#FFFFFF');
      hullGrad.addColorStop(0.5, '#E0F2FE');
      hullGrad.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = hullGrad;
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Neon Crimson Waterline Accent Stripe
      ctx.beginPath();
      ctx.moveTo(-58, 10);
      ctx.lineTo(54, 10);
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 2. Cabin / Flybridge Deck
      ctx.beginPath();
      ctx.moveTo(-35, -4);
      ctx.lineTo(24, -4);
      ctx.lineTo(14, -22);
      ctx.lineTo(-24, -22);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Tinted Panoramic Windshield Glass
      ctx.beginPath();
      ctx.moveTo(-18, -8);
      ctx.lineTo(16, -8);
      ctx.lineTo(10, -18);
      ctx.lineTo(-12, -18);
      ctx.closePath();
      ctx.fillStyle = '#0c0721';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Radar Dome / Mast
      ctx.beginPath();
      ctx.moveTo(-6, -22);
      ctx.lineTo(-6, -30);
      ctx.strokeStyle = '#FFE600';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-6, -30, 7, 3.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE600';
      ctx.fill();

      // 5. Stern Wake Spray Bubbles
      ctx.beginPath();
      ctx.arc(-64, 16, 4, 0, Math.PI * 2);
      ctx.arc(-72, 18, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 245, 255, 0.7)';
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
      // Rich, prominent mix of Miami After Hours assets
      const itemTypes: ItemType[] = [
        // 4x Cat Litter Bags
        'CAT_BAG', 'CAT_BAG', 'CAT_BAG', 'CAT_BAG',
        // 4x Gold Chains
        'CHAIN', 'CHAIN', 'CHAIN', 'CHAIN',
        // 4x Diamonds
        'DIAMOND', 'DIAMOND', 'DIAMOND', 'DIAMOND',
        // 4x Tropical Cocktails
        'COCKTAIL', 'COCKTAIL', 'COCKTAIL', 'COCKTAIL',
        // 4x Miami Palm Trees
        'PALM', 'PALM', 'PALM', 'PALM',
        // 3x Luxury Yachts
        'YACHT', 'YACHT', 'YACHT',
        // 8x Glowing Orbs
        'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB'
      ];

      itemTypes.forEach((type) => {
        let size = 50;
        let aspectRatio = 1;

        if (type === 'CAT_BAG') {
          size = Math.random() * 20 + 60; // 60-80px
          aspectRatio = 1.15;
        } else if (type === 'YACHT') {
          size = Math.random() * 25 + 75; // 75-100px wide
          aspectRatio = 160 / 90;
        } else if (type === 'PALM') {
          size = Math.random() * 20 + 65; // 65-85px
          aspectRatio = 1;
        } else if (type === 'CHAIN') {
          size = Math.random() * 18 + 58; // 58-76px
          aspectRatio = 1;
        } else if (type === 'DIAMOND') {
          size = Math.random() * 16 + 50; // 50-66px
          aspectRatio = 1;
        } else if (type === 'COCKTAIL') {
          size = Math.random() * 18 + 52; // 52-70px
          aspectRatio = 1;
        } else {
          size = Math.random() * 16 + 18;  // 18-34px orbs
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
          rotSpeed: (Math.random() - 0.5) * 0.015,
          opacity: Math.random() * 0.25 + 0.7,
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
        // Cursor Repulsion Physics for EVERY item
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
        if (item.y > height + 100) {
          item.y = -100;
          item.x = Math.random() * width;
        }
        if (item.x < -100) item.x = width + 100;
        if (item.x > width + 100) item.x = -100;

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
            ctx.drawImage(catImgRef.current, -s / 2, -s / 2, s, s * item.aspectRatio);
          }
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
