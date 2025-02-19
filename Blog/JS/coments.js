import { getUserId , getToken , getUserRole } from "../../Registro-Login/JS/auth.js";
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

const formComment = document.getElementById("form-comentario");

formComment.addEventListener("submit", async (event) => {
    event.preventDefault(); //Para que la página no se recargue

    const textComment = document.getElementById("texto-comentario").value;
    if(!textComment.trim()) {
        alert("por favor, ingresa un comentario antes de enviarlo");
        return;
    }

    const userId = getUserId();
    const userName = await getUserRole().user_name;
    const date = new Date().toISOString().split("T")[0];

    const newComment = {
        user_id: userId,
        user_name: userName,
        post_id: postId, 
        date: date,
        review: textComment,
    };

    await fetch(`${BASE_URL}/rest/v1/COMENTS`, {
        method: "POST",
        headers: {
            apikey: APIKEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, 
        },
        body: JSON.stringify(newComment),
    })
    .then(data => {
      if (data.error) {
        console.error("Error de servidor:", data.error);
      } else {
        console.log("Comentario agregado:", data);
        pintarComents();
      }
    })
    document.getElementById("texto-comentario").value = "";
    
})
pintarComents();