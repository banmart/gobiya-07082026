'use client';

import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   Iridescence — React Bits (reactbits.dev, MIT), rehosted.

   The upstream component renders its shader through `ogl`. That's a real
   dependency for one full-screen triangle, so the shader is kept and the
   renderer is not: the `d`/`a` accumulation loop and the final
   `cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5)` are verbatim from React Bits,
   and everything around them is this repo's own raw-WebGL harness — the same
   one AuroraCanvas already uses. Net cost of the effect: zero new packages.

   Two deliberate departures from the original:

   1. Palette. Raw Iridescence is a full-spectrum rainbow. The field's three
      channels are used instead as barycentric weights across the three brand
      primaries — blue, carmine red, gold yellow — so the shimmer survives and
      the rainbow doesn't.

   2. Cost. The GL context isn't created until the section is within 200px of
      the viewport, the loop stops when it leaves, reduced-motion gets one
      static frame and no rAF at all, and the buffer renders at 60% of device
      resolution — the field is smooth enough that nothing shows, and the
      8-iteration loop is per-fragment so it's the only knob that matters.
   ═══════════════════════════════════════════════════════════ */

/* Fraction of device resolution the shader actually renders at. The output is
   a soft gradient, so upscaling is invisible and this is ~3x fewer fragments. */
const RESOLUTION_SCALE = 0.6;

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 vUv;

void main() {
  // Single covering triangle: (-1,-1), (3,-1), (-1,3) maps to uv 0..2, which
  // is exactly what ogl's Triangle hands the upstream shader.
  vUv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;
uniform float uAmplitude;
uniform float uSpeed;
uniform vec3  uColor;
uniform float uIntensity;

uniform vec3 uBlue;
uniform vec3 uRed;
uniform vec3 uYellow;
uniform vec3 uDeep;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;

  /* ── brand grade: blue / red / yellow ──
     The expression above lands in roughly [0.54, 1.0] per channel, so it gets
     renormalised to 0..1 first — otherwise every weight below starts half-open
     and the three colours never separate. */
  vec3 f = clamp((col - 0.5403) / 0.4597, 0.0, 1.0);

  /* Barycentric blend across the three brand primaries. The exponent widens
     the gaps so the weights actually diverge — the field's channels are
     correlated, and left raw they average to mud.

     The weights are not an even split. Carmine and gold are far brighter and
     far more saturated than the navy, so equal weighting reads as red-and-
     yellow with the blue hiding underneath. Navy is the ground here: it keeps
     the full weight, and the other two are scaled down *and* gated with a
     smoothstep so they surface as ribbons at the crests rather than as
     washes across the whole panel. */
  vec3 w = pow(f, vec3(1.3)) + 0.02;
  w.r *= 0.60 * smoothstep(0.20, 0.85, f.r);
  w.g *= 0.45 * smoothstep(0.28, 0.92, f.g);

  float total = w.r + w.g + w.b;
  vec3 brand = (uRed * w.r + uYellow * w.g + uBlue * w.b) / total;

  /* Normalising above holds brightness roughly constant, so this is the one
     knob controlling how much light reaches the copy on the card above. */
  brand = mix(uDeep, brand, uIntensity);

  // Vignette, so the panel sitting on top of this still has an edge to sit on.
  float vig = smoothstep(1.25, 0.30, length(vUv - 0.5));
  brand *= 0.62 + 0.38 * vig;

  // The grade is smooth enough to band on 8-bit displays without this.
  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * (1.0 / 255.0);

  gl_FragColor = vec4(brand + dither, 1.0);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Iridescence shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Shader objects are reference-counted by the program once attached, so
  // they can go immediately after a successful link.
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Iridescence program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/* The three brand primaries as 0..1 triplets. RED is the carmine-orange
   accent verbatim from lib/brand.js and WARM is the same hue lifted, standing
   in for the gold the palette no longer carries. Blue is the primary — a dark
   indigo just off the #0C1050 brand navy, lifted only enough to hold some
   tonal variation instead of going flat. DEEP is what the field fades toward
   as intensity drops. */
const BLUE = [0.102, 0.125, 0.439];   // #1A2070
const RED = [0.882, 0.259, 0.059];    // #E1420F
const YELLOW = [1.000, 0.478, 0.302]; // #FF7A4D
const DEEP = [0.020, 0.024, 0.122];   // #05061F

export default function IridescenceCanvas({
  className = '',
  color = [1, 1, 1],
  speed = 0.55,
  amplitude = 0.1,
  intensity = 0.8,
  mouseReact = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Props live in a ref so changing one doesn't tear down the GL context.
  const propsRef = useRef({ color, speed, amplitude, intensity, mouseReact });
  propsRef.current = { color, speed, amplitude, intensity, mouseReact };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;
    let teardown = null;

    /* Everything below only runs once the section is close to the viewport.
       Creating a GL context costs a real allocation, and this section sits
       well down the homepage — most sessions should never pay for it. */
    const start = () => {
      const gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false, // full-screen fragment shader; MSAA buys nothing
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      });
      if (!gl) return; // CSS gradient on the container stands in

      const program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
      if (!program) return;

      gl.useProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );

      const aPositionLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(aPositionLoc);
      gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

      const u = (name) => gl.getUniformLocation(program, name);
      const uResolution = u('uResolution');
      const uTime = u('uTime');
      const uMouse = u('uMouse');
      const uAmplitude = u('uAmplitude');
      const uSpeed = u('uSpeed');
      const uColor = u('uColor');
      const uIntensity = u('uIntensity');

      // Palette uniforms never change; set them once.
      gl.uniform3fv(u('uBlue'), BLUE);
      gl.uniform3fv(u('uRed'), RED);
      gl.uniform3fv(u('uYellow'), YELLOW);
      gl.uniform3fv(u('uDeep'), DEEP);

      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2) * RESOLUTION_SCALE;
        const width = Math.max(1, Math.floor(rect.width * dpr));
        const height = Math.max(1, Math.floor(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };
      handleResize();

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouse.targetX = (e.clientX - rect.left) / rect.width;
        mouse.targetY = 1 - (e.clientY - rect.top) / rect.height;
      };

      const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (propsRef.current.mouseReact && !reduceMotion) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      // A lost context leaves a black rectangle behind. Swallowing the default
      // lets the browser restore it; the section falls back to its CSS
      // gradient in the meantime.
      const handleContextLost = (e) => e.preventDefault();
      canvas.addEventListener('webglcontextlost', handleContextLost, false);

      const draw = (time) => {
        const p = propsRef.current;
        gl.useProgram(program);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, time);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform1f(uAmplitude, p.mouseReact ? p.amplitude : 0);
        gl.uniform1f(uSpeed, p.speed);
        gl.uniform3fv(uColor, p.color);
        gl.uniform1f(uIntensity, p.intensity);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      let frameId = null;
      let visible = true;
      let running = true;

      const visibilityObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => { visible = entry.isIntersecting; }),
        { threshold: 0.02 }
      );
      visibilityObserver.observe(container);

      if (reduceMotion) {
        // One frame, at an arbitrary but pleasant point in the loop. No rAF.
        draw(4.2);
      } else {
        const startTime = performance.now();
        const render = (now) => {
          if (!running) return;
          if (visible) {
            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;
            draw((now - startTime) * 0.001);
          }
          frameId = requestAnimationFrame(render);
        };
        frameId = requestAnimationFrame(render);
      }

      teardown = () => {
        running = false;
        if (frameId) cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    };

    const initObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        initObserver.disconnect();
        if (disposed) return;
        start();
      },
      { rootMargin: '200px 0px' }
    );
    initObserver.observe(container);

    return () => {
      disposed = true;
      initObserver.disconnect();
      if (teardown) teardown();
    };
  }, []);

  return (
    <div ref={containerRef} className={`mw-iridescence ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="mw-iridescence__canvas" />
    </div>
  );
}
