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

  for (const r of expiradas) {

    await prisma.mesa.update({
      where: { cod_mesa: r.cod_mesa },
      data: { estado_mesa: true }
    });

    if (r.cod_parqueadero) {
      await prisma.parqueadero.update({
        where: { cod_parqueadero: r.cod_parqueadero },
        data: { estado_par: true }
      });
    }

    await prisma.reserva.update({
      where: { id_reserva: r.id_reserva },
      data: { estado: 'Cancelada' }
    });
    
  }

}, 60000);