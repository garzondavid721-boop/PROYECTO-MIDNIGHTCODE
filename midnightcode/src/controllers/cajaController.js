const cajaService = require("../services/cajaService");

exports.abrirCaja = async(req,res,next)=>{

  try{

    const caja = await cajaService.abrirCaja(
      req.body,
      req.user
    );

    res.json(caja);

  }catch(err){
    next(err);
  }

};

exports.cajaActual = async(req,res,next)=>{

  try{

    const caja = await cajaService.cajaActual(req.user);

    res.json(caja);

  }catch(err){
    next(err);
  }

};

exports.cerrarCaja = async(req,res,next)=>{

  try{

    const caja = await cajaService.cerrarCaja(req.user);

    res.json(caja);

  }catch(err){
    next(err);
  }

};

exports.totalHoy = async(req,res,next)=>{

  try{

    const total = await cajaService.totalVendidoHoy(req.user);

    res.json(total);

  }catch(err){
    next(err);
  }

};

exports.ventasHoy = async(req,res,next)=>{

  try{

    const ventas = await cajaService.ventasDelDia(req.user);

    res.json(ventas);

  }catch(err){
    next(err);
  }

};

exports.topProductos = async(req,res,next)=>{

  try{

    const top = await cajaService.topProductos(req.user);

    res.json(top);

  }catch(err){
    next(err);
  }

};