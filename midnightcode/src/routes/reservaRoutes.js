const express=require("express");
const router=express.Router();

const controller=require("../controllers/reservaController");
const authMiddleware=require("../middlewares/authMiddleware");

router.get("/mesas-disponibles",authMiddleware,controller.getMesasDisponibles);

router.get("/parqueaderos-disponibles",authMiddleware,controller.getParqueaderosDisponibles);

router.post("/bloquear",authMiddleware,controller.bloquearMesa);

router.get("/",authMiddleware,controller.getAll);

router.get("/mis-reservas",authMiddleware,controller.getMisReservas);

router.post("/",authMiddleware,controller.create);

router.put("/:id",authMiddleware,controller.update);

router.delete("/:id",authMiddleware,controller.delete);

module.exports=router;