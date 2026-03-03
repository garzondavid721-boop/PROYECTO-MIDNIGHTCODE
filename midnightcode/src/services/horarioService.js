const horarioRepository = require('../repositories/horarioRepository');

class HorarioService {

  async getAll() {
    return await horarioRepository.getAll();
  }

  async getById(id, user) {

    const horario = await horarioRepository.getById(id);

    if (!horario)
      throw new Error('Horario no encontrado');

    if (
      user.rol === 'EMPLEADO' &&
      horario.doc_identidad !== user.id
    ) {
      throw new Error('No autorizado');
    }

    return horario;
  }

  async create(data) {
    return await horarioRepository.create(data);
  }
}

module.exports = new HorarioService();