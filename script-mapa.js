// Selecciona todos los elementos <path> (provincias)
const paths = document.querySelectorAll('path');
const tooltip = document.querySelector('.tooltip');

// Añade eventos a cada provincia
paths.forEach((path) => {
  path.addEventListener('mouseover', (e) => {
    // Muestra el tooltip
    const name = e.target.getAttribute('data-name');
    tooltip.textContent = name; // Muestra el nombre de la provincia
    tooltip.style.display = 'block';
  });

  path.addEventListener('mousemove', (e) => {
    // Posiciona el tooltip justo encima del ratón
    const x = e.pageX; // Coordenada X del ratón
    const y = e.pageY; // Coordenada Y del ratón
    tooltip.style.left = x + 10 + 'px'; // Ajuste horizontal
    tooltip.style.top = y - 30 + 'px'; // Ajuste vertical (encima del ratón)
  });

  path.addEventListener('mouseout', () => {
    // Oculta el tooltip
    tooltip.style.display = 'none';
  });
});

