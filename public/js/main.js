console.log("El script main.js se está ejecutando.");

const productosDestacados = [
    { nombre: 'Skala Bomba', precio: 6020 },
    { nombre: 'Skala Babosa', precio: 6020 },
    { nombre: 'Skala Botanica', precio: 4000 },
    { nombre: 'Skala Genetiqs', precio: 4500 }
];

function crearProductoDestacadoHTML(producto, index) {
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

const productosDestacadosContainer = document.getElementById('productos-destacados-container');
productosDestacados.forEach((producto, index) => {
    productosDestacadosContainer.innerHTML += crearProductoDestacadoHTML(producto, index);
});