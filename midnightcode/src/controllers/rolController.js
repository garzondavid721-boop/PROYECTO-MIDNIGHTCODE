const rolService = require("../services/rolService");

exports.getAll = async (req, res, next) => {
  try {

    const roles = await rolService.getAll();

    res.json(roles);

  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {

    const rol = await rolService.getById(req.params.id);

    res.json(rol);

  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {

    const rol = await rolService.create(req.body);

    res.json({
      success: true,
      message: "Rol creado",
      data: rol
    });

  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {

    const rol = await rolService.update(req.params.id, req.body);

    res.json(rol);

  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {

    await rolService.delete(req.params.id);

    res.json({
      success: true,
      message: "Rol eliminado"
    });

  } catch (err) {
    next(err);
  }
};