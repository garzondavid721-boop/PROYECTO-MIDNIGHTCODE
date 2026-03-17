const prisma = require("../config/database");

class DetalleVentaRepository {

  async create(data, tx = prisma){

    return tx.detalleVenta.create({
      data
    });

  }

  async findByVenta(idVenta){

    return prisma.detalleVenta.findMany({

      where:{
        id_venta:Number(idVenta)
      },

      include:{
        producto:true
      }

    });

  }

  async deleteByVenta(idVenta){

    return prisma.detalleVenta.deleteMany({

      where:{
        id_venta:Number(idVenta)
      }

    });

  }

}

module.exports = new DetalleVentaRepository();