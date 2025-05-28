let cart = {};

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].quantity += 1;
  } else {
    cart[name] = { price, quantity: 1 };
  }
  updateCartDisplay();
}

function toggleCart() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  cartItems.innerHTML = '';
  let totalItems = 0;

  for (let item in cart) {
    const li = document.createElement('li');
    const quantity = cart[item].quantity;
    totalItems += quantity;

    li.innerHTML = `
      <span>${item} - $${cart[item].price.toFixed(2)}</span>
      <div class="quantity-controls">
        <button onclick="changeQuantity('${item}', -1)">−</button>
        <span>${quantity}</span>
        <button onclick="changeQuantity('${item}', 1)">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  }

  cartCount.textContent = totalItems;
}

function changeQuantity(item, delta) {
  if (!cart[item]) return;

  cart[item].quantity += delta;

  if (cart[item].quantity <= 0) {
    delete cart[item];
  }

  updateCartDisplay();
}