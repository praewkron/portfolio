/**
 * Visual Effects: Cursor Spotlight + Ambient Floating Particles
 * Resume Presentation — Kornravee Sirikhan (Praew)
 */

/* ============================================================
   1. CURSOR SPOTLIGHT
   ============================================================ */
(function initCursorSpotlight() {
  const el = document.getElementById('cursorSpotlight');
  if (!el) return;

  let targetX = -999, targetY = -999;
  let currentX = -999, currentY = -999;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Hide spotlight when mouse leaves window
  document.addEventListener('mouseleave', () => {
    targetX = -999;
    targetY = -999;
  });

  // Smooth lerp follow
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.10);
    currentY = lerp(currentY, targetY, 0.10);
    el.style.setProperty('--cx', `${currentX}px`);
    el.style.setProperty('--cy', `${currentY}px`);
    rafId = requestAnimationFrame(animate);
  }

  animate();
})();


/* ============================================================
   2. AMBIENT FLOATING PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Color palette from the site's green theme
  const COLORS = [
    'rgba(132, 204, 22,',   // lime
    'rgba(34,  197, 94,',   // green
    'rgba(16,  185, 129,',  // mint
    'rgba(163, 230, 53,',   // chartreuse
  ];

  const PARTICLE_COUNT = 55;
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : H + 10;
      this.r     = 1.5 + Math.random() * 2.5;
      this.speed = 0.25 + Math.random() * 0.55;
      this.drift = (Math.random() - 0.5) * 0.3;
      this.alpha = 0.15 + Math.random() * 0.35;
      this.pulse = Math.random() * Math.PI * 2; // phase offset for breathing
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    update() {
      this.y    -= this.speed;
      this.x    += this.drift;
      this.pulse += 0.018;
      // breathing alpha
      this.currentAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));

      if (this.y < -this.r * 2) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.currentAlpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();
