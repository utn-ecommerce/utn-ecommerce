function agregarAlCarritoDesdeDestacados(index) {
    const producto = productosDestacados[index];
    const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarContadorCarrito();
    actualizarCarritoDropdown();
}