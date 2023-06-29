// Variables globales
const carrito = [];
let totalCarrito = 0;
let nombreUsuario = "";

// Solicitar nombre de usuario y localidad de envío al inicio
nombreUsuario = prompt("Hola, cual es tu nombre?");

const envioPorLocalidad = {
    "Carmen de Patagones": 200,
    "Viedma": 300,
    "San Antonio Oeste": 800,
    "Las Grutas": 800,
    "Stroeder": 500,
    "Bahía Blanca": 1000,
};

const localidades = Object.keys(envioPorLocalidad);
let opcionLocalidad = parseInt(prompt(
    "Elige la localidad de envío:\n" +
    localidades.map((localidad, index) => `${index + 1}. ${localidad}`).join("\n")
));

let envioLocalidad;
if (opcionLocalidad >= 1 && opcionLocalidad <= localidades.length) {
    envioLocalidad = localidades[opcionLocalidad - 1];
} else {
    envioLocalidad = "Localidad desconocida";
}

alert(`Hola, ${nombreUsuario}! Bienvenido a nuestra tienda. Podes empezar a agregar productos al carrito.`);

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, imagen, precio, cantidad) {
    const productoExistente = carrito.find((producto) => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, imagen, precio, cantidad });
    }
    // Mostrar el carrito en la interfaz
    mostrarCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoBody = document.getElementById("carrito-body");
    const totalCarritoElement = document.getElementById("total-carrito");
    carritoBody.innerHTML = "";

    let montoTotal = 0;

    carrito.forEach((producto) => {
        const { nombre, imagen, precio, cantidad } = producto;
        const precioTotal = precio * cantidad;
        montoTotal += precioTotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${imagen}" alt="${nombre}" width="50"></td>
            <td>${nombre}</td>
            <td class="color__precio">$${precio}</td>
            <td>${cantidad}</td>
    `;

        carritoBody.appendChild(fila);
    });

    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
    <td colspan="2"></td>
    <td><strong>Total:</strong></td>
    <td class="color__precio">$${montoTotal}</td>
    `;

    carritoBody.appendChild(filaTotal);

    // Mostrar el total del carrito y el costo de envío
    const costoEnvio = envioPorLocalidad[envioLocalidad];
    const montoTotalConEnvio = montoTotal + costoEnvio;
    totalCarritoElement.innerHTML = `
    <p><strong>Costo de envío a ${envioLocalidad}:</strong> $${costoEnvio}</p>
    <p><strong>El total con el envio es de: </strong>$${montoTotalConEnvio}</p>
    `;
}

// Función para finalizar la compra
function finalizarCompra() {
    const costoEnvio = envioPorLocalidad[envioLocalidad];
    const montoTotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    const montoTotalConEnvio = montoTotal + costoEnvio;

    if (carrito.length > 0) {
        alert(`¡Gracias ${nombreUsuario} por comprar en nuestra tienda!` +
            `  El total de tu compra es de: $${montoTotal}\n` + 
            ` y el envío a ${envioLocalidad} es de: $${costoEnvio}\n` + 
            `Todo seria ${montoTotalConEnvio} `
            );
    }
    else {
        alert('Tu carrito está vacío. Agrega un producto para finalizar la compra.');
    }
}
