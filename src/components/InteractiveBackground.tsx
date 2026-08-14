'use client';

import { memo, useEffect, useRef } from 'react';

type ItemType = 'CAT_BAG' | 'DOLLAR' | 'DIAMOND' | 'COCKTAIL' | 'PALM' | 'YACHT' | 'ORB';

interface FloatingItem {
  x: number;
  y: number;
  size: number;
  aspectRatio: number;
  vx: number;
  vy: number;
  driftX: number;
  fallTarget: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: ItemType;
  color: string;
}

// Physics tuning — tuned for near-0% CPU. All arithmetic is allocation-free:
// no objects or arrays are created inside the animation loop.
const GRAVITY_STEP = 0.18; // px/frame^2 pulled toward terminal velocity
const MAX_BOUNCE_UP = -7; // fastest upward rebound after a collision
const MAX_SIDE_SPEED = 6; // horizontal velocity clamp
const RESTITUTION = 0.7; // bounciness of item-to-item collisions
const VEL_DAMP = 0.05; // how quickly horizontal drift returns to its baseline

function InteractiveBackground() {
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
      radius: 200,
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

    const clampVelocity = (item: FloatingItem) => {
      if (Math.abs(item.vx) < 0.05) item.vx = 0;
      if (Math.abs(item.vy) < 0.05) item.vy = 0;
      item.vx = Math.max(-MAX_SIDE_SPEED, Math.min(MAX_SIDE_SPEED, item.vx));
      item.vy = Math.max(MAX_BOUNCE_UP, Math.min(item.fallTarget, item.vy));
    };

    const initItems = () => {
      items = [];

      // Clean set of 25 floating items (matches censuscalc particle count)
      const itemTypes: ItemType[] = [
        'CAT_BAG', 'CAT_BAG', 'CAT_BAG', 'CAT_BAG',
        'DOLLAR', 'DOLLAR', 'DOLLAR', 'DOLLAR',
        'DIAMOND', 'DIAMOND', 'DIAMOND', 'DIAMOND',
        'COCKTAIL', 'COCKTAIL', 'COCKTAIL', 'COCKTAIL',
        'PALM', 'PALM', 'PALM', 'PALM',
        'YACHT', 'YACHT', 'YACHT', 'YACHT', 'YACHT',
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

        const fallTarget = Math.random() * 1.5 + 4.0; // Census-style constant fall (4.0 - 5.5 px/frame)
        items.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          aspectRatio,
          vx: (Math.random() - 0.5) * 1.2,
          vy: fallTarget,
          driftX: (Math.random() - 0.5) * 1.2,
          fallTarget,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.024,
          opacity: Math.random() * 0.2 + 0.8,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      });
    };

    initItems();

    // High-Performance 60FPS Render Loop (GPU-Accelerated drawImage only, zero per-frame shadow blur, zero allocation)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Forces: terminal-velocity gravity + horizontal drift + cursor repulse (censuscalc formula)
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        item.vy = Math.min(item.vy + GRAVITY_STEP, item.fallTarget);
        item.vx += (item.driftX - item.vx) * VEL_DAMP;

        // dx = item.x - mouse.x, so the push is away from the cursor.
        // strength = clamp((1 - (dist/radius)^2) * 100, 0, 50) — applied as a velocity shove.
        const dx = item.x - mouse.x;
        const dy = item.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;
        if (distSq < radiusSq && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const strength = Math.min((1 - distSq / radiusSq) * 100, 50);
          item.vx += (dx / dist) * strength;
          item.vy += (dy / dist) * strength;
        }

        clampVelocity(item);
        item.x += item.vx;
        item.y += item.vy;
      }

      // 2. Collision resolution: cheap pairwise impulse + separation. 25 items = 300
      //    distance checks/frame of pure arithmetic — no solver, no allocation.
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];

          const nx = b.x - a.x;
          const ny = b.y - a.y;
          const distSq = nx * nx + ny * ny;
          const hitRadius = (a.size + b.size) * 0.35;
          if (distSq >= hitRadius * hitRadius || distSq < 0.001) continue;

          const dist = Math.sqrt(distSq);
          const invDist = 1 / dist;
          const nxU = nx * invDist;
          const nyU = ny * invDist;

          // Positional separation — heavier (bigger) item moves less
          const massA = a.size * a.size;
          const massB = b.size * b.size;
          const totalMass = massA + massB;
          const overlap = hitRadius - dist;
          a.x -= nxU * overlap * (massB / totalMass);
          a.y -= nyU * overlap * (massB / totalMass);
          b.x += nxU * overlap * (massA / totalMass);
          b.y += nyU * overlap * (massA / totalMass);

          // Impulse: reflect the approach velocity along the normal with restitution
          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const rvN = rvx * nxU + rvy * nyU;
          if (rvN < 0) {
            const impulse = (-(1 + RESTITUTION) * rvN) / (1 / massA + 1 / massB);
            const ix = impulse * nxU;
            const iy = impulse * nyU;
            a.vx -= ix / massA;
            a.vy -= iy / massA;
            b.vx += ix / massB;
            b.vy += iy / massB;
            clampVelocity(a);
            clampVelocity(b);
          }
        }
      }

      // 3. Screen boundary wrap
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.y > height + 120) {
          item.y = -120;
          item.x = Math.random() * width;
          item.vx = item.driftX;
          item.vy = item.fallTarget;
        } else if (item.x < -120) {
          item.x = width + 120;
        } else if (item.x > width + 120) {
          item.x = -120;
        }

        item.rotation += item.rotSpeed;
      }

      // 4. Render Items via GPU Blitting
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
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

export default memo(InteractiveBackground);
