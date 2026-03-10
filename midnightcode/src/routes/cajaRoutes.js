const express = require("express");
const router = express.Router();

const controller = require("../controllers/cajaController");
const auth = require("../middlewares/authMiddleware");
const auditoria = require("../middlewares/auditoriaMiddleware");

router.post(
  "/abrir",
  auth,
  auditoria("Caja","INSERT"),
  controller.abrirCaja
);

router.post(
  "/cerrar",
  auth,
  auditoria("Caja","UPDATE"),
  controller.cerrarCaja
);

router.get(
  "/actual",
  auth,
  controller.cajaActual
);

router.get(
  "/ventas-hoy",
  auth,
  controller.ventasHoy
);

router.get(
  "/total-hoy",
  auth,
  controller.totalHoy
);

router.get(
  "/top-productos",
  auth,
  controller.topProductos
);

module.exports = router;