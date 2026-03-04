const authService = require('../services/authService');
const prisma = require('../config/database');

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

  async logout(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader)
        return res.status(400).json({ message: "Token requerido" });

      const token = authHeader.split(" ")[1];

      await prisma.tokenBlacklist.create({
        data: { token }
      });

      res.json({ message: "Sesión cerrada correctamente" });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();