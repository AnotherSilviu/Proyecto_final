function realizarBusqueda(event) {
  event.preventDefault();
  const palabraClave = document.getElementById("buscador").value.trim().toLowerCase();
  
  if (!palabraClave) {
    document.getElementById("resultados-buscador").innerHTML = ""; 
    return;
  }

  const urlPagina = window.location.href;
  const contenidoPagina = document.body.innerText.toLowerCase();  

  if (contenidoPagina.includes(palabraClave)) {
    document.getElementById("resultados-buscador").innerHTML = "<p>Se encontró la palabra en esta página!</p>";
  } else {
    document.getElementById("resultados-buscador").innerHTML = "<p>No se encontraron resultados.</p>";
  }
}

document.getElementById("form-buscar").addEventListener("submit", realizarBusqueda);