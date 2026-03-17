const parqueaderoService = require("../services/parqueaderoService");
const logger = require("../config/logger");

exports.getAll = async(req,res,next)=>{
  try{

    logger.info({
      event:"LISTAR_PARQUEADEROS"
    });

    const parqueaderos = await parqueaderoService.getAll();

    res.json(parqueaderos);

  }catch(err){

    logger.error({
      event:"ERROR_LISTAR_PARQUEADEROS",
      error:err.message
    });

    next(err);
  }
};

exports.create = async(req,res,next)=>{
  try{

    logger.info({
      event:"CREAR_PARQUEADERO",
      user:req.user?.id
    });

    const parqueadero = await parqueaderoService.create(
      req.body,
      req.user
    );

    res.json(parqueadero);

  }catch(err){

    logger.error({
      event:"ERROR_CREAR_PARQUEADERO",
      error:err.message
    });

    next(err);
  }
};

exports.update = async(req,res,next)=>{
  try{

    logger.info({
      event:"ACTUALIZAR_PARQUEADERO",
      id:req.params.id
    });

    const parqueadero = await parqueaderoService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(parqueadero);

  }catch(err){

    logger.error({
      event:"ERROR_ACTUALIZAR_PARQUEADERO",
      error:err.message
    });

    next(err);
  }
};

exports.delete = async(req,res,next)=>{
  try{

    logger.info({
      event:"ELIMINAR_PARQUEADERO",
      id:req.params.id
    });

    await parqueaderoService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Parqueadero eliminado"
    });

  }catch(err){

    logger.error({
      event:"ERROR_ELIMINAR_PARQUEADERO",
      error:err.message
    });

    next(err);
  }
};