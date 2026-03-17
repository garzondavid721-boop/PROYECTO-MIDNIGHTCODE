const prisma = require("../config/database");

class RolRepository {

  async findAll() {
    return prisma.rol.findMany({
      include: {
        usuarios: true
      }
    });
  }

  async findById(id) {
    return prisma.rol.findUnique({
      where: { cod_rol: Number(id) },
      include: {
        usuarios: true
      }
    });
  }

  async findByName(nombre) {
    return prisma.rol.findFirst({
      where: {
        nombre_rol: nombre
      }
    });
  }

  async create(data) {
    return prisma.rol.create({
      data
    });
  }

  async update(id, data) {
    return prisma.rol.update({
      where: { cod_rol: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.rol.delete({
      where: { cod_rol: Number(id) }
    });
  }

}

module.exports = new RolRepository();