const productos = [
    { nombre: 'Cell Active', precio: 6300 },
    { nombre: 'Skala Bomba', precio: 6020 },
    { nombre: 'Skala Babosa', precio: 6020 },
    { nombre: 'Skala Botanica', precio: 4000 },
    { nombre: 'Skala Genetiqs', precio: 4500 }
];

const servicios = [
    {
        nombre: 'Masajes Descontracturantes',
        descripcion: 'El masaje descontracturante va enfocado al tratamiento global del tejido con un objetivo concreto, la relajación muscular generalizada.',
        precio: 9500,
        imagen: '../media/masajes.jpg'
    },
    {
        nombre: 'Limpieza de Cutis',
        descripcion: 'Este tratamiento elimina los puntos negros y las células muertas, con lo que se consigue que la piel respire y absorba mejor los tratamientos cosméticos o de medicina estética.',
        precio: 5000,
        imagen: '../media/limpieza-facial.jpg'
    },
];

const carrito = [];

const contadorCarrito = document.querySelector('.badge');

function agregarAlCarrito(index) {
    carrito.push(productos[index]);
    contadorCarrito.textContent = carrito.length;
}

function crearProductoHTML(producto, index) {
    return `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="../media/${producto.nombre.toLowerCase().replace(/ /g, '-')}.jpg" alt="${producto.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        $${producto.precio}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


const productsContainer = document.getElementById('products-container');
productos.forEach((producto, index) => {
    productsContainer.innerHTML += crearProductoHTML(producto, index);
});

function crearServicioHTML(servicio) {
    return `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="../media/${servicio.nombre.toLowerCase().replace(/ /g, '-')}.jpg" alt="${servicio.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${servicio.nombre}</h5>
                        $${servicio.precio}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}



const servicesContainer = document.getElementById('servicio-container');
servicios.forEach((servicio, index) => {
    servicesContainer.innerHTML += crearServicioHTML(servicio, index);
});