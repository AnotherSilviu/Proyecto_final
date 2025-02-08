const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const containerCastillos = document.querySelector('.castillos-container');
const figureCastillos = document.querySelectorAll('.castillos-item');

// Función para mover el slider
function navegar(direccion) {
    // Coge el ancho del figure
    const ancho = containerCastillos[0].offsetWidth;

    // Actualiza el índice en función de la dirección
    currentIndex += direccion;

    // Ajusta el índice
    if (currentIndex < 0) {
        currentIndex = containerCastillos.length - 1;  // Va al último item
    } else if (currentIndex >= containerCastillos.length) {
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

imagenNat.forEach((imagen, index) => {
    imagen.addEventListener("mouseenter", () => {
        textoNat[index].style.display = "block"; // Muestra el texto
    });

    imagen.addEventListener("mouseleave", () => {
        textoNat[index].style.display = "none"; // Oculta el texto
    });
});

