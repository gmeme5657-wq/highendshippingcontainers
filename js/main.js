// Main navigation & search functionality
document.addEventListener('DOMContentLoaded', function() {
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
