// Opcional: clase model para Horario
class Horario {
  constructor({ id_horario, doc_identidad, dia_semana, hora_entrada, hora_salida, estado }) {
    this.id_horario = id_horario;
    this.doc_identidad = doc_identidad;
    this.dia_semana = dia_semana;
    this.hora_entrada = hora_entrada;
    this.hora_salida = hora_salida;
    this.estado = estado ?? true;
  }

  // Puedes agregar métodos aquí, por ejemplo:
  isActive() {
    return this.estado;
  }
}

module.exports = Horario;