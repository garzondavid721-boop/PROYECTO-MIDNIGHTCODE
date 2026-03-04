const prisma = require('../config/database');

setInterval(async () => {

  const now = new Date();

  const expiradas = await prisma.reserva.findMany({
    where: {
      estado: 'Pendiente',
      fecha_expiracion: {
        lt: now
      }
    }
  });

  for (const reserva of expiradas) {

    await prisma.mesa.update({
      where: { cod_mesa: reserva.cod_mesa },
      data: { estado_mesa: 1 }
    });

    if (reserva.cod_parqueadero) {
      await prisma.parqueadero.update({
        where: { cod_parqueadero: reserva.cod_parqueadero },
        data: { estado_par: 1 }
      });
    }

    await prisma.reserva.update({
      where: { id_reserva: reserva.id_reserva },
      data: { estado: 'Cancelada' }
    });

  }

}, 60000); // revisa cada minuto