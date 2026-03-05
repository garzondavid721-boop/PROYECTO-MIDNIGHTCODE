const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuarioController");

const authMiddleware = require("../middlewares/authMiddleware");
const rolMiddleware = require("../middlewares/roleMiddleware");
const ownerOrAdmin = require("../middlewares/ownerOrAdmin");


// REGISTRO Y LOGIN
router.post("/register", controller.register);
router.post("/login", controller.login);


// VER TODOS LOS USUARIOS (SOLO ADMIN)
router.get("/", authMiddleware, rolMiddleware([1]), controller.getAll);


// VER USUARIO POR ID (ADMIN O EL MISMO USUARIO)
router.get("/:id", authMiddleware, ownerOrAdmin, controller.getById);


// ACTUALIZAR USUARIO (SOLO ADMIN)
router.put("/:id", authMiddleware, rolMiddleware([1]), controller.update);


// MODIFICAR PARCIAL (SOLO ADMIN)
router.patch("/:id", authMiddleware, rolMiddleware([1]), controller.patch);


// ELIMINAR USUARIO (SOLO ADMIN)
router.delete("/:id", authMiddleware, rolMiddleware([1]), controller.delete);


module.exports = router;