const ventaService = require("../services/ventaService");

exports.getAll = async(req,res,next)=>{
  try{

    const ventas = await ventaService.getAll(req.user);

    res.json(ventas);

  }catch(err){
    next(err);
  }
};

exports.getById = async(req,res,next)=>{
  try{

    const venta = await ventaService.getById(
      req.params.id,
      req.user
    );

    res.json(venta);

  }catch(err){
    next(err);
  }
};

exports.getPendientes = async(req,res,next)=>{
  try{

    const ventas = await ventaService.getPendientes(req.user);

    res.json(ventas);

  }catch(err){
    next(err);
  }
};

exports.getByCodigo = async(req,res,next)=>{
  try{

    const venta = await ventaService.getByCodigo(
      req.params.codigo,
      req.user
    );

    res.json(venta);

  }catch(err){
    next(err);
  }
};

exports.create = async(req,res,next)=>{
  try{

    const venta = await ventaService.create(
      req.body,
      req.user
    );

    res.json(venta);

  }catch(err){
    next(err);
  }
};

exports.pagar = async(req,res,next)=>{
  try{

    const venta = await ventaService.pagar(
      req.params.id,
      req.body,
      req.user
    );

    res.json(venta);

  }catch(err){
    next(err);
  }
};

exports.update = async(req,res,next)=>{
  try{

    const venta = await ventaService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(venta);

  }catch(err){
    next(err);
  }
};

exports.delete = async(req,res,next)=>{
  try{

    await ventaService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Venta eliminada"
    });

  }catch(err){
    next(err);
  }
};