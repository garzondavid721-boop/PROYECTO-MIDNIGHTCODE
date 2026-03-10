const productoService = require("../services/productoService");

exports.getAll = async (req,res,next) => {

  try{

    const productos = await productoService.getAll(req.user);

    res.json(productos);

  }catch(err){
    next(err);
  }

};


exports.getById = async (req,res,next) => {

  try{

    const producto = await productoService.getById(
      req.params.id,
      req.user
    );

    res.json(producto);

  }catch(err){
    next(err);
  }

};


exports.create = async (req,res,next) => {

  try{

    const producto = await productoService.create(
      req.body,
      req.user
    );

    res.json(producto);

  }catch(err){
    next(err);
  }

};


exports.update = async (req,res,next) => {

  try{

    const producto = await productoService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(producto);

  }catch(err){
    next(err);
  }

};


exports.delete = async (req,res,next) => {

  try{

    await productoService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Producto eliminado"
    });

  }catch(err){
    next(err);
  }

};