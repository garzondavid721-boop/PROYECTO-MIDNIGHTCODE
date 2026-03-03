const express = require('express');
const router = express.Router();

const horarioController = require('../controllers/horarioController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

router.get(
  '/',
  auth,
  authorize(['ADMIN']),
  horarioController.getAll.bind(horarioController)
);

router.get(
  '/:id',
  auth,
  authorize(['ADMIN','EMPLEADO']),
  horarioController.getById.bind(horarioController)
);

router.post(
  '/',
  auth,
  authorize(['ADMIN']),
  horarioController.create.bind(horarioController)
);

module.exports = router;