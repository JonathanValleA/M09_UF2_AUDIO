// Recuperamos los elementos de la página
const tituloCancion = document.getElementById("titulo-cancion");
const artistaCancion = document.getElementById("artista-cancion");
const botonReproducir = document.querySelector("#play");
const botonPausar = document.querySelector("#pause");
const botonAnterior = document.querySelector("#anterior");
const botonSiguiente = document.querySelector("#siguiente");
let controlVolumen = document.getElementById("volumen");
let volumenValor = document.getElementById("volumen-valor");
let audio = document.getElementById("audio");

// Contador para el índice de la canción actual
let indiceCancionActual = 0;

// Hacer una petición fetch a mi archivo JSON
async function cargarCanciones() {
  // Definir mi respuesta con el fetch
  const respuesta = await fetch("http://localhost/actividad_audio/canciones.json");
  // Guardar todas los datos y convertirlo en Json
  canciones = await respuesta.json();
  // Mostrar las canciones y toda la información de mi reproductor
  // que estan en la siguiente funcion
  mostrarCancion();
}

// Funcion para mostrar toda la información de mi JSON
function mostrarCancion() {
  // Obtener la cancion actual (1r cancion)
  const cancion = canciones[indiceCancionActual];
  // Mostrar los datos del reproductor que hay en mi JSON
  document.querySelector("#portada").src = cancion.imagen;
  document.querySelector("#titulo-cancion").textContent = cancion.nombre;
  document.querySelector("#artista").textContent = cancion.artista;
  document.querySelector("#tiempo").textContent = cancion.tiempo;

  document.querySelector("#mp3_source").src = cancion.archivo;
}

// Funcion para darle al anterior cancion
botonAnterior.addEventListener("click", function() {
  // Pasar a la canción anterior con -1
  indiceCancionActual = indiceCancionActual - 1;
  // En caso de que la cancion actual sea menos a 0
  if (indiceCancionActual < 0) {
    // Si es menos que 0, significa que estamos en la 1r cancion, por lo tanto se pasa a la ultima cancion que hay
    indiceCancionActual = canciones.length - 1;
  }

    // Lo actualizamos y mostramos la cancion actual en la que estamos ahora
    mostrarCancion();
    if(audio.paused) {
      return;
    }
    audio.load();
});

// Funcion para pasar de cancion
botonSiguiente.addEventListener("click", function() {
  // Hacer lo mismo pero esta vez incrementar 1 para pasar a la siguiente cancion
  indiceCancionActual = indiceCancionActual + 1;

  // En caso de que la cancion sea igual a todas las canciones, es decir, si estamos en la ultima cancion
  if(indiceCancionActual == canciones.length) {
    // Actualizamos el indice de la cancion a 0 para mostrar la 1r cancion
    indiceCancionActual = 0;
  }

  // Lo actualizamos y mostramos la cancion actual en la que estamos ahora
  mostrarCancion();
    // Comprobamos si esta en pausa, no reproducimos el audio, es decir, no retornamos nada
    if(audio.paused) {
      return;
    }
    // Actualizamos el audio para reproducir la siguiente canción
    audio.load();
});

// Funcion para reproducir la cancion al darle click
botonReproducir.addEventListener("click", function() {
    // Actualizamos el audi
    audio.load();
    // En caso de que el audio esta en pausa
    if(audio.paused) {
      // Reproducimos el audio al play
      audio.play();
      // Y modificamos algunos cambios con el boton de pausa y play
      document.getElementById("play").style.display = "none";
      document.getElementById("pause").style.display = "inline";
      document.querySelector(".portada").classList.add("animated-images");
      document.querySelector(".portada").classList.remove("animated-images-pause");
    }
  
});

// Funcion para parar la cancion actual al darle click
botonPausar.addEventListener("click", function() {
  // En caso de que el audio se este reproduciendo
  if(!audio.paused) {
    // Le ponemos el audio en pausa
    audio.pause();
    // Y modificamos algunos cambios con el boton  de pausa y play
    document.getElementById("play").style.display = "inline";
    document.getElementById("pause").style.display = "none";
    document.querySelector(".portada").classList.add("animated-images-pause");
  }

});

// Actualizamos el contenido del elemento "volumenValor" con el valor actual del control "controlVolumen"
volumenValor.textContent = controlVolumen.value;

// Agregar un evento de tipo "change" al control "controlVolumen" que ajusta el volumen del objeto "audio" y actualiza "volumenValor"
controlVolumen.addEventListener("change", function() {

  audio.volume = controlVolumen.value / 100;

  volumenValor.textContent = controlVolumen.value;
});

// Cargamos todas las canciónes
cargarCanciones();