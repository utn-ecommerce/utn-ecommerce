const productos = [
    { nombre: 'Lidherma Cell Active', precio: 6300 },
    { nombre: 'Lidherma Food', precio: 7500 },
    { nombre: 'Lidherma Exfoliante', precio: 7500 },
    { nombre: 'Lidherma Hidrosomas', precio: 6400 },
    { nombre: 'Laca Neblina Hidratante', precio: 2500 },
    { nombre: 'Laca Gel De Limpieza', precio: 3900 },
    { nombre: 'Laca Locion Astringente', precio: 5000 },
    { nombre: 'Laca Crema Para Manos', precio: 3700 },
    { nombre: 'Idraet Alpine Roses Serum', precio: 8500 },
    { nombre: 'Idraet Alpine Roses', precio: 9700 },
    { nombre: 'Idraet Limpiador Microexfoliante', precio: 7300 },
    { nombre: 'Idraet Hyaluronic Serum', precio: 8500 },
    { nombre: 'Sentida Botanica Desodorante Natural', precio: 3800 },
    { nombre: 'Sentida Botanica Crema Hidratante', precio: 2500 },
    { nombre: 'Sentida Botanica Shampoo Solido', precio: 3500 },
    { nombre: 'Sentida Botanica Acondicionador Solido', precio: 3500 }
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
let row = document.createElement('div');
row.className = 'row';

productos.forEach((producto, index) => {
    if (index % 4 === 0 && index !== 0) {
        productosContainer.appendChild(row);
        row = document.createElement('div');
        row.className = 'row';
    }

    row.innerHTML += crearProductoHTML(producto, index);
});

productosContainer.appendChild(row);