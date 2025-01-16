// Días destacados para las festividades
const festividades = {
    '2025-07-31': 'La Pandorga',
    '2025-04-06': 'Semana Santa',
    '2025-08-14': 'Feria de Ciudad Real',
  };
  
  // Variables globales para el mes y el año actuales
  let mesActual = new Date().getMonth();
  let anioActual = new Date().getFullYear();
  
  // Nombre de los meses
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Función para generar el calendario
  function generarCalendario() {
    const container = document.getElementById('contenido-calendario');
    const mesTitulo = document.getElementById('mes-actual');
    const daysInMonth = new Date(anioActual, mesActual + 1, 0).getDate(); // Días del mes actual
    const firstDay = new Date(anioActual, mesActual, 1).getDay(); // Día de la semana del primer día del mes
  
    // Mostrar el nombre del mes y el año
    mesTitulo.textContent = `${meses[mesActual]} ${anioActual}`;
  
    // Limpiar contenido previo del contenedor
    container.innerHTML = '';
  
    // Crear días vacíos al inicio del calendario (para alinear correctamente)
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('empty');
      container.appendChild(emptyDiv);
    }
  
    // Crear los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = `${anioActual}-${String(mesActual + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
  
      // Si el día es una festividad, resáltalo y muestra un tooltip
      if (festividades[currentDate]) {
        dayDiv.classList.add('highlight');
        dayDiv.title = festividades[currentDate];
  
        // Añadir evento de clic para mostrar la festividad
        dayDiv.addEventListener('click', () => {
          alert(`El ${day} de ${meses[mesActual]} es: ${festividades[currentDate]}`);
        });
      }
  
      container.appendChild(dayDiv);
    }
  }
  
  // Función para cambiar el mes
  function cambiarMes(direccion) {
    mesActual += direccion;
  
    if (mesActual < 0) {
      mesActual = 11; // Diciembre
      anioActual--;
    } else if (mesActual > 11) {
      mesActual = 0; // Enero
      anioActual++;
    }
  
    generarCalendario();
  }
  
  // Listeners para los botones de navegación
  document.getElementById('prev-mes').addEventListener('click', () => cambiarMes(-1));
  document.getElementById('next-mes').addEventListener('click', () => cambiarMes(1));
  
  // Generar el calendario al cargar la página
  document.addEventListener('DOMContentLoaded', generarCalendario);