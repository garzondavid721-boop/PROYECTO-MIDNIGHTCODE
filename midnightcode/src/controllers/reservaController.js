const reservaService = require('../services/reservaService');

exports.create = async (req, res, next) => {
  try {
    const result = await reservaService.create(req.body, req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await reservaService.getAll(req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await reservaService.getById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Reserva encontrada correctamente",
      data: result
    });

  } catch (err) {
    next(err);
  }
};