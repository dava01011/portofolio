// Lang
let currentLang = 'id';
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('lang-hidden', el.getAttribute('data-lang') !== lang);
  });
  document.getElementById('btnID').classList.toggle('active', lang === 'id');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang;
}
setLang('id');

// Theme
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
let dark = true;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '🌙' : '☀️';
});

// Cursor
const cur = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});

// Scroll
const bar = document.getElementById('progressBar');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / h * 100) + '%';
  btt.classList.toggle('visible', scrollY > 400);
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 20);
  let cur2 = '';
  document.querySelectorAll('section[id]').forEach(s => { if (scrollY >= s.offsetTop - 150) cur2 = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => { a.style.color = a.getAttribute('href') === '#'+cur2 ? 'var(--accent)' : ''; });
});
btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// Hamburger
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Reveal on scroll
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// Badge typewriter (ID only)
const badgeEl = document.getElementById('badgeText');
const phrases = ['SIAP BANGUN', 'OPEN TO WORK', 'READY TO CODE'];
let pi = 0, ci = 0, deleting = false;
function typeLoop() {
  if (!badgeEl) return;
  const p = phrases[pi];
  badgeEl.textContent = deleting ? p.slice(0, --ci) : p.slice(0, ++ci);
  if (!deleting && ci === p.length) { deleting = true; setTimeout(typeLoop, 1100); return; }
  if (deleting && ci === 0) { deleting = false; pi = (pi+1) % phrases.length; }
  setTimeout(typeLoop, deleting ? 55 : 95);
}
typeLoop();