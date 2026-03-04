const prisma = require('../config/database');

class ReservaRepository {

  create(data) {
    return prisma.reserva.create({ data });
  }

  findByUser(doc) {
    return prisma.reserva.findMany({
      where: { doc_identidad: doc }
    });
  }

  findActiveByUser(doc) {
    return prisma.reserva.findFirst({
      where: {
        doc_identidad: doc,
        estado: 'Pendiente'
      }
    });
  }

  update(id, data) {
    return prisma.reserva.update({
      where: { id_reserva: id },
      data
    });
  }

  findAll() {
    return prisma.reserva.findMany();
  }
}

module.exports = new ReservaRepository();