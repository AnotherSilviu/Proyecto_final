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
const user_name = urlParams.get("user_name")

async function loadComents() {
  const result = await fetch(`${API_URL}?post_id=eq.${postId}`, {
    headers: API_HEADERS,
  });
  const coments = await result.json();
  return coments;
}

async function pintarComents() {
  const coments = await loadComents();

  document.getElementById("lista-comentarios").innerHTML = `
  <div class="coments">
    <h3 id="name">${user_name}</h3>
    <p id="date">${coments.date}</p>
    <p id="review">${coments.review}</p>
    </div>
  `;
}
pintarComents()
