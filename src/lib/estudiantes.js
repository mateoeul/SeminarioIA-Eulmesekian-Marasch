import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = './data/alumnos.json';


class Estudiantes {
  constructor() {
    this.estudiantes = [];
    this.cargarEstudiantesDesdeJson(); // <-- Esto es clave
  }
 
  cargarEstudiantesDesdeJson() {
    try {
        const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
        this.estudiantes = data.alumnos || [];
    } catch (e) {
        console.error("Error al leer el archivo de datos:", e);
    }
  }


  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      this.cargarEstudiantesDesdeJson();
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }


  // Agregar estudiante
  agregarEstudiante(nombre, apellido, curso) {
    this.estudiantes.push({ nombre, apellido, curso });
  }


  // Buscar estudiante por nombre (parcial, insensible a mayúsculas)
  buscarEstudiantePorNombre(nombre) {
    const nombreLower = nombre.toLowerCase();
    return this.estudiantes.filter(e => e.nombre.toLowerCase().includes(nombreLower));
  }


  // Buscar estudiante por apellido (parcial, insensible a mayúsculas)
  buscarEstudiantePorApellido(apellido) {
    const apellidoLower = apellido.toLowerCase();
    return this.estudiantes.filter(e => e.apellido.toLowerCase().includes(apellidoLower));
  }


  // Listar todos los estudiantes
  listarEstudiantes() {
    return this.estudiantes;
  }
}


export { Estudiantes }
