const btnEnviar = document.getElementById("boton-enviar");

document
  .getElementById("formulario-contacto")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btnEnviar.textContent = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_bn9d69r";
    const destino = document.getElementById("destino-p");

    setTimeout(() => {
      destino.style.display = "block";
    }, 2000);

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btnEnviar.textContent = "¡Enviado!";
        console.log("Enviado");
      },
      (err) => {
        btnEnviar.textContent = "Error";
        console.log(JSON.stringify(err));
      }
    );
  });
