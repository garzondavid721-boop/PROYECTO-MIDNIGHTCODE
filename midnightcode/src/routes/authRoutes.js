const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login',    authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.post('/logout',   authMiddleware, authController.logout.bind(authController));

module.exports = router;