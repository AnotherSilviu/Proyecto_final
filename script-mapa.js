//
const paths = document.querySelectorAll("path");
const tooltip = document.querySelector(".tooltip");

paths.forEach((path) => {
  path.addEventListener("mousemove", (e) => {
    const name = e.target.getAttribute("data-name");
    tooltip.textContent = name;
    tooltip.style.display = "block";
    const x = e.pageX;
    const y = e.pageY;
    tooltip.style.left = x + 20 + "px"; // Añadimos 20px de espacio
    tooltip.style.top = y + "px";

    console.log("x: " + x + " y: " + y);
  });

  path.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });
});
