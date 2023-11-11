let carrito = [];
let contadorCarrito = document.getElementById('contador-carrito');

function actualizarContadorCarrito() {
    contadorCarrito.innerText = carrito.length;
}

function agregarAlCarritoDesdeLista(producto, lista) {
    const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarContadorCarrito();
}

function mostrarCarritoModal() {
    const modalBody = document.getElementById('modalCarritoBody');
    modalBody.innerHTML = '';

    carrito.forEach(item => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('mb-3', 'd-flex', 'justify-content-between', 'align-items-center');

        const imagen = document.createElement('img');
        imagen.src = `../media/${item.nombre.toLowerCase().replace(/ /g, '-')}.jpg`;
        imagen.alt = item.nombre;
        imagen.style.width = '50px'; 

        const detallesProducto = document.createElement('div');
        detallesProducto.classList.add('flex-grow-1', 'ms-2');

        const nombre = document.createElement('span');
        nombre.innerText = item.nombre;

        const cantidad = document.createElement('span');
        cantidad.innerText = ` x ${item.cantidad}`;

        detallesProducto.appendChild(nombre);
        detallesProducto.appendChild(cantidad);

        const controlesCantidad = document.createElement('div');
        controlesCantidad.classList.add('d-flex');

        const botonRestar = document.createElement('button');
        botonRestar.innerText = '-';
        botonRestar.classList.add('btn', 'btn-outline-dark', 'btn-sm', 'mx-2');
        botonRestar.addEventListener('click', () => restarAlCarritoDesdeModal(item.nombre));

        const botonSumar = document.createElement('button');
        botonSumar.innerText = '+';
        botonSumar.classList.add('btn', 'btn-outline-dark', 'btn-sm');
        botonSumar.addEventListener('click', () => sumarAlCarritoDesdeModal(item.nombre));

        controlesCantidad.appendChild(botonRestar);
        controlesCantidad.appendChild(botonSumar);

        divProducto.appendChild(imagen);
        divProducto.appendChild(detallesProducto);
        divProducto.appendChild(controlesCantidad);

        modalBody.appendChild(divProducto);
    });

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('text-end', 'mt-3');

    const strong = document.createElement('strong');
    strong.innerText = 'Total: ';

    const totalSpan = document.createElement('span');
    totalSpan.id = 'total-container';
    totalSpan.innerText = `$${calcularTotal()}`;

    totalContainer.appendChild(strong);
    totalContainer.appendChild(totalSpan);

    modalBody.appendChild(totalContainer);

    const botonComprar = document.createElement('button');
    botonComprar.innerText = 'Comprar';
    botonComprar.classList.add('btn', 'btn-primary');
    botonComprar.addEventListener('click', procesarCompra);

    modalBody.appendChild(botonComprar);

    $('#modalCarrito').modal('show');
}

function procesarCompra() {
    $('#modalCarrito').modal('hide');

    if (carrito.length > 0) {
        $('#modalCompraExitosa').modal('show');

        carrito = [];
        actualizarContadorCarrito();
    } else {
        $('#modalCarritoVacio').modal('show');
    }
}

function restarAlCarritoDesdeModal(nombre) {
    const productoEnCarrito = carrito.find(item => item.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad -= 1;

        if (productoEnCarrito.cantidad === 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
    }

    actualizarContadorCarrito();
    mostrarCarritoModal(); 
}

function sumarAlCarritoDesdeModal(nombre) {
    const productoEnCarrito = carrito.find(item => item.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;

        if (productoEnCarrito.cantidad === 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
    }

    actualizarContadorCarrito();
    mostrarCarritoModal(); 
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
}

document.getElementById('carritoDropdown').addEventListener('click', mostrarCarritoModal);
