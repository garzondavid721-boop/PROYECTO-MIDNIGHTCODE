const productoService = require("../services/productoService");
const logger = require("../config/logger");

exports.getAll = async (req,res,next) => {

  try{

    logger.info({
      event:"LISTAR_PRODUCTOS",
      user:req.user?.id
    });

    const productos = await productoService.getAll(req.user);

    res.json(productos);

  }catch(err){

    logger.error({
      event:"ERROR_LISTAR_PRODUCTOS",
      error:err.message
    });

    next(err);
  }

};

exports.getById = async (req,res,next) => {

  try{

    logger.info({
      event:"BUSCAR_PRODUCTO",
      id:req.params.id
    });

    const producto = await productoService.getById(
      req.params.id,
      req.user
    );

    res.json(producto);

  }catch(err){

    logger.error({
      event:"ERROR_BUSCAR_PRODUCTO",
      error:err.message
    });

    next(err);
  }

};

exports.create = async (req,res,next) => {

  try{

    logger.info({
      event:"CREAR_PRODUCTO",
      user:req.user?.id
    });

    const producto = await productoService.create(
      req.body,
      req.user
    );

    res.json(producto);

  }catch(err){

    logger.error({
      event:"ERROR_CREAR_PRODUCTO",
      error:err.message
    });

    next(err);
  }

};

exports.update = async (req,res,next) => {

  try{

    logger.info({
      event:"ACTUALIZAR_PRODUCTO",
      id:req.params.id
    });

    const producto = await productoService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(producto);

  }catch(err){

    logger.error({
      event:"ERROR_ACTUALIZAR_PRODUCTO",
      error:err.message
    });

    next(err);
  }

};

exports.delete = async (req,res,next) => {

  try{

    logger.info({
      event:"ELIMINAR_PRODUCTO",
      id:req.params.id
    });

    await productoService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Producto eliminado"
    });

  }catch(err){

    logger.error({
      event:"ERROR_ELIMINAR_PRODUCTO",
      error:err.message
    });

    next(err);
  }

};