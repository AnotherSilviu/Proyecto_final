document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");
    const contenedor = document.getElementById("contenedor-principal");
  
    const secciones = {
      perfil: `
        <section class="seccion-perfil">
          <h3>Mi Perfil</h3>
          <p><strong>Nombre y Apellidos:</strong> Juan Pérez</p>
          <p><strong>Correo Electrónico:</strong> juanperez@email.com</p>
          <p><strong>Última actividad:</strong> Hace 2 días</p>
        </section>
      `,
      blog: `
        <section class="seccion-blog">
          <h3>Mis Entradas de Blog</h3>
          <p>Aquí aparecerán todas tus publicaciones.</p>
        </section>
      `,
      comentarios: `
        <section class="seccion-comentarios">
          <h3>Mis Comentarios</h3>
          <p>Historial de comentarios realizados en el blog.</p>
        </section>
      `,
      configuracion: `
        <section class="seccion-configuracion">
          <h3>Configuración</h3>
          <p>Ajustes de tu cuenta y preferencias.</p>
        </section>
      `,
      ayuda: `
        <section class="seccion-ayuda">
          <h3>Ayuda</h3>
          <p>Ponte en contacto con soporte si tienes dudas.</p>
        </section>
      `,
    };
  
    links.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        const section = this.getAttribute("data-section");
        contenedor.innerHTML = secciones[section] || "<p>Sección no encontrada</p>";
      });
    });
  });
  