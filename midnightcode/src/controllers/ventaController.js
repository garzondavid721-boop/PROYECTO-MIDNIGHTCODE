const ventaService = require("../services/ventaService");
const logger = require("../config/logger");

exports.getToday = async(req,res,next)=>{
  try{
    logger.info({ event:"VENTAS_HOY", user:req.user?.id });
    const ventas = await ventaService.getToday(req.user);
    res.json(ventas);
  }catch(err){
    logger.error({ event:"ERROR_VENTAS_HOY", error:err.message });
    next(err);
  }
};

exports.getAll = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTAS_LISTAR",
      user:req.user?.id
    });

    const ventas = await ventaService.getAll(req.user);

    res.json(ventas);

  }catch(err){

    logger.error({
      event:"ERROR_VENTAS_LISTAR",
      error:err.message
    });

    next(err);
  }
};

exports.getById = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTA_CONSULTAR",
      venta:req.params.id,
      user:req.user?.id
    });

    const venta = await ventaService.getById(
      req.params.id,
      req.user
    );

    res.json(venta);

  }catch(err){

    logger.error({
      event:"ERROR_VENTA_CONSULTAR",
      error:err.message
    });

    next(err);
  }
};

exports.getPendientes = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTAS_PENDIENTES",
      user:req.user?.id
    });

    const ventas = await ventaService.getPendientes(req.user);

    res.json(ventas);

  }catch(err){

    logger.error({
      event:"ERROR_VENTAS_PENDIENTES",
      error:err.message
    });

    next(err);
  }
};

exports.getByCodigo = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTA_BUSCAR_CODIGO",
      codigo:req.params.codigo,
      user:req.user?.id
    });

    const venta = await ventaService.getByCodigo(
      req.params.codigo,
      req.user
    );

    res.json(venta);

  }catch(err){

    logger.error({
      event:"ERROR_VENTA_BUSCAR_CODIGO",
      error:err.message
    });

    next(err);
  }
};

exports.create = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTA_CREAR",
      user:req.user?.id
    });

    const venta = await ventaService.create(
      req.body,
      req.user
    );

    res.json(venta);

  }catch(err){

    logger.error({
      event:"ERROR_VENTA_CREAR",
      error:err.message
    });

    next(err);
  }
};

exports.pagar = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTA_PAGAR",
      venta:req.params.id,
      user:req.user?.id
    });

    const venta = await ventaService.pagar(
      req.params.id,
      req.body,
      req.user
    );

    res.json(venta);

  }catch(err){

    logger.error({
      event:"ERROR_VENTA_PAGAR",
      error:err.message
    });

    next(err);
  }
};

exports.update = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTA_ACTUALIZAR",
      venta:req.params.id,
      user:req.user?.id
    });

    const venta = await ventaService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(venta);

  }catch(err){

    logger.error({
      event:"ERROR_VENTA_ACTUALIZAR",
      error:err.message
    });

    next(err);
  }
};

exports.delete = async(req,res,next)=>{
  try{

    logger.info({
      event:"VENTA_ELIMINAR",
      venta:req.params.id,
      user:req.user?.id
    });

    await ventaService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Venta eliminada"
    });

  }catch(err){

    logger.error({
      event:"ERROR_VENTA_ELIMINAR",
      error:err.message
    });

    next(err);
  }
};