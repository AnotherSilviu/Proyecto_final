const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const containerCastillos = document.querySelector('.castillos-container');
const figureCastillos = document.querySelectorAll('.castillos-item');


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

