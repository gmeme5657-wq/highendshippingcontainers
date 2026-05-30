/* Both emails receive orders via Gmail forwarding. Main = highendshippingcontainers@gmail.com
   Formspree form is configured to send to: highendshippingcontainers@gmail.com (set in Formspree dashboard) */

// Formspree endpoint — sends contact/quote submissions to highendshippingcontainers@gmail.com
const FORMSPREE_URL = "https://formspree.io/f/xppgntuy";
// WhatsApp number for instant chat (no leading +)
const YOUR_WHATSAPP = "61480089621"; // From +61 480089621

function showFormMessage(message, isError = false) {
  let msgBox = document.getElementById('formMsg');
  if (!msgBox) {
    msgBox = document.createElement('div');
    msgBox.id = 'formMsg';
    msgBox.style.marginTop = '10px';
    msgBox.style.display = 'block';
    document.body.appendChild(msgBox);
  }
  msgBox.style.display = 'block';
  msgBox.style.color = isError ? 'red' : 'green';
  msgBox.textContent = message;
  setTimeout(() => {
    msgBox.style.display = 'none';
  }, 5000);
}

function handleForm(formId, type) {
  const form = document.getElementById(formId);
  if (!form || form.dataset.handlerAttached === 'true') {
    return;
  }
  form.dataset.handlerAttached = 'true';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    let message = '';

    if (type === 'contact') {
      message = `New Contact from HighendContainers\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nMessage: ${data.get('message')}`;
    } else {
      const qty = Number(data.get('qty')) || 1;
      const price = parseFloat(data.get('price')) || 0;
      const total = data.get('total') ? parseFloat(data.get('total')) : price * qty;
      data.set('total', total.toFixed(2));
      message = `New Quote Request from HighendContainers\nProduct: ${data.get('product')}\nQty: ${qty}\nTotal: $${total.toFixed(2)}\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}`;
    }

    try {
      if (!FORMSPREE_URL.includes('YOUR_FORM_ID')) {
        await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
      } else {
        console.warn('Formspree URL is not configured. Replace YOUR_FORM_ID with your actual ID.');
      }
    } catch (err) {
      console.log('Email send error', err);
    }

    const waLink = `https://wa.me/${YOUR_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');

    showFormMessage('Sent! Check WhatsApp to continue the conversation.');
    form.reset();

    if (type === 'checkout') {
      populateCheckoutForm();
    }
  });
}

function populateCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form || !window.cart) return;

  const productField = form.querySelector('#cartProduct');
  const priceField = form.querySelector('#cartPrice');
  const totalField = form.querySelector('#cartTotal');
  const qtyField = form.querySelector('#cartQty');

  const productSummary = window.cart.cart
    .map(item => `${item.name} x${item.quantity}`)
    .join(', ');
  const totalAmount = window.cart.getTotal();
  const quantity = window.cart.cart.reduce((sum, item) => sum + item.quantity, 0) || 1;

  if (productField) productField.value = productSummary || 'Cart items';
  if (priceField) priceField.value = totalAmount.toFixed(2);
  if (totalField) totalField.value = totalAmount.toFixed(2);
  if (qtyField) qtyField.value = quantity;
}

function initializeForms() {
  if (document.getElementById('contactForm')) {
    handleForm('contactForm', 'contact');
  }

  if (document.getElementById('checkoutForm')) {
    populateCheckoutForm();
    handleForm('checkoutForm', 'checkout');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initializeForms();
});

document.addEventListener('cart:rendered', function () {
  initializeForms();
});
