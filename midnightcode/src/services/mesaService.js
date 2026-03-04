const mesaRepo = require('../repositories/mesaRepository');

class MesaService {

  getAll() {
    return mesaRepo.findAll();
  }

  async update(id, data, user) {
    if (user.rol !== 'ADMIN')
      throw new Error('Solo admin puede modificar mesas');

    return mesaRepo.update(id, data);
  }
}

module.exports = new MesaService();