const prisma = require("../config/database");
const cajaRepository = require("../repositories/cajaRepository");

class CajaService {

  obtenerDocumento(user){
    return Number(user.doc_identidad || user.id);
  }

  obtenerRol(user){
    return Number(user.cod_rol || user.rol);
  }

  validarAdmin(user){

    if(!user){
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }

    const rol = this.obtenerRol(user);

    if(rol !== 1){
      const error = new Error("Solo el administrador puede usar caja");
      error.statusCode = 403;
      throw error;
    }

  }

  async abrirCaja(data,user){

    this.validarAdmin(user);

    const { monto_inicial } = data;

    const camposFaltantes = [];

    if(monto_inicial === undefined || monto_inicial === null){
      camposFaltantes.push("monto_inicial");
    }

    if(camposFaltantes.length > 0){
      const error = new Error("Faltan campos obligatorios");
      error.statusCode = 400;
      error.fields = camposFaltantes;
      throw error;
    }

    const monto = Number(monto_inicial);

    if(!Number.isFinite(monto) || monto <= 0){
      const error = new Error("El monto inicial debe ser un número mayor a 0");
      error.statusCode = 400;
      throw error;
    }

    const cajaAbierta = await cajaRepository.cajaAbierta();

    if(cajaAbierta){
      const error = new Error("Ya existe una caja abierta");
      error.statusCode = 400;
      throw error;
    }

    const doc = this.obtenerDocumento(user);

    return cajaRepository.abrir({

      doc_identidad:doc,
      monto_inicial:monto

    });

  }

  async cajaActual(user){

    this.validarAdmin(user);

    return cajaRepository.cajaAbierta();

  }

  async cerrarCaja(user){

    this.validarAdmin(user);

    const caja = await cajaRepository.cajaAbierta();

    if(!caja){
      const error = new Error("No hay caja abierta");
      error.statusCode = 400;
      throw error;
    }

    const ventas = await prisma.venta.aggregate({

      where:{
        id_caja:caja.id_caja,
        estado:"Pagada"
      },

      _sum:{
        total:true
      }

    });

    const totalVentas = ventas._sum.total || 0;

    const montoFinal = Number(caja.monto_inicial) + Number(totalVentas);

    return cajaRepository.cerrar(caja.id_caja,{

      estado:"Cerrada",
      monto_final:montoFinal,
      fecha_cierre:new Date()

    });

  }

  async totalVendidoHoy(user){

    this.validarAdmin(user);

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    const ventas = await prisma.venta.aggregate({

      where:{
        fecha:{
          gte:hoy
        },
        estado:"Pagada"
      },

      _sum:{
        total:true
      }

    });

    return {
      total: ventas._sum.total || 0
    };

  }

  async ventasDelDia(user){

    this.validarAdmin(user);

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    return prisma.venta.findMany({

      where:{
        fecha:{
          gte:hoy
        },
        estado:"Pagada"
      },

      include:{
        detalles:true,
        usuario:true
      }

    });

  }

  async topProductos(user){

    this.validarAdmin(user);

    return prisma.detalleVenta.groupBy({

      by:["cod_producto"],

      _sum:{
        cantidad:true
      },

      orderBy:{
        _sum:{
          cantidad:"desc"
        }

      },

      take:5

    });

  }

}

module.exports = new CajaService();