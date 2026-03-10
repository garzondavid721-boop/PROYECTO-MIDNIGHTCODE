const prisma = require("../config/database");

class ProductoRepository {

  async findAll() {
    return prisma.producto.findMany();
  }

  async findById(id) {
    return prisma.producto.findUnique({
      where: {
        cod_producto: Number(id)
      }
    });
  }

  async create(data) {
    return prisma.producto.create({
      data
    });
  }

  async update(id, data) {
    return prisma.producto.update({
      where: {
        cod_producto: Number(id)
      },
      data
    });
  }

  async delete(id) {
    return prisma.producto.delete({
      where: {
        cod_producto: Number(id)
      }
    });
  }

}

module.exports = new ProductoRepository();