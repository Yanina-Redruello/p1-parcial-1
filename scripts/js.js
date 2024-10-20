// main.js

// Array para almacenar los discos
let coleccionDiscos = [];
function cargar() {
  // Solicitar y validar el nombre del disco
  let nombreDisco = validarString("Ingresa el nombre del disco:");

  // Solicitar y validar el autor o banda del disco
  let autorDisco = validarString("Ingresa el autor o banda del disco:");

  // Solicitar y validar el código único del disco
  let codigoDisco, codigoRepetido;
  do {
    codigoDisco = validarNumero("Ingresa el código único del disco (1-999):", 1, 999);
    codigoRepetido = codigoExistente(codigoDisco);
    if (codigoRepetido) {
      alert("El código ingresado ya existe. Por favor, ingresa otro código.");
    }
  } while (codigoRepetido);
  

  
  // Solicitar y validar la imagen de portada
  let imagenPortada = solicitarImagen("Ingresa la URL de la imagen de portada del disco ");
  
  
  // Crear una instancia de Disco, incluyendo la imagen de portada
  let disco = new Disco(nombreDisco, autorDisco, codigoDisco, imagenPortada);


  // Cargar las pistas del disco
  let agregarOtraPista;
  do {
    // Solicitar y validar el nombre de la pista
    let nombrePista = validarString("Ingresar el nombre de la pista:");

    // Solicitar y validar la duración de la pista
    let duracionPista = validarNumero("Ingresar la duración de la pista en segundos (0-7200):", 0, 7200);

    // Crear una instancia de Pista y agregarla al disco
    let pista = new Pista(nombrePista, duracionPista);
    disco.agregarPista(pista);

    // Preguntar si desea agregar otra pista
    agregarOtraPista = confirm("¿Desea agregar otra pista?");
  } while (agregarOtraPista);

  // Agregar el disco a la colección
  coleccionDiscos.push(disco);

  // Mostrar mensaje de éxito
  alert(`El disco "${disco.nombre}" fue agregado a la colección.`);
}

// Función para verificar si el código del disco ya existe
function codigoExistente(codigo) {
  return coleccionDiscos.some(disco => disco.codigo === codigo);
}


function mostrar() {
  // Obtener el contenedor donde se mostrarán los discos
  const contenedor = document.getElementById("albumContainer");
  contenedor.innerHTML = ""; // Limpiar el contenido previo

  // Verificar si hay discos cargados
  if (coleccionDiscos.length === 0) {
    contenedor.innerHTML = "<p>No hay discos cargados.</p>";
    return;
  }

  // Recorremos la colección de discos
  for (let disco of coleccionDiscos) {
    // Crear el contenedor principal del disco
    let discoDiv = document.createElement("div");
    discoDiv.classList.add("album-card");

    // Crear y agregar la imagen de portada
    let img = document.createElement("img");
    img.src = disco.imagenPortada; // agrego la imagen que cargan
    img.alt = `Portada del Disco ${disco.nombre}`;
    img.classList.add("album-cover");
    discoDiv.appendChild(img);

    // Crear el contenedor de información del disco
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("album-info");

    // Añadir el nombre del disco
    let titulo = document.createElement("h2");
    titulo.textContent = disco.nombre;
    infoDiv.appendChild(titulo);

    // Añadir el autor o banda
    let autor = document.createElement("p");
    autor.innerHTML = `<strong>Autor/Banda:</strong> ${disco.autor}`;
    infoDiv.appendChild(autor);

    // Crear la lista de pistas
    let listaPistas = document.createElement("ul");

    // Variables para cálculos adicionales
    let duracionTotalDisco = 0;

    // Recorremos las pistas del disco
    for (let i = 0; i < disco.pistas.length; i++) {
      let pista = disco.pistas[i];

      // Crear un elemento de lista para la pista
      let pistaItem = document.createElement("li");

      // Formatear la duración
      let duracionFormateada = pista.getDuracionFormateada();


      // si la duración es mayor a 3 minutos la destaco
      if (pista.duracion > 180) {
        pistaItem.classList.add("duracion-larga");
      }

      pistaItem.innerHTML = `<strong>Tema ${i + 1}:</strong> ${pista.nombre} - ${duracionFormateada}`;
      listaPistas.appendChild(pistaItem);

      // Acumular la duracion total
      duracionTotalDisco += pista.duracion;
    }

    infoDiv.appendChild(listaPistas);



    // Calcular y mostrar la duración total del disco
    let duracionTotalFormateada = formatearDuracion(duracionTotalDisco);
    let duracionTotalParrafo = document.createElement("p");
    duracionTotalParrafo.innerHTML = `<strong>Duración total del disco:</strong> ${duracionTotalFormateada}`;
    infoDiv.appendChild(duracionTotalParrafo);

    // Agregar la información al discoDiv
    discoDiv.appendChild(infoDiv);

    // Agregar el discoDiv al contenedor principal
    contenedor.appendChild(discoDiv);
    
  }

  
}

// Función para formatear la duración total en HH:MM:SS
function formatearDuracion(duracionEnSegundos) {
  let horas = Math.floor(duracionEnSegundos / 3600);
  let minutos = Math.floor((duracionEnSegundos % 3600) / 60);
  let segundos = duracionEnSegundos % 60;

  let duracionFormateada = "";

  if (horas > 0) {
    duracionFormateada += `${horas}:`;
  }

  duracionFormateada += `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

  return duracionFormateada;
}
