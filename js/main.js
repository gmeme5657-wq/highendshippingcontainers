// Main navigation & search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  // FIXED MOBILE MENU START
  if (mobileMenuToggle && mobileMenu && mobileMenuClose && mobileMenuOverlay) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-nav__link');

    const closeMobileMenu = () => {
      mobileMenuToggle.classList.remove('mobile-menu-toggle--active');
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('mobile-menu--active');
      mobileMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('mobile-menu__overlay--active');
      mobileMenuOverlay.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    };

    const openMobileMenu = () => {
      mobileMenuToggle.classList.add('mobile-menu-toggle--active');
      mobileMenuToggle.classList.add('active');
      mobileMenu.classList.add('mobile-menu--active');
      mobileMenu.classList.add('active');
      mobileMenuOverlay.classList.add('mobile-menu__overlay--active');
      mobileMenuOverlay.classList.add('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    };

    mobileMenuToggle.addEventListener('click', function() {
      if (mobileMenu.classList.contains('mobile-menu--active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', function(event) {
      if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
  // FIXED MOBILE MENU END

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
});
