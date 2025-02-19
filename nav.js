// Funciones para abrir y cerrar el menú de navegación
function openNav() {
  console.log("Abrir menú");
  let menu = document.getElementById("mobile-menu");
  menu.style.display = "block";
  setTimeout(() => {
    menu.style.width = "100%";
  }, 10);
}

function closeNav() {
  console.log("Cerrar menú");
  let menu = document.getElementById("mobile-menu");
  menu.style.width = "0%";
  setTimeout(() => {
    menu.style.display = "none";
  }, 300);
}

// Si un usuario está logueado, el botón cambia su texto y su destino
if(localStorage.getItem("token")) {
  // CAMBIO CON PANTALLA COMPLETA
  document.getElementById("boton-formulario").innerHTML = "PANEL DE USUARIO";
  document.getElementById("boton-formulario").setAttribute("target", "_self");
  document.getElementById("boton-formulario").setAttribute("href", "../Registro-Login/dashboard.html")

  // CAMBIO CON PANTALLA REDUCIDA
  document.getElementById("boton-formulario-user").innerHTML = "PANEL DE USUARIO";
  document.getElementById("boton-formulario-user").setAttribute("target", "_self");
  document.getElementById("boton-formulario-user").setAttribute("href", "../Registro-Login/dashboard.html")
}