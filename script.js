const products = [
  {
    id: 1,
    name: "سترة كاجوال أسود",
    category: "casual",
    price: 299,
    oldPrice: 399,
    badge: "الأكثر مبيعاً",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "قميص أنيق رياضي",
    category: "casual",
    price: 199,
    oldPrice: 249,
    badge: "مميز",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "بدلة رسمية سوداء",
    category: "formal",
    price: 699,
    oldPrice: 899,
    badge: "خصم 22%",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "ساعة فاخرة",
    category: "accessories",
    price: 399,
    oldPrice: 499,
    badge: "جديد",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "جاكيت خفيف",
    category: "casual",
    price: 329,
    oldPrice: 429,
    badge: "إصدار جديد",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "قميص رسمي كلاسيكي",
    category: "formal",
    price: 249,
    oldPrice: 329,
    badge: "قليل المتبقي",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "حزام أنيق",
    category: "accessories",
    price: 99,
    oldPrice: 149,
    badge: "مميز",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "بنطلون فخم",
    category: "formal",
    price: 259,
    oldPrice: 349,
    badge: "خاص",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  },
];

const cart = [];

const productsGrid = document.getElementById("products-grid");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const cartDrawer = document.getElementById("cart-drawer");

function renderProducts(filter = "all") {
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" />
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="product-info">
            <div class="product-meta">
              <span>${product.category === "casual" ? "يومية" : product.category === "formal" ? "رسمية" : "إكسسوارات"}</span>
              <span>★★★★★</span>
            </div>
            <h3>${product.name}</h3>
            <div class="product-price-row">
              <div>
                <div class="product-price">${product.price} ر.س</div>
                <div class="product-oldprice">${product.oldPrice} ر.س</div>
              </div>
              <button class="add-to-cart" data-id="${product.id}" aria-label="إضافة ${product.name} إلى السلة">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 9V5h2v4h4v2h-4v4h-2v-4H7V9h4zm-7 9a2 2 0 110 4 2 2 0 010-4zm10 0a2 2 0 110 4 2 2 0 010-4zM6.2 6h13.26l-1.82 8.02a2 2 0 01-1.97 1.57H9.14a2 2 0 01-1.98-1.53L5.14 4.6H2V2h4l.36 1.8H20a1 1 0 011 1v1H6.2z"/></svg>
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  bindAddToCartButtons();
}

function bindAddToCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      addToCart(productId);
    });
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  cartDrawer.classList.add("open");
}

function updateQty(productId, change) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.findIndex((entry) => entry.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems;

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalEl.textContent = `${totalPrice.toFixed(2)} ر.س`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty-cart">سلة التسوق فارغة الآن.</div>';
    return;
  }

  cartItemsEl.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <div class="cart-item-top">
              <h4>${item.name}</h4>
              <span class="cart-item-price">${item.price} ر.س</span>
            </div>
            <div class="qty-control">
              <button data-action="minus" data-id="${item.id}" aria-label="تقليل الكمية">−</button>
              <span>${item.quantity}</span>
              <button data-action="plus" data-id="${item.id}" aria-label="زيادة الكمية">+</button>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      const action = button.dataset.action;
      updateQty(productId, action === "plus" ? 1 : -1);
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelector(".cart-button").addEventListener("click", () => {
  cartDrawer.classList.toggle("open");
});

document.querySelector(".close-cart").addEventListener("click", () => {
  cartDrawer.classList.remove("open");
});

renderProducts();
renderCart();

window.addEventListener("click", (event) => {
  if (
    cartDrawer.classList.contains("open") &&
    !cartDrawer.contains(event.target) &&
    !event.target.closest(".cart-button")
  ) {
    cartDrawer.classList.remove("open");
  }
});

