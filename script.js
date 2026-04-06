const THEME_KEY = 'portfolio-bs-theme';

function getStoredOrPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncThemeToggleIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'bi bi-moon-stars-fill';
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.className = 'bi bi-sun-fill';
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme);
  syncThemeToggleIcon(theme);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getStoredOrPreferredTheme());

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next =
      document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  const navbar = document.getElementById('navbar-example2');
  const hero = document.getElementById('home');

  function updateNavbarScrolled() {
    if (!navbar || !hero) return;
    const dockEarlyPx = 160;
    const threshold = Math.max(0, hero.offsetHeight - dockEarlyPx);
    const scrolledPastHero = window.scrollY >= threshold;
    navbar.classList.toggle('navbar-scrolled', scrolledPastHero);
  }

  updateNavbarScrolled();
  window.addEventListener('scroll', updateNavbarScrolled, { passive: true });
  window.addEventListener('resize', updateNavbarScrolled);

  if (typeof Typed !== 'undefined') {
    new Typed('#typed', {
      strings: ['student.', 'fullstack ai developer.', 'tech enthusiast.'],
      loop: true,
      typeSpeed: 65,
    });
  }
});
