const express = require("express");
const router = express.Router();

const controller = require("../controllers/rolController");

const authMiddleware = require("../middlewares/authMiddleware");
const rolMiddleware = require("../middlewares/roleMiddleware");

router.get("/", authMiddleware, rolMiddleware([1]), controller.getAll);

router.get("/:id", authMiddleware, rolMiddleware([1]), controller.getById);

router.post("/", authMiddleware, rolMiddleware([1]), controller.create);

router.put("/:id", authMiddleware, rolMiddleware([1]), controller.update);

router.delete("/:id", authMiddleware, rolMiddleware([1]), controller.delete);

module.exports = router;