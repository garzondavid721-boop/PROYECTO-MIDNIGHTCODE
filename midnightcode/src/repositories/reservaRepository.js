const prisma = require("../config/database");

class ReservaRepository {

  async findAll(){

    return prisma.reserva.findMany({

      include:{
        usuario:true,
        mesa:true,
        parqueadero:true
      }

    });

  }

  async findByUsuario(doc){

    return prisma.reserva.findMany({

      where:{
        doc_identidad:Number(doc)
      },

      include:{
        mesa:true,
        parqueadero:true
      }

    });

  }

  async findById(id){

    return prisma.reserva.findUnique({

      where:{
        id_reserva:Number(id)
      }

    });

  }

  //  VALIDAR SI MESA ESTA OCUPADA EN ESA FECHA Y HORA
  async findMesaOcupada(cod_mesa,fecha,hora){

    return prisma.reserva.findFirst({

      where:{
        cod_mesa:Number(cod_mesa),
        fecha_reserva:new Date(fecha),
        hora_reserva:new Date(`1970-01-01T${hora}`),
        estado_temporal:"Activa"
      }

    });

  }

  //  VALIDAR SI PARQUEADERO ESTA OCUPADO EN ESA FECHA Y HORA
  async findParqueaderoOcupado(cod_parqueadero,fecha,hora){

    return prisma.reserva.findFirst({

      where:{
        cod_parqueadero:Number(cod_parqueadero),
        fecha_reserva:new Date(fecha),
        hora_reserva:new Date(`1970-01-01T${hora}`),
        estado_temporal:"Activa"
      }

    });

  }

  async create(data){

    return prisma.reserva.create({

      data

    });

  }

  async update(id,data){

    return prisma.reserva.update({

      where:{
        id_reserva:Number(id)
      },

      data

    });

  }

  async delete(id){

    return prisma.reserva.delete({

      where:{
        id_reserva:Number(id)
      }

    });

  }

}

module.exports = new ReservaRepository();