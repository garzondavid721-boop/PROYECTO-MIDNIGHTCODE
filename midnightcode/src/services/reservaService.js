const reservaRepo = require('../repositories/reservaRepository');
const prisma = require('../config/database');

class ReservaService {

  async create(data, user) {

    if (!user) throw new Error('Debe estar logueado');

    const existing = await reservaRepo.findActiveByUser(user.id);

    if (existing)
      throw new Error('Ya tienes una reserva activa');

    const mesa = await prisma.mesa.findUnique({
      where: { cod_mesa: data.cod_mesa }
    });

    if (!mesa || mesa.estado_mesa === false)
      throw new Error('Mesa no disponible');

    await prisma.mesa.update({
      where: { cod_mesa: data.cod_mesa },
      data: { estado_mesa: false }
    });

    if (data.cod_parqueadero) {
      await prisma.parqueadero.update({
        where: { cod_parqueadero: data.cod_parqueadero },
        data: { estado_par: false }
      });
    }
    const prisma = require('../config/prisma'); // o donde tengas prisma
    exports.getById = async (id) => {
    return await prisma.reserva.findUnique({
       where: {
          id_reserva: Number(id)
        }
  });
};
    const expiracion = new Date(Date.now() + 15 * 60 * 1000);

    return reservaRepo.create({
      ...data,
      doc_identidad: user.id,
      fecha_expiracion: expiracion
    });
  }


  getAll(user) {
    if (user.rol === 'ADMIN' || user.rol === 'EMPLEADO')
      return reservaRepo.findAll();

    return reservaRepo.findByUser(user.id);
  }
  
}

module.exports = new ReservaService();