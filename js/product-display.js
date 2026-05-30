// Product display functionality
class ProductDisplay {
  constructor() {
    this.products = [];
    this.ready = this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await fetch('data/products.json');
      this.products = await response.json();
      this.displayNewArrivals();
      this.displayFeaturedProducts();
      this.displayCategoryHighlights();
      document.dispatchEvent(new CustomEvent('products:loaded', { detail: this.products }));
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  displayNewArrivals() {
    const container = document.getElementById('newArrivals');
    if (!container) return;

    const newProducts = this.pickOnePerCategory(this.products.filter(p => p.newArrival && p.images?.[0]), 8);
    container.innerHTML = newProducts.map(product => this.createProductCard(product)).join('');
  }

  displayFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const preferredCategories = [
      '20ft-containers',
      '40ft-containers',
      'refrigerated-containers',
      'container-pools',
      'modular-buildings',
      'site-cabins-offices',
      'flat-pack-cabins',
      'toilet-utility-units'
    ];
    const featured = preferredCategories
      .map(slug => this.products.find(p => p.categorySlug === slug && p.images?.[0]))
      .filter(Boolean);
    container.innerHTML = featured.map(product => this.createProductCard(product)).join('');
  }

  displayCategoryHighlights() {
    const categoryBoxes = document.querySelectorAll('[data-category-slug]');
    if (!categoryBoxes.length) return;

    categoryBoxes.forEach(box => {
      const product = this.products.find(p => p.categorySlug === box.dataset.categorySlug && p.images?.[0]);
      const image = box.querySelector('.category-box__image');
      if (product && image) {
        image.src = product.images[0];
        image.alt = product.category;
      }
    });
  }

  pickOnePerCategory(products, limit) {
    const picked = [];
    const seen = new Set();

    products.forEach(product => {
      if (!seen.has(product.categorySlug)) {
        picked.push(product);
        seen.add(product.categorySlug);
      }
    });

    if (picked.length < limit) {
      this.products.forEach(product => {
        if (picked.length >= limit) return;
        if (!seen.has(product.categorySlug) && product.images?.[0]) {
          picked.push(product);
          seen.add(product.categorySlug);
        }
      });
    }

    return picked.slice(0, limit);
  }

  displayAllProducts(container, filters = {}) {
    let filtered = this.products;

    if (filters.category) {
      filtered = filtered.filter(p => p.categorySlug === filters.category);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="product-grid__empty"><div class="product-grid__empty-icon">📦</div><h3>No products found</h3></div>';
      return;
    }

    container.innerHTML = filtered.map(product => this.createProductCard(product)).join('');
  }

  createProductCard(product) {
    const stars = this.createStars(product.rating || 4);
    const image = product.images?.[0] || 'https://cdn.shopify.com/s/files/1/0699/7688/3279/files/353-20ft-Used-Container-960x640-1-600x400-1.jpg?v=1773684567';
    const hoverImage = product.images?.[1];
    const priceLabel = product.price > 0 ? `$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Contact for price';
    const canAddToCart = product.inStock && product.price > 0;
    const name = this.escapeHtml(product.name);
    const category = this.escapeHtml(product.category);
    const productUrl = `/product.html?id=${encodeURIComponent(product.id)}`;

    return `
      <div class="product-card ${!product.inStock ? 'product-card--out-of-stock' : ''}" data-product data-product-id="${product.id}" data-product-name="${name}" data-product-price="${product.price}" data-product-image="${image}">
        <div class="product-card__badges">
          ${product.onSale ? '<span class="product-card__badge product-card__badge--sale">Sale</span>' : ''}
          ${product.newArrival ? '<span class="product-card__badge product-card__badge--new">New</span>' : ''}
          ${product.featured ? '<span class="product-card__badge product-card__badge--featured">Featured</span>' : ''}
        </div>
        <a class="product-card__image-wrapper" href="${productUrl}" aria-label="View details for ${name}">
          <img src="${image}" alt="${name}" class="product-card__image">
          ${hoverImage ? `<img src="${hoverImage}" alt="${name}" class="product-card__image--hover">` : ''}
          <span class="product-card__actions">
            <span class="product-card__action-btn" title="Quick View" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </span>
            <span class="product-card__action-btn" title="Add to Wishlist" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </span>
          </span>
        </a>
        <div class="product-card__content">
          <span class="product-card__category">${category}</span>
          <h3 class="product-card__name"><a href="${productUrl}">${name}</a></h3>
          <div class="product-card__rating">
            <div class="product-card__stars">${stars}</div>
            <span class="product-card__rating-count">(${product.reviews || 0})</span>
          </div>
          <div class="product-card__price">
            <span class="product-card__current-price">${priceLabel}</span>
            ${product.originalPrice ? `<span class="product-card__original-price">$${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>` : ''}
          </div>
          <button class="product-card__add-cart" ${!canAddToCart ? 'disabled' : ''}>
            ${!product.inStock ? 'Out of Stock' : product.price > 0 ? 'Add to Cart' : 'Contact Us'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  createStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<svg class="product-card__star ${i <= Math.floor(rating) ? '' : 'product-card__star--empty'}" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`;
    }
    return html;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

const productDisplay = new ProductDisplay();
window.productDisplay = productDisplay;

document.addEventListener('DOMContentLoaded', function() {
  // Handle search
  const searchInput = document.querySelector('.search-overlay__input');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const query = this.value;
        window.location.href = `/shop.html?search=${encodeURIComponent(query)}`;
      }
    });
  }

  document.addEventListener('click', function(e) {
    const card = e.target.closest('.product-card[data-product]');
    if (!card || e.target.closest('a, button')) return;
    window.location.href = `/product.html?id=${encodeURIComponent(card.dataset.productId)}`;
  });
});
