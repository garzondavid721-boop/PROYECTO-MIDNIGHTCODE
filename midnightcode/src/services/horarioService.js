const horarioRepository = require("../repositories/horarioRepository");

class HorarioService {

  convertirHora(hora) {
    const fecha = new Date(hora);
    const horas = fecha.getUTCHours();
    const minutos = fecha.getUTCMinutes();
    return horas * 60 + minutos;
  }

  obtenerRol(user) {
    return Number(user.rol || user.cod_rol);
  }

  obtenerDocumento(user) {
    return Number(user.id || user.doc_identidad);
  }

  validarUsuario(user) {
    if (!user) {
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }

    const rol = this.obtenerRol(user);

    if (rol !== 1 && rol !== 2) {
      const error = new Error("No autorizado");
      error.statusCode = 403;
      throw error;
    }

    return rol;
  }

  async getAll(user) {
    const rol = this.validarUsuario(user);

    if (rol !== 1) {
      const error = new Error("Solo el administrador puede ver todos los horarios");
      error.statusCode = 403;
      throw error;
    }

    return await horarioRepository.findAll();
  }

  async getByDocumento(doc, user) {
    const rol = this.validarUsuario(user);

    let documento;

    if (rol === 1) {
      // ADMIN puede consultar cualquier empleado
      documento = Number(doc);
      if (!Number.isFinite(documento)) {
        const error = new Error("Documento inválido");
        error.statusCode = 400;
        throw error;
      }
    }

    if (rol === 2) {
      // EMPLEADO solo puede ver su propio horario
      documento = this.obtenerDocumento(user);

      // si intenta pasar otro doc que no es suyo, negar
      if (Number(doc) !== documento) {
        const error = new Error("No autorizado para ver otro usuario");
        error.statusCode = 403;
        throw error;
      }
    }

    const horarios = await horarioRepository.findByDocumento(documento);

    if (!horarios || horarios.length === 0) {
      return {
        success: true,
        message: "No tienes ningún horario registrado",
        data: []
      };
    }

    return {
      success: true,
      data: horarios
    };
  }

  async create(data, user) {
    const rol = this.validarUsuario(user);

    if (rol !== 1) {
      const error = new Error("Solo el administrador puede crear horarios");
      error.statusCode = 403;
      throw error;
    }

    const { doc_identidad, dia_semana, hora_entrada, hora_salida, estado } = data;

    const camposFaltantes = [];
    if (!doc_identidad) camposFaltantes.push("doc_identidad");
    if (!dia_semana) camposFaltantes.push("dia_semana");
    if (!hora_entrada) camposFaltantes.push("hora_entrada");
    if (!hora_salida) camposFaltantes.push("hora_salida");
    if (estado === undefined) camposFaltantes.push("estado");

    if (camposFaltantes.length > 0) {
      const error = new Error("Faltan campos obligatorios");
      error.statusCode = 400;
      error.fields = camposFaltantes;
      throw error;
    }

    if (hora_entrada === hora_salida) {
      const error = new Error("La hora de entrada y salida no pueden ser iguales");
      error.statusCode = 400;
      throw error;
    }

    const entradaNueva = this.convertirHora(hora_entrada);
    const salidaNueva = this.convertirHora(hora_salida);

    const horarios = await horarioRepository.findByDocumento(doc_identidad) || [];

    for (const h of horarios) {
      if (h.dia_semana !== dia_semana) continue;

      const entradaExistente = this.convertirHora(h.hora_entrada);
      const salidaExistente = this.convertirHora(h.hora_salida);

      const seCruzan =
        entradaNueva < salidaExistente &&
        salidaNueva > entradaExistente;

      if (seCruzan) {
        const error = new Error("El empleado ya tiene un turno en ese horario");
        error.statusCode = 400;
        throw error;
      }
    }

    return await horarioRepository.create(data);
  }

  async update(id, data, user) {
    const rol = this.validarUsuario(user);

    if (rol !== 1) {
      const error = new Error("Solo el administrador puede modificar horarios");
      error.statusCode = 403;
      throw error;
    }

    return await horarioRepository.update(id, data);
  }

  async delete(id, user) {
    const rol = this.validarUsuario(user);

    if (rol !== 1) {
      const error = new Error("Solo el administrador puede eliminar horarios");
      error.statusCode = 403;
      throw error;
    }

    return await horarioRepository.delete(id);
  }
}

module.exports = new HorarioService();