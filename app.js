// Variables globales
const carrito = [];
let totalCarrito = 0;
let nombreUsuario = "";
let localidadEnvio = "";

// Solicitar nombre de usuario y localidad de envío al inicio
nombreUsuario = prompt("Hola, cual es tu nombre?");
localidadEnvio = prompt("A donde enviamos tu compra?");

alert(`Hola, ${nombreUsuario}! Bienvenido a nuestra tienda. Podes empezar a agregar productos al carrito.`);

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

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td class="color__precio">$${producto.precio}</td>
        `;
        carritoBody.appendChild(row);
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length > 0) {
        alert(`Gracias ${nombreUsuario} por comprar en nuestra tienda. El total es $${totalCarrito} y el envio a ${localidadEnvio} es de $1200`);
    } else {
        alert('Tu carrito está vacío. Agrega un producto para finalizar la compra.');
    }
}