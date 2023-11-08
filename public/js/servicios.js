const servicios = [
    {
        nombre: 'Masajes Descontracturantes',
        descripcion: 'El masaje descontracturante va enfocado al tratamiento global del tejido con un objetivo concreto, la relajación muscular generalizada.',
        precio: 9500,
        imagen: '../media/masajes.jpg'
    },
    {
        nombre: 'Limpieza Facial',
        descripcion: 'Este tratamiento elimina los puntos negros y las células muertas, con lo que se consigue que la piel respire y absorba mejor los tratamientos cosméticos o de medicina estética.',
        precio: 5000,
        imagen: '../media/limpieza-facial.jpg'
    },
    {
        nombre: 'Masaje Piedras Calientes',
        descripcion: 'Este tratamiento consiste en colocar las piedras en distintas partes del cuerpo consideradas como puntos energéticos',
        precio: 8000,
        imagen: '../media/limpieza-facial.jpg'
    }
];

function crearServicioHTML(servicio,index) {
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

const serviciosContainer = document.getElementById('servicios-container');
servicios.forEach((servicio, index) => {
    serviciosContainer.innerHTML += crearServicioHTML(servicio, index);
});