const products = [
  {
    id: 1,
    name: "Netflix Premium",
    price: 3500,
    originalPrice: 8000,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    id: 2,
    name: "Prime Video",
    price: 4200,
    originalPrice: 7000,
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
  },
  {
    id: 3,
    name: "Disney+ Premium",
    price: 5500,
    originalPrice: 8000,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  },
];

const productsContainer = document.getElementById("products");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const emptyCartMessage = document.getElementById("empty-cart");
const clearCartBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p><del>$${product.originalPrice.toLocaleString()}</del> $${product.price.toLocaleString()}</p>
      <button class="btn" onclick="addToCart(${product.id})">Comprar ahora</button>
    `;
    productsContainer.appendChild(card);
  });
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartTotal.style.display = "none";
    clearCartBtn.style.display = "none";
    return;
  }

  emptyCartMessage.style.display = "none";
  cartTotal.style.display = "block";
  clearCartBtn.style.display = "inline-block";

  let total = 0;
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    total += product.price * item.quantity;

    const li = document.createElement("li");
    li.textContent = `${product.name} x ${item.quantity} - $${(
      product.price * item.quantity
    ).toLocaleString()}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.className = "btn";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromCart(product.id);

    li.appendChild(removeBtn);
    cartItemsContainer.appendChild(li);
  });

  cartTotal.textContent = `Total: $${total.toLocaleString()}`;
  saveCart();
}

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
