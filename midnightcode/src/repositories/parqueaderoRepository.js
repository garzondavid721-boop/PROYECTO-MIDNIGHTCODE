const mesaRepo = require('../repositories/parqueaderoRepository');

class ParqueaderoService {

  getAll() {
    return parqueaderoRepo.findAll();
  }

  async update(id, data, user) {
    if (user.rol !== 'ADMIN')
      throw new Error('Solo admin puede modificar mesas');

    return parqueaderoRepo.update(id, data);
  }
}

module.exports = new ParqueaderoService();