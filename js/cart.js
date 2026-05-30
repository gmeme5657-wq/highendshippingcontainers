// Shopping cart functionality
class ShoppingCart {
  constructor() {
    this.storageKey = 'highendShippingContainers_cart';
    this.cart = this.loadCart();
    this.updateCartCount();
  }

  loadCart() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    this.updateCartCount();
    this.renderCartPage();
  }

  addItem(product) {
    const quantity = product.quantity || 1;
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity
      });
    }
    this.saveCart();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.header__cart-count').forEach(el => {
      el.textContent = count;
      el.setAttribute('data-count', count);
    });
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--color-success);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  formatPrice(amount) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 2
    }).format(amount);
  }

  createCartRow(item) {
    return `
      <tr class="cart-table__row" data-cart-item-id="${item.id}">
        <td class="cart-table__td">
          <div class="cart-table__product">
            <div class="cart-table__product-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-table__product-info">
              <div class="cart-table__product-name">${item.name}</div>
              <div class="cart-table__product-meta">Unit price: ${this.formatPrice(item.price)}</div>
            </div>
          </div>
        </td>
        <td class="cart-table__td cart-table__td--quantity">
          <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-product-id="${item.id}">
        </td>
        <td class="cart-table__td cart-table__td--total">${this.formatPrice(item.price * item.quantity)}</td>
        <td class="cart-table__td cart-table__td--remove">
          <button class="cart-item-remove" type="button" data-product-id="${item.id}" aria-label="Remove item">Remove</button>
        </td>
      </tr>
    `;
  }

  renderCartPage() {
    const container = document.querySelector('.cart-page');
    if (!container) return;

    if (!this.cart.length) {
      container.innerHTML = `
        <div class="cart-empty">
          <h2>Your cart is ready for containers.</h2>
          <p>Browse available units and add products to request checkout support.</p>
          <a href="/shop.html" class="btn btn--primary">Continue Shopping</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="cart-page__content">
        <table class="cart-table">
          <thead class="cart-table__header">
            <tr>
              <th class="cart-table__th">Product</th>
              <th class="cart-table__th cart-table__th--center">Price</th>
              <th class="cart-table__th cart-table__th--center">Quantity</th>
              <th class="cart-table__th cart-table__th--center">Total</th>
              <th class="cart-table__th cart-table__th--center">Remove</th>
            </tr>
          </thead>
          <tbody>
            ${this.cart.map(item => this.createCartRow(item)).join('')}
          </tbody>
        </table>
        <aside class="cart-totals">
          <h2 class="cart-totals__title">Order Summary</h2>
          <div class="cart-totals__row"><span class="cart-totals__label">Subtotal</span><span class="cart-totals__value">${this.formatPrice(this.getTotal())}</span></div>
          <div class="cart-totals__row cart-totals__row--total"><span class="cart-totals__label">Total</span><span class="cart-totals__value">${this.formatPrice(this.getTotal())}</span></div>
          <form id="checkoutForm" class="checkout-form">
            <input type="hidden" name="product" id="cartProduct" value="">
            <input type="hidden" name="price" id="cartPrice" value="${this.getTotal().toFixed(2)}">
            <input type="hidden" name="total" id="cartTotal" value="${this.getTotal().toFixed(2)}">
            <div class="form-group"><label class="form-group__label" for="cartQty">Quantity</label><input class="form-control" type="number" name="qty" id="cartQty" min="1" value="1" placeholder="Quantity" required></div>
            <div class="form-group"><label class="form-group__label" for="checkoutName">Full Name</label><input class="form-control" type="text" name="name" id="checkoutName" placeholder="Full Name" required></div>
            <div class="form-group"><label class="form-group__label" for="checkoutEmail">Email</label><input class="form-control" type="email" name="email" id="checkoutEmail" placeholder="Email" required></div>
            <div class="form-group"><label class="form-group__label" for="checkoutPhone">Phone</label><input class="form-control" type="tel" name="phone" id="checkoutPhone" placeholder="WhatsApp Number" required></div>
            <button class="btn btn--primary btn--full" type="submit">Send Quote Request</button>
          </form>
        </aside>
      </div>
    `;
    document.dispatchEvent(new Event('cart:rendered'));
  }

  clear() {
    this.cart = [];
    this.saveCart();
  }
}

const cart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', function() {
  cart.renderCartPage();

  document.addEventListener('click', function(e) {
    if (e.target.closest('.product-card__add-cart')) {
      const productCard = e.target.closest('[data-product]');
      if (productCard) {
        const productId = productCard.getAttribute('data-product-id');
        const productName = productCard.getAttribute('data-product-name');
        const productPrice = parseFloat(productCard.getAttribute('data-product-price'));
        const productImage = productCard.getAttribute('data-product-image');

        cart.addItem({
          id: productId,
          name: productName,
          price: productPrice,
          images: [productImage]
        });
      }
    }

    if (e.target.closest('.cart-item-remove')) {
      const productId = e.target.closest('.cart-item-remove').dataset.productId;
      if (productId) {
        cart.removeItem(productId);
      }
    }
  });

  document.addEventListener('change', function(e) {
    if (e.target.matches('.cart-item-quantity')) {
      const productId = e.target.dataset.productId;
      const quantity = Number(e.target.value);
      if (productId && quantity > 0) {
        cart.updateQuantity(productId, quantity);
      }
    }
  });
});
