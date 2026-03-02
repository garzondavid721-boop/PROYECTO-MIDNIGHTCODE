const horarioRepository = require('../repositories/horarioRepository');

class HorarioService {
  async getAll() {
    return await horarioRepository.getAll();
  }

  async getById(id) {
    return await horarioRepository.getById(id);
  }

  async create(data) {
    // Validaciones opcionales
    return await horarioRepository.create(data);
  }

  async update(id, data) {
    return await horarioRepository.update(id, data);
  }

  async delete(id) {
    return await horarioRepository.delete(id);
  }
}

module.exports = new HorarioService();