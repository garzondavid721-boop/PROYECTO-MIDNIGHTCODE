const authService = require('../services/authService');

class AuthController {

  async login(req, res, next) {
    try {
      const { correo, password } = req.body;
      const result = await authService.login(correo, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();