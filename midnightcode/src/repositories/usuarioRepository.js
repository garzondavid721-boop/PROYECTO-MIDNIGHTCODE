const prisma = require('../config/database');

class UsuarioRepository {

  async findAll() {
    return await prisma.usuario.findMany({
      include: { rol: true }
    });
  }
  async findByTelefono(telefono) {
    return prisma.usuario.findFirst({
      where: {
        telefono_usu: telefono
      }
    });
  }
  async findById(id) {

    if (!id) {
      return null;
    }

    return await prisma.usuario.findUnique({
      where: { doc_identidad: Number(id) },
      include: { rol: true }
    });
  }

  async findByEmail(correo) {

    if (!correo) {
      return null;
    }

    return await prisma.usuario.findUnique({
      where: { correo_usu: correo },
      include: { rol: true }
    });
  }

  async create(data) {

    return await prisma.usuario.create({
      data: {
        ...data,
        doc_identidad: Number(data.doc_identidad),
        cod_rol: Number(data.cod_rol)
      }
    });

  }

  async update(id, data) {

    return await prisma.usuario.update({
      where: { doc_identidad: Number(id) },
      data
    });

  }

  async delete(id) {

    return await prisma.usuario.delete({
      where: { doc_identidad: Number(id) }
    });

  }

}

module.exports = new UsuarioRepository();