document.addEventListener('DOMContentLoaded', () => {
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
