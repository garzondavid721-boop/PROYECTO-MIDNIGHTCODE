const rolService = require("../services/rolService");
const logger = require("../config/logger");

exports.getAll = async (req,res,next)=>{

  try{

    logger.info({
      event:"LISTAR_ROLES"
    });

    const roles = await rolService.getAll();

    res.json(roles);

  }catch(err){

    logger.error({
      event:"ERROR_LISTAR_ROLES",
      error:err.message
    });

    next(err);

  }

};

exports.getById = async (req,res,next)=>{

  try{

    logger.info({
      event:"BUSCAR_ROL",
      id:req.params.id
    });

    const rol = await rolService.getById(req.params.id);

    res.json(rol);

  }catch(err){

    logger.error({
      event:"ERROR_BUSCAR_ROL",
      error:err.message
    });

    next(err);

  }

};

exports.create = async (req,res,next)=>{

  try{

    logger.info({
      event:"CREAR_ROL"
    });

    const rol = await rolService.create(req.body);

    res.json({
      success:true,
      message:"Rol creado",
      data:rol
    });

  }catch(err){

    logger.error({
      event:"ERROR_CREAR_ROL",
      error:err.message
    });

    next(err);

  }

};

exports.update = async (req,res,next)=>{

  try{

    logger.info({
      event:"ACTUALIZAR_ROL",
      id:req.params.id
    });

    const rol = await rolService.update(req.params.id,req.body);

    res.json(rol);

  }catch(err){

    logger.error({
      event:"ERROR_ACTUALIZAR_ROL",
      error:err.message
    });

    next(err);

  }

};

exports.delete = async (req,res,next)=>{

  try{

    logger.info({
      event:"ELIMINAR_ROL",
      id:req.params.id
    });

    await rolService.delete(req.params.id);

    res.json({
      success:true,
      message:"Rol eliminado"
    });

  }catch(err){

    logger.error({
      event:"ERROR_ELIMINAR_ROL",
      error:err.message
    });

    next(err);

  }

};