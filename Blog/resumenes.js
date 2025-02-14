import { APIKEY, BASE_URL } from "../Registro-Login/JS/config.js";

const API_URL = `${BASE_URL}/rest/v1/POST`;

const API_HEADERS = {
  "Content-Type": "application/json",
  "apikey": APIKEY,
  "Authorization": `Bearer ${APIKEY}`,
};

function loadAllPosts() {
  fetch(API_URL, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((posts) => {
      const postList = document.getElementById("entradas");
      postList.innerHTML = ""; // Limpiar lista antes de mostrar los posts

      posts.forEach((post) => {
        postList.innerHTML += `
          <li class="seccion">
        <img src="${post.url_image}" alt="">
        <div class="contenido">
          <h2>${post.title}</h2>
          <p>${post.content.substring(0, 200)}</p> 
          <a href="entrada.html?id=${post.id}">Leer más ⇒</a>
        </div>
        `;
      });
    })
    .catch((error) => console.error("❌ Error al cargar posts:", error));
}

loadAllPosts(); // Llamamos a la función para cargar los posts
