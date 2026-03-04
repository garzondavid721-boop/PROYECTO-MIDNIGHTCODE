const mesaService = require('../services/mesaService');

exports.getAll = async (req, res, next) => {
  try {
    const data = await mesaService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};