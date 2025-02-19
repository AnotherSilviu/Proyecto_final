document.addEventListener("DOMContentLoaded", function () {
  const sliderNavLinks = document.querySelectorAll(".slider-nav a");

  sliderNavLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Evita que la página haga scroll hacia arriba

      const targetId = this.getAttribute("href").substring(1); // Obtiene el ID sin "#"

      const targetImage = document.getElementById(targetId);

      if (targetImage) {
        targetImage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });
});
