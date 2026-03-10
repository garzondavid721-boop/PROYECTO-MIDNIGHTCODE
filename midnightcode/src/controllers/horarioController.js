const horarioService = require("../services/horarioService");
const logger = require("../config/logger");

exports.getAll = async (req, res, next) => {

  try {

    logger.info({
      event: "LISTAR_HORARIOS",
      user: req.user?.id
    });

    const horarios = await horarioService.getAll(req.user);

    res.json(horarios);

  } catch (err) {

    logger.error({
      event: "ERROR_LISTAR_HORARIOS",
      error: err.message
    });

    next(err);

  }

};

exports.getByDocumento = async (req, res, next) => {

  try {

    logger.info({
      event: "BUSCAR_HORARIO_DOCUMENTO",
      documento: req.params.doc
    });

    const horarios = await horarioService.getByDocumento(
      req.params.doc,
      req.user
    );

    res.json(horarios);

  } catch (err) {

    logger.error({
      event: "ERROR_BUSCAR_HORARIO",
      error: err.message
    });

    next(err);

  }

};

exports.create = async (req, res, next) => {

  try {

    logger.info({
      event: "CREAR_HORARIO",
      user: req.user?.id
    });

    const horario = await horarioService.create(req.body, req.user);

    res.json(horario);

  } catch (err) {

    logger.error({
      event: "ERROR_CREAR_HORARIO",
      error: err.message
    });

    next(err);

  }

};

exports.update = async (req, res, next) => {

  try {

    logger.info({
      event: "ACTUALIZAR_HORARIO",
      id: req.params.id
    });

    const horario = await horarioService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(horario);

  } catch (err) {

    logger.error({
      event: "ERROR_ACTUALIZAR_HORARIO",
      error: err.message
    });

    next(err);

  }

};

exports.delete = async (req, res, next) => {

  try {

    logger.info({
      event: "ELIMINAR_HORARIO",
      id: req.params.id
    });

    await horarioService.delete(req.params.id, req.user);

    res.json({
      success: true,
      message: "Horario eliminado"
    });

  } catch (err) {

    logger.error({
      event: "ERROR_ELIMINAR_HORARIO",
      error: err.message
    });

    next(err);

  }

};