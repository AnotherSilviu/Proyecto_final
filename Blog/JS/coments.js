import { getToken, getUserRole, getUserId } from "../../Registro-Login/JS/auth.js";
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
        headers: API_HEADERS,
        });

        const coments = await result.json();
        return coments;
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
          <p id="date">${comment.date}</p> 
          <p id="review">${comment.review}</p>
        </div>
      `
      )
      .join("");
  }
pintarComents()
