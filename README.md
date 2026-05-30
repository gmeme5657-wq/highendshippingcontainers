# Highend Shipping Containers - Premium E-Commerce Website

A fully-featured, premium e-commerce website for Highend Shipping Containers built with HTML, CSS, and JavaScript.

## ✨ Features

### Pages
- **Homepage** (`index.html`) - Hero section, featured products, categories, testimonials, newsletter signup
- **Shop** (`shop.html`) - Product grid with filtering, sorting, and pagination
- **Product Detail** - Individual product pages with galleries and related products
- **Shopping Cart** (`cart.html`) - Full cart management with quantity controls
- **About Us** (`about.html`) - Company story, values, and statistics
- **Contact** (`contact.html`) - Contact form and business information
- **Policies** - Privacy, Shipping, Returns, and Terms of Service

### Technical Features
- **Responsive Design** - Mobile-first, optimized for all screen sizes
- **Shopping Cart** - LocalStorage-based cart system with persistent data
- **Product Display** - Dynamic product rendering from JSON data
- **Search Functionality** - Full-text search across products
- **Mobile Navigation** - Hamburger menu with dropdown support
- **Premium Styling** - Modern design with smooth animations and transitions
- **Accessibility** - Semantic HTML, proper contrast ratios, keyboard navigation

## 📂 Project Structure

```
containersite/
├── index.html                 # Homepage
├── shop.html                  # Product listing
├── cart.html                  # Shopping cart
├── about.html                 # About page
├── contact.html               # Contact page
├── policies/
│   ├── privacy.html           # Privacy policy
│   ├── shipping.html          # Shipping policy
│   ├── returns.html           # Returns & refunds
│   └── terms.html             # Terms of service
├── css/
│   ├── style.css              # Main stylesheet
│   ├── variables.css          # CSS custom properties
│   ├── reset.css              # CSS reset & base styles
│   └── components/
│       ├── navbar.css         # Navigation styling
│       ├── topbar.css         # Top bar styling
│       ├── hero.css           # Hero section
│       ├── product-card.css   # Product card component
│       ├── product-grid.css   # Grid layout
│       ├── buttons.css        # Button styles
│       ├── forms.css          # Form elements
│       ├── sidebar.css        # Sidebar filtering
│       ├── footer.css         # Footer styling
│       └── cart.css           # Cart styling
├── js/
│   ├── main.js                # Navigation and search
│   ├── cart.js                # Shopping cart logic
│   └── product-display.js     # Product rendering
└── data/
    └── products.json          # Product database
```

## 🎨 Design System

### Color Palette
- **Primary**: #1a3a5c (Deep Navy)
- **Accent**: #e85d04 (Burnt Orange)
- **Dark**: #111827
- **Light**: #f3f4f6
- **White**: #ffffff

### Typography
- **Headings**: Oswald (Bold, Uppercase)
- **Body**: Source Sans 3 (Clean, Readable)

### Spacing Scale
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, etc.

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE
- Live Server extension (optional, for local development)

### Installation

1. Clone or download the project
2. Navigate to the `containersite` directory
3. Open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Or use VS Code Live Server extension
```

4. Visit `http://localhost:8000` in your browser

## 💻 Usage

### Adding Products
Edit `data/products.json` to add, remove, or modify products:

```json
{
  "id": "1001",
  "name": "Product Name",
  "category": "Category Name",
  "price": 2500.00,
  "originalPrice": 3200.00,
  "onSale": true,
  "images": ["image-url-1", "image-url-2"],
  "description": "Product description",
  "rating": 4.5,
  "reviews": 12
}
```

### Shopping Cart
The cart uses browser's LocalStorage and maintains state across page reloads.

```javascript
// Add to cart
cart.addItem(product);

// Update quantity
cart.updateQuantity(productId, newQuantity);

// Remove item
cart.removeItem(productId);

// Get total
const total = cart.getTotal();
```

### Navigation
- Top navigation includes dropdown menus for categories
- Mobile menu toggles on screens under 1024px
- Search overlay opens with Ctrl+K or search button

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🔧 Customization

### Change Company Name
1. Edit `index.html` - replace "Highend Shipping Containers" with your name
2. Update `data/products.json` if needed
3. Modify email/phone in footer sections

### Modify Colors
Edit `css/variables.css`:

```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-color;
  /* ... */
}
```

### Add New Pages
1. Create new HTML file
2. Copy header/footer structure from existing pages
3. Link in navigation menu

## 📊 Product Categories (Built-in)

- 20 FT Shipping Containers
- 40 FT Shipping Containers
- 10 FT Containers
- Steel Cabins for Sale
- Flat Pack Cabins
- Jackleg Cabins
- Toilet & Shower Blocks
- Modular Buildings
- Refrigerated Containers
- Accessories

## ✅ Testing Checklist

- [ ] Homepage loads correctly
- [ ] Products display properly
- [ ] Add to cart works
- [ ] Cart page functions
- [ ] Navigation menus work
- [ ] Mobile menu responsive
- [ ] Forms submit without errors
- [ ] Links work (internal and external)
- [ ] Images load correctly
- [ ] Filtering and sorting work
- [ ] Contact form validation works

## 🎯 Future Enhancements

- Backend integration for product database
- Payment gateway integration (Stripe, PayPal)
- User accounts and login system
- Order tracking
- Email notifications
- Admin dashboard
- Advanced filtering options
- Product reviews and ratings
- Wishlist functionality

## 📝 License

This website template is provided as-is for use by Highend Shipping Containers.

## 📞 Support

For questions or issues:
- Email: support@highendshippingcontainers.com
- Phone: +1 (872) 367-3942
- Business Hours: Mon-Fri, 8AM-5PM

---

**Built with ❤️ for Highend Shipping Containers**
