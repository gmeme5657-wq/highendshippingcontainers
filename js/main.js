// Main navigation & search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('mobile-menu-toggle--active');
      mobileMenu.classList.toggle('mobile-menu--active');
    });

    mobileMenuClose.addEventListener('click', function() {
      mobileMenuToggle.classList.remove('mobile-menu-toggle--active');
      mobileMenu.classList.remove('mobile-menu--active');
    });

    mobileMenuOverlay.addEventListener('click', function() {
      mobileMenuToggle.classList.remove('mobile-menu-toggle--active');
      mobileMenu.classList.remove('mobile-menu--active');
    });
  }

  // Mobile submenu toggles
  const mobileNavItems = document.querySelectorAll('.mobile-nav__item');
  mobileNavItems.forEach(item => {
    const link = item.querySelector('.mobile-nav__link');
    if (item.querySelector('.mobile-nav__submenu')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        item.classList.toggle('mobile-nav__item--open');
      });
    }
  });

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

  // Container for responsive navbar
  const container = document.createElement('style');
  container.textContent = `.container { max-width: 1280px; margin: 0 auto; padding: 0 var(--space-lg); }
  @media (max-width: 768px) { .container { padding: 0 var(--space-md); } }
  @media (max-width: 480px) { .container { padding: 0 var(--space-sm); } }
  .py-5 { padding-top: var(--space-4xl); padding-bottom: var(--space-4xl); }`;
  document.head.appendChild(container);
});
