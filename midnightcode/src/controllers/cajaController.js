const cajaService = require("../services/cajaService");
const logger = require("../config/logger");

exports.abrirCaja = async (req, res, next) => {

  try {

    logger.info({
      event: "CAJA_APERTURA_INTENTO",
      user: req.user?.id
    });

    const caja = await cajaService.abrirCaja(req.body, req.user);

    logger.info({
      event: "CAJA_ABIERTA",
      user: req.user?.id
    });

    res.json(caja);

  } catch (err) {

    logger.error({
      event: "ERROR_ABRIR_CAJA",
      error: err.message
    });

    next(err);

  }

};

exports.cajaActual = async (req, res, next) => {

  try {

    logger.info({
      event: "CONSULTA_CAJA_ACTUAL",
      user: req.user?.id
    });

    const caja = await cajaService.cajaActual(req.user);

    res.json(caja);

  } catch (err) {

    logger.error({
      event: "ERROR_CAJA_ACTUAL",
      error: err.message
    });

    next(err);

  }

};

exports.cerrarCaja = async (req, res, next) => {

  try {

    logger.info({
      event: "CIERRE_CAJA_INTENTO",
      user: req.user?.id
    });

    const caja = await cajaService.cerrarCaja(req.user);

    logger.info({
      event: "CAJA_CERRADA",
      user: req.user?.id
    });

    res.json(caja);

  } catch (err) {

    logger.error({
      event: "ERROR_CERRAR_CAJA",
      error: err.message
    });

    next(err);

  }

};

exports.totalHoy = async (req, res, next) => {

  try {

    logger.info({
      event: "CONSULTA_TOTAL_HOY",
      user: req.user?.id
    });

    const total = await cajaService.totalVendidoHoy(req.user);

    res.json(total);

  } catch (err) {

    logger.error({
      event: "ERROR_TOTAL_HOY",
      error: err.message
    });

    next(err);

  }

};

exports.ventasHoy = async (req, res, next) => {

  try {

    logger.info({
      event: "CONSULTA_VENTAS_DIA",
      user: req.user?.id
    });

    const ventas = await cajaService.ventasDelDia(req.user);

    res.json(ventas);

  } catch (err) {

    logger.error({
      event: "ERROR_VENTAS_DIA",
      error: err.message
    });

    next(err);

  }

};

exports.topProductos = async (req, res, next) => {

  try {

    logger.info({
      event: "CONSULTA_TOP_PRODUCTOS",
      user: req.user?.id
    });

    const top = await cajaService.topProductos(req.user);

    res.json(top);

  } catch (err) {

    logger.error({
      event: "ERROR_TOP_PRODUCTOS",
      error: err.message
    });

    next(err);

  }

};