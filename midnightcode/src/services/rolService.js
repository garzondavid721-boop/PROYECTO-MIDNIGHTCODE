const prisma = require("../config/database");

class RolService {

  async create(data) {
    const existe = await prisma.rol.findUnique({
      where: { nombre: data.nombre }
    });

    if (existe) throw new Error("El rol ya existe");

    return prisma.rol.create({ data });
  }

  async getAll() {
    return prisma.rol.findMany();
  }

  async getById(id) {
    const rol = await prisma.rol.findUnique({
      where: { id }
    });

    if (!rol) throw new Error("Rol no encontrado");

    return rol;
  }

  async update(id, data) {
    await this.getById(id);

    return prisma.rol.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    const usuarios = await prisma.usuario.findMany({
      where: { rolId: id }
    });

    if (usuarios.length > 0)
      throw new Error("No se puede eliminar un rol con usuarios asignados");

    return prisma.rol.delete({
      where: { id }
    });
  }
}

module.exports = new RolService();