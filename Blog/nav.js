// Funciones para abrir y cerrar el menú de navegación
<<<<<<< HEAD

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
=======
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

>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
