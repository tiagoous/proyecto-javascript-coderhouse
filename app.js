// Variables globales
const carrito = [];
let totalCarrito = 0;

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, imagen, precio) {
    // Crear objeto de producto
    const producto = {
        nombre: nombre,
        imagen: imagen,
        precio: precio
    };

    // Agregar producto al carrito
    carrito.push(producto);

    // Actualizar el total del carrito
    totalCarrito += precio;

    // Mostrar el carrito en la interfaz
    mostrarCarrito();
}

// Función para mostrar el carrito en la interfaz
function mostrarCarrito() {
    const carritoBody = document.getElementById('carrito-body');
    carritoBody.innerHTML = '';

    carrito.forEach((producto) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td class="color__precio">$${producto.precio}</td>
        `;
        carritoBody.appendChild(row);
    });
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length > 0) {
        alert(`Gracias por comprar nuestros productos. El total es: $${totalCarrito}`);
    } else {
        alert('Tu carrito está vacío. Agrega un producto para finalizar la compra.');
    }
}