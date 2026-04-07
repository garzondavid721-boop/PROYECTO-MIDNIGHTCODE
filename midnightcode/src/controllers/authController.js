const authService = require("../services/authService");
const prisma = require("../config/database");
const logger = require("../config/logger");

class AuthController {

  /* ================= LOGIN ================= */

  async login(req, res, next) {

    try {

      const { correo_usu, password_usu } = req.body;

      logger.info({
        message: "Intento de login",
        correo: correo_usu,
        ip: req.ip
      });

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

  /* ================= LOGOUT ================= */

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

  /* ================= FORGOT PASSWORD ================= */

  async forgotPassword(req, res, next) {
    try {

      const { correo_usu } = req.body;

      if (!correo_usu) {
        return res.status(400).json({
          success: false,
          message: "El correo es obligatorio"
        });
      }

      const result = await authService.forgotPassword(correo_usu);

      res.json(result);

    } catch (error) {
      next(error);
    }
  }

  /* ================= RESET PASSWORD ================= */

  async resetPassword(req, res, next) {
    try {

      const { token, nuevaPassword } = req.body;

      if (!token || !nuevaPassword) {
        return res.status(400).json({
          success: false,
          message: "Token y nueva contraseña son requeridos"
        });
      }

      const result = await authService.resetPassword(token, nuevaPassword);

      res.json(result);

    } catch (error) {
      next(error);
    }
  }

}

module.exports = new AuthController();