// Variables globales
let carrito = [];
let totalCarrito = 0;
let nombreUsuario = "";
let opcionLocalidad = "";

// Traer carrito del local (si es que existe)
const carritoLocalStorage = localStorage.getItem("carrito");
if (carritoLocalStorage) {
    carrito = JSON.parse(carritoLocalStorage);
    mostrarCarrito();
}

// Traer data del DOM
const nombreUsuarioInput = document.getElementById("nombreUsuario");
const productosContainer = document.getElementById("productos");
const opcionLocalidadSelect = document.getElementById("opcionLocalidad");

// Cargar productos.JSON
fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
        const productos = data.productos;

        // Generar la lista de productos en el front-end
        productos.forEach((producto) => {
            const { nombre, imagen, precio, cantidad } = producto;

            const productoElement = document.createElement("div");
            productoElement.classList.add("producto");

            productoElement.innerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>Precio: $${precio}</p>
        <button class="btn shadow" onclick="agregarAlCarrito('${nombre}', '${imagen}', ${precio}, ${cantidad})">
            Agregar al carrito
        </button>
        `;

            productosContainer.appendChild(productoElement);
        });
    });

// Cargar localidades.JSON
fetch("localidades.json")
    .then((response) => response.json())
    .then((data) => {
        const localidades = data.localidades;

        // Rellenar el select con las localidades
        localidades.forEach((localidad) => {
            const option = document.createElement("option");
            option.value = localidad.nombre;
            option.textContent = localidad.nombre;
            opcionLocalidadSelect.appendChild(option);
        });
    });

opcionLocalidadSelect.addEventListener("change", () => {
    opcionLocalidad = opcionLocalidadSelect.value;
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, imagen, precio, cantidad) {
    const productoExistente = carrito.find((producto) => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, imagen, precio, cantidad });
    }

    // Guardar carrito en el local
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar el carrito
    mostrarCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoBody = document.getElementById("carrito-body");

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
}

// Función para finalizar la compra
function finalizarCompra() {
    if (!opcionLocalidad) {
        alert("Por favor, selecciona una localidad de envío.");
        return;
    }

    const envioPorLocalidad = {
        "Carmen de Patagones": 200,
        "Viedma": 300,
        "San Antonio Oeste": 800,
        "Las Grutas": 800,
        "Stroeder": 500,
        "Bahía Blanca": 1000,
    };

    const costoEnvio = envioPorLocalidad[opcionLocalidad];
    const montoTotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    const montoTotalConEnvio = montoTotal + costoEnvio;

    if (carrito.length > 0) {
        // const swalWithBootstrapButtons = Swal.mixin({
        //     customClass: {
        //         confirmButton: 'btn btn-success',
        //         cancelButton: 'btn btn-danger'
        //     },
        //     buttonsStyling: false
        // })

        // swalWithBootstrapButtons.fire({
        //     title: '¡Gracias ${nombreUsuario} por comprar en nuestra tienda!',
        //     text: "El total de tu compra es de: $${montoTotal}\n, el envío a ${opcionLocalidad} tiene un costo de: $${costoEnvio}\n, el monto total con envío es de: $${montoTotalConEnvio}... Desea finalizar la compra?",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'Si, ya tengo todo lo que quiero!',
        //     cancelButtonText: 'No, todavia me faltan productos!',
        //     reverseButtons: true
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         swalWithBootstrapButtons.fire(
        //             'Deleted!',
        //             'Your file has been deleted.',
        //             'success'
        //         )
        //     } else if (
        //         /* Read more about handling dismissals below */
        //         result.dismiss === Swal.DismissReason.cancel
        //     ) {
        //         swalWithBootstrapButtons.fire(
        //             'Cancelled',
        //             'Your imaginary file is safe :)',
        //             'error'
        //         )
        //     }
        // })

        alert(`¡Gracias ${nombreUsuario} por comprar en nuestra tienda!` +
            ` El total de tu compra es de: $${montoTotal}\n` +
            ` El envío a ${opcionLocalidad} tiene un costo de: $${costoEnvio}\n` +
            ` El monto total con envío es: $${montoTotalConEnvio}.`
        );
    } else {
        alert('Tu carrito está vacío. Agrega un producto para finalizar la compra.');
    }

    // Eliminar el carrito del local
    localStorage.removeItem("carrito");

    // Reiniciar el carrito y la interfaz
    carrito = [];
    mostrarCarrito();
}
