const botonesPerfil = document.querySelectorAll(".btnPerfil");
const detallePerfil = document.getElementById("detallePerfil");
const btnmensaje = document.getElementById("btnmensaje");
const mensejeclase = document.getElementById("mensejeclase");

let contadordecliks = 0;

btnmensaje.addEventListener("click", () => {
    mensejeclase.textContent = el texto que quisimos mostrar + contadordecliks
    contadordecliks = contadordecliks + 1;
} 

botonesPerfil.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const perfil = boton.getAttribute("data-perfil");
    detallePerfil.textContent = `informacion detallada del perfil ${perfil}`;
  });
});