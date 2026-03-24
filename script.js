/* ================================================
   RAJ MOHAN — PORTFOLIO JAVASCRIPT
   Electric Card, Particles, Animations, Form
   ================================================ */

'use strict';

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth trail follow
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor grow on interactive elements
document.querySelectorAll('a, button, .hero-card, .project-card, .cert-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.5)';
    cursorTrail.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorTrail.style.opacity = '1';
  });
});

/* ===== BACKGROUND PARTICLE CANVAS ===== */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.pulse = Math.random() * Math.PI * 2;
    this.isGold = Math.random() < 0.15;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += 0.02;
    this.opacity = (Math.sin(this.pulse) * 0.15) + (this.isGold ? 0.25 : 0.1);
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.isGold
      ? `rgba(255, 215, 0, ${this.opacity})`
      : `rgba(180, 180, 220, ${this.opacity * 0.4})`;
    ctx.fill();
  }
}

// Init particles
function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 8000);
  for (let i = 0; i < Math.min(count, 120); i++) {
    particles.push(new Particle());
  }
}
initParticles();
window.addEventListener('resize', initParticles);

// Draw subtle grid lines
function drawGrid() {
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.018)';
  ctx.lineWidth = 1;
  const spacing = 80;
  for (let x = 0; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  particles.forEach(p => { p.update(); p.draw(); });

  // Draw faint connecting lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - dist / 100) * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  animFrame = requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== TYPEWRITER EFFECT ===== */
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Full Stack Developer',
  'MERN Stack Enthusiast',
  'Problem Solver',
  'DSA Practitioner',
  'Open Source Contributor',
  'API Architect',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeWrite() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 100;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typeDelay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeDelay = 400;
  }
  setTimeout(typeWrite, typeDelay);
}
setTimeout(typeWrite, 800);

/* ===== HERO CARD — ELECTRIC HOVER EFFECT ===== */
const heroCard = document.getElementById('heroCard');
const sparksContainer = document.getElementById('sparks');
let sparkInterval = null;
let isCardHovered = false;

function createSpark() {
  if (!isCardHovered) return;
  const spark = document.createElement('div');
  spark.classList.add('spark');
  // Random position along card edges
  const side = Math.floor(Math.random() * 4);
  const card = heroCard.getBoundingClientRect();
  let x, y;
  if (side === 0) { x = Math.random() * 100; y = -5; }
  else if (side === 1) { x = 105; y = Math.random() * 100; }
  else if (side === 2) { x = Math.random() * 100; y = 105; }
  else { x = -5; y = Math.random() * 100; }

  spark.style.left = x + '%';
  spark.style.top = y + '%';
  const angle = Math.random() * Math.PI * 2;
  const dist = 30 + Math.random() * 50;
  spark.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
  spark.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
  sparksContainer.appendChild(spark);
  setTimeout(() => spark.remove(), 600);
}

// 3D tilt on mousemove
heroCard.addEventListener('mousemove', (e) => {
  const rect = heroCard.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / (rect.width / 2);
  const dy = (e.clientY - cy) / (rect.height / 2);
  heroCard.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg) scale(1.03)`;
});

heroCard.addEventListener('mouseenter', () => {
  isCardHovered = true;
  heroCard.classList.add('is-active');
  sparkInterval = setInterval(createSpark, 80);
});

heroCard.addEventListener('mouseleave', () => {
  isCardHovered = false;
  heroCard.classList.remove('is-active');
  heroCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  clearInterval(sparkInterval);
});

// Touch support for mobile
heroCard.addEventListener('touchstart', () => {
  isCardHovered = true;
  heroCard.classList.add('is-active');
  sparkInterval = setInterval(createSpark, 80);
  setTimeout(() => {
    isCardHovered = false;
    heroCard.classList.remove('is-active');
    clearInterval(sparkInterval);
  }, 2000);
}, { passive: true });

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.glass-card, .section-title, .hero-greeting, .hero-name, .typewriter-wrap, .hero-bio, .hero-btns, .hero-socials');

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => observer.observe(el));

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// Add active style
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav-links a.active { color: var(--accent) !important; } .nav-links a.active::after { width: 100% !important; }`;
document.head.appendChild(activeStyle);

/* ===== RESUME TABS ===== */
const resumeTabBtns = document.querySelectorAll('.resume-tab');
const resumePanels = document.querySelectorAll('.resume-panel');

resumeTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    resumeTabBtns.forEach(b => b.classList.remove('active'));
    resumePanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('panel-' + target);
    if (panel) panel.classList.add('active');
  });
});

/* ===== CONTACT FORM — EmailJS ===== */
// ─────────────────────────────────────────────────────────────────────
// SETUP (one-time, 2 minutes):
//   1. Go to https://www.emailjs.com → Sign Up (free)
//   2. Add Service → choose Gmail → authorise → copy "Service ID"
//   3. Email Templates → Create Template:
//        To email : rajmohan6982@gmail.com
//        Subject  : {{subject}}
//        Body     : Name: {{from_name}}\nEmail: {{reply_to}}\n\n{{message}}
//      Save → copy "Template ID"
//   4. Account → API Keys → copy "Public Key"
//   5. Replace the three YOUR_… strings below with your real values.
// ─────────────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'W6DO15zvqUDc4u-Mj';   // ← paste here
const EMAILJS_SERVICE_ID = 'service_tt5f52i';   // ← paste here
const EMAILJS_TEMPLATE_ID = 'template_odsakvv';  // ← paste here

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.submit-btn');

  // Loading state
  btn.disabled = true;
  btn.textContent = 'Sending…';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
    .then(() => {
      // Success
      btn.disabled = false;
      btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      contactForm.reset();
      setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 6000);
    })
    .catch((err) => {
      // Error
      btn.disabled = false;
      btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      formStatus.textContent = '❌ Failed to send. Please email me directly at rajmohan6982@gmail.com';
      formStatus.className = 'form-status error';
      console.error('EmailJS error:', err);
    });
});

/* ===== SMOOTH SECTION ENTRY ANIMATIONS ===== */
// Stagger skill pills on hover
document.querySelectorAll('.skill-category').forEach(cat => {
  const pills = cat.querySelectorAll('.pill');
  pills.forEach((pill, i) => {
    pill.style.transitionDelay = (i * 40) + 'ms';
  });
});

/* ===== PHOTO FALLBACK ===== */
// If photo fails to load, show a styled initials avatar
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    const photoWrap = document.getElementById('photoWrap');
    heroPhoto.style.display = 'none';
    const avatar = document.createElement('div');
    avatar.style.cssText = `
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif;
      font-size: 5rem; font-weight: 800;
      color: rgba(255,215,0,0.8);
      background: linear-gradient(135deg, #111128, #0a0a18);
      letter-spacing: -2px;
    `;
    avatar.textContent = 'RM';
    photoWrap.appendChild(avatar);
  });
}

/* ===== EASTER EGG — Konami code triggers full electric storm ===== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      triggerElectricStorm();
    }
  } else {
    konamiIndex = 0;
  }
});

function triggerElectricStorm() {
  heroCard.classList.add('is-active');
  isCardHovered = true;
  clearInterval(sparkInterval);
  sparkInterval = setInterval(createSpark, 30);
  document.body.style.transition = 'filter 0.3s';
  document.body.style.filter = 'brightness(1.1) saturate(1.3)';
  setTimeout(() => {
    document.body.style.filter = '';
    heroCard.classList.remove('is-active');
    isCardHovered = false;
    clearInterval(sparkInterval);
  }, 3000);
}

/* ===== CERTIFICATE GALLERY — SLIDING WINDOW ===== */
(function () {
  const strip = document.getElementById('flashcardSlides');
  const slides = document.querySelectorAll('.flashcard-slide');
  const dotsWrap = document.getElementById('flashcardDots');
  const counter = document.getElementById('flashcardCounter');
  const progressFill = document.getElementById('flashcardProgress');
  const prevBtn = document.getElementById('flashcardPrev');
  const nextBtn = document.getElementById('flashcardNext');
  const flashcard = document.querySelector('.flashcard');

  if (!slides.length || !strip) return;

  const TOTAL = slides.length;
  const INTERVAL = 2000; // ms
  let current = 0;
  let timer = null;
  let rafId = null;
  let ts0 = 0;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'flashcard-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(d);
  });

  function getDots() { return dotsWrap.querySelectorAll('.flashcard-dot'); }

  // Move the strip to show slide `idx`
  function goTo(idx, resetTimer) {
    getDots()[current].classList.remove('active');
    current = ((idx % TOTAL) + TOTAL) % TOTAL;
    strip.style.transform = 'translateX(-' + (current * 100) + '%)';
    getDots()[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + TOTAL;
    if (resetTimer) restartTimer();
  }

  // Smooth progress bar via rAF
  function startProgress() {
    ts0 = performance.now();
    progressFill.style.width = '0%';
    function tick(now) {
      const pct = Math.min(((now - ts0) / INTERVAL) * 100, 100);
      progressFill.style.width = pct + '%';
      if (pct < 100) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  function stopProgress() {
    cancelAnimationFrame(rafId);
    progressFill.style.width = '0%';
  }

  function restartTimer() {
    clearInterval(timer);
    stopProgress();
    startProgress();
    timer = setInterval(() => {
      goTo(current + 1, false);
      stopProgress();
      startProgress();
    }, INTERVAL);
  }

  // Boot
  restartTimer();

  // Controls
  prevBtn.addEventListener('click', () => goTo(current - 1, true));
  nextBtn.addEventListener('click', () => goTo(current + 1, true));

  // Pause on hover
  flashcard.addEventListener('mouseenter', () => { clearInterval(timer); cancelAnimationFrame(rafId); });
  flashcard.addEventListener('mouseleave', () => restartTimer());

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1, true);
    if (e.key === 'ArrowRight') goTo(current + 1, true);
  });

  // Touch swipe
  let tx0 = 0;
  flashcard.addEventListener('touchstart', (e) => { tx0 = e.touches[0].clientX; }, { passive: true });
  flashcard.addEventListener('touchend', (e) => {
    const d = tx0 - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) goTo(current + (d > 0 ? 1 : -1), true);
  }, { passive: true });
})();

/* ===== INIT LOG ===== */
console.log('%c⚡ RAJ MOHAN PORTFOLIO', 'color: #FFD700; font-size: 20px; font-weight: bold; font-family: monospace;');
console.log('%cBuilt with passion. Powered by coffee. Charged by electricity.', 'color: #8888aa; font-family: monospace;');
console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'color: #FFD700; font-family: monospace;');
