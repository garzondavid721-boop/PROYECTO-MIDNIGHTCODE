const parqueaderoService = require("../services/parqueaderoService");

exports.getAll = async(req,res,next)=>{
  try{

    const parqueaderos = await parqueaderoService.getAll();

    res.json(parqueaderos);

  }catch(err){
    next(err);
  }
};

exports.create = async(req,res,next)=>{
  try{

    const parqueadero = await parqueaderoService.create(
      req.body,
      req.user
    );

    res.json(parqueadero);

  }catch(err){
    next(err);
  }
};

exports.update = async(req,res,next)=>{
  try{

    const parqueadero = await parqueaderoService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(parqueadero);

  }catch(err){
    next(err);
  }
};

exports.delete = async(req,res,next)=>{
  try{

    await parqueaderoService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Parqueadero eliminado"
    });

  }catch(err){
    next(err);
  }
};