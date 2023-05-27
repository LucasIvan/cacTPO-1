//---------------------------------- BOTONES SUMAR/RESTAR PERSONAS ---------------------------------------

var fecha = new Date().toISOString().substr(0, 10);
document.getElementById("check-in").value = fecha;
document.getElementById("check-out").value = fecha;

function sumarPersona() {
  var input = document.getElementById("personas");
  if (input.value < 10) {
    input.value = parseInt(input.value) + 1;
  }
}

function restarPersona() {
  var input = document.getElementById("personas");
  if (input.value > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

document.getElementById("sumar").addEventListener("click", sumarPersona);
document.getElementById("restar").addEventListener("click", restarPersona);

//--------------------------------------------------------------------------------------------------------
//--------------------------------- DESPLAZAMIENTO AL ANCLA ---------------------------------------------- 

var enlacesAncla = document.querySelectorAll('.enlace-ancla');
enlacesAncla.forEach(function (enlace) {
  enlace.addEventListener('click', function (event) {
    event.preventDefault();

    var destino = document.querySelector(this.getAttribute('href'));
    var destinoMov = destino.offsetTop;

    var alturaViewport = window.innerHeight;
    var posicion = destinoMov - (alturaViewport / 4);

    scrollToSmoothly(posicion, 300);
    /*window.scrollTo({
      top: posicionDeseada,
      behavior: 'smooth'
    });*/
  });
});

function scrollToSmoothly(posicion, duracion) {
  var inicio = window.pageYOffset || document.documentElement.scrollTop;
  var cambio = posicion - inicio;
  var intervalos = 20;
  var tiempoPorIntervalo = duracion / intervalos;

  function animarScroll(intervalo) {
    var porcentaje = intervalo / intervalos;
    var desplazamiento = inicio + cambio * Math.sin(porcentaje * Math.PI / 2);

    window.scrollTo(0, desplazamiento);

    if (intervalo < intervalos) {
      setTimeout(function () {
        animarScroll(intervalo + 1);
      }, tiempoPorIntervalo);
    }
  }

  animarScroll(0);
}

//--------------------------------------------------------------------------------------------------------
//---------------------------------------- Random User API -----------------------------------------------
var tarjetasContainer = document.querySelector('.tarjetas');
var tarjetas = tarjetasContainer.querySelectorAll('.tarjeta');
var tarjetasCount = tarjetas.length;
var currentIndex = 0;

fetch('https://randomuser.me/api/?results=6')
  .then(response => response.json())
  .then(data => {
    data.results.forEach((user, index) => {
      var tarjeta = tarjetas[index];
      var avatar = tarjeta.querySelector('.avatar');
      avatar.style.backgroundImage = `url(${user.picture.medium})`;
      var nombre = tarjeta.querySelector('.nombre');
      nombre.textContent = `${user.name.first} ${user.name.last}`;
      var pais = tarjeta.querySelector('.pais');
      pais.textContent = user.location.country;
    });

    setInterval(() => {
      var currentTarjeta = tarjetas[currentIndex];
      var nextIndex = (currentIndex + 1) % tarjetasCount;
      var nextTarjeta = tarjetas[nextIndex];

      nextTarjeta.style.opacity = '0';

      currentTarjeta.style.transform = 'translateX(-100%)';
      nextTarjeta.style.transform = 'translateX(0)';

      setTimeout(() => {
        tarjetasContainer.appendChild(currentTarjeta);
        currentTarjeta.style.transform = 'none';

        setTimeout(() => {
          currentTarjeta.style.opacity = '1';
          nextTarjeta.style.opacity = '1';
        }, 40);

        currentIndex = nextIndex;
      }, 400);
    }, 5000);
  })
  .catch(error => {
    console.log('Error al obtener los datos de la API:', error);
  });



//--------------------------------------------------------------------------------------------------------
//--------------------------------------- Mostrar Formulario ---------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formulario');
  const btnContacto = document.getElementById('btn-contacto');

  formulario.classList.add('invisible');

  btnContacto.addEventListener('click', function () {
    formulario.classList.toggle('invisible');
    formulario.classList.toggle('visible');
    btnContacto.classList.add('hidden');
  });

  document.addEventListener('click', function (event) {
    if (!formulario.contains(event.target) && !btnContacto.contains(event.target)) {
      formulario.classList.add('invisible');
      formulario.classList.remove('visible');
      btnContacto.classList.remove('hidden');
    }
  });
});

//--------------------------------------------------------------------------------------------------------
//------------------------------- Animación de los campos Formulario -------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formulario');
  const campos = formulario.querySelectorAll('input, textarea');

  campos.forEach(function (campo) {
    campo.addEventListener('input', function () {
      if (campo.value !== '') {
        campo.nextElementSibling.classList.add('filled');
      } else {
        campo.nextElementSibling.classList.remove('filled');
      }
    });
  });
});

//--------------------------------------------------------------------------------------------------------
//------------------------------ Verificaciones de campos Formulario -------------------------------------
/** INPUT TELEFONO SOLO NUMEROS Y FORMATO */
const numeroInput = document.getElementById('telefono');

numeroInput.addEventListener('input', function (event) {
  const numero = event.target.value.replace(/\D/g, '');
  const formatoTelefono = formatearTelefono(numero);
  numeroInput.value = formatoTelefono;
});

function formatearTelefono(numero) {
  const codigoArea = numero.slice(0, 3);
  const primeraParte = numero.slice(3, 6);
  const segundaParte = numero.slice(6, 10);
  let formatoTelefono = '';
  if (codigoArea) {
    formatoTelefono += '(' + codigoArea + ')';
  }
  if (primeraParte) {
    formatoTelefono += ' ' + primeraParte;
  }
  if (segundaParte) {
    formatoTelefono += '-' + segundaParte;
  }
  return formatoTelefono;
}

/** VALIDACION EMAIL */
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

emailInput.addEventListener('input', function (event) {
  const email = event.target.value;
  const isValidEmail = validarEmail(email);

  emailError.style.visibility = isValidEmail ? 'hidden' : 'visible';
  emailInput.classList.toggle('invalid', !isValidEmail);
});

function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

emailInput.addEventListener('input', function (event) {
  const email = event.target.value;
  if (email === '') {
    emailError.style.visibility = 'hidden';
    emailInput.classList.remove('invalid');
  }
});

//--------------------------------------------------------------------------------------------------------
//----------------------------------- Validación del Formulario ------------------------------------------

  const form = document.getElementById('form-id');
  const mensajeExito = document.getElementById('mensaje-exito');
  const mensajeExitoTexto = document.getElementById('mensaje-exito-texto');

  const mensajeError = document.getElementById('mensaje-error');
  const mensajeErrorTexto = document.getElementById('mensaje-error-texto');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    validarFormulario();
  });

  function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre) {
      mostrarMensajeError('Por favor ingrese su nombre');
      return false;
    } else if (!email) {
      mostrarMensajeError('Por favor ingrese una dirección de correo electrónico');
      return false;
    } else if (!validateEmail(email)) {
      mostrarMensajeError('Ingrese un correo electrónico válido');
      return false;
    } else if (!telefono) {
      mostrarMensajeError('Por favor ingrese un número de teléfono');
      return false;
    } else if (!mensaje) {
      mostrarMensajeError('Por favor ingrese el mensaje');
      return false;
    }

    mostrarMensajeExito('Gracias por contactarnos');
    form.reset();
    return true;
  }

function mostrarMensajeExito(mensaje) {
  mensajeExitoTexto.textContent = mensaje;
  mensajeExito.style.visibility = 'visible';
  mensajeExito.style.opacity = '1';

  setTimeout(function() {
    mensajeExito.style.visibility = 'hidden';
    mensajeExito.style.opacity = '0';

    formulario.classList.add('invisible');
    formulario.classList.remove('visible');
    btnContacto.classList.remove('hidden');
  }, 2000);
}
  function mostrarMensajeError(mensaje) {
    mensajeErrorTexto.textContent = mensaje;
    mensajeError.style.visibility = 'visible';
    mensajeError.style.opacity = '1';

    setTimeout(function() {
      mensajeError.style.visibility = 'hidden';
      mensajeError.style.opacity = '0';
    }, 2000);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

//--------------------------------------------------------------------------------------------------------
//---------------------------------------- BOTON DE SCROLL -----------------------------------------------

window.addEventListener('scroll', function() {
  var btnScroll = document.getElementById('btn-scroll');
  if (window.pageYOffset > 300) {
    btnScroll.classList.add('show');
  } else {
    btnScroll.classList.remove('show');
  }
});


document.getElementById('btn-scroll').addEventListener('click', function() {
  const scrollToTop = () => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, -180);
      requestAnimationFrame(scrollToTop);
    }
  };
  
  scrollToTop();
});

//--------------------------------------------------------------------------------------------------------
//--------------------------------------- CARROUSEL VIDEOS -----------------------------------------------
/*
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let player1, player2;

function createYouTubePlayers() {
  player1 = new YT.Player('player1', {
    videoId: '6stlCkUDG_s',
    events: {
      'onStateChange': onPlayerStateChange1
    }
  });

  player2 = new YT.Player('player2', {
    videoId: 'ZjbFDYoE-OY',
    events: {
      'onStateChange': onPlayerStateChange2
    }
  });
}

function onPlayerStateChange1(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player1.setOpacity(0);
    player2.setOpacity(1);
    player2.playVideo();
  }
}

function onPlayerStateChange2(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player1.setOpacity(1);
    player2.setOpacity(0);
    player1.playVideo();
  }
}

window.onYouTubeIframeAPIReady = createYouTubePlayers;
loadYouTubeAPI();

*/
//-----------------------------------------------------

// Cargar la API de YouTube
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let player1, player2;

// Crear los reproductores de YouTube
function createYouTubePlayers() {
  player1 = new YT.Player('player1', {
    videoId: 'ZjbFDYoE-OY',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
      loop: 1,
      playlist: 'ZjbFDYoE-OY'
    },
    events: {
      'onStateChange': onPlayerStateChange1
    }
  });

  player2 = new YT.Player('player2', {
    videoId: '6stlCkUDG_s',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
      loop: 1,
      playlist: '6stlCkUDG_s'
    },
    events: {
      'onStateChange': onPlayerStateChange2
    }
  });
}

function onPlayerStateChange1(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player1.stopVideo();
    player1.clearVideo();
    player1.loadVideoById('ZjbFDYoE-OY');
    player1.playVideo();
  }
}

function onPlayerStateChange2(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player2.stopVideo();
    player2.clearVideo();
    player2.loadVideoById('6stlCkUDG_s');
    player2.playVideo();
  }
}

window.onYouTubeIframeAPIReady = createYouTubePlayers;
loadYouTubeAPI();
