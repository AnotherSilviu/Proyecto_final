import { getToken } from "./auth.js";
import { APIKEY, BASE_URL } from "./config.js";

// Secciones del contenido
const secciones = {
  perfil: `
    <section class="seccion-perfil">
      <h3>Mi Perfil</h3>
    </section>
  `,
  blog: "",
  comentarios: `
    <section class="seccion-comentarios">
      <h3>Mis Comentarios</h3>
      <p>Historial de comentarios realizados en el blog.</p>
      <div id="comments-user"></div>
    </section>
  `,
  ayuda: `
    <section class="seccion-ayuda">
      <h3>Ayuda</h3>
      <p>Ponte en contacto con nosotros si tienes dudas.</p>
      <button id="btn-contacto">
        <a href="../formulario.html" target="_blank">CONTACTO</a>
      </button>
    </section>
  `,
};

// Obtener datos del usuario
async function obtenerInfoUsuario(userId) {
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/roles?user_id=eq.${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: APIKEY,
          Authorization: `Bearer ${APIKEY}`,
        },
      }
    );

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
}

// Función para editar el nombre del usuario
async function editarNombrede(id) {
  // Pedir al usuario el nuevo nombre a través de un prompt
  const nuevoNombre = prompt("Dime tu nuevo nombre y apellidos:");

  if (nuevoNombre) {
    // Si el usuario ha proporcionado un nombre, hacemos una solicitud para actualizarlo
    try {
      const respuesta = await fetch(`${BASE_URL}/rest/v1/roles?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: APIKEY,
          Authorization: `Bearer ${APIKEY}`,
        },
        body: JSON.stringify({
          user_name: nuevoNombre, // Actualizamos el campo user_name
        }),
      });

      if (respuesta.ok) {
        // Si la respuesta es exitosa, actualizamos la interfaz
        alert("Nombre actualizado correctamente.");
        actualizarNombreUsuario(); // Llamamos a la función para actualizar el nombre en la interfaz
      } else {
        alert("Error al actualizar el nombre.");
      }
    } catch (error) {
      console.error("Error al actualizar el nombre:", error);
      alert("Hubo un problema al actualizar el nombre.");
    }
  } else {
    alert("No se ingresó un nombre válido.");
  }
}

// Actualizar el nombre del usuario en la interfaz
async function actualizarNombreUsuario() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("No hay usuario logueado.");
    return;
  }

  const userData = await obtenerInfoUsuario(userId);

  if (!userData) {
    console.error("No se pudo obtener la información del usuario.");
    return;
  }

  const nombreUsuario = userData.user_name || "Usuario desconocido";
  document.getElementById("nombre-usuario").textContent = nombreUsuario;

  mostrarPerfil();
}

// Mostrar perfil del usuario
async function mostrarPerfil() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("No hay usuario logueado.");
    return;
  }

  const userData = await obtenerInfoUsuario(userId);

  if (!userData) {
    console.error("No se pudo obtener la información del usuario.");
    return;
  }

  secciones.perfil = `
    <section class="seccion-perfil">
      <h3>Mi Perfil</h3>
      <p><strong>Nombre y Apellidos:</strong> <span id="editar-nombre" style="cursor:pointer" onclick="editarNombrede(${userData.id})">${
        userData.user_name || "Desconocido"
      }</span></p>
      <p><strong>Correo Electrónico:</strong> ${
        userData.email || "No disponible"
      }</p>
      <p><strong>Rol:</strong> ${userData.role || "Usuario"}</p>
    </section>
  `; //DEJO EL ROL PARA GUIARNOS

  document.getElementById("contenedor-principal").innerHTML = secciones.perfil;

  // Añadir eventListener al span de editar nombre
  const spanEditarNombre = document.getElementById("editar-nombre");
  if (spanEditarNombre) {
    spanEditarNombre.addEventListener("click", () => editarNombrede(userData.id));
  }
}

//Ocultar blog para los USER
async function panelAdmin() {
  const userId = localStorage.getItem("userId");
  const userData = await obtenerInfoUsuario(userId);
  const userRole = userData ? userData.role : null;
  console.log("userRole", userRole);
  const blogLink = document.querySelector(
    'a[data-section="blog"]'
  ).parentElement;

  // Si el usuario no es ADMIN, ocultamos el enlace del blog
  if (userRole !== "ADMIN") {
    blogLink.style.display = "none";
  } else {
    secciones.blog = `
    <section class="seccion-blog">
      <h3>Mis Entradas de Blog</h3>
      <ul id="entradas"></ul>
      <button type="button" id="btn-añadir">AÑADIR ENTRADA</button>
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
        <button id="btn-publicar">PUBLICAR POST</button>
      </div>
    </section>
  `;
  }
}

// Configuración de la navegación
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const contenedor = document.getElementById("contenedor-principal");

  panelAdmin();
  mostrarPerfil();
  actualizarNombreUsuario();

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const section = this.getAttribute("data-section");
      contenedor.innerHTML =
        secciones[section] || "<p>Sección no disponible</p>";

      if (section === "blog") {
        configurarBlog();
        loadAllPosts();
      }

      if (section === "comentarios") {
        loadComments();
      }
    });
  });
});

// Configuración del formulario de blog
function configurarBlog() {
  const formulario = document.getElementById("inputs-añadir");
  const btnAñadir = document.getElementById("btn-añadir");
  const btnPublicar = document.getElementById("btn-publicar");

  // Mostrar el formulario al hacer clic en el botón añadir
  btnAñadir.addEventListener("click", function () {
    formulario.style.display = "block";
  });

  // Publicar el post al hacer clic en el botón publicar
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
    apikey: APIKEY,
    Authorization: `Bearer ${APIKEY}`,
  };

  const userId = localStorage.getItem("userId");

  fetch(API_URL, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((posts) => {
      const postList = document.getElementById("entradas");
      postList.innerHTML = ""; // Limpiar lista antes de mostrar los posts

      // Filtrar los posts por userId
      const userPosts = posts.filter((post) => post.user_id === userId);

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

// Función para cargar los comentarios
function loadComments() {
  const API_URL = `${BASE_URL}/rest/v1/COMENTS`;
  const API_HEADERS = {
    "Content-Type": "application/json",
    apikey: APIKEY,
    Authorization: `Bearer ${APIKEY}`,
  };

  const userId = localStorage.getItem("userId");

  fetch(API_URL, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((comments) => {
      const commentsList = document.getElementById("comments-user");
      commentsList.innerHTML = ""; // Limpiar lista antes de mostrar los comentarios

      // Filtrar los comentarios por usuario (userId)
      const userComments = comments.filter(
        (comment) => comment.user_id === userId
      );

      // Mostrar solo los posts del usuario
      userComments.forEach((comment) => {
        commentsList.innerHTML += `
          <div class="comentariosContainer"  data-id="${comment.id}">
        <div class="coments">
          <h3 id="name">${comment.user_name}</h3>
          <p id="date">${comment.date || new Date().toLocaleDateString()}</p> 
        </div>
        <div><p id="review">${comment.review}</p></div> 
        <a href="../Blog/entrada.html?post.id=${comment.id}">Ir al comentario=></a>
        </div>
        `;
      });
    });
}
