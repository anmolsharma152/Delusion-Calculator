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

    // 2. Pre-render High-Resolution Vector Sprites into Offscreen Canvases for optimal 60fps performance
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

      // Outer Outline of Brilliant Cut Diamond
      ctx.beginPath();
      ctx.moveTo(-24, -34); // Top-left table
      ctx.lineTo(24, -34);  // Top-right table
      ctx.lineTo(50, -10);  // Right girdle
      ctx.lineTo(0, 48);    // Bottom culet point
      ctx.lineTo(-50, -10); // Left girdle
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

      // Facet Lines: Table border & Kite facets
      ctx.beginPath();
      ctx.moveTo(-50, -10);
      ctx.lineTo(50, -10);

      // Crown facets
      ctx.moveTo(-24, -34);
      ctx.lineTo(-14, -10);
      ctx.lineTo(0, -34);
      ctx.lineTo(14, -10);
      ctx.lineTo(24, -34);

      // Pavilion facets to bottom point
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

      // Sparkling Specular Star Glint
      ctx.beginPath();
      ctx.arc(-18, -22, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });

    // ⛓️ Sprite 2: Continuous Circular Cuban Link Gold Chain Necklace (Joined End-to-End with Medallion)
    spriteCache.current['CHAIN'] = createOffscreenCanvas(140, 140, (ctx) => {
      ctx.translate(70, 70);
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#FFE600';

      const totalLinks = 14;
      const radius = 40;

      // Draw continuous circular loop of joined gold links
      for (let i = 0; i < totalLinks; i++) {
        const theta = (i / totalLinks) * Math.PI * 2;
        const cx = Math.cos(theta) * radius;
        const cy = Math.sin(theta) * radius;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(theta + Math.PI / 2);

        // Gold link ring
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 7, 0, 0, Math.PI * 2);
        const goldGrad = ctx.createLinearGradient(-12, -7, 12, 7);
        goldGrad.addColorStop(0, '#FFE600');
        goldGrad.addColorStop(0.4, '#FFF8B2');
        goldGrad.addColorStop(0.8, '#F59E0B');
        goldGrad.addColorStop(1, '#D97706');
        ctx.strokeStyle = goldGrad;
        ctx.lineWidth = 5;
        ctx.stroke();

        // Inner dark hole
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 3.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#0c0721';
        ctx.fill();

        // Specular highlight edge
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }

      // Center Gold Medallion / Pendant at bottom of necklace
      ctx.save();
      ctx.translate(0, 36);
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      const coinGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 14);
      coinGrad.addColorStop(0, '#FFF9C4');
      coinGrad.addColorStop(0.5, '#FFE600');
      coinGrad.addColorStop(1, '#B45309');
      ctx.fillStyle = coinGrad;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner Coin Star
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();

      // Specular shine spark
      ctx.beginPath();
      ctx.arc(-22, -26, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    });

    // 🍸 Sprite 3: Miami Vice Tropical Cocktail Drink
    spriteCache.current['COCKTAIL'] = createOffscreenCanvas(120, 120, (ctx) => {
      ctx.translate(60, 60);
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#FF007F';

      // Stem & Base
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
      ctx.shadowBlur = 22;
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

    // 🛥️ Sprite 5: Pristine White Multi-Tier Luxury Superyacht (Real Yacht Profile)
    spriteCache.current['YACHT'] = createOffscreenCanvas(180, 100, (ctx) => {
      ctx.translate(90, 50);
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#00F5FF';

      // 1. Lower Keel & Deep-V Hull (Pure White with subtle ocean blue tint & sleek lines)
      ctx.beginPath();
      ctx.moveTo(-74, 22); // Stern swim platform
      ctx.lineTo(48, 22);  // Keel bottom
      ctx.lineTo(76, -4);  // Raked clipper bow tip
      ctx.lineTo(44, -6);  // Foredeck
      ctx.lineTo(-70, -6); // Aft deck
      ctx.closePath();
      const hullGrad = ctx.createLinearGradient(-70, -6, 70, 22);
      hullGrad.addColorStop(0, '#FFFFFF');
      hullGrad.addColorStop(0.6, '#F0F9FF');
      hullGrad.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = hullGrad;
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Neon Cyan/Pink Waterline Racing Stripe
      ctx.beginPath();
      ctx.moveTo(-72, 14);
      ctx.lineTo(60, 14);
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-72, 17);
      ctx.lineTo(54, 17);
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. Main Deck Superstructure & Panoramic Tinted Windows
      ctx.beginPath();
      ctx.moveTo(-45, -6);
      ctx.lineTo(26, -6);
      ctx.lineTo(14, -22);
      ctx.lineTo(-38, -22);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Panoramic Tinted Salon Windows
      ctx.beginPath();
      ctx.moveTo(-32, -10);
      ctx.lineTo(18, -10);
      ctx.lineTo(10, -18);
      ctx.lineTo(-26, -18);
      ctx.closePath();
      ctx.fillStyle = '#0a0f29';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Upper Flybridge / Sun Deck Hardtop
      ctx.beginPath();
      ctx.moveTo(-25, -22);
      ctx.lineTo(5, -22);
      ctx.lineTo(0, -32);
      ctx.lineTo(-20, -32);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Dual Satellite Radar Domes & Mast
      ctx.beginPath();
      ctx.arc(-8, -37, 5, 0, Math.PI * 2);
      ctx.arc(-18, -35, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#FFE600';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Radar Mast
      ctx.beginPath();
      ctx.moveTo(-13, -32);
      ctx.lineTo(-13, -42);
      ctx.strokeStyle = '#FFE600';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Bow Stainless Steel Railings & Stern Platform
      ctx.beginPath();
      ctx.moveTo(44, -6);
      ctx.lineTo(68, -4);
      ctx.lineTo(76, -4);
      ctx.strokeStyle = '#E0F2FE';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Stern Swimming Step Platform
      ctx.beginPath();
      ctx.rect(-80, 16, 8, 5);
      ctx.fillStyle = '#F59E0B'; // Teak wood swim deck
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
      const itemTypes: ItemType[] = [
        'CAT_BAG', 'CAT_BAG', 'CAT_BAG', 'CAT_BAG',
        'CHAIN', 'CHAIN', 'CHAIN', 'CHAIN',
        'DIAMOND', 'DIAMOND', 'DIAMOND', 'DIAMOND',
        'COCKTAIL', 'COCKTAIL', 'COCKTAIL', 'COCKTAIL',
        'PALM', 'PALM', 'PALM', 'PALM',
        'YACHT', 'YACHT', 'YACHT', 'YACHT',
        'ORB', 'ORB', 'ORB', 'ORB', 'ORB', 'ORB'
      ];

      itemTypes.forEach((type) => {
        let size = 55;
        let aspectRatio = 1;

        if (type === 'CAT_BAG') {
          size = Math.random() * 20 + 60; // 60-80px
          aspectRatio = 1.15;
        } else if (type === 'YACHT') {
          size = Math.random() * 25 + 85; // 85-110px superyacht
          aspectRatio = 180 / 100;
        } else if (type === 'PALM') {
          size = Math.random() * 20 + 70; // 70-90px palm
          aspectRatio = 1;
        } else if (type === 'CHAIN') {
          size = Math.random() * 18 + 65; // 65-83px circular chain
          aspectRatio = 1;
        } else if (type === 'DIAMOND') {
          size = Math.random() * 16 + 52; // 52-68px diamond
          aspectRatio = 1;
        } else if (type === 'COCKTAIL') {
          size = Math.random() * 18 + 55; // 55-73px cocktail
          aspectRatio = 1;
        } else {
          size = Math.random() * 16 + 20;  // 20-36px orbs
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
