const logger = require('../config/logger');

module.exports = (err, req, res, next) => {

  logger.error(err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
};