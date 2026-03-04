const reservaRepo = require('../repositories/reservaRepository');
const prisma = require('../config/database');

class ReservaService {

  async create(data, user) {

    //  Validar login
    if (!user) {
      const error = new Error('Debe estar logueado');
      error.statusCode = 401;
      throw error;
    }

    //  Validar body
    if (!data || Object.keys(data).length === 0) {
      const error = new Error('Debe enviar datos en el body');
      error.statusCode = 400;
      throw error;
    }

    //  Validar cod_mesa obligatorio
    if (!data.cod_mesa) {
      const error = new Error('cod_mesa es obligatorio');
      error.statusCode = 400;
      throw error;
    }

    const codMesa = Number(data.cod_mesa);

    if (isNaN(codMesa)) {
      const error = new Error('cod_mesa debe ser un número válido');
      error.statusCode = 400;
      throw error;
    }

    //  Validar parqueadero si se envía
    let codParqueadero = null;

    if (data.cod_parqueadero) {
      codParqueadero = Number(data.cod_parqueadero);

      if (isNaN(codParqueadero)) {
        const error = new Error('cod_parqueadero debe ser un número válido');
        error.statusCode = 400;
        throw error;
      }
    }

    //  Verificar reserva activa
    const existing = await reservaRepo.findActiveByUser(user.id);

    if (existing) {
      const error = new Error('Ya tienes una reserva activa');
      error.statusCode = 400;
      throw error;
    }

    //  Buscar mesa
    const mesa = await prisma.mesa.findUnique({
      where: { cod_mesa: codMesa }
    });

    if (!mesa) {
      const error = new Error('La mesa no existe');
      error.statusCode = 404;
      throw error;
    }

    if (mesa.estado_mesa === false) {
      const error = new Error('Mesa no disponible');
      error.statusCode = 400;
      throw error;
    }

    //  Ocupar mesa
    await prisma.mesa.update({
      where: { cod_mesa: codMesa },
      data: { estado_mesa: false }
    });

    //  Ocupar parqueadero si viene
    if (codParqueadero) {

      const parqueadero = await prisma.parqueadero.findUnique({
        where: { cod_parqueadero: codParqueadero }
      });

      if (!parqueadero) {
        const error = new Error('El parqueadero no existe');
        error.statusCode = 404;
        throw error;
      }

      if (parqueadero.estado_par === false) {
        const error = new Error('Parqueadero no disponible');
        error.statusCode = 400;
        throw error;
      }

      await prisma.parqueadero.update({
        where: { cod_parqueadero: codParqueadero },
        data: { estado_par: false }
      });
    }

    //  Fecha expiración 15 min
    const expiracion = new Date(Date.now() + 15 * 60 * 1000);

    return reservaRepo.create({
      cod_mesa: codMesa,
      cod_parqueadero: codParqueadero,
      doc_identidad: user.id,
      fecha_expiracion: expiracion,
      estado: 'Pendiente'
    });
  }

  async getAll(user) {

    if (!user) {
      const error = new Error('Debe estar logueado');
      error.statusCode = 401;
      throw error;
    }

    if (user.rol === 'ADMIN' || user.rol === 'EMPLEADO') {
      return reservaRepo.findAll();
    }

    return reservaRepo.findByUser(user.id);
  }

  async getById(id) {

    if (!id || isNaN(Number(id))) {
      const error = new Error('id_reserva inválido');
      error.statusCode = 400;
      throw error;
    }

    return prisma.reserva.findUnique({
      where: { id_reserva: Number(id) }
    });
  }

}

module.exports = new ReservaService();