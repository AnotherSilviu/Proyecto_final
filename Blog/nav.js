document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado");

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

    // Asigna eventos a los botones del menú
    document.querySelector(".menu").addEventListener("click", openNav);
    document.querySelector(".close").addEventListener("click", closeNav);

    // Código para cambiar el botón Login/Logout en ambos menús
    function actualizarBoton() {
        const token = localStorage.getItem("token");
        const authButtons = document.querySelectorAll("#boton-formulario, .overlay-content li a");
    
        authButtons.forEach(authButton => {
            if (token) {
                authButton.textContent = "LOGOUT";
                authButton.href = "javascript:void(0)";
                authButton.onclick = () => logout();
            } else {
                authButton.textContent = "LOGIN";
                authButton.href = "Registro-Login/login.html";
                authButton.onclick = null;
            }
        });
    }
    
    // Función para cerrar sesión
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "bienvenida.html"; // Redirige a la página de inicio
    }

    actualizarBoton();
});
