const express = require("express");
const router = express.Router();

const controller = require("../controllers/ventaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/",authMiddleware,controller.getAll);

router.get("/pendientes",authMiddleware,controller.getPendientes);

router.get("/codigo/:codigo",authMiddleware,controller.getByCodigo);

router.get("/:id",authMiddleware,controller.getById);

router.post("/",authMiddleware,controller.create);

router.post("/:id/pagar",authMiddleware,controller.pagar);

router.put("/:id",authMiddleware,controller.update);

router.delete("/:id",authMiddleware,controller.delete);

module.exports = router;