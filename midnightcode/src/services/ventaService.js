const prisma = require("../config/database");
const crypto = require("crypto");

const ventaRepository = require("../repositories/ventaRepository");
const detalleVentaRepository = require("../repositories/detalleVentaRepository");

class VentaService {

  obtenerRol(user) {
    return Number(user.cod_rol || user.rol);
  }

  obtenerDocumento(user) {
    return Number(user.doc_identidad || user.id);
  }

  validarUsuario(user) {
    if (!user) {
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }
    return this.obtenerRol(user);
  }

  validarAdmin(user) {
    const rol = this.obtenerRol(user);
    if (rol !== 1) {
      const error = new Error("Solo administrador");
      error.statusCode = 403;
      throw error;
    }
  }

  validarCamposVenta(data) {
    if (!data.detalles || !Array.isArray(data.detalles) || data.detalles.length === 0) {
      const error = new Error("Debe agregar al menos un producto");
      error.statusCode = 400;
      throw error;
    }
  }

  generarCodigoPago() {
    return crypto.randomInt(100000, 1000000);
  }

  async getAll(user) {
    const rol = this.validarUsuario(user);
    if (rol !== 1) {
      throw new Error("Solo admin puede ver ventas");
    }
    return ventaRepository.findAll();
  }

  async getById(id, user) {
    const venta = await ventaRepository.findById(id);
    if (!venta) {
      const error = new Error("Venta no encontrada");
      error.statusCode = 404;
      throw error;
    }
    const rol = this.obtenerRol(user);
    const docUsuario = this.obtenerDocumento(user);
    if (rol !== 1 && venta.doc_identidad !== docUsuario) {
      const error = new Error("No tienes permiso para ver esta venta");
      error.statusCode = 403;
      throw error;
    }
    return venta;
  }

  async getMisVentas(user) {
    const rol = this.obtenerRol(user);
    if (rol !== 3) {
      const error = new Error("Solo los clientes pueden ver sus propias ventas");
      error.statusCode = 403;
      throw error;
    }
    const doc = this.obtenerDocumento(user);
    const ventas = await prisma.venta.findMany({
      where: { doc_identidad: doc },
      include: {
        detalles: {
          include: { producto: true }
        }
      },
      orderBy: { fecha_venta: 'desc' }
    });
    return ventas;
  }

  async getPendientes(user) {
    this.validarAdmin(user);
    return prisma.venta.findMany({
      where: { estado: "Pendiente" },
      include: {
        usuario: true,
        detalles: {
          include: { producto: true }
        }
      }
    });
  }

  async getByCodigo(codigo, user) {
    this.validarAdmin(user);
    const venta = await prisma.venta.findFirst({
      where: { codigo_pago: Number(codigo) },
      include: {
        detalles: {
          include: { producto: true }
        }
      }
    });
    if (!venta) {
      const error = new Error("Venta no encontrada");
      error.statusCode = 404;
      throw error;
    }
    return venta;
  }

  async create(data, user) {
    this.validarUsuario(user);
    this.validarCamposVenta(data);

    const doc = this.obtenerDocumento(user);
    const codigoPago = this.generarCodigoPago();

    return prisma.$transaction(async (tx) => {
      const caja = await tx.caja.findFirst({
        where: { estado: "Abierta" }
      });

      if (!caja) {
        throw new Error("No hay caja abierta");
      }

      let total = 0;

      const venta = await ventaRepository.create({
        doc_identidad: doc,
        reserva_id: data.reserva_id,
        total: 0,
        estado: "Pendiente",
        codigo_pago: codigoPago,
        id_caja: caja.id_caja
      }, tx);

      for (const item of data.detalles) {
        const producto = await tx.producto.findUnique({
          where: { cod_producto: item.cod_producto }
        });

        if (!producto) {
          throw new Error("Producto no encontrado");
        }

        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para ${producto.nombre_produc}`);
        }

        const subtotal = Number(producto.precio_produc) * item.cantidad;
        total += subtotal;

        await detalleVentaRepository.create({
          id_venta: venta.id_venta,
          cod_producto: item.cod_producto,
          cantidad: item.cantidad,
          precio_produc: producto.precio_produc
        }, tx);
      }

      const ventaFinal = await tx.venta.update({
        where: { id_venta: venta.id_venta },
        data: { total }
      });

      return {
        ...ventaFinal,
        codigo_pago: codigoPago
      };
    });
  }

  async pagar(id, data, user) {
    this.validarAdmin(user);

    if (!data.cod_metodopago) {
      throw new Error("cod_metodopago es obligatorio");
    }

    return prisma.$transaction(async (tx) => {
      const venta = await tx.venta.findUnique({
        where: { id_venta: Number(id) },
        include: { detalles: true }
      });

      if (!venta) {
        throw new Error("Venta no encontrada");
      }

      if (venta.estado === "Pagada") {
        throw new Error("La venta ya está pagada");
      }

      for (const item of venta.detalles) {
        const producto = await tx.producto.findUnique({
          where: { cod_producto: item.cod_producto }
        });

        if (producto.stock < item.cantidad) {
          throw new Error("Stock insuficiente");
        }

        const nuevoStock = producto.stock - item.cantidad;
        await tx.producto.update({
          where: { cod_producto: item.cod_producto },
          data: { stock: nuevoStock }
        });

        await tx.movimiento.create({
          data: {
            cod_producto: item.cod_producto,
            cantidad: item.cantidad,
            tipo_movimiento: "Salida",
            descrip_movimineto: "Venta realizada"
          }
        });
      }

      return tx.venta.update({
        where: { id_venta: Number(id) },
        data: {
          cod_metodopago: data.cod_metodopago,
          estado: "Pagada"
        }
      });
    });
  }

  async update(id, data, user) {
    this.validarAdmin(user);
    return ventaRepository.update(id, data);
  }

  async delete(id, user) {
    this.validarAdmin(user);
    return ventaRepository.delete(id);
  }
}

module.exports = new VentaService();