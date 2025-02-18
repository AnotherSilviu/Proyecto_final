import { getToken, getUserRole } from "./auth.js";
import { APIKEY, BASE_URL } from "./config.js";

// Secciones del contenido
const secciones = {
  perfil: `
    <section class="seccion-perfil">
      <h3>Mi Perfil</h3>
      <p><strong>Nombre y Apellidos:</strong> Juan Pérez</p>
      <p><strong>Correo Electrónico:</strong> juanperez@email.com</p>
      <p><strong>Última actividad:</strong> Hace 2 días</p>
    </section>
  `,
  blog: '',
  comentarios: `
    <section class="seccion-comentarios">
      <h3>Mis Comentarios</h3>
      <p>Historial de comentarios realizados en el blog.</p>
    </section>
  `,
  ayuda: `
    <section class="seccion-ayuda">
      <h3>Ayuda</h3>
      <p>Ponte en contacto con nosotros si tienes dudas.</p>
      <button id="btn-contacto">
        <a href="../formulario.html" target="_blank">Contacto</a>
      </button>
    </section>
  `,
};

async function panelAdmin() {
  const userRole = await getUserRole();
  console.log("userRole", userRole);
  const blogLink = document.querySelector('a[data-section="blog"]').parentElement;

  // Si el usuario no es ADMIN, ocultamos el enlace del blog
  if (userRole !== "ADMIN") {
    blogLink.style.display = "none";
  } else {
    secciones.blog = `
    <section class="seccion-blog">
      <h3>Mis Entradas de Blog</h3>
      <ul id="entradas"></ul>
      <button type="button" id="btn-añadir">Añadir entrada</button>
      <div id="inputs-añadir" style="display: none;">
        <label> Título
          <input type="text" id="input-titulo" placeholder="Añade el título del post">
        </label>
        <label> Contenido
          <textarea id="input-texto" placeholder="Redacta tu post"></textarea>
        </label>
        <label> Imagen del post
          <input type="text" id="input-img" placeholder="Añade la URL de la imagen">
        </label>
        <button id="btn-publicar">Publicar post</button>
      </div>
    </section>
  `;
  }
}

// Configuración de eventos de navegación
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const contenedor = document.getElementById("contenedor-principal");

  panelAdmin();

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const section = this.getAttribute("data-section");
      contenedor.innerHTML = secciones[section] || "<p>Sección solo disponible para Administradores</p>";

      if (section === "blog") {
        configurarBlog(); 
        loadAllPosts(); 
      }
    });
  });
});

// Configuración del formulario de blog
function configurarBlog() {
  const formulario = document.getElementById("inputs-añadir");
  const btnAñadir = document.getElementById("btn-añadir");
  const btnPublicar = document.getElementById("btn-publicar");

  // Mostrar el formulario al hacer clic en el botón de añadir
  btnAñadir.addEventListener("click", function () {
    formulario.style.display = "block";
  });

  // Publicar el post al hacer clic en el botón de publicar
  btnPublicar.addEventListener("click", async function () {
    const titulo = document.getElementById("input-titulo").value;
    const contenido = document.getElementById("input-texto").value;
    const imagen = document.getElementById("input-img").value;
  
    if (!titulo || !contenido || !imagen) {
      alert("Rellena todos los campos");
      return;
    }
  
    const userId = localStorage.getItem("userId");
    const fecha = new Date().toISOString().split("T")[0];
  
    const post = {
      user_id: userId,     
      title: titulo,
      url_image: imagen,
      date: fecha,
      content: contenido,
    };
  
    // Publicamos el post
    await añadirPost(post);
  });
}

// Añadir post al sistema
async function añadirPost(post) {
  const respuesta = await fetch(`${BASE_URL}/rest/v1/POST`, {
    method: "POST",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(post),
  });

  if (!respuesta.ok) {
    throw new Error("Error en el servidor");
  }
  if (respuesta.ok) {
    alert("Entrada publicada correctamente.");
    vaciarFormulario();
  }
}

// Vaciar el formulario de blog
function vaciarFormulario() {
  document.getElementById("input-titulo").value = "";
  document.getElementById("input-texto").value = "";
  document.getElementById("input-img").value = "";

  const formulario = document.getElementById("inputs-añadir");
  formulario.style.display = "none";
}

// Función para cargar los posts
function loadAllPosts() {
  const API_URL = `${BASE_URL}/rest/v1/POST`;
  const API_HEADERS = {
    "Content-Type": "application/json",
    "apikey": APIKEY,
    "Authorization": `Bearer ${APIKEY}`,
  };

  const userId = localStorage.getItem("userId");

  fetch(API_URL, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((posts) => {
      const postList = document.getElementById("entradas");
      postList.innerHTML = ""; // Limpiar lista antes de mostrar los posts

      // Filtrar los posts por userId
      const userPosts = posts.filter(post => post.user_id === userId);

      // Mostrar solo los posts del usuario
      userPosts.forEach((post) => {
        postList.innerHTML += `
          <li class="seccion">
            <img src="${post.url_image}" alt="">
            <div class="contenido">
              <h2>${post.title}</h2>
              <p>${post.content.substring(0, 200)}</p> 
              <a href="../Blog/entrada.html?id=${post.id}">Leer más⇒</a>
            </div>
          </li>
        `;
      });
    });
}
