import { getToken, getUserId } from "../../Registro-Login/JS/auth.js";
import { APIKEY, BASE_URL } from "../../Registro-Login/JS/config.js";

const API_URL = `${BASE_URL}/rest/v1/COMENTS`;

const API_HEADERS = {
  "Content-Type": "application/json",
  apikey: APIKEY,
  Authorization: `Bearer ${APIKEY}`,
};

//Obtenemos el id del post desde la URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function loadComents() {
  const result = await fetch(`${API_URL}?post_id=eq.${postId}`, {
    method: "GET",
    headers: API_HEADERS,
  });

  const comments = await result.json();
  return comments;
}

async function pintarComents() {
  const comments = await loadComents();
  const comentariosContainer = document.getElementById("lista-comentarios");
  //Le decimos que si no hay comentarios, pinte que no hay nada
  if (comments.length === 0) {
    comentariosContainer.innerHTML = "<p>No hay comentarios aún.</p>";
    return;
  }

  //Estructura de los comentarios
  comentariosContainer.innerHTML = comments
    .map(
      (comment) => `
        <div class="coments">
          <h3 id="name">${comment.user_name}</h3>
          <p id="date">${comment.date || new Date().toLocaleDateString()}</p> 
          <p id="review">${comment.review}</p>
        </div>
      `
    )
    .join("");
}

pintarComents();

//Escribir comentarios 
async function añadirComents(comment) {
    const cajaComentarios = document.getElementById("texto-comentario").value;

    const userId = localStorage.getItem("userId") || getUserId();
    const fecha = new Date().toISOString().split("T")[0];

    await fetch(API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        user_id: userId,
        user_name: userId,
        post_id: postId,     
        date: fecha,
        review: cajaComentarios
      }),
    });
    pintarComents();
    vaciarComment();
  }
 
function vaciarComment () {
    document.getElementById("texto.comentario").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const btnEnviar = document.getElementById("enviar-comentario");
    if (btnEnviar) {
        btnEnviar.addEventListener("click", añadirComents);
    }
    pintarComents();
})
