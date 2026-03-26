const express = require("express");
const router = express.Router();

const controller = require("../controllers/cancionController");
const authMiddleware = require("../middlewares/authMiddleware");

// ── DJ Queue (deben ir ANTES de rutas genéricas /:id) ────────────────────────
router.get("/queue",         authMiddleware, controller.getQueue);
router.post("/request",      authMiddleware, controller.requestSong);
router.post("/:id/vote",     authMiddleware, controller.voteSong);
router.patch("/:id/play",    authMiddleware, controller.playSong);
router.patch("/:id/played",  authMiddleware, controller.markPlayed);
router.patch("/:id/reject",  authMiddleware, controller.rejectSong);
router.patch("/:id/restore", authMiddleware, controller.restoreSong);

// ── Admin / originales ───────────────────────────────────────────────────────
router.get("/youtube", authMiddleware, controller.buscarYoutube);
router.get("/",        authMiddleware, controller.getAll);
router.post("/",       authMiddleware, controller.create);
router.put("/:id",     authMiddleware, controller.update);
router.delete("/:id",  authMiddleware, controller.delete);

module.exports = router;