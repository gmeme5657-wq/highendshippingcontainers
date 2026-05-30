// Main navigation & search functionality
document.addEventListener('DOMContentLoaded', function() {
  // MOBILE MENU FIX - NO MORE FREEZE, ALL 5 LINKS SHOW
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navLinkAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];

  if (hamburgerBtn && navLinks) {
    const closeMenu = () => {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      hamburgerBtn.classList.add('active');
      navLinks.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      navLinks.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const toggleMenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinkAnchors.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') &&
          !navLinks.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Search Overlay
  // Search Overlay
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');

  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      searchOverlay.classList.add('search-overlay--active');
      searchOverlay.querySelector('.search-overlay__input').focus();
    });

    searchClose.addEventListener('click', function() {
      searchOverlay.classList.remove('search-overlay--active');
    });

    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('search-overlay--active');
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing with ${email}!`);
      this.reset();
    });
  }
});
