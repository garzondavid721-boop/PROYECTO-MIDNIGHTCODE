const mesaService = require("../services/mesaService");
const logger = require("../config/logger");

exports.getAll = async (req,res,next)=>{
  try{

    logger.info({
      event:"LISTAR_MESAS"
    });

    const mesas = await mesaService.getAll();

    res.json(mesas);

  }catch(err){

    logger.error({
      event:"ERROR_LISTAR_MESAS",
      error:err.message
    });

    next(err);
  }
};

exports.create = async (req,res,next)=>{
  try{

    logger.info({
      event:"CREAR_MESA",
      user:req.user?.id
    });

    const mesa = await mesaService.create(
      req.body,
      req.user
    );

    res.json(mesa);

  }catch(err){

    logger.error({
      event:"ERROR_CREAR_MESA",
      error:err.message
    });

    next(err);
  }
};

exports.update = async (req,res,next)=>{
  try{

    logger.info({
      event:"ACTUALIZAR_MESA",
      id:req.params.id,
      user:req.user?.id
    });

    const mesa = await mesaService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(mesa);

  }catch(err){

    logger.error({
      event:"ERROR_ACTUALIZAR_MESA",
      error:err.message
    });

    next(err);
  }
};

exports.delete = async (req,res,next)=>{
  try{

    logger.info({
      event:"ELIMINAR_MESA",
      id:req.params.id,
      user:req.user?.id
    });

    await mesaService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Mesa eliminada"
    });

  }catch(err){

    logger.error({
      event:"ERROR_ELIMINAR_MESA",
      error:err.message
    });

    next(err);
  }
};