const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);
router.delete("/:id", authMiddleware, controller.delete);

module.exports = router;