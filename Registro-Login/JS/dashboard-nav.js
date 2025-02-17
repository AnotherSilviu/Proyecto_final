<<<<<<< HEAD
// dashboard-nav.js
=======
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
import { getToken } from "./auth.js";
import { APIKEY, BASE_URL } from "./config.js";

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
<<<<<<< HEAD
        <ul id="entradas"></ul>
=======
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
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

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Evita que el enlace recargue la página
      const section = this.getAttribute("data-section");
<<<<<<< HEAD
      contenedor.innerHTML = secciones[section] || "<p>Sección no encontrada</p>";

      if (section === "blog") {
        configurarBlog(); // Configuramos el blog (formularios y botones)
        loadAllPosts();   // Cargamos los posts
=======
      contenedor.innerHTML =
        secciones[section] || "<p>Sección no encontrada</p>";

      if (section === "blog") {
        configurarBlog();
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
      }
    });
  });
});

function configurarBlog() {
<<<<<<< HEAD
=======
  //Botón de Añadir Post, mostrar formulario y publicar post
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
  const formulario = document.getElementById("inputs-añadir");
  const btnAñadir = document.getElementById("btn-añadir");
  const btnPublicar = document.getElementById("btn-publicar");

<<<<<<< HEAD
  // Mostrar el formulario al hacer clic en el botón de añadir
=======
  //Con esta funcion mostramos el formulario
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
  btnAñadir.addEventListener("click", function () {
    formulario.style.display = "block";
  });

<<<<<<< HEAD
  // Publicar el post al hacer clic en el botón de publicar
=======
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
  btnPublicar.addEventListener("click", async function () {
    const titulo = document.getElementById("input-titulo").value;
    const contenido = document.getElementById("input-texto").value;
    const imagen = document.getElementById("input-img").value;
  
    if (!titulo || !contenido || !imagen) {
      alert("Rellena todos los campos");
      return;
    }
  
<<<<<<< HEAD
=======
    
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
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
<<<<<<< HEAD
    await añadirPost(post);
=======
  await añadirPost(post);
  
    
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
  });
}

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
<<<<<<< HEAD
    throw new Error("Error en el servidor");
  }
  if (respuesta.ok) {
    alert("Entrada publicada correctamente.");
    vaciarFormulario();
  }
=======
    throw new Error("error en el servidor");
  }
  if (respuesta.ok) {
    alert("Entrada publicada correctamente.");
    // Limpiar el formulario después de la publicación
    vaciarFormulario();
  } 
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
}

function vaciarFormulario() {
  // Limpiar los valores de los campos
  document.getElementById("input-titulo").value = "";
  document.getElementById("input-texto").value = "";
  document.getElementById("input-img").value = "";

  // Ocultar el formulario
  const formulario = document.getElementById("inputs-añadir");
  formulario.style.display = "none";
}
<<<<<<< HEAD

// Función para cargar todos los posts directamente aquí en el archivo dashboard-nav.js
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

      // Filtrar los posts
      const userPosts = posts.filter(post => post.user_id === userId);

      // Mostrar solo por userId
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
=======
>>>>>>> 0269bd7294df800e9c857a520fa55ed47b5d0a3c
