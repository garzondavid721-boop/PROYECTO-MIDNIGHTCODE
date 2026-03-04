const rolService = require("../services/rolService");

exports.create = async (req, res, next) => {
  try {
    const rol = await rolService.create(req.body);
    res.status(201).json(rol);
  } catch (err) {
    next(err);
  }
};

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
    const rol = await rolService.getById(Number(req.params.id));
    res.json(rol);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const rol = await rolService.update(Number(req.params.id), req.body);
    res.json(rol);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await rolService.delete(Number(req.params.id));
    res.json({ message: "Rol eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};