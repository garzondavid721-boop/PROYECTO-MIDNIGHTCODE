const prisma = require("../config/database");

class HorarioRepository {

  async findAll() {
    return prisma.horario.findMany({
      include: { usuario: true }
    });
  }

  async findByDocumento(doc) {
    return prisma.horario.findMany({
      where: {
        doc_identidad: Number(doc)
      }
    });
  }

  async findById(id) {
    return prisma.horario.findUnique({
      where: { id_horario: Number(id) }
    });
  }

  async create(data) {
    return prisma.horario.create({
      data
    });
  }

  async update(id, data) {
    return prisma.horario.update({
      where: { id_horario: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.horario.delete({
      where: { id_horario: Number(id) }
    });
  }

}

module.exports = new HorarioRepository();