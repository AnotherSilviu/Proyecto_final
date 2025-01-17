// Días destacados para las festividades
const festividadesCR = {
  color: "darksalmon",
  fechas: {
    "2025-01-17": "San Antón en Alcázar de San Juan",
    "2025-01-20": "San Sebastián en Alcázar de San Juan",
    "2025-03-09": "Domingo de Piñata en Ciudad Real",
    "2025-04-17": "Caracol de los Armaos en Almagro",
    "2025-04-18": "Juego de Las Caras en Calzada de Calatrava",
    "2025-04-19": "Delfile de Armaos en Bolaños de Calatrava",
    "2025-04-21": "Romería Virgen de Criptana en Campo de Criptana",
    "2025-04-26": "Romería de la Virgen del Monte en Bolaños de Calatrava",
    "2025-05-15": "Romeria de San Isidro en Alcázar de San Juan",
    "2025-06-08": "Romeria Virgen de Las Cruces en Daimiel",
    "2025-06-27": "Moros y Cristianos en Alcázar de San Juan",
    "2025-06-28": "Moros y Cristianos en Alcázar de San Juan",
    "2025-06-29": "Moros y Cristianos en Alcázar de San Juan",
    "2025-07-31": "Pandorga en Ciudad Real",
    "2025-08-03": "Fiestas del Vino en Valdepeñas",
    "2025-09-04": "Feria y Fiestas en Alcázar de San Juan",
    "2025-09-05": "Feria y Fiestas en Alcázar de San Juan",
    "2025-09-06": "Feria y Fiestas en Alcázar de San Juan",
    "2025-09-07": "Feria y Fiestas en Alcázar de San Juan",
    "2025-09-08": "Feria y Fiestas en Alcázar de San Juan",
    "2025-09-09": "Feria y Fiestas en Alcázar de San Juan",
    "2025-08-14": "Feria de Ciudad Real",
  },
};
const festividadesToledo = {
  color: "darkorchid",
  fechas: {
    "2025-01-01": "Año Nuevo",
  },
};
const festividadesAlbacete = {
  color: "greenyellow",
  fechas: {
    "2025-01-01": "Año Nuevo",
  },
};
const festividadesCuenca = {
  color: "palevioletred",
  fechas: {
    "2025-01-01": "Año Nuevo",
  },
};
const festividadesGuadalajara = {
  color: "sandybrown",
  fechas: {
    "2025-01-01": "Año Nuevo",
  },
};
const festividadesCLM = {
  color: "cornflowerblue",
  fechas: {
    "2025-01-01": "Año Nuevo",
    "2025-04-17": "Semana Santa",
    "2025-04-18": "Semana Santa",
    "2025-05-31": "Día de la Región de Castilla-La Mancha",
    "2025-06-19": "Corpus Christi",
  },
};

// Combina las festividades con su color correspondiente en un solo objeto
const todasFestividades = {
  ...festividadesCR.fechas,
  ...festividadesCLM.fechas,
  ...festividadesToledo.fechas,
  ...festividadesAlbacete.fechas,
  ...festividadesCuenca.fechas,
  ...festividadesGuadalajara.fechas,
};

// Variables globales para el mes y el año actuales
let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();

// Nombre de los meses
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Función para generar el calendario
function generarCalendario() {
  const container = document.getElementById("contenido-calendario");
  const mesTitulo = document.getElementById("mes-actual");
  const daysInMonth = new Date(anioActual, mesActual + 1, 0).getDate(); // Días del mes actual
  const firstDay = new Date(anioActual, mesActual, 1).getDay(); // Día de la semana del primer día del mes

  // Mostrar el nombre del mes y el año
  mesTitulo.textContent = `${meses[mesActual]} ${anioActual}`;

  // Limpiar contenido previo del contenedor
  container.innerHTML = "";

  // Crear días vacíos al inicio del calendario para alinearlo correctamente
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    container.appendChild(emptyDiv);
  }

  // Crear los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = `${anioActual}-${String(mesActual + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    // Si el día es una fiesta, resaltar
    if (todasFestividades[currentDate]) {
      dayDiv.classList.add("highlight");
      dayDiv.title = todasFestividades[currentDate];

      // Color de la festividad de CR
      if (festividadesCR.fechas[currentDate]) {
        dayDiv.style.backgroundColor = festividadesCR.color;
      }
      // Color de la festividad de CLM
      else if (festividadesCLM.fechas[currentDate]) {
        dayDiv.style.backgroundColor = festividadesCLM.color;
      }
      // Color de la festividad de Toledo
      else if (festividadesToledo.fechas[currentDate]) {
        dayDiv.style.backgroundColor = festividadesToledo.color;
      }
      // Color de la festividad de Albacete
      else if (festividadesAlbacete.fechas[currentDate]) {
        dayDiv.style.backgroundColor = festividadesAlbacete.color;
      }
      // Color de la festividad de Cuenca
      else if (festividadesCuenca.fechas[currentDate]) {
        dayDiv.style.backgroundColor = festividadesCuenca.color;
      }
      // Color de la festividad de Guadalajara
      else if (festividadesGuadalajara.fechas[currentDate]) {
        dayDiv.style.backgroundColor = festividadesGuadalajara.color;
      }

      // Añadir evento de clic para mostrar la fiesta
      dayDiv.addEventListener("click", () => {
        alert(
          `El ${day} de ${meses[mesActual]} es: ${todasFestividades[currentDate]}`
        );
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

// Botones de navegación
document
  .getElementById("prev-mes")
  .addEventListener("click", () => cambiarMes(-1));
document
  .getElementById("next-mes")
  .addEventListener("click", () => cambiarMes(1));

// Generar el calendario al cargar la página
document.addEventListener("DOMContentLoaded", generarCalendario);
