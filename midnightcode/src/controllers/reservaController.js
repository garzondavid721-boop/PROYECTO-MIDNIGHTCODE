const reservaService = require("../services/reservaService");

exports.getAll = async (req,res,next)=>{

  try{

    const reservas = await reservaService.getAll(req.user);

    res.json(reservas);

  }catch(err){

    next(err);

  }

};

exports.getMisReservas = async (req,res,next)=>{

  try{

    const reservas = await reservaService.getByUsuario(req.user);

    res.json(reservas);

  }catch(err){

    next(err);

  }

};

exports.create = async (req,res,next)=>{

  try{

    const reserva = await reservaService.create(
      req.body,
      req.user
    );

    res.json(reserva);

  }catch(err){

    next(err);

  }

};

exports.update = async (req,res,next)=>{

  try{

    const reserva = await reservaService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(reserva);

  }catch(err){

    next(err);

  }

};

exports.delete = async (req,res,next)=>{

  try{

    await reservaService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success:true,
      message:"Reserva eliminada"
    });

  }catch(err){

    next(err);

  }

};

exports.getMesasDisponibles = async(req,res,next)=>{

  try{

    const {fecha,hora} = req.query;

    const mesas = await reservaService.getMesasDisponibles(fecha,hora);

    res.json(mesas);

  }catch(err){

    next(err);

  }

};

exports.getParqueaderosDisponibles = async(req,res,next)=>{

  try{

    const {fecha,hora} = req.query;

    const data = await reservaService.getParqueaderosDisponibles(fecha,hora);

    res.json(data);

  }catch(err){

    next(err);

  }

};

//  BLOQUEAR MESA TEMPORALMENTE
exports.bloquearMesa = async(req,res,next)=>{

  try{

    const data = await reservaService.bloquearMesa(
      req.body,
      req.user
    );

    res.json(data);

  }catch(err){

    next(err);

  }

};