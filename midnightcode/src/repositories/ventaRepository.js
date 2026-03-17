const prisma = require("../config/database");

class VentaRepository {

  async findAll(){

    return prisma.venta.findMany({

      include:{
        usuario:true,
        reserva:true,
        metodoPago:true,
        detalles:{
          include:{
            producto:true
          }
        }
      }

    });

  }

  async findById(id){

    return prisma.venta.findUnique({

      where:{
        id_venta:Number(id)
      },

      include:{
        usuario:true,
        reserva:true,
        metodoPago:true,
        detalles:{
          include:{
            producto:true
          }
        }
      }

    });

  }

  async create(data, tx = prisma){

    return tx.venta.create({
      data
    });

  }

  async update(id,data){

    return prisma.venta.update({

      where:{
        id_venta:Number(id)
      },

      data

    });

  }

  async delete(id){

    return prisma.venta.delete({

      where:{
        id_venta:Number(id)
      }

    });

  }

}

module.exports = new VentaRepository();