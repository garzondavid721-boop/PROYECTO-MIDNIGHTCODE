const authService = require('../services/authService');
const prisma = require('../config/database');

class AuthController {

  async login(req, res, next) {
    try {
      const { correo_usu, password_usu } = req.body;

      // Validación
      if (!correo_usu || !password_usu) {
        return res.status(400).json({
          success: false,
          message: "Correo y contraseña son requeridos"
        });
      }

      const result = await authService.login(correo_usu, password_usu);

      res.json(result);

    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(400).json({
          success: false,
          message: "Token requerido"
        });
      }

      const token = authHeader.split(" ")[1];

      await prisma.tokenBlacklist.create({
        data: { token }
      });

      res.json({
        success: true,
        message: "Sesión cerrada correctamente"
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();