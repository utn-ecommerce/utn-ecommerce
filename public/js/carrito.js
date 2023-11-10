let carrito = [];
let contadorCarrito = document.getElementById('contador-carrito');
let carritoLista = document.getElementById('carritoLista');

function actualizarContadorCarrito() {
    contadorCarrito.innerText = carrito.length;
}

function agregarAlCarrito(index) {
    const producto = productos[index];
    const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarContadorCarrito();
    actualizarCarritoDropdown();
}

function actualizarCarritoDropdown() {
    carritoLista.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('dropdown-item', 'carrito-item', 'd-flex', 'align-items-center');

        const imagen = document.createElement('img');
        imagen.src = `../media/${item.nombre.toLowerCase().replace(/ /g, '-')}.jpg`;
        imagen.alt = item.nombre;
        imagen.classList.add('carrito-imagen');

        const nombre = document.createElement('span');
        nombre.innerText = item.nombre;

        const precio = document.createElement('span');
        precio.innerText = `$${item.precio} x ${item.cantidad}`;

        const divBotones = document.createElement('div');
        divBotones.classList.add('d-flex', 'align-items-center');

        const botonRestar = document.createElement('button');
        botonRestar.innerText = '-';
        botonRestar.classList.add('btn', 'btn-outline-dark', 'btn-sm', 'mx-2');
        botonRestar.addEventListener('click', () => restarDelCarrito(item.nombre));

        const botonSumar = document.createElement('button');
        botonSumar.innerText = '+';
        botonSumar.classList.add('btn', 'btn-outline-dark', 'btn-sm');
        botonSumar.addEventListener('click', () => agregarAlCarritoDesdeDropdown(item.nombre));

        const botonComprar = document.createElement('button');
        botonComprar.innerText = 'Comprar';
        botonComprar.classList.add('btn', 'btn-success', 'btn-sm', 'mx-2');
        botonComprar.addEventListener('click', () => comprarCarrito());

        divBotones.appendChild(botonRestar);
        divBotones.appendChild(botonSumar);

        li.appendChild(imagen);
        li.appendChild(nombre);
        li.appendChild(precio);
        li.appendChild(divBotones);

        carritoLista.appendChild(li);
    });

    const totalContainer = document.getElementById('total-container');
    totalContainer.textContent = `Total: $${calcularTotal()}`;
}

function comprarCarrito() {
    // Agrega aquí la lógica para completar la compra, por ejemplo, enviar la información al servidor, etc.
    alert('¡Compra realizada con éxito!');
    carrito = []; // Vaciar el carrito después de la compra
    actualizarContadorCarrito();
    actualizarCarritoDropdown();
}

function restarDelCarrito(nombre) {
    const productoEnCarrito = carrito.find(item => item.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad -= 1;

        if (productoEnCarrito.cantidad === 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
    }

    actualizarContadorCarrito();
    actualizarCarritoDropdown();
}

function agregarAlCarritoDesdeDropdown(nombre) {
    const index = productos.findIndex(producto => producto.nombre === nombre);
    agregarAlCarrito(index);
}

function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    return total;
}


// Actualizar el carritoDropdown al cargar la página
actualizarCarritoDropdown();

const carritoDropdown = document.querySelector('.dropdown-menu');
carritoDropdown.classList.add('dropdown-menu-end');

document.addEventListener('DOMContentLoaded', () => {
    const totalContainer = document.getElementById('total-container');
    totalContainer.textContent = `$${calcularTotal()}`;
});