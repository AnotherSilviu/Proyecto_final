import { getToken, getUserRole, getUserId } from "../../Registro-Login/JS/auth.js";
import { APIKEY, BASE_URL } from "../../Registro-Login/JS/config.js";

const API_URL = `${BASE_URL}/rest/v1/POST`;

const API_HEADERS = {
  "Content-Type": "application/json",
  apikey: APIKEY,
  Authorization: `Bearer ${APIKEY}`,
};

//Obtenemos el id del post desde la URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

// Hacemos la petición para obtener los datos del post
async function loadPost() {
  const result = await fetch(`${API_URL}?id=eq.${postId}`, {
    headers: API_HEADERS,
  });
  const posts = await result.json();
  return posts[0];
}

async function pintarPost() {
  const post = await loadPost();
  const userRole = await getUserRole();
  console.log("userRole", userRole);

  let buttonsAdmin = "";
  if (userRole == "ADMIN") {
    buttonsAdmin = `
      <div class="botones">
        <button id="btn-actualizar" type="button">Actualizar Imagen</button>
        <button id="btn-editar" type="button">Editar Entrada</button>
        <button id="btn-eliminar" type="button">Eliminar Entrada</button>
      </div>
      `;
  }

  document.getElementById("resultados").innerHTML = `
  <div class="seccion">
    <img src="${post.url_image}" alt="Imagen del post">
    <h2 id="titulo">${post.title}</h2>
    </div>
    <div id="contenido" class="contenido">
      ${post.content}
    </div>

    ${buttonsAdmin}
  `;

  //Botones de post
  const btnActualizar = document.getElementById("btn-actualizar");
  const btnEditar = document.getElementById("btn-editar");
  const btnEliminar = document.getElementById("btn-eliminar");

  btnActualizar.addEventListener("click", actualizarImagen);

  btnEditar.addEventListener("click", () => {
    editarPost(postId);
  });

  btnEliminar.addEventListener("click", () => {
    eliminarPost(postId);
  });
}

function actualizarImagen() {
  const imagen = document.querySelector("img");
  const newImageUrl = prompt("Introduce la nueva URL de la imagen:");

  if (newImageUrl) {
    imagen.src = newImageUrl;

    fetch(`${BASE_URL}/rest/v1/POST?id=eq.${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ url_image: newImageUrl }),
      headers: {
        apikey: APIKEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      savePost()
  }
}

let isEditable = false;

function setContentEditable() {
  const titulo = document.getElementById("titulo");
  const contenido = document.getElementById("contenido");

  if (isEditable) {
    titulo.setAttribute("contenteditable", "true");
    contenido.setAttribute("contenteditable", "true");

    document.getElementById("btn-editar").innerHTML = "Guardar Cambios";
  } else {
    titulo.setAttribute("contenteditable", "false");
    contenido.setAttribute("contenteditable", "false");

    document.getElementById("btn-editar").innerHTML = "Editar Entrada";
  }
}

// Botón de editar
function editarPost(postId) {
  isEditable = !isEditable;
  setContentEditable();

  if (!isEditable) {
    savePost(postId);
  }
}

async function savePost(postId) {
  const titulo = document.getElementById("titulo");
  const contenido = document.getElementById("contenido");

  const post = {
    title: titulo.innerText,
    content: contenido.innerText,
    user_id: getUserId(),
  };

  fetch(`${BASE_URL}/rest/v1/POST?id=eq.${postId}`, {
    method: "PATCH",
    body: JSON.stringify(post),
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(() => {
    //Redirecciona al blog
    window.location.reload();
    //window.location.href = "./blog.html";
  });
}

//Boton de eliminar
function eliminarPost(postId) {
  const confirmacion = confirm("Vas a eliminar un post. ¿Estás seguro?");
  if (!confirmacion) {
    return;
  }
  fetch(`${BASE_URL}/rest/v1/POST?id=eq.${postId}`, {
    method: "DELETE",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(() => {
    window.location.href = "./blog.html"; //Redireccion
  });
}
pintarPost();
