const prisma = require("../config/database");

async function liberarReservas(){

  const ahora = new Date();

  await prisma.reserva.updateMany({

    where:{
      estado:"Pendiente",
      estado_temporal:"Activa",
      fecha_expiracion:{
        lt: ahora
      }
    },

    data:{
      estado:"Cancelada",
      estado_temporal:"Expirada"
    }

  });

}

module.exports = liberarReservas;