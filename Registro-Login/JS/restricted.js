import { isUserLogged, logout } from "./auth.js";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

if (!token || !userId) {
  logout();
}

async function checkUser() {
  const isLogged = await isUserLogged(token, userId);

  if (!isLogged) {
    logout();
  } else {
    obtenerDatosUsuario(); 
  }
}

async function obtenerDatosUsuario() {
  const token = localStorage.getItem('token'); // Obtener el token del localStorage
  
  if (!token) {
    console.error("No se encontró el token.");
    return;
  }

  try {
    const respuesta = await fetch('https://fftoeuhpudiheedairhl.supabase.co/auth/v1/user', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información del usuario");
    }

    const data = await response.json();
    console.log(data); // Ver los datos obtenidos en la consola

    // Aquí llamamos a la función para mostrar los datos en la pantalla
    mostrarDatosUsuario(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function mostrarDatosUsuario(data) {
  // Obtener los elementos del HTML donde se mostrarán los datos
  const emailElement = document.getElementById('email-usuario');
  const nombreElement = document.getElementById('nombre-usuario');

  // Rellenar los elementos con los datos del usuario
  emailElement.textContent = data.email || 'No disponible';
  nombreElement.textContent = data.user_metadata.full_name || 'No disponible';
}
