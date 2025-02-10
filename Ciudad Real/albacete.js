document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const provinciaId = urlParams.get("id");

  fetch(
    `https://fftoeuhpudiheedairhl.supabase.co/rest/v1/PROVINCIAS?id=eq.${provinciaId}`,
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdG9ldWhwdWRpaGVlZGFpcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjkyMjMsImV4cCI6MjA1NDUwNTIyM30._XpVGv5X7XtSN603HQtzjDRhqK32MNguT3cdp_4QxVc",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdG9ldWhwdWRpaGVlZGFpcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjkyMjMsImV4cCI6MjA1NDUwNTIyM30._XpVGv5X7XtSN603HQtzjDRhqK32MNguT3cdp_4QxVc",
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data); // 👈 Ver qué datos llegan
      if (Array.isArray(data) && data.length > 0) {
        const provincia = data[0];
        document.getElementById("intro_h3").textContent = provincia.nombre;
        document.getElementById("intro_p").textContent = provincia.descripcion;
      } else {
        console.warn("No se encontraron datos para este ID.");
      }
    })
    .catch((error) => console.error("Error en fetch:", error));
});
