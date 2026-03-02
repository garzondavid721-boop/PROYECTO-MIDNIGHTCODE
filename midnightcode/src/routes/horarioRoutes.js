const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

router.get('/', horarioController.getAll.bind(horarioController));
router.get('/:id', horarioController.getById.bind(horarioController));
router.post('/', horarioController.create.bind(horarioController));
router.put('/:id', horarioController.update.bind(horarioController));
router.delete('/:id', horarioController.delete.bind(horarioController));

module.exports = router;