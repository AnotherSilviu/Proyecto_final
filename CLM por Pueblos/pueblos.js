const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const containerCastillos = document.querySelector('.castillos-container');
const figureCastillos = document.querySelectorAll('.castillos-item');

// Función para mover el slider
function navegar(direccion) {
    // Coge el ancho del figure
    const ancho = figureCastillos[0].offsetWidth;

    // Actualiza el índice en función de la dirección
    currentIndex += direccion;

    // Ajusta el índice
    if (currentIndex < 0) {
        currentIndex = figureCastillos.length - 1;  // Va al último item
    } else if (currentIndex >= figureCastillos.length) {
        currentIndex = 0;  // Vuelve al primer item
    }

    // Mover el contenedor
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

// NATURALEZA

const imagenNat = document.querySelectorAll("img-naturaleza");
const textoNat = document.querySelectorAll("naturaleza-texto");

imagenNat.addEventListener("mouseenter", () => {
  textoNat.style.display = "block"; // Muestra el texto al hacer hover
});

imagenNat.addEventListener("mouseleave", () => {
  textoNat.style.display = "none"; // Oculta el texto
});

