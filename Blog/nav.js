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