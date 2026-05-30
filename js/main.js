// Main navigation & search functionality
document.addEventListener('DOMContentLoaded', function() {
  // MOBILE FIX - Mobile Menu Toggle & Navigation
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileNavLinks = mobileMenu?.querySelectorAll('.mobile-nav__link') || [];

  if (mobileMenuToggle && mobileMenu) {
    // MOBILE FIX - Toggle menu open/close
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('mobile-menu--active');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    // MOBILE FIX - Open menu with animation
    const openMenu = () => {
      mobileMenuToggle.classList.add('mobile-menu-toggle--active');
      mobileMenu.classList.add('mobile-menu--active');
      mobileMenuOverlay.classList.add('mobile-menu__overlay--active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    // MOBILE FIX - Close menu with animation
    const closeMenu = () => {
      mobileMenuToggle.classList.remove('mobile-menu-toggle--active');
      mobileMenu.classList.remove('mobile-menu--active');
      mobileMenuOverlay.classList.remove('mobile-menu__overlay--active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    };

    // MOBILE FIX - Click handlers
    mobileMenuToggle.addEventListener('click', toggleMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenuOverlay.addEventListener('click', closeMenu);

    // MOBILE FIX - Close menu when link clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // MOBILE FIX - Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && 
          !mobileMenuToggle.contains(e.target) && 
          mobileMenu.classList.contains('mobile-menu--active')) {
        closeMenu();
      }
    });

    // MOBILE FIX - Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--active')) {
        closeMenu();
      }
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
});
