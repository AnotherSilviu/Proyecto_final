let provincias = [];

const requestOptions = {
  method: "GET",
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdG9ldWhwdWRpaGVlZGFpcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjkyMjMsImV4cCI6MjA1NDUwNTIyM30._XpVGv5X7XtSN603HQtzjDRhqK32MNguT3cdp_4QxVc",
  },
};

// Función para hacer la consulta a la API según el ID
function fetchProvinciaById(id) {
  fetch(
    "https://fftoeuhpudiheedairhl.supabase.co/rest/v1/PROVINCIAS?id=eq." + id,
    {
      method: "GET",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdG9ldWhwdWRpaGVlZGFpcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjkyMjMsImV4cCI6MjA1NDUwNTIyM30._XpVGv5X7XtSN603HQtzjDRhqK32MNguT3cdp_4QxVc",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      const provincia = result[0]; // Suponiendo que siempre hay un único resultado
      pintarDatos(provincia);
    })
    .catch((error) => {
      console.error("Error al obtener la provincia", error);
    });
}

// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función que se ejecuta cuando la página se carga
document.addEventListener("DOMContentLoaded", function () {
  const provinciaId = getQueryParam("id"); // Obtiene el ID de la provincia desde la URL
  if (provinciaId) {
    // Realizar la búsqueda de la provincia por ID y pintar los datos
    fetchProvinciaById(provinciaId);
  } else {
    console.log("No se ha proporcionado un ID válido.");
  }
});

function pintarDatos(provincia) {
  if (!provincia) {
    console.error("Provincia no definida.");
    return;
  }

  //Introducción
  document.getElementById("intro_h2").textContent =
    provincia.intro_h2 || "Intro_h2 no disponible.";
  document.getElementById("intro_p").textContent =
    provincia.intro_p || "Intro_p no disponible.";

  //Historia
  document.getElementById("history_p").textContent =
    provincia.history_p || "History_p no disponible.";

  // Monumentos
  document.getElementById("monuments1_h3").textContent =
    provincia.monuments1_h3 || "Monumento no disponible";
  document.getElementById("monuments1_img").scr =
    provincia.monuments1_img || "Monumento no disponible";
  document.getElementById("monuments2_h3").textContent =
    provincia.monuments2_h3 || "Monumento no disponible";
  document.getElementById("monuments2_img").scr =
    provincia.monuments2_img || "Monumento no disponible";
  document.getElementById("monuments3_h3").textContent =
    provincia.monuments3_h3 || "Monumento no disponible";
  document.getElementById("monuments3_img").scr =
    provincia.monuments3_img || "Monumento no disponible";

  // Gastronomía
  document.getElementById("gastronomy_p").textContent =
    provincia.gastronomy_p || "No hay datos de gastronomía.";
  document.getElementById("gastronomy1_li_title").textContent =
    provincia.gastronomy1_li_title || "No hay datos de gastronomía.";
  document.getElementById("gastronomy1_li_phrase").textContent =
    provincia.gastronomy1_li_phrase || "No hay datos de gastronomía.";
  document.getElementById("gastronomy2_li_title").textContent =
    provincia.gastronomy2_li_title || "No hay datos de gastronomía.";
  document.getElementById("gastronomy2_li_phrase").textContent =
    provincia.gastronomy2_li_phrase || "No hay datos de gastronomía.";
  document.getElementById("gastronomy3_li_title").textContent =
    provincia.gastronomy3_li_title || "No hay datos de gastronomía.";
  document.getElementById("gastronomy3_li_phrase").textContent =
    provincia.gastronomy3_li_phrase || "No hay datos de gastronomía.";

  // Parques Naturales
  document.getElementById("naturalparks1_h3").textContent =
    provincia.naturalparks1_h3 || "Parque natural no disponible";
  document.getElementById("naturalparks1_p").textContent =
    provincia.naturalparks1_p || "Parque natural no disponible";
  document.getElementById("naturalparks1_img").textContent =
    provincia.naturalparks1_img || "Parque natural no disponible";
  document.getElementById("naturalparks2_h3").textContent =
    provincia.naturalparks2_h3 || "Parque natural no disponible";
  document.getElementById("naturalparks2_p").textContent =
    provincia.naturalparks2_p || "Parque natural no disponible";
  document.getElementById("naturalparks2_img").textContent =
    provincia.naturalparks2_img || "Parque natural no disponible";

  // Rutas Turísticas
  document.getElementById("turisticroutes1_h3").textContent =
    provincia.turisticroutes1_h3 || "Ruta turística no disponible";
  document.getElementById("turisticroutes1_p").textContent =
    provincia.turisticroutes1_p || "Ruta turística no disponible";
  document.getElementById("turisticroutes1_1").textContent =
    provincia.turisticroutes1_1 || "Ruta turística no disponible";
  document.getElementById("turisticroutes1_2").textContent =
    provincia.turisticroutes1_2 || "Ruta turística no disponible";
  document.getElementById("turisticroutes1_3").textContent =
    provincia.turisticroutes1_3 || "Ruta turística no disponible";
  document.getElementById("turisticroutes1_4").textContent =
    provincia.turisticroutes1_4 || "Ruta turística no disponible";
  document.getElementById("turisticroutes2_h3").textContent =
    provincia.turisticroutes2_h3 || "Ruta turística no disponible";
  document.getElementById("turisticroutes2_p").textContent =
    provincia.turisticroutes2_p || "Ruta turística no disponible";
  document.getElementById("turisticroutes2_1").textContent =
    provincia.turisticroutes2_1 || "Ruta turística no disponible";
  document.getElementById("turisticroutes2_2").textContent =
    provincia.turisticroutes2_2 || "Ruta turística no disponible";
  document.getElementById("turisticroutes2_3").textContent =
    provincia.turisticroutes2_3 || "Ruta turística no disponible";
  document.getElementById("turisticroutes2_4").textContent =
    provincia.turisticroutes2_4 || "Ruta turística no disponible";
  document.getElementById("turisticroutes3_h3").textContent =
    provincia.turisticroutes3_h3 || "Ruta turística no disponible";
  document.getElementById("turisticroutes3_p").textContent =
    provincia.turisticroutes3_p || "Ruta turística no disponible";
  document.getElementById("turisticroutes3_1").textContent =
    provincia.turisticroutes3_1 || "Ruta turística no disponible";
  document.getElementById("turisticroutes3_2").textContent =
    provincia.turisticroutes3_2 || "Ruta turística no disponible";
  document.getElementById("turisticroutes3_3").textContent =
    provincia.turisticroutes3_3 || "Ruta turística no disponible";
  document.getElementById("turisticroutes3_4").textContent =
    provincia.turisticroutes3_4 || "Ruta turística no disponible";

  //Guía Visitantes
  document.getElementById("guide_p").textContent =
    provincia.guide_p || "Ruta turística no disponible";
  //Sección Clima
  document.getElementById("guide_time_p").textContent =
    provincia.guide_time_p || "Ruta turística no disponible";
  document.getElementById("guide_time_spring").textContent =
    provincia.guide_time_spring || "Ruta turística no disponible";
  document.getElementById("guide_time_summer").textContent =
    provincia.guide_time_summer || "Ruta turística no disponible";
  document.getElementById("guide_time_autum").textContent =
    provincia.guide_time_autum || "Ruta turística no disponible";
  document.getElementById("guide_time_winter").textContent =
    provincia.guide_time_winter || "Ruta turística no disponible";
  //Sección Transporte
  document.getElementById("guide_transport_p").textContent =
    provincia.guide_transport_p || "Ruta turística no disponible";
  document.getElementById("guide_transport_1_title").textContent =
    provincia.guide_transport_1_title || "Ruta turística no disponible";
    document.getElementById("guide_transport_1_phrase").textContent =
    provincia.guide_transport_1_phrase || "Ruta turística no disponible";
    document.getElementById("guide_transport_2_title").textContent =
    provincia.guide_transport_2_title || "Ruta turística no disponible";
    document.getElementById("guide_transport_2_phrase").textContent =
    provincia.guide_transport_2_phrase || "Ruta turística no disponible";
    document.getElementById("guide_transport_3_title").textContent =
    provincia.guide_transport_3_title || "Ruta turística no disponible";
    document.getElementById("guide_transport_3_phrase").textContent =
    provincia.guide_transport_3_phrase || "Ruta turística no disponible";
    document.getElementById("guide_transport_4_title").textContent =
    provincia.guide_transport_4_title || "Ruta turística no disponible";
    document.getElementById("guide_transport_4_phrase").textContent =
    provincia.guide_transport_4_phrase || "Ruta turística no disponible";


  //Información adicional
  document.getElementById("where_eat").textContent =
    provincia.where_eat || "Ruta turística no disponible";
  document.getElementById("where_sleep").textContent =
    provincia.where_sleep || "Ruta turística no disponible";
}
