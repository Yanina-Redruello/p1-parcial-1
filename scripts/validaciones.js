// Validar que no este vacío y no sea un numero solo
function validarString(mensaje) {
  let datoValido;
  let valor;

  do {
    valor = prompt(mensaje);

    if (valor === null || valor.trim() === "") {
      alert("Por favor, complete el campo.");
      datoValido = false;
    } else if (!isNaN(valor)) {
      alert("Por favor, ingrese texto, no números.");
      datoValido = false;
    } else {
      datoValido = true;
    }
  } while (!datoValido);

  return valor.trim();
}

// Validar q esté en rango
function validarNumero(mensaje, min, max) {
  let datoValido;
  let valor;

  do {
    valor = parseInt(prompt(mensaje));

    if (isNaN(valor)) {
      alert("Por favor, ingrese un número válido.");
      datoValido = false;
    } else if (valor < min || valor > max) {
      alert(`El número debe estar entre ${min} y ${max}.`);
      datoValido = false;
    } else {
      datoValido = true;
    }
  } while (!datoValido);

  return valor;
}


// pido la URL


function solicitarImagen(mensaje) {
  let datoValido;
  let valor;

  do {
    valor = prompt(mensaje);

    // Valido
    if (valor === null || valor === "") {
      let usarImagenPorDefecto = confirm("No se ingresó ninguna imagen. ¿Utilizamos la imagen por defecto?");
      if (usarImagenPorDefecto) {
        valor = "cds.jpg"; // si no cargan nada, pongo la img por def
        datoValido = true;
      } else {
        alert("Por favor, ingrese el link de la portada del disco.");
        datoValido = false;
      }
    } else {
      datoValido = true;
    }
  } while (!datoValido);

  return valor; 
}