import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Plus, Hand } from 'lucide-react';

const INITIAL_TOKENS = [
  { text: '8x', bg: '#3451f5', color: '#ffffff', isMain: true },
  { text: 'HUMAN', bg: '#ffffff', color: '#111414' },
  { text: 'SCALE', bg: '#ffffff', color: '#111414' },
  { text: 'AGENCY', bg: '#ffffff', color: '#111414' },
  { text: 'OUTBOUND', bg: '#ffffff', color: '#111414' },
  { text: 'RESEARCH', bg: '#ffffff', color: '#111414' },
  { text: 'CODE', bg: '#ffffff', color: '#111414' },
  { text: '50+ NATIONS', bg: '#ffffff', color: '#111414' },
  { text: 'DISTRIBUTION', bg: '#ffffff', color: '#111414' },
  { text: 'PROOF', bg: '#3451f5', color: '#ffffff' },
];

export default function MatterPhysicsFloor() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [combo, setCombo] = useState(0);
  const bodiesRef = useRef([]);
  const draggedBodyRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = 420;
      canvas.width = w;
      canvas.height = h;
      return { w, h };
    };

    let { w, h } = updateDimensions();

    // Create 2D rigid physics tokens
    const initBodies = () => {
      bodiesRef.current = INITIAL_TOKENS.map((token, i) => {
        const tw = Math.max(90, token.text.length * 13 + 32);
        const th = 42;
        const x = 60 + ((i % 5) * (w - 140)) / 4 + (Math.random() - 0.5) * 40;
        const y = 80 + Math.floor(i / 5) * 80 + (Math.random() - 0.5) * 30;

        return {
          id: i,
          text: token.text,
          bg: token.bg,
          color: token.color,
          isMain: token.isMain,
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2,
          w: tw,
          h: th,
          angle: (Math.random() - 0.5) * 0.2,
          vAngle: (Math.random() - 0.5) * 0.02,
        };
      });
    };

    initBodies();

    // Mouse & Touch interaction
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e) => {
      const { x, y } = getPos(e);
      mousePosRef.current = { x, y, prevX: x, prevY: y, isDown: true };

      // Find top clicked body
      for (let i = bodiesRef.current.length - 1; i >= 0; i--) {
        const b = bodiesRef.current[i];
        if (
          x >= b.x - b.w / 2 &&
          x <= b.x + b.w / 2 &&
          y >= b.y - b.h / 2 &&
          y <= b.y + b.h / 2
        ) {
          draggedBodyRef.current = b;
          break;
        }
      }
    };

    const handleMove = (e) => {
      if (!mousePosRef.current.isDown) return;
      const { x, y } = getPos(e);
      mousePosRef.current.prevX = mousePosRef.current.x;
      mousePosRef.current.prevY = mousePosRef.current.y;
      mousePosRef.current.x = x;
      mousePosRef.current.y = y;

      if (draggedBodyRef.current) {
        const b = draggedBodyRef.current;
        b.x = x;
        b.y = y;
        b.vx = (x - mousePosRef.current.prevX) * 0.8;
        b.vy = (y - mousePosRef.current.prevY) * 0.8;
      }
    };

    const handleEnd = () => {
      if (draggedBodyRef.current) {
        draggedBodyRef.current = null;
      }
      mousePosRef.current.isDown = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    // Physics Simulation Loop
    const GRAVITY = 0.45;
    const FRICTION = 0.985;
    const RESTITUTION = 0.7;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw subtle background grid inside sandbox
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let gx = 40; gx < w; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 40; gy < h; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      const bodies = bodiesRef.current;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];

        // Apply physics if not actively dragged
        if (b !== draggedBodyRef.current) {
          b.vy += GRAVITY;
          b.vx *= FRICTION;
          b.vy *= FRICTION;

          b.x += b.vx;
          b.y += b.vy;
          b.angle += b.vAngle;

          // Floor collision
          if (b.y + b.h / 2 > h) {
            b.y = h - b.h / 2;
            b.vy = -b.vy * RESTITUTION;
            b.vx *= 0.92;
            if (Math.abs(b.vy) > 3) triggerCombo();
          }

          // Ceiling collision
          if (b.y - b.h / 2 < 0) {
            b.y = b.h / 2;
            b.vy = -b.vy * RESTITUTION;
          }

          // Left wall collision
          if (b.x - b.w / 2 < 0) {
            b.x = b.w / 2;
            b.vx = -b.vx * RESTITUTION;
            if (Math.abs(b.vx) > 3) triggerCombo();
          }

          // Right wall collision
          if (b.x + b.w / 2 > w) {
            b.x = w - b.w / 2;
            b.vx = -b.vx * RESTITUTION;
            if (Math.abs(b.vx) > 3) triggerCombo();
          }
        }

        // Render rounded rectangular token body
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);

        // Shadow
        ctx.shadowColor = b.isMain ? 'rgba(255, 56, 17, 0.4)' : 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = b.isMain ? 16 : 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        // Fill body
        ctx.fillStyle = b.bg;
        ctx.beginPath();
        const r = 6;
        const hw = b.w / 2;
        const hh = b.h / 2;
        ctx.roundRect(-hw, -hh, b.w, b.h, r);
        ctx.fill();

        // Stroke border
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = b.isMain ? '#ffffff' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = b.isMain ? 2 : 1;
        ctx.stroke();

        // Label text
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = b.color;
        ctx.fillText(b.text, 0, 1);

        ctx.restore();
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    const handleResize = () => {
      const d = updateDimensions();
      w = d.w;
      h = d.h;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const triggerCombo = () => {
    setCombo((prev) => {
      const next = prev + 1;
      if (next % 5 === 0) {
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#3451f5', '#f8f6f0', '#ffffff'],
        });
      }
      return next;
    });
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    bodiesRef.current.forEach((b, i) => {
      b.x = 80 + ((i % 5) * (w - 160)) / 4;
      b.y = 60 + Math.floor(i / 5) * 60;
      b.vx = (Math.random() - 0.5) * 5;
      b.vy = (Math.random() - 0.5) * 5;
      b.angle = (Math.random() - 0.5) * 0.3;
    });
    setCombo(0);
  };

  const handleSpawn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const words = ['EXECUTION', 'VIRAL', 'TRUST', 'TELEPHONY', 'VENTURE', 'DISPATCH'];
    const chosen = words[Math.floor(Math.random() * words.length)];
    const tw = Math.max(90, chosen.length * 13 + 32);

    bodiesRef.current.push({
      id: Date.now(),
      text: chosen,
      bg: '#3451f5',
      color: '#ffffff',
      isMain: true,
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: 40,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4,
      w: tw,
      h: 42,
      angle: 0,
      vAngle: (Math.random() - 0.5) * 0.04,
    });
  };

  return (
    <section id="sandbox" className="relative w-full bg-[#111414] border-t border-white/10 py-16 px-6 sm:px-12 select-none">
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3 text-white/90">
          <Sparkles className="text-accent" size={16} />
          <span className="uppercase font-bold tracking-wider">[ interactive human node sandbox ]</span>
          <span className="text-white/40 hidden sm:inline-block">· click & fling tokens across the physics floor</span>
        </div>

        <div className="flex items-center gap-4">
          {combo > 0 && (
            <span className="text-accent font-bold uppercase animate-pulse">
              reactions: {combo} kinetic hits
            </span>
          )}
          <button
            onClick={handleSpawn}
            className="flex items-center gap-1.5 bracket-btn text-white/80 hover:text-accent border border-white/20 px-3 py-1"
          >
            <Plus size={12} /> [ spawn node ]
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 bracket-btn text-white/60 hover:text-white px-3 py-1"
          >
            <RefreshCw size={12} /> [ reset floor ]
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-7xl mx-auto h-[420px] border-2 border-white/15 bg-[#161a1a] rounded-sm overflow-hidden shadow-2xl relative cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-4 left-5 pointer-events-none flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase">
          <Hand size={12} className="text-accent" />
          <span>interactive canvas active // grab and throw nodes</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 flex flex-wrap justify-between font-mono text-[10px] text-white/40 uppercase">
        <span>2D kinetic collision solver · restitution: 0.70 · gravity: 0.45G</span>
        <span>real-time node physics routing</span>
      </div>
    </section>
  );
}
