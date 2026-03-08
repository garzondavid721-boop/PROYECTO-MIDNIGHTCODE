const cancionService = require("../services/cancionService");

exports.buscarYoutube = async (req, res, next) => {
  try {

    const canciones = await cancionService.buscarYoutube(req.query.q);

    res.json({
      success: true,
      data: canciones
    });

  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {

    const canciones = await cancionService.getAll(req.user);

    res.json(canciones);

  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {

    const cancion = await cancionService.create(
      req.body,
      req.user
    );

    res.json(cancion);

  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {

    const cancion = await cancionService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(cancion);

  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {

    await cancionService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      message: "Canción eliminada"
    });

  } catch (err) {
    next(err);
  }
};