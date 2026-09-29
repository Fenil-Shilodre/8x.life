import React, { useEffect, useRef } from 'react';
import { ArrowDown, Activity } from 'lucide-react';
import rough from 'roughjs';

export default function Hero({ onOpenApply, onOpenSelfTest }) {
  const meshCanvasRef = useRef(null);
  const circleSvgRef = useRef(null);

  // e2.vc Signature Jitter Round Circle (~4.5 FPS Ambient Hand-Drawn Boiling)
  useEffect(() => {
    const svg = circleSvgRef.current;
    if (!svg) return;

    let timer;
    const frames = [];

    const buildFrames = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      frames.length = 0;

      const rect = svg.getBoundingClientRect();
      const w = Math.max(rect.width, 140);
      const h = Math.max(rect.height, 50);

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const rc = rough.svg(svg);

      // Generate 6 distinct seeded hand-drawn ellipse frames
      for (let i = 0; i < 6; i++) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (i > 0) g.style.display = 'none';

        const shape = rc.ellipse(w / 2, h / 2, w * 0.94, h * 0.84, {
          roughness: 2.2,
          strokeWidth: 3.2,
          stroke: '#3451f5',
          bowing: 1.2,
          seed: 19 + i * 37,
        });

        g.appendChild(shape);
        svg.appendChild(g);
        frames.push(g);
      }
    };

    buildFrames();

    // Pleasant ~4.5 FPS ambient jitter cycle (e2.vc authentic cadence: ~220ms)
    let current = 0;
    timer = setInterval(() => {
      if (frames.length < 2) return;
      let next = Math.floor(Math.random() * (frames.length - 1));
      if (next >= current) next += 1;
      frames[current].style.display = 'none';
      frames[next].style.display = 'block';
      current = next;
    }, 220);

    const handleResize = () => {
      buildFrames();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Clean Global Orchestration Mesh Visual in Blue
  useEffect(() => {
    const canvas = meshCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    // Primary global hub nodes
    const hubs = [
      { name: 'San Francisco', x: 0.16, y: 0.44, r: 4.5, pulse: 0 },
      { name: 'London', x: 0.44, y: 0.32, r: 4.5, pulse: 1.8 },
      { name: 'Ljubljana', x: 0.50, y: 0.38, r: 5.5, pulse: 0.5 },
      { name: 'Singapore', x: 0.76, y: 0.60, r: 4.5, pulse: 2.1 },
      { name: 'Tokyo', x: 0.86, y: 0.40, r: 4.5, pulse: 1.0 },
      { name: 'São Paulo', x: 0.32, y: 0.72, r: 4.0, pulse: 2.6 },
    ];

    const particleCount = 32;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 1,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = 'rgba(17, 20, 20, 0.12)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        const distMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
        if (distMouse < 100) {
          ctx.strokeStyle = `rgba(52, 81, 245, ${0.4 * (1 - distMouse / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      // Draw global hub nodes & geodesic arcs
      const renderedHubs = hubs.map((h) => ({
        ...h,
        px: h.x * width,
        py: h.y * height,
      }));

      ctx.lineWidth = 1;
      for (let i = 0; i < renderedHubs.length; i++) {
        for (let j = i + 1; j < renderedHubs.length; j++) {
          const h1 = renderedHubs[i];
          const h2 = renderedHubs[j];
          const dist = Math.hypot(h1.px - h2.px, h1.py - h2.py);

          if (dist < width * 0.5) {
            const midX = (h1.px + h2.px) / 2;
            const midY = (h1.py + h2.py) / 2 - 24;
            const alpha = Math.max(0.04, 0.15 * (1 - dist / (width * 0.5)));

            ctx.strokeStyle = `rgba(17, 20, 20, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(h1.px, h1.py);
            ctx.quadraticCurveTo(midX, midY, h2.px, h2.py);
            ctx.stroke();

            const packetPos = (time * 0.5 + i * 0.3) % 1;
            const curX =
              (1 - packetPos) * (1 - packetPos) * h1.px +
              2 * (1 - packetPos) * packetPos * midX +
              packetPos * packetPos * h2.px;
            const curY =
              (1 - packetPos) * (1 - packetPos) * h1.py +
              2 * (1 - packetPos) * packetPos * midY +
              packetPos * packetPos * h2.py;

            ctx.fillStyle = '#3451f5';
            ctx.beginPath();
            ctx.arc(curX, curY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      renderedHubs.forEach((h) => {
        const pulseSize = (Math.sin(time * 2 + h.pulse) + 1) * 5 + h.r;

        ctx.strokeStyle = 'rgba(52, 81, 245, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(h.px, h.py, pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = h.name === 'Ljubljana' ? '#3451f5' : '#111414';
        ctx.beginPath();
        ctx.arc(h.px, h.py, h.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(17, 20, 20, 0.6)';
        ctx.fillText(h.name.toUpperCase(), h.px + 8, h.py + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[88vh] pt-32 pb-16 px-6 sm:px-12 flex flex-col justify-between max-w-7xl mx-auto z-10">
      {/* Top Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-grid-line pb-4 font-mono text-xs uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent live-pulse-dot" />
          <span className="text-accent font-semibold">human orchestration protocol</span>
          <span className="text-ink/40">·</span>
          <span className="text-ink/60">50+ sovereign countries</span>
        </div>
        <div className="text-ink/50 flex items-center gap-2 text-[11px]">
          <Activity size={12} className="text-accent" />
          <span>250,492 nodes active</span>
        </div>
      </div>

      {/* Clean, Aesthetic, Uncluttered Hero Typography with e2.vc Jittering Round Line */}
      <div className="my-auto py-12 sm:py-16 max-w-4xl">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-ink leading-[1.08] relative">
          the{' '}
          <span className="relative inline-block px-3 sm:px-6 py-0.5">
            <span className="relative z-10 text-accent">human</span>
            {/* e2.vc Signature Jittering Round Circle */}
            <svg
              ref={circleSvgRef}
              className="absolute -inset-x-3 sm:-inset-x-6 -inset-y-2 sm:-inset-y-4 w-[calc(100%+1.5rem)] sm:w-[calc(100%+3rem)] h-[calc(100%+1rem)] sm:h-[calc(100%+2rem)] pointer-events-none z-0 overflow-visible"
              aria-hidden="true"
            />
          </span>{' '}
          company<span className="text-accent">.</span>
        </h1>

        <p className="mt-8 text-xl sm:text-3xl text-ink/75 max-w-2xl font-normal leading-snug text-pretty">
          Human orchestration for business outcomes across 50+ countries.
        </p>

        <p className="mt-4 font-mono text-xs sm:text-sm text-ink/50 uppercase tracking-widest">
          250k+ humans managed in marketing, engineering, and research.
        </p>

        {/* Clean, Refined Action CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-5 sm:gap-6 font-mono text-xs sm:text-sm uppercase tracking-wider">
          <a
            href="#machine"
            className="bracket-btn bg-ink text-bg hover:bg-accent hover:text-white px-6 py-3.5 transition-all shadow-[4px_4px_0px_0px_#3451f5]"
          >
            [ explore the machine ]
          </a>
          <a
            href="#manifesto"
            className="bracket-btn text-ink hover:text-accent border border-ink/20 px-6 py-3.5 transition-colors"
          >
            [ read the manifesto ]
          </a>
          <a
            href="#self-selection"
            onClick={(e) => {
              e.preventDefault();
              onOpenSelfTest();
            }}
            className="rollover-link text-ink/60 hover:text-accent font-mono text-xs underline underline-offset-4 py-2"
          >
            <span className="rollover-inner">who should self-select out? &rarr;</span>
          </a>
        </div>
      </div>

      {/* Visual Component: Global Orchestration Mesh Canvas */}
      <div className="relative w-full h-[140px] sm:h-[180px] border border-grid-line bg-white/40 overflow-hidden mb-6">
        <canvas ref={meshCanvasRef} className="w-full h-full block" />
        <div className="absolute top-3 left-4 font-mono text-[10px] text-ink/40 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent live-pulse-dot" />
          <span>global node telemetry // 53 territorial fleets</span>
        </div>
      </div>

      {/* Clean Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-grid-line font-mono text-xs text-ink/60">
        <div className="flex items-center gap-6">
          <span className="text-ink font-semibold">250,492 HUMANS</span>
          <span className="text-ink/30">/</span>
          <span className="text-ink font-semibold">53 COUNTRIES</span>
          <span className="text-ink/30">/</span>
          <span className="text-accent font-semibold">100% EVIDENCE-FIRST</span>
        </div>

        <div className="flex items-center gap-2 text-ink/40 uppercase text-[11px]">
          <span>scroll down to examine architecture</span>
          <ArrowDown size={12} className="animate-bounce text-accent" />
        </div>
      </div>
    </section>
  );
}
