const prisma = require("../config/database");

class CancionRepository {

  async findAll() {
    return prisma.cancion.findMany({
      orderBy: {
        numero_fila: "asc"
      },
      include: {
        usuario: true
      }
    });
  }

  async findLast() {
    return prisma.cancion.findFirst({
      orderBy: {
        numero_fila: "desc"
      }
    });
  }

  async create(data) {
    return prisma.cancion.create({
      data
    });
  }

  async update(id, data) {
    return prisma.cancion.update({
      where: { id_cancion: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.cancion.delete({
      where: { id_cancion: Number(id) }
    });
  }

  async deleteAll() {
    return prisma.cancion.deleteMany();
  }

}

module.exports = new CancionRepository();