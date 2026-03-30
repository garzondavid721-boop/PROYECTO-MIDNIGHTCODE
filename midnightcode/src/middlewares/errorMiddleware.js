const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {

  const status = err.statusCode || 500;

  logger.error({
    message: err.message,
    statusCode: status,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  res.status(status).json({
    success: false,
    message: err.message || "Error interno del servidor",
    fields: err.fields || null
  });

};

module.exports = errorHandler;