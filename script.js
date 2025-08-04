// Datos productos streaming (Inicio)
const products = [
  {
    id: 1,
    name: "Netflix Premium",
    price: 3500,
    oldPrice: 8000,
    img: "netflix-logo.png",
  },
  {
    id: 2,
    name: "Prime Video",
    price: 4200,
    oldPrice: 7000,
    img: "prime-video-logo.png",
  },
  {
    id: 3,
    name: "Disney+ Premium",
    price: 5500,
    oldPrice: 8000,
    img: "disney-plus-logo.png",
  },
];

// Estado carrito
let cart = [];

// Función para mostrar productos en Inicio
function showInicio() {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <h2>Servicios disponibles</h2>
    <div class="product-grid">
      ${products
        .map(
          (p) => `
        <div class="product-card">
          <img src="${p.img}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p><del>$${p.oldPrice.toLocaleString()}</del> $${p.price.toLocaleString()}</p>
          <button class="btn" onclick="addToCart(${p.id})">Comprar ahora</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Agregar producto al carrito
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const found = cart.find((item) => item.id === id);

  if (found) {
    found.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  alert(`${product.name} agregado al carrito`);
}

// Mostrar carrito
function showCarrito() {
  const main = document.getElementById("main-content");
  if (cart.length === 0) {
    main.innerHTML = `
      <h2>Carrito de compras</h2>
      <p>No hay productos en el carrito.</p>
      <button class="btn" onclick="showInicio()">Volver a la tienda</button>
    `;
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  main.innerHTML = `
    <h2>Carrito de compras</h2>
    <ul>
      ${cart
        .map(
          (item) => `
        <li>
          ${item.name} - $${item.price.toLocaleString()} x ${item.quantity} = $${(
            item.price * item.quantity
          ).toLocaleString()}
          <button onclick="removeFromCart(${item.id})" style="margin-left: 10px;">Eliminar</button>
        </li>
      `
        )
        .join("")}
    </ul>
    <h3>Total: $${total.toLocaleString()}</h3>
    <button class="btn" onclick="emptyCart()">Vaciar carrito</button>
    <button class="btn" onclick="showInicio()">Seguir comprando</button>
  `;
}

// Remover producto carrito
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  showCarrito();
}

// Vaciar carrito
function emptyCart() {
  cart = [];
  showCarrito();
}

// Navegación
document.getElementById("nav-inicio").addEventListener("click", (e) => {
  e.preventDefault();
  showInicio();
});
document.getElementById("nav-carrito").addEventListener("click", (e) => {
  e.preventDefault();
  showCarrito();
});

// Inicializamos con Inicio
showInicio();
