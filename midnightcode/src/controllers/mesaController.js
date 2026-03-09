const mesaService = require("../services/mesaService");

exports.getAll = async(req,res,next)=>{
  try{

    const mesas = await mesaService.getAll();

    res.json(mesas);

  }catch(err){
    next(err);
  }
};

exports.create = async(req,res,next)=>{
  try{

    const mesa = await mesaService.create(
      req.body,
      req.user
    );

    res.json(mesa);

  }catch(err){
    next(err);
  }
};

exports.update = async(req,res,next)=>{
  try{

    const mesa = await mesaService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(mesa);

  }catch(err){
    next(err);
  }
};

exports.delete = async(req,res,next)=>{
  try{

    await mesaService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Mesa eliminada"
    });

  }catch(err){
    next(err);
  }
};