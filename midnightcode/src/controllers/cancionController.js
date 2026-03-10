const cancionService = require("../services/cancionService");
const logger = require("../config/logger");

exports.buscarYoutube = async (req, res, next) => {

  try {

    logger.info({
      event: "BUSQUEDA_YOUTUBE",
      query: req.query.q
    });

    const canciones = await cancionService.buscarYoutube(req.query.q);

    res.json({
      success: true,
      data: canciones
    });

  } catch (err) {

    logger.error({
      event: "ERROR_BUSQUEDA_YOUTUBE",
      error: err.message
    });

    next(err);

  }

};

exports.getAll = async (req, res, next) => {

  try {

    logger.info({
      event: "LISTAR_CANCIONES",
      user: req.user?.id
    });

    const canciones = await cancionService.getAll(req.user);

    res.json(canciones);

  } catch (err) {

    logger.error({
      event: "ERROR_LISTAR_CANCIONES",
      error: err.message
    });

    next(err);

  }

};

exports.create = async (req, res, next) => {

  try {

    logger.info({
      event: "CREAR_CANCION",
      user: req.user?.id
    });

    const cancion = await cancionService.create(req.body, req.user);

    res.json(cancion);

  } catch (err) {

    logger.error({
      event: "ERROR_CREAR_CANCION",
      error: err.message
    });

    next(err);

  }

};

exports.update = async (req, res, next) => {

  try {

    logger.info({
      event: "ACTUALIZAR_CANCION",
      id: req.params.id,
      user: req.user?.id
    });

    const cancion = await cancionService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(cancion);

  } catch (err) {

    logger.error({
      event: "ERROR_ACTUALIZAR_CANCION",
      error: err.message
    });

    next(err);

  }

};

exports.delete = async (req, res, next) => {

  try {

    logger.info({
      event: "ELIMINAR_CANCION",
      id: req.params.id,
      user: req.user?.id
    });

    await cancionService.delete(req.params.id, req.user);

    res.json({
      success: true,
      message: "Canción eliminada"
    });

  } catch (err) {

    logger.error({
      event: "ERROR_ELIMINAR_CANCION",
      error: err.message
    });

    next(err);

  }

};