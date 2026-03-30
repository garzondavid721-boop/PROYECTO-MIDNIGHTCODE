const pinoHttp = require("pino-http");
const logger = require("../config/logger");

const httpLogger = pinoHttp({

  logger,

  customLogLevel: function (res, err) {

    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";

  },

  customSuccessMessage: function (req, res) {

    return `${req.method} ${req.url} ${res.statusCode}`;

  },

  customErrorMessage: function (req, res) {

    return `${req.method} ${req.url} ERROR`;

  }

});

module.exports = httpLogger;