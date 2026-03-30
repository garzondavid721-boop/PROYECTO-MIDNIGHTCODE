const prisma = require("../config/database");

class CajaRepository {

  async abrir(data){

    return prisma.caja.create({
      data
    });

  }

  async cajaAbierta(){

    return prisma.caja.findFirst({

      where:{
        estado:"Abierta"
      }

    });

  }

  async cerrar(id,data){

    return prisma.caja.update({

      where:{
        id_caja:id
      },

      data

    });

  }

}

module.exports = new CajaRepository();