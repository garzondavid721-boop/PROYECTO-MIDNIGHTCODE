const logger = require('../config/logger');

module.exports = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  logger.error({
    message: err.message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });

};
module.exports = (err, req, res, next) => {

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Error interno del servidor",
    fields: err.fields || null
  });

};