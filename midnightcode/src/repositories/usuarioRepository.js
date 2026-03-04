const prisma = require('../config/database');

class UsuarioRepository {

  async findAll() {
    return await prisma.usuario.findMany({
      include: { rol: true }
    });
  }

  async findById(id) {
    return await prisma.usuario.findUnique({
      where: { doc_identidad: id },
      include: { rol: true }
    });
  }

  async findByEmail(correo) {
  return await prisma.usuario.findUnique({
    where: { correo_usu: correo },
    include: { rol: true }
  });
}

  async create(data) {
    return await prisma.usuario.create({ data });
  }

  async update(id, data) {
    return await prisma.usuario.update({
      where: { doc_identidad: id },
      data
    });
  }

  async delete(id) {
    return await prisma.usuario.delete({
      where: { doc_identidad: id }
    });
  }
}

module.exports = new UsuarioRepository();