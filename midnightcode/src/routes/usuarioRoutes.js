const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuarioController");

const authMiddleware = require("../middlewares/authMiddleware");
const rolMiddleware = require("../middlewares/roleMiddleware");
const ownerOrAdmin = require("../middlewares/ownerOrAdmin");



// ── Rutas /me (DEBEN ir antes de /:id) ──────────────────────────────────────
router.get("/me",            authMiddleware, controller.getMe);
router.patch("/me",          authMiddleware, controller.updateMe);
router.patch("/me/password", authMiddleware, controller.changePassword);

// ── Admin ────────────────────────────────────────────────────────────────────
router.get("/", authMiddleware, rolMiddleware([1]), controller.getAll);

// ── Por ID ───────────────────────────────────────────────────────────────────
router.get("/:id", authMiddleware, ownerOrAdmin, controller.getById);


router.put("/:id", authMiddleware, rolMiddleware([1]), controller.update);


router.patch("/:id", authMiddleware, rolMiddleware([1]), controller.patch);


router.delete("/:id", authMiddleware, rolMiddleware([1]), controller.delete);


module.exports = router;