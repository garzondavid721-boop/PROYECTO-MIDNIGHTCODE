const router = require('express').Router();
const controller = require('../controllers/mesaController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, controller.getAll);

module.exports = router;