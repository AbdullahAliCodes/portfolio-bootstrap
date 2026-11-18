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

function syncProjectThumbnails(theme) {
  document.querySelectorAll('img.project-theme-thumb[data-src-light][data-src-dark]').forEach((img) => {
    const next = theme === 'dark' ? img.dataset.srcDark : img.dataset.srcLight;
    if (next && img.getAttribute('src') !== next) {
      img.src = next;
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme);
  syncThemeToggleIcon(theme);
  syncProjectThumbnails(theme);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#0A0A12' : '#DCDCDC');
  }
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
    if (!navbar) return;
    if (!hero) {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 8);
      return;
    }
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
      strings: ['student.', 'aspiring software engineer.', 'tech enthusiast.'],
      loop: true,
      typeSpeed: 65,
    });
  }

  const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));
  const projectCards = Array.from(document.querySelectorAll('.project-card[data-project-category]'));
  const projectsGrid = document.getElementById('projects-grid');

  function applyProjectFilter(filter) {
    if (projectsGrid) {
      projectsGrid.classList.toggle('filter-all-active', filter === 'all');
      projectsGrid.classList.toggle('filter-foundational-active', filter === 'foundational');
      projectsGrid.classList.toggle('filter-fullstack-active', filter === 'fullstack');
      projectsGrid.classList.toggle('filter-wordpress-active', filter === 'wordpress');
    }

    projectCards.forEach((card) => {
      const category = card.dataset.projectCategory;
      const shouldShow = filter === 'all' || filter === category;
      card.classList.toggle('d-none', !shouldShow);
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.projectFilter === filter;
      button.classList.toggle('active', isActive);
      button.classList.toggle('btn-primary', isActive);
      button.classList.toggle('btn-outline-primary', !isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
  }

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        applyProjectFilter(button.dataset.projectFilter || 'all');
      });
    });
    applyProjectFilter('all');
  }

  const navCollapse = document.getElementById('mainNavbar');
  if (navCollapse && typeof bootstrap !== 'undefined') {
    navCollapse.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }
});

syncProjectThumbnails(getStoredOrPreferredTheme());
