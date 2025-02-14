import { APIKEY, BASE_URL } from "../Registro-Login/JS/config.js";

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
fetch(`${API_URL}?id=eq.${postId}`, { headers: API_HEADERS })
  .then((response) => response.json())
  .then((posts) => {
    const post = posts[0];
    document.getElementById("resultados").innerHTML = `
        <div class="seccion">
          <img src="${post.url_image}" alt="Imagen del post">
          <div class="contenido">
            <h2>${post.title}</h2>
            <p>${post.content}</p>
             <div class="botones">
          <button id="btn-editar" type="button">Editar Entrada</button>
          <button id="btn-eliminar" type="button">Eliminar Entrada</button>
        </div>
            
          </div>
        </div>
        `;
  });

  //Botones de post
const btnEditar = document.getElementById("btn-editar");
const btnEliminar = document.getElementById("btn-eliminar");


//Boton de eliminar
function eliminarPost(postId) {
    fetch(`${BASE_URL}/rest/v1/POST?${postId}`, {
        method: "DELETE",
    })
    .then(response => {  })

}