const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const containerCastillos = document.querySelector('.castillos-container');
const figureCastillos = document.querySelectorAll('.castillos-item');

// Función para mover el slider
function navegar(direccion) {
    const ancho = figureCastillos[0].offsetWidth;  // Ancho de un item

    // Actualizamos el índice en función de la dirección
    currentIndex += direccion;

    // Si el índice se sale de los límites (menos de 0 o más que el número de items), lo ajustamos
    if (currentIndex < 0) {
        currentIndex = figureCastillos.length - 1;  // Vamos al último item
    } else if (currentIndex >= figureCastillos.length) {
        currentIndex = 0;  // Volvemos al primer item
    }

    // Movemos el contenedor de imágenes
    containerCastillos.style.transform = `translateX(-${currentIndex * ancho}px)`;
}

let currentIndex = 0;
// Retrasa un item en el slider
botonAnterior.addEventListener('click', () => {
    navegar(-1);
});
// Avanza item en el slider
botonSiguiente.addEventListener('click', () => {
    navegar(1);
});
