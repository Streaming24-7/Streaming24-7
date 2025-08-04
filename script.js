// Datos de productos
const productos = [
  {
    id: 1,
    nombre: "Netflix",
    precio: 7500,
    stock: 10,
    imagen: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  },
  {
    id: 2,
    nombre: "Amazon Prime",
    precio: 5000,
    stock: 8,
    imagen: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.svg"
  }
];

// Variables carrito
let carrito = [];

// Referencias DOM
const productGrid = document.getElementById("product-grid");
const carritoModal = document.getElementById("carrito-modal");
const carritoItems = document.getElementById("carrito-items");
const totalEl = document.getElementById("total");
const carritoBtn = document.getElementById("carrito-btn");
const closeCarritoBtn = document.getElementById("close-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Función para mostrar productos
function mostrarProductos() {
  productGrid.innerHTML = "";
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toLocaleString()}</p>
      <p>Stock: ${producto.stock}</p>
      <button class="btn" onclick="agregarAlCarrito(${producto.id})" ${producto.stock === 0 ? 'disabled' : ''}>
        ${producto.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
      </button>
    `;
    productGrid.appendChild(card);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto || producto.stock === 0) return;

  const itemCarrito = carrito.find(item => item.id === id);

  if (itemCarrito) {
    if (itemCarrito.cantidad < producto.stock) {
      itemCarrito.cantidad++;
    } else {
      alert("No hay más stock disponible de este producto");
      return;
    }
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
  }

  mostrarCarrito();
}

// Mostrar carrito en modal
function mostrarCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${item.nombre}</strong> x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}
      <button onclick="eliminarDelCarrito(${item.id})" style="float:right;background:red;color:white;border:none;border-radius:3px;cursor:pointer;">X</button>
    `;
    carritoItems.appendChild(div);
  });

  totalEl.textContent = `Total: $${total.toLocaleString()}`;
  carritoModal.style.display = "block";
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  mostrarCarrito();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});

// Abrir carrito
carritoBtn.addEventListener("click", e => {
  e.preventDefault();
  mostrarCarrito();
});

// Cerrar modal
closeCarritoBtn.addEventListener("click", () => {
  carritoModal.style.display = "none";
});

// Cerrar modal clic afuera
window.addEventListener("click", e => {
  if (e.target === carritoModal) {
    carritoModal.style.display = "none";
  }
});

// Inicializar
mostrarProductos();
