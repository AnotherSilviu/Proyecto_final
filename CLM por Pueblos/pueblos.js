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


// Evitar scroll hacia el inicio del slider
const navLinks = document.querySelectorAll('.slider-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (i) => {
    i.preventDefault();  // Prohíbe el scroll hacia arriba
  });
});

