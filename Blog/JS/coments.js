import { getUserId, getToken, getUserRole } from "../../Registro-Login/JS/auth.js";
import { APIKEY, BASE_URL } from "../../Registro-Login/JS/config.js";

const API_URL = `${BASE_URL}/rest/v1/COMENTS`;

const API_HEADERS = {
  "Content-Type": "application/json",
  apikey: APIKEY,
  Authorization: `Bearer ${APIKEY}`,
};

// Obtenemos el id del post desde la URL
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

  if (comments.length === 0) {
    comentariosContainer.innerHTML = "<p>No hay comentarios aún.</p>";
    return;
  }

  let userRole = null; // Inicializa como null por defecto
  try {
    const uRole = await getUserRole();
    userRole = uRole?.role || null; // Si getUserRole() falla, userRole será null
  } catch (error) {
    console.error("Error obteniendo el rol del usuario:", error);
  }

  // Estructura de los comentarios
  comentariosContainer.innerHTML = comments
    .map(
      (comment) => `
      <div class="comentariosContainer"  data-id="${comment.id}">
        <div class="coments">
          <h3 id="name">${comment.user_name}</h3>
          <p id="date">${comment.date || new Date().toLocaleDateString()}</p> 
        </div>
        <div><p id="review">${comment.review}</p></div> 
        ${
          userRole === "ADMIN"
            ? `<div class="boton">
                <button class="btn-eliminarcomment" data-id="${comment.id}" type="button">Eliminar</button>
              </div>`
            : ""
        }
      </div>
      `
    )
    .join("");

    if (userRole === "ADMIN") {
      document.querySelectorAll(".btn-eliminarcomment").forEach((btn) => {
        btn.addEventListener("click", (event) => {
          const commentId = event.target.getAttribute("data-id");
          eliminarComentario(commentId);
        });
      });
    }
  }
pintarComents();

async function eliminarComentario(commentId) {
  const confirmacion = confirm("Vas a eliminar un comentario. ¿Estás seguro?");
  if (!confirmacion) {
    return;
  }

  await fetch(`${BASE_URL}/rest/v1/COMENTS?id=eq.${commentId}`, {
    method: "DELETE",
    headers: {
      apikey: APIKEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Recargar los comentarios después de la eliminación
  pintarComents();
}

const formComment = document.getElementById("form-comentario");

formComment.addEventListener("submit", async (event) => {
  event.preventDefault(); // Para que la página no se recargue

  const textComment = document.getElementById("texto-comentario").value;
  if (!textComment.trim()) {
    alert("Por favor, ingresa un comentario antes de enviarlo");
    return;
  }

  const userId = getUserId();
  if (!userId) {
    alert("Debes iniciar sesión para comentar.");
    return;
  }

    
  const uRole = await getUserRole();
  const userName = uRole.user_name;
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
  });

  document.getElementById("texto-comentario").value = "";
  pintarComents(); // Recargar los comentarios después de agregar uno
});

// Inicializar los comentarios al cargar la página
pintarComents();
