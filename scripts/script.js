var fecha = new Date().toISOString().substr(0, 10);
document.getElementById("check-in").value = fecha;
document.getElementById("check-out").value = fecha;

function sumarPersona() {
  var input = document.getElementById("personas");
  if (input.value < 10) {
    input.value = parseInt(input.value)+1;
  }
}

function restarPersona() {
  var input = document.getElementById("personas");
  if (input.value > 1) {
    input.value = parseInt(input.value)-1;
  }
}

document.getElementById("sumar").addEventListener("click", sumarPersona);
document.getElementById("restar").addEventListener("click", restarPersona);


