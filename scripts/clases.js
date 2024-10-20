// Clase Pista
class Pista {
    constructor(nombre, duracion) {
      this.nombre = nombre;
      this.duracion = duracion; 
    }
  
    // met ppara duracion en mmyss
    getDuracionFormateada() {
      let minutos = Math.floor(this.duracion / 60);
      let segundos = this.duracion % 60;
      return `${minutos}:${segundos.toString().padStart(2, '0')}`;
    }
  }
  
  // Clase Disco
  class Disco {
    constructor(nombre, autor, codigo,imagenPortada) {
      this.nombre = nombre;
      this.autor = autor;
      this.codigo = codigo;
      this.imagenPortada = imagenPortada; 
      this.pistas = []; 
    }
  
    // Met paraagregar un tema al cd
    agregarPista(pista) {
      this.pistas.push(pista);
    }
  

  }
  