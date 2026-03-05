module.exports = (req, res, next) => {

  const idParametro = Number(req.params.id);
  const idToken = Number(req.user.id);
  const rol = Number(req.user.rol);

  // ADMIN puede ver todo
  if (rol === 1) {
    return next();
  }

  // usuario solo puede ver su propio registro
  if (idToken === idParametro) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "No autorizado"
  });

};