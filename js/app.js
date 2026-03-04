/**
 * LA CONTRADA RISTORANTE
 * Premium Luxury Scroll-Driven Landing Page
 *
 * Features:
 * - Canvas frame rendering synced to scroll
 * - Smooth scroll (Lenis)
 * - Multiple animation types
 * - Staggered reveals
 * - Counter animations
 * - Custom cursor with smooth follow
 * - Magnetic buttons
 * - Premium hover effects
 */

// ===========================================
// CONFIGURATION
// ===========================================

const CONFIG = {
  // Frame settings - Using frames 72-151 (skipping jump at frame 71-72)
  FRAME_START: 72,
  FRAME_END: 151,
  FRAME_COUNT: 80, // 151 - 72 + 1
  FRAME_PATH: 'frames/frame_',
  FRAME_EXT: '.webp',
  FRAME_DIGITS: 4,

  // Scroll behavior
  FRAME_SPEED: 2.0, // Complete video before end of scroll (1.8-2.2 recommended)

  // Canvas scaling
  IMAGE_SCALE: 0.9, // 90% of container
};

// ===========================================
// INITIALIZATION
// ===========================================

gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderPercent = document.getElementById('loader-percent');
const heroSection = document.querySelector('.hero-standalone');
const scrollContainer = document.getElementById('scroll-container');
const darkOverlay = document.getElementById('dark-overlay');
const marqueeWrap = document.querySelector('.marquee-wrap');
const sections = document.querySelectorAll('.scroll-section');
const canvas = document.getElementById('frame-canvas');
const canvasContainer = document.getElementById('canvas-container');
const ctx = canvas.getContext('2d');

// Luxury Elements
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const header = document.querySelector('.site-header');
const magneticElements = document.querySelectorAll('[data-magnetic]');

// State
let lenis;
let isLoaded = false;
let frames = [];
let currentFrame = 0;
let imagesLoaded = 0;
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// ===========================================
// FRAME LOADING SYSTEM
// ===========================================

function getFramePath(index) {
  const num = String(index).padStart(CONFIG.FRAME_DIGITS, '0');
  return `${CONFIG.FRAME_PATH}${num}${CONFIG.FRAME_EXT}`;
}

function preloadFrames() {
  return new Promise((resolve) => {
    for (let i = CONFIG.FRAME_START; i <= CONFIG.FRAME_END; i++) {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        const progress = (imagesLoaded / CONFIG.FRAME_COUNT) * 100;
        updateLoaderProgress(progress);

        if (imagesLoaded === CONFIG.FRAME_COUNT) {
          resolve();
        }
      };
      img.onerror = () => {
        imagesLoaded++;
        console.warn(`Failed to load frame ${i}`);
        if (imagesLoaded === CONFIG.FRAME_COUNT) {
          resolve();
        }
      };
      img.src = getFramePath(i);
      frames[i] = img;
    }
  });
}

function updateLoaderProgress(progress) {
  loaderBar.style.width = `${progress}%`;
  loaderPercent.textContent = `${Math.round(progress)}%`;
}

// ===========================================
// CANVAS RENDERING
// ===========================================

function setupCanvas() {
  // Get first frame dimensions
  const firstFrame = frames[CONFIG.FRAME_START];
  if (!firstFrame || !firstFrame.complete) return;

  // Set canvas size based on container
  resizeCanvas();

  // Draw first frame
  drawFrame(CONFIG.FRAME_START);
}

function resizeCanvas() {
  const containerRect = canvasContainer.getBoundingClientRect();
  const firstFrame = frames[CONFIG.FRAME_START];

  if (!firstFrame || !firstFrame.naturalWidth) return;

  // Calculate size maintaining aspect ratio
  const imgRatio = firstFrame.naturalWidth / firstFrame.naturalHeight;
  const containerRatio = containerRect.width / containerRect.height;

  let drawWidth, drawHeight;

  if (imgRatio > containerRatio) {
    // Image is wider than container
    drawWidth = containerRect.width * CONFIG.IMAGE_SCALE;
    drawHeight = drawWidth / imgRatio;
  } else {
    // Image is taller than container
    drawHeight = containerRect.height * CONFIG.IMAGE_SCALE;
    drawWidth = drawHeight * imgRatio;
  }

  canvas.width = drawWidth;
  canvas.height = drawHeight;
}

function drawFrame(index) {
  const frame = frames[index];
  if (!frame || !frame.complete) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw frame
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

  currentFrame = index;
}

// ===========================================
// SCROLL-DRIVEN FRAME ANIMATION
// ===========================================

function setupFrameScrollTrigger() {
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      // Apply speed multiplier
      const acceleratedProgress = Math.min(self.progress * CONFIG.FRAME_SPEED, 1);

      // Calculate frame index (72-151 range)
      const frameIndex = Math.max(CONFIG.FRAME_START, Math.min(
        Math.floor(acceleratedProgress * CONFIG.FRAME_COUNT) + CONFIG.FRAME_START,
        CONFIG.FRAME_END
      ));

      // Only redraw if frame changed
      if (frameIndex !== currentFrame) {
        drawFrame(frameIndex);
      }
    }
  });
}

// ===========================================
// LENIS SMOOTH SCROLL
// ===========================================

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// ===========================================
// LOADER
// ===========================================

function hideLoader() {
  loader.classList.add('hidden');
  isLoaded = true;
  animateHeroEntrance();
}

// ===========================================
// HERO ENTRANCE ANIMATION
// ===========================================

function animateHeroEntrance() {
  const tl = gsap.timeline();

  tl.from('.hero-heading .word', {
    y: 120,
    opacity: 0,
    rotationX: -40,
    stagger: 0.12,
    duration: 1.2,
    ease: 'power4.out',
  })
  .from('.section-label', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.8')
  .from('.hero-tagline', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.6')
  .from('.hero-award', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.6')
  .from('.scroll-indicator', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.4');
}

// ===========================================
// SECTION POSITIONING
// ===========================================

function positionSections() {
  sections.forEach((section) => {
    const enter = parseFloat(section.dataset.enter) / 100;
    const leave = parseFloat(section.dataset.leave) / 100;
    const midpoint = (enter + leave) / 2;

    const containerHeight = scrollContainer.offsetHeight;
    const topPosition = containerHeight * midpoint - window.innerHeight / 2;

    section.style.top = `${topPosition}px`;
  });
}

// ===========================================
// SECTION ANIMATION SYSTEM
// ===========================================

function setupSectionAnimation(section) {
  const type = section.dataset.animation;
  const persist = section.dataset.persist === 'true';
  const enter = parseFloat(section.dataset.enter) / 100;
  const leave = parseFloat(section.dataset.leave) / 100;

  const children = section.querySelectorAll(
    '.section-label, .section-heading, .section-body, .cta-button, .stat'
  );

  const tl = gsap.timeline({ paused: true });

  switch (type) {
    case 'fade-up':
      tl.from(children, {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });
      break;

    case 'slide-left':
      tl.from(children, {
        x: -100,
        opacity: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out',
      });
      break;

    case 'slide-right':
      tl.from(children, {
        x: 100,
        opacity: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out',
      });
      break;

    case 'scale-up':
      tl.from(children, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.12,
        duration: 1.0,
        ease: 'power2.out',
      });
      break;

    case 'rotate-in':
      tl.from(children, {
        y: 50,
        rotation: 4,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
      });
      break;

    case 'stagger-up':
      tl.from(children, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
      break;

    case 'clip-reveal':
      gsap.set(children, { clipPath: 'inset(100% 0 0 0)' });
      tl.to(children, {
        clipPath: 'inset(0% 0 0 0)',
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.inOut',
      });
      break;

    default:
      tl.from(children, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
  }

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onUpdate: (self) => {
      const p = self.progress;
      const fadeInStart = enter - 0.02;
      const fadeInEnd = enter + 0.02;
      const fadeOutStart = leave - 0.02;
      const fadeOutEnd = leave + 0.02;

      if (p >= fadeInStart && p <= fadeOutEnd) {
        section.classList.add('active');

        if (p >= fadeInStart && p <= fadeInEnd) {
          const localProgress = (p - fadeInStart) / (fadeInEnd - fadeInStart);
          tl.progress(localProgress);
        } else if (p > fadeInEnd && p < fadeOutStart) {
          tl.progress(1);
        } else if (p >= fadeOutStart && p <= fadeOutEnd && !persist) {
          const localProgress = 1 - (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
          tl.progress(localProgress);
        } else if (persist && p >= fadeOutStart) {
          tl.progress(1);
        }
      } else {
        if (!persist || p < fadeInStart) {
          section.classList.remove('active');
          tl.progress(0);
        }
      }
    },
  });
}

// ===========================================
// COUNTER ANIMATIONS
// ===========================================

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach((el) => {
    const target = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || '0');
    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: '.section-stats',
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            el.textContent = counter.value.toFixed(decimals);
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(counter, {
          value: 0,
          duration: 0.5,
          ease: 'power1.in',
          onUpdate: () => {
            el.textContent = counter.value.toFixed(decimals);
          },
        });
      },
    });
  });
}

// ===========================================
// HORIZONTAL MARQUEE
// ===========================================

function initMarquee() {
  if (!marqueeWrap) return;

  const marqueeText = marqueeWrap.querySelector('.marquee-text');
  const speed = parseFloat(marqueeWrap.dataset.scrollSpeed) || -30;

  gsap.to(marqueeText, {
    xPercent: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onUpdate: (self) => {
      const p = self.progress;
      if (p > 0.1 && p < 0.85) {
        marqueeWrap.classList.add('visible');
      } else {
        marqueeWrap.classList.remove('visible');
      }
    },
  });
}

// ===========================================
// DARK OVERLAY (Stats Section)
// ===========================================

function initDarkOverlay() {
  const statsSection = document.querySelector('.section-stats');
  if (!statsSection || !darkOverlay) return;

  const enter = parseFloat(statsSection.dataset.enter) / 100;
  const leave = parseFloat(statsSection.dataset.leave) / 100;
  const fadeRange = 0.04;

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onUpdate: (self) => {
      const p = self.progress;
      let opacity = 0;

      if (p >= enter - fadeRange && p <= enter) {
        opacity = (p - (enter - fadeRange)) / fadeRange;
      } else if (p > enter && p < leave) {
        opacity = 0.85;
      } else if (p >= leave && p <= leave + fadeRange) {
        opacity = 0.85 * (1 - (p - leave) / fadeRange);
      }

      darkOverlay.style.opacity = opacity;
    },
  });
}

// ===========================================
// HERO FADE ON SCROLL
// ===========================================

function initHeroFade() {
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: '10% top',
    scrub: true,
    onUpdate: (self) => {
      const opacity = 1 - self.progress * 1.5;
      heroSection.style.opacity = Math.max(0, opacity);
    },
  });
}

// ===========================================
// CUSTOM CURSOR (Luxury)
// ===========================================

function initCustomCursor() {
  // Skip on touch devices
  if (!cursor || !cursorDot || window.matchMedia('(hover: none)').matches) return;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Move dot immediately
    gsap.set(cursorDot, {
      x: mouseX,
      y: mouseY,
    });
  });

  // Smooth cursor follow animation
  gsap.ticker.add(() => {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    gsap.set(cursor, {
      x: cursorX,
      y: cursorY,
    });
  });

  // Hover effects on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .stat');
  const ctaTargets = document.querySelectorAll('.cta-button, .nav-cta');

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  ctaTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.remove('hover');
      cursor.classList.add('hover-cta');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover-cta');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, cursorDot], {
      opacity: 0,
      duration: 0.3,
    });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([cursor, cursorDot], {
      opacity: 1,
      duration: 0.3,
    });
  });
}

// ===========================================
// MAGNETIC BUTTON EFFECT (Luxury)
// ===========================================

function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  magneticElements.forEach((el) => {
    const wrapper = el.closest('.magnetic-wrap');
    if (!wrapper) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

// ===========================================
// HEADER SCROLL EFFECT (Luxury)
// ===========================================

function initHeaderScroll() {
  if (!header) return;

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (self.progress > 0.02) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
  });
}

// ===========================================
// INITIALIZE EVERYTHING
// ===========================================

async function init() {
  // 1. Initialize Lenis
  initLenis();

  // 2. Initialize luxury cursor (start immediately)
  initCustomCursor();

  // 3. Preload all frames (shows progress in loader)
  await preloadFrames();

  // 4. Setup canvas
  setupCanvas();

  // 5. Hide loader
  setTimeout(hideLoader, 500);

  // 6. Setup frame scroll trigger
  setupFrameScrollTrigger();

  // 7. Position sections
  positionSections();

  // 8. Setup section animations
  sections.forEach(setupSectionAnimation);

  // 9. Counter animations
  initCounters();

  // 10. Marquee
  initMarquee();

  // 11. Dark overlay
  initDarkOverlay();

  // 12. Hero fade
  initHeroFade();

  // 13. Header scroll effect
  initHeaderScroll();

  // 14. Magnetic buttons
  initMagneticButtons();

  // Handle resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    positionSections();
    ScrollTrigger.refresh();
  });
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
