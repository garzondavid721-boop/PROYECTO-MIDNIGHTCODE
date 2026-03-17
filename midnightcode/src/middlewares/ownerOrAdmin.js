module.exports = (req, res, next) => {

  const userId = Number(req.user.id);
  const userRol = Number(req.user.rol);
  const paramId = Number(req.params.id);

  // SI ES ADMIN
  if (userRol === 1) {
    return next();
  }

  // SI ES EL MISMO USUARIO
  if (userId === paramId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "No autorizado"
  });

};