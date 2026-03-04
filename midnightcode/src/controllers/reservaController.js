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