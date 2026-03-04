const mesaService = require('../services/parqueaderoService');

exports.getAll = async (req, res, next) => {
  try {
    const data = await parqueaderoService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};