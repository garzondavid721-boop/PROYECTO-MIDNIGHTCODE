const horarioService = require("../services/horarioService");

exports.getAll = async (req, res, next) => {
  try {

    const horarios = await horarioService.getAll(req.user);

    res.json(horarios);

  } catch (err) {
    next(err);
  }
};

exports.getByDocumento = async (req, res, next) => {
  try {

    const horarios = await horarioService.getByDocumento(
      req.params.doc,
      req.user
    );

    res.json(horarios);

  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {

    const horario = await horarioService.create(
      req.body,
      req.user
    );

    res.json(horario);

  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {

    const horario = await horarioService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(horario);

  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {    

    await horarioService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      message: "Horario eliminado"
    });

  } catch (err) {
    next(err);
  }
};