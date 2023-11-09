const productos = [
    { nombre: 'Cell Active', precio: 6300 },
    { nombre: 'Lidherma Food', precio: 7500 },
    { nombre: 'Lidherma Exfoliante', precio: 7500 },
    { nombre: 'Lidherma Hidrosomas', precio: 8500 },
    { nombre: 'Laca Neblina Hidratante', precio: 8500 },



];

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
const productosContainer = document.getElementById('productos-container');
productos.forEach((producto, index) => {
    productosContainer.innerHTML += crearProductoHTML(producto, index);
});