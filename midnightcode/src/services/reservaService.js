const reservaRepository = require("../repositories/reservaRepository");
const prisma = require("../config/database");

class ReservaService {

  obtenerRol(user){
    return Number(user.cod_rol || user.rol);
  }

  obtenerDocumento(user){
    return Number(user.doc_identidad || user.id);
  }

  validarUsuario(user){

    if(!user){
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }

    return this.obtenerRol(user);
  }

  validarCampos(data){

    const camposFaltantes=[];

    if(!data.cod_mesa) camposFaltantes.push("cod_mesa");
    if(!data.cod_parqueadero) camposFaltantes.push("cod_parqueadero");
    if(!data.fecha_reserva) camposFaltantes.push("fecha_reserva");
    if(!data.hora_reserva) camposFaltantes.push("hora_reserva");
    if(!data.cantidad_personas) camposFaltantes.push("cantidad_personas");
    if(data.incluye_cover===undefined) camposFaltantes.push("incluye_cover");

    if(camposFaltantes.length>0){

      const error=new Error("Faltan campos obligatorios");
      error.statusCode=400;
      error.fields=camposFaltantes;
      throw error;

    }

  }

  async getAll(user){

    const rol=this.validarUsuario(user);

    if(rol!==1){
      throw new Error("Solo admin puede ver todas las reservas");
    }

    return reservaRepository.findAll();

  }

  async getByUsuario(user){

    const rol=this.validarUsuario(user);

    if(rol!==3){
      throw new Error("Solo clientes pueden ver sus reservas");
    }

    const doc=this.obtenerDocumento(user);

    return reservaRepository.findByUsuario(doc);

  }

  async create(data,user){

    const rol=this.validarUsuario(user);

    if(rol!==3){
      throw new Error("Solo clientes pueden crear reservas");
    }

    this.validarCampos(data);

    const doc=this.obtenerDocumento(user);

    const expiracion=new Date();
    expiracion.setMinutes(expiracion.getMinutes()+15);

    const reserva=await prisma.$transaction(async(tx)=>{

      const mesaOcupada=await tx.reserva.findFirst({

        where:{
          cod_mesa:Number(data.cod_mesa),
          fecha_reserva:new Date(data.fecha_reserva),
          hora_reserva:new Date(`1970-01-01T${data.hora_reserva}`),
          estado_temporal:"Activa"
        }

      });

      if(mesaOcupada){
        throw new Error("Mesa ocupada");
      }

      return tx.reserva.create({

        data:{
          doc_identidad:doc,
          cod_mesa:data.cod_mesa,
          cod_parqueadero:data.cod_parqueadero,
          fecha_reserva:new Date(data.fecha_reserva),
          hora_reserva:new Date(`1970-01-01T${data.hora_reserva}`),
          cantidad_personas:data.cantidad_personas,
          incluye_cover:data.incluye_cover,
          estado:"Pendiente",
          estado_temporal:"Activa",
          fecha_expiracion:expiracion
        }

      });

    });

    //  SOCKET EVENTO
    if(global.io){
      global.io.emit("reserva_creada",reserva);
    }

    return reserva;

  }

  async bloquearMesa(data,user){

    const expiracion=new Date();
    expiracion.setMinutes(expiracion.getMinutes()+15);

    const bloqueo=await prisma.reserva.create({

      data:{
        doc_identidad:this.obtenerDocumento(user),
        cod_mesa:data.cod_mesa,
        cod_parqueadero:data.cod_parqueadero,
        fecha_reserva:new Date(data.fecha_reserva),
        hora_reserva:new Date(`1970-01-01T${data.hora_reserva}`),
        cantidad_personas:0,
        incluye_cover:false,
        estado:"Bloqueada",
        estado_temporal:"Activa",
        fecha_expiracion:expiracion
      }

    });

    if(global.io){
      global.io.emit("mesa_bloqueada",bloqueo);
    }

    return bloqueo;

  }

  async update(id,data,user){

    const rol=this.validarUsuario(user);

    if(rol!==1){
      throw new Error("Solo admin");
    }

    return reservaRepository.update(id,data);

  }

  async delete(id,user){

    const rol=this.validarUsuario(user);

    if(rol!==1){
      throw new Error("Solo admin");
    }

    return reservaRepository.delete(id);

  }

  async getMesasDisponibles(fecha,hora){

    const mesas=await prisma.mesa.findMany();

    const reservas=await prisma.reserva.findMany({

      where:{
        fecha_reserva:new Date(fecha),
        hora_reserva:new Date(`1970-01-01T${hora}`),
        estado_temporal:"Activa"
      }

    });

    const ocupadas=reservas.map(r=>r.cod_mesa);

    return mesas.filter(m=>!ocupadas.includes(m.cod_mesa));

  }

  async getParqueaderosDisponibles(fecha,hora){

    const parqueaderos=await prisma.parqueadero.findMany();

    const reservas=await prisma.reserva.findMany({

      where:{
        fecha_reserva:new Date(fecha),
        hora_reserva:new Date(`1970-01-01T${hora}`),
        estado_temporal:"Activa"
      }

    });

    const ocupados=reservas.map(r=>r.cod_parqueadero);

    return parqueaderos.filter(p=>!ocupados.includes(p.cod_parqueadero));

  }

}

module.exports=new ReservaService();