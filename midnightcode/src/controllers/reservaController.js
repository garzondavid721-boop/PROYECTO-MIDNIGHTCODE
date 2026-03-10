const reservaService = require("../services/reservaService");
const logger = require("../config/logger");

exports.getAll = async (req,res,next)=>{

  try{

    logger.info({
      event:"LISTAR_RESERVAS",
      user:req.user?.id
    });

    const reservas = await reservaService.getAll(req.user);

    res.json(reservas);

  }catch(err){

    logger.error({
      event:"ERROR_LISTAR_RESERVAS",
      error:err.message
    });

    next(err);

  }

};

exports.getMisReservas = async (req,res,next)=>{

  try{

    logger.info({
      event:"MIS_RESERVAS",
      user:req.user?.id
    });

    const reservas = await reservaService.getByUsuario(req.user);

    res.json(reservas);

  }catch(err){

    logger.error({
      event:"ERROR_MIS_RESERVAS",
      error:err.message
    });

    next(err);

  }

};

exports.create = async (req,res,next)=>{

  try{

    logger.info({
      event:"CREAR_RESERVA",
      user:req.user?.id
    });

    const reserva = await reservaService.create(
      req.body,
      req.user
    );

    res.json(reserva);

  }catch(err){

    logger.error({
      event:"ERROR_CREAR_RESERVA",
      error:err.message
    });

    next(err);

  }

};

exports.update = async (req,res,next)=>{

  try{

    logger.info({
      event:"ACTUALIZAR_RESERVA",
      id:req.params.id
    });

    const reserva = await reservaService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(reserva);

  }catch(err){

    logger.error({
      event:"ERROR_ACTUALIZAR_RESERVA",
      error:err.message
    });

    next(err);

  }

};

exports.delete = async (req,res,next)=>{

  try{

    logger.info({
      event:"ELIMINAR_RESERVA",
      id:req.params.id
    });

    await reservaService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Reserva eliminada"
    });

  }catch(err){

    logger.error({
      event:"ERROR_ELIMINAR_RESERVA",
      error:err.message
    });

    next(err);

  }

};

exports.getMesasDisponibles = async(req,res,next)=>{

  try{

    logger.info({
      event:"MESAS_DISPONIBLES",
      fecha:req.query.fecha,
      hora:req.query.hora
    });

    const mesas = await reservaService.getMesasDisponibles(
      req.query.fecha,
      req.query.hora
    );

    res.json(mesas);

  }catch(err){

    logger.error({
      event:"ERROR_MESAS_DISPONIBLES",
      error:err.message
    });

    next(err);

  }

};

exports.getParqueaderosDisponibles = async(req,res,next)=>{

  try{

    logger.info({
      event:"PARQUEADEROS_DISPONIBLES"
    });

    const data = await reservaService.getParqueaderosDisponibles(
      req.query.fecha,
      req.query.hora
    );

    res.json(data);

  }catch(err){

    logger.error({
      event:"ERROR_PARQUEADEROS_DISPONIBLES",
      error:err.message
    });

    next(err);

  }

};

exports.bloquearMesa = async(req,res,next)=>{

  try{

    logger.info({
      event:"BLOQUEAR_MESA_TEMPORAL",
      user:req.user?.id
    });

    const data = await reservaService.bloquearMesa(
      req.body,
      req.user
    );

    res.json(data);

  }catch(err){

    logger.error({
      event:"ERROR_BLOQUEAR_MESA",
      error:err.message
    });

    next(err);

  }

};