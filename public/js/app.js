// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody'); //Cursos seleccionados
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    cursos.addEventListener('click', comprarCurso);  //Al presionar "Agregar Carrito"

    carrito.addEventListener('click', eliminarCurso);  //Al presionar la X

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);  //Al vaciar el carrito

    document.addEventListener('DOMContentLoaded', leerLS);  //Al cargar un doc, mostrar LS
}

// Funciones

//Añade al carrito
function comprarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {  //Solo cuando el elemento tenga esta clase se ejecuta
        const curso = e.target.parentElement.parentElement;  //Para seleccionarlo completo

        leerDatosCurso(curso);  //Enviamos curso para tomar sus datos
    };
}

//Lee datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,   //Trae precio y descuento
        id: curso.querySelector('a').getAttribute('data-id')   //Posee atributo personalizado
    }

    insertarCarrito(infoCurso);
    //guardarCursoLS(curso);
}

//Muestra curso en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        listaCursos.appendChild(row);
        guardarCursoLS(curso);
}

//Elimina el curso del carrito en DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso;
    let cursoID;

    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLS(cursoID);
}

//Vacía el carrito en el DOM
function vaciarCarrito() {
    //listaCursos.innerHTML = '';  //Forma lenta

    while(listaCursos.firstChild) {  //Forma rápida (mientras haya cursos va a seguir recorriendo)
        listaCursos.removeChild(listaCursos.firstChild);  //Como siempre toma el primero, va a seguir recorriendo hasta que no haya nada
    }
    
    //Vaciar LS
    vaciarLS();
    return false;
}

//Almacena datos de cursos del carrito a LS
function guardarCursoLS(curso) {
    let cursos;

    cursos = obtenerCursosLocalS();  //Toma el valor de un array con datos del LS o vacío

    cursos.push(curso);  //El curso se agrega al array

    localStorage.setItem('cursos', JSON.stringify(cursos));  //De array a string
}

//Comprueba que haya elementos en LS
function obtenerCursosLocalS() {
    let cursosLS;

    if(localStorage.getItem('cursos') === null) {  //Comprobar si hay algo en LS
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));  //Si hay algo, que me lo traiga en array (parse = de string a array)
    }
    return cursosLS;
}

//Imprime los cursos de LS en el carrito
function leerLS() {
    let cursosLS;

    cursosLS = obtenerCursosLocalS();

    cursosLS.forEach(function(curso){
        // constrir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
             </td>
        `;
        listaCursos.appendChild(row);

    });
}

//Eliminar curso por ID de LS
function eliminarCursoLS(curso) {
    let cursosLS;

    cursosLS = obtenerCursosLocalS();  //Obtengo array de cursos

    cursosLS.forEach(function(cursoLS, index) {  //Comparo ID del curso seleccionado con el de LS
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);  //Cantidad que eliminamos
        } 
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));  //Agrego array a LS
}

//Elimina todos los cursos de LS
function vaciarLS() {
    localStorage.clear();
}

// Agrega un evento de clic al botón "Pagar"
document.getElementById('pagar-button').addEventListener('click', function() {
    // Aquí puedes agregar lógica para el proceso de pago
    // Por ejemplo, redireccionar a una página de pago
    window.location.href = ''; // Cambia esto por tu URL de pago
  });
  
