import React, { useEffect, useRef } from 'react';

/**
 * StringPhysicsGrid
 * Recreates the iconic e2.vc interactive physics string wave grid.
 * Vertical guidelines react to mouse movement with continuous proximity displacement
 * and velocity-driven wave pulses (quadratic Bezier lines with midpoint smoothing).
 */
export default function StringPhysicsGrid({ isDark = false }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const SAMPLES = 36;
    const HIT_RADIUS = 120;
    const FIELD_RADIUS = 180;
    const FIELD_MAX_AMP = 32;
    const FIELD_SMOOTH = 14;
    const FIELD_ENV_PX = 220;
    const MAX_AMPLITUDE = 60;
    const SPEED_TO_AMP = 0.055;
    const PULSE_MIN_SPEED = 240;
    const SPAWN_COOLDOWN = 0.09;
    const MAX_PULSES = 4;
    const PULSE_RISE = 0.08;
    const PULSE_TAU = 0.65;
    const PULSE_SPEED = 1.8;
    const WAVELENGTH = 0.28;
    const ENV_WIDTH = 0.16;
    const ENV_SPREAD = 0.32;
    const CURSOR_SPRING = 24;

    const LINE_COUNT = window.innerWidth < 768 ? 4 : 7;

    const makeLineStates = (w, h) => {
      const states = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        const baseX = ((i + 1) * w) / (LINE_COUNT + 1);
        const samples = [];
        for (let s = 0; s < SAMPLES; s++) {
          samples.push({ y: (s / (SAMPLES - 1)) * h });
        }
        states.push({
          baseX,
          samples,
          fieldAmp: 0,
          fieldOrigin: h * 0.5,
          pulses: [],
          lastSpawnT: 0,
        });
      }
      return states;
    };

    let lineStates = makeLineStates(W, H);

    // Create SVG path elements
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    const paths = lineStates.map(() => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('stroke', isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(28, 33, 33, 0.12)');
      p.setAttribute('stroke-width', '1');
      p.setAttribute('fill', 'none');
      p.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(p);
      return p;
    });

    const buildPath = (baseX, samples, disp) => {
      const n = samples.length;
      if (n < 2) return `M ${baseX} 0`;
      let d = `M ${(baseX + disp[0]).toFixed(2)} ${samples[0].y.toFixed(2)}`;
      for (let i = 1; i < n - 1; i++) {
        const x0 = baseX + disp[i];
        const y0 = samples[i].y;
        const x1 = baseX + disp[i + 1];
        const y1 = samples[i + 1].y;
        const mx = (x0 + x1) * 0.5;
        const my = (y0 + y1) * 0.5;
        d += ` Q ${x0.toFixed(2)} ${y0.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
      }
      d += ` T ${(baseX + disp[n - 1]).toFixed(2)} ${samples[n - 1].y.toFixed(2)}`;
      return d;
    };

    let rawX = -9999;
    let rawY = -9999;
    let smX = -9999;
    let smY = -9999;
    let prevSmX = -9999;
    let prevSmY = -9999;
    let inside = false;
    let cursorSpeed = 0;

    const handlePointerMove = (e) => {
      rawX = e.clientX;
      rawY = e.clientY;
      if (!inside) {
        smX = prevSmX = rawX;
        smY = prevSmY = rawY;
        inside = true;
      }
    };

    const handlePointerOut = (e) => {
      if (!e.relatedTarget) {
        inside = false;
        rawX = rawY = -9999;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      lineStates = makeLineStates(W, H);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const spawnPulse = (L, nowS) => {
      const dx = L.baseX - smX;
      const adx = Math.abs(dx);
      const closeness = Math.max(0, 1 - adx / HIT_RADIUS);
      const shaped = closeness * closeness;
      const amp = Math.min(MAX_AMPLITUDE, cursorSpeed * SPEED_TO_AMP * shaped);
      if (amp < 0.5) return;
      const sign = dx >= 0 ? 1 : -1;
      const origin = Math.max(0, Math.min(1, smY / H));

      if (L.pulses.length >= MAX_PULSES) L.pulses.shift();
      L.pulses.push({ origin, age: 0, amp, sign });
      L.lastSpawnT = nowS;
    };

    let rafId;
    let lastT = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.04, (now - lastT) / 1000);
      lastT = now;
      const nowS = now / 1000;

      if (inside) {
        const k = 1 - Math.exp(-CURSOR_SPRING * dt);
        smX += (rawX - smX) * k;
        smY += (rawY - smY) * k;
      }

      if (inside && prevSmX !== -9999) {
        const dxp = smX - prevSmX;
        const dyp = smY - prevSmY;
        const inst = Math.hypot(dxp, dyp) / Math.max(dt, 0.001);
        const kSpd = 1 - Math.exp(-18 * dt);
        cursorSpeed += (inst - cursorSpeed) * kSpd;
      } else {
        cursorSpeed *= Math.exp(-6 * dt);
      }
      prevSmX = smX;
      prevSmY = smY;

      for (let li = 0; li < lineStates.length; li++) {
        const L = lineStates[li];
        if (!paths[li]) continue;

        for (let p = L.pulses.length - 1; p >= 0; p--) {
          const P = L.pulses[p];
          P.age += dt;
          const peak = P.amp * Math.exp(-P.age / PULSE_TAU);
          if (peak < 0.2) L.pulses.splice(p, 1);
        }

        if (inside && cursorSpeed >= PULSE_MIN_SPEED) {
          const dx = L.baseX - smX;
          if (Math.abs(dx) <= HIT_RADIUS && nowS - L.lastSpawnT >= SPAWN_COOLDOWN) {
            spawnPulse(L, nowS);
          }
        }

        let fieldTarget = 0;
        let fieldOriginTarget = L.fieldOrigin;
        if (inside) {
          const dx = L.baseX - smX;
          const adx = Math.abs(dx);
          if (adx <= FIELD_RADIUS) {
            const closeness = 1 - adx / FIELD_RADIUS;
            const shaped = closeness * closeness;
            fieldTarget = (dx >= 0 ? 1 : -1) * FIELD_MAX_AMP * shaped;
            fieldOriginTarget = smY;
          }
        }
        const kf = 1 - Math.exp(-FIELD_SMOOTH * dt);
        L.fieldAmp += (fieldTarget - L.fieldAmp) * kf;
        L.fieldOrigin += (fieldOriginTarget - L.fieldOrigin) * kf;

        const disp = new Array(SAMPLES);
        for (let i = 0; i < SAMPLES; i++) {
          const y01 = i / (SAMPLES - 1);
          const dyPx = y01 * H - L.fieldOrigin;
          const fEnv = Math.exp(-(dyPx * dyPx) / (2 * FIELD_ENV_PX * FIELD_ENV_PX));
          let d = L.fieldAmp * fEnv;

          for (let p = 0; p < L.pulses.length; p++) {
            const P = L.pulses[p];
            const attack = 1 - Math.exp(-P.age / PULSE_RISE);
            const decay = Math.exp(-P.age / PULSE_TAU);
            const delta = y01 - P.origin;
            const w = ENV_WIDTH + ENV_SPREAD * P.age;
            const env = Math.exp(-(delta * delta) / (2 * w * w));
            const wave = Math.cos((2 * Math.PI * (delta - PULSE_SPEED * P.age)) / WAVELENGTH);
            d += P.sign * P.amp * attack * decay * env * wave;
          }
          disp[i] = d;
        }

        paths[li].setAttribute('d', buildPath(L.baseX, L.samples, disp));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full block"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      />
    </div>
  );
}
