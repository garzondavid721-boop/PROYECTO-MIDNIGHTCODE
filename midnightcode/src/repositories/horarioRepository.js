const prisma = require('../config/database');

class HorarioRepository {
  async getAll() {
    return await prisma.horario.findMany();
  }

  async getById(id) {
    return await prisma.horario.findUnique({ where: { id_horario: id } });
  }

  async create(data) {
    return await prisma.horario.create({ data });
  }

  async update(id, data) {
    return await prisma.horario.update({
      where: { id_horario: id },
      data,
    });
  }

  async delete(id) {
    return await prisma.horario.delete({ where: { id_horario: id } });
  }
}

module.exports = new HorarioRepository();