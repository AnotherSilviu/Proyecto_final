function verMas() {

  const botonVerMas = document.getElementById("botonVerMas");
  const contenido = document.getElementById("oculto-alcaraz");
  if (contenido.style.display === "none") {
    contenido.style.display = "block";
    botonVerMas.textContent = "Ver menos";
  } else {
    contenido.style.display === "none";
    botonVerMas.textContent = "Ver más";
  }
}

