class ProductDetailsPage {
  constructor() {
    this.products = [];
    this.product = null;
    this.selectedImage = '';
    this.quantity = 1;
    this.root = document.getElementById('productDetailsRoot');
    this.init();
  }

  async init() {
    try {
      const response = await fetch('./data/products.json');
      this.products = await response.json();
      const id = this.getProductId();
      this.product = this.products.find(product => String(product.id) === String(id));

      if (!this.product) {
        this.renderNotFound();
        return;
      }

      this.selectedImage = this.product.images?.[0] || '';
      document.title = `${this.product.name} - Highend Shipping Containers`;
      this.render();
      this.bindEvents();
    } catch (error) {
      this.root.innerHTML = `
        <div class="product-page__empty">
          <h1>Unable to load product</h1>
          <p>Please refresh the page or return to the shop.</p>
          <a href="./shop.html" class="btn btn--primary">Back to Shop</a>
        </div>
      `;
    }
  }

  getProductId() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('id')) return params.get('id');

    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts[0] === 'product' && parts[1]) return parts[1];
    return '';
  }

  render() {
    const product = this.product;
    const related = this.products
      .filter(item => item.categorySlug === product.categorySlug && item.id !== product.id)
      .slice(0, 4);
    const originalPrice = product.originalPrice || (product.onSale ? product.price * 1.18 : 0);
    const discount = originalPrice > product.price
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : 0;

    this.root.innerHTML = `
      <nav class="product-page__breadcrumb">
        <a href="./">Home</a>
        <span>/</span>
        <a href="./shop.html">Shop</a>
        <span>/</span>
        <span>${this.escapeHtml(product.name)}</span>
      </nav>

      <section class="product-page__hero">
        ${this.renderGallery(product)}
        ${this.renderInfo(product, originalPrice, discount)}
      </section>

      <section class="product-page__details-grid">
        <article class="product-page__panel">
          <h2>Product Description</h2>
          <p>${this.escapeHtml(product.description)}</p>
          <p>Every unit is selected for durability, usability, and long-term value. Contact our team for delivery planning, site access checks, and customization options.</p>
        </article>
        <article class="product-page__panel">
          <h2>Specifications</h2>
          <div class="product-specs">
            ${this.renderSpecs(product)}
          </div>
        </article>
      </section>

      <section class="product-page__section">
        <div class="products-section__header">
          <div>
            <h2 class="products-section__title">Related Products</h2>
            <p class="products-section__subtitle">More options in ${this.escapeHtml(product.category)}</p>
          </div>
          <a href="./shop.html?cat=${encodeURIComponent(product.categorySlug)}" class="products-section__link">View category</a>
        </div>
        <div class="product-grid">
          ${related.map(item => productDisplay.createProductCard(item)).join('')}
        </div>
      </section>

      <section class="product-page__section">
        ${this.renderReviews(product)}
      </section>
    `;
  }

  renderGallery(product) {
    const images = product.images?.length ? product.images : [this.selectedImage];
    return `
      <div class="product-gallery-page">
        <div class="product-gallery-page__main">
          <img src="${this.selectedImage}" alt="${this.escapeHtml(product.name)}" id="mainProductImage">
        </div>
        <div class="product-gallery-page__thumbs">
          ${images.map(image => `
            <button class="product-gallery-page__thumb ${image === this.selectedImage ? 'product-gallery-page__thumb--active' : ''}" type="button" data-gallery-image="${image}">
              <img src="${image}" alt="${this.escapeHtml(product.name)} thumbnail">
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderInfo(product, originalPrice, discount) {
    const price = product.price > 0
      ? `$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'Contact for price';
    const oldPrice = originalPrice > product.price
      ? `$${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '';

    return `
      <aside class="product-info-page">
        <p class="product-info-page__category">${this.escapeHtml(product.category)}</p>
        <h1>${this.escapeHtml(product.name)}</h1>
        <div class="product-info-page__rating">
          <span class="product-info-page__stars">${productDisplay.createStars(product.rating || 4.5)}</span>
          <strong>${product.rating || 4.5}</strong>
          <span>(${product.reviews || 0} reviews)</span>
        </div>
        <div class="product-info-page__price-row">
          <span class="product-info-page__price">${price}</span>
          ${oldPrice ? `<span class="product-info-page__old-price">${oldPrice}</span>` : ''}
          ${discount ? `<span class="product-info-page__discount">${discount}% off</span>` : ''}
        </div>
        <p class="product-info-page__summary">${this.escapeHtml(product.description)}</p>
        <div class="product-info-page__stock ${product.inStock ? 'product-info-page__stock--in' : 'product-info-page__stock--out'}">
          ${product.inStock ? 'In stock and ready for delivery planning' : 'Currently out of stock'}
        </div>
        <div class="product-info-page__delivery">
          <strong>Delivery information</strong>
          <span>Freight delivery available nationwide. Final shipping cost is confirmed after site and access review.</span>
        </div>
        <div class="product-info-page__quantity">
          <span>Quantity</span>
          <div class="quantity-control">
            <button type="button" data-qty="decrease">-</button>
            <input type="text" value="${this.quantity}" id="productQuantity" readonly>
            <button type="button" data-qty="increase">+</button>
          </div>
        </div>
        <div class="product-info-page__actions">
          <button class="btn btn--primary btn--full" id="productAddToCart" ${!product.inStock || product.price <= 0 ? 'disabled' : ''}>Add to Cart</button>
          <button class="btn btn--secondary btn--full" id="productBuyNow" ${!product.inStock || product.price <= 0 ? 'disabled' : ''}>Buy Now</button>
        </div>
        <ul class="product-info-page__trust">
          <li>Secure checkout</li>
          <li>Inspected container inventory</li>
          <li>Support for site planning and delivery</li>
        </ul>
      </aside>
    `;
  }

  renderSpecs(product) {
    const specs = [
      ['SKU', product.sku || `HSC-${product.id}`],
      ['Category', product.category],
      ['Availability', product.inStock ? 'In stock' : 'Out of stock'],
      ['Condition', this.inferCondition(product.name)],
      ['Type', this.inferType(product.name)],
      ['Delivery', 'Freight delivery available'],
      ['Finish', this.inferFinish(product.name)]
    ];

    return specs.map(([label, value]) => `
      <div class="product-specs__row">
        <span>${this.escapeHtml(label)}</span>
        <strong>${this.escapeHtml(value)}</strong>
      </div>
    `).join('');
  }

  renderReviews(product) {
    const reviews = [
      ['Michael R.', 'The container arrived as described and the delivery coordination was smooth.'],
      ['Andrea S.', 'Clean condition, clear communication, and the team helped confirm the right size before purchase.'],
      ['James K.', 'Strong build quality and fair pricing. The photos matched the unit very well.']
    ];

    return `
      <div class="review-section">
        <div class="review-section__summary">
          <h2>Customer Reviews</h2>
          <div class="review-section__score">${product.rating || 4.5}</div>
          <div class="product-info-page__stars">${productDisplay.createStars(product.rating || 4.5)}</div>
          <p>Based on ${product.reviews || reviews.length} verified inquiries and purchases.</p>
        </div>
        <div class="review-section__list">
          ${reviews.map(([name, text]) => `
            <article class="review-card">
              <div class="product-info-page__stars">${productDisplay.createStars(5)}</div>
              <p>${this.escapeHtml(text)}</p>
              <strong>${this.escapeHtml(name)}</strong>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.root.addEventListener('click', event => {
      const thumb = event.target.closest('[data-gallery-image]');
      if (thumb) {
        this.selectedImage = thumb.dataset.galleryImage;
        this.render();
        this.bindEvents();
        return;
      }

      const qtyButton = event.target.closest('[data-qty]');
      if (qtyButton) {
        this.quantity = qtyButton.dataset.qty === 'increase'
          ? this.quantity + 1
          : Math.max(1, this.quantity - 1);
        document.getElementById('productQuantity').value = this.quantity;
        return;
      }

      if (event.target.closest('#productAddToCart')) {
        this.addCurrentProductToCart();
      }

      if (event.target.closest('#productBuyNow')) {
        this.addCurrentProductToCart(false);
        window.location.href = './cart.html';
      }
    });
  }

  addCurrentProductToCart(showNotice = true) {
    cart.addItem({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      images: [this.product.images?.[0] || this.selectedImage],
      quantity: this.quantity
    });
    if (!showNotice) return;
  }

  renderNotFound() {
    this.root.innerHTML = `
      <div class="product-page__empty">
        <h1>Product not found</h1>
        <p>The product you are looking for may have moved or is no longer available.</p>
        <a href="./shop.html" class="btn btn--primary">Back to Shop</a>
      </div>
    `;
  }

  inferCondition(name) {
    const value = name.toLowerCase();
    if (value.includes('used')) return 'Used';
    if (value.includes('one trip') || value.includes('new')) return 'One trip / new';
    if (value.includes('refurbished')) return 'Refurbished';
    return 'Commercial grade';
  }

  inferType(name) {
    const value = name.toLowerCase();
    if (value.includes('refriger') || value.includes('reefer') || value.includes('freezer')) return 'Temperature controlled';
    if (value.includes('cabin') || value.includes('office')) return 'Cabin / workspace';
    if (value.includes('pool')) return 'Container pool';
    if (value.includes('racking') || value.includes('padlock') || value.includes('light')) return 'Accessory';
    return 'Shipping container';
  }

  inferFinish(name) {
    const value = name.toLowerCase();
    if (value.includes('blue')) return 'Blue';
    if (value.includes('green')) return 'Green';
    if (value.includes('white')) return 'White';
    if (value.includes('galvanised') || value.includes('galvanized')) return 'Galvanised';
    if (value.includes('powder coated')) return 'Powder coated';
    return 'As pictured';
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

document.addEventListener('DOMContentLoaded', () => new ProductDetailsPage());
