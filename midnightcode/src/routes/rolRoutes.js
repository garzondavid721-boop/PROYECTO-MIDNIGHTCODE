const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rolController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);
router.use(roleMiddleware(["ADMIN"]));

router.post("/", rolController.create);
router.get("/", rolController.getAll);
router.get("/:id", rolController.getById);
router.put("/:id", rolController.update);
router.delete("/:id", rolController.delete);

module.exports = router;