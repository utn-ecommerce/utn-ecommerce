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
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        const imagen = document.createElement('img');
        imagen.src = `../media/${item.nombre.toLowerCase().replace(/ /g, '-')}.jpg`;
        imagen.alt = item.nombre;
        imagen.classList.add('carrito-imagen', 'img-fluid', 'mr-2');

        const nombre = document.createElement('span');
        nombre.innerText = item.nombre;
        nombre.classList.add('carrito-nombre');

        const precio = document.createElement('span');
        precio.innerText = `$${item.precio} x ${item.cantidad}`;
        precio.classList.add('carrito-precio');

        const divBotones = document.createElement('div');
        divBotones.classList.add('btn-group');

        const botonRestar = document.createElement('button');
        botonRestar.innerText = '-';
        botonRestar.classList.add('btn', 'btn-outline-dark', 'btn-sm');
        botonRestar.addEventListener('click', () => restarDelCarrito(item.nombre));

        const botonSumar = document.createElement('button');
        botonSumar.innerText = '+';
        botonSumar.classList.add('btn', 'btn-outline-dark', 'btn-sm');
        botonSumar.addEventListener('click', () => agregarAlCarritoDesdeDropdown(item.nombre));

        divBotones.appendChild(botonRestar);
        divBotones.appendChild(botonSumar);

        li.appendChild(imagen); 
        li.appendChild(nombre);
        li.appendChild(precio);
        li.appendChild(divBotones);

        carritoLista.appendChild(li);
    });

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('text-end', 'mt-3');

    const strong = document.createElement('strong');
    strong.innerText = 'Total: ';

    const totalSpan = document.createElement('span');
    totalSpan.id = 'total-container';
    totalSpan.innerText = calcularTotal();

    const comprarButton = document.createElement('button');
    comprarButton.innerText = 'Comprar';
    comprarButton.classList.add('btn', 'btn-success', 'btn-sm');
    comprarButton.addEventListener('click', procesarCompra);

    totalContainer.appendChild(strong);
    totalContainer.appendChild(totalSpan);
    totalContainer.appendChild(comprarButton);

    carritoLista.appendChild(totalContainer);

    carritoLista.style.maxHeight = '300px'; 
}
function procesarCompra() {
    if (carrito.length > 0) {
        $('#modalCompraExitosa').modal('show');
        
        carrito = [];
        
        actualizarContadorCarrito();
        actualizarCarritoDropdown();
    } else {
        $('#modalCarritoVacio').modal('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoDropdown();
});

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
