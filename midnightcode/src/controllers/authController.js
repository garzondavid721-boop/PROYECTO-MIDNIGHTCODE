const authService = require("../services/authService");
const prisma = require("../config/database");
const logger = require("../config/logger");

class AuthController {

  async login(req, res, next) {

    try {

      const { correo_usu, password_usu } = req.body;

      logger.info({
        message: "Intento de login",
        correo: correo_usu,
        ip: req.ip
      });

      /* VALIDACIÓN */

      if (!correo_usu || !password_usu) {

        logger.warn({
          message: "Login fallido - campos faltantes",
          correo: correo_usu
        });

        return res.status(400).json({
          success: false,
          message: "Correo y contraseña son requeridos"
        });

      }

      const result = await authService.login(correo_usu, password_usu);

      logger.info({
        message: "Login exitoso",
        correo: correo_usu
      });

      res.json(result);

    } catch (error) {

      logger.error({
        message: "Error en login",
        error: error.message,
        stack: error.stack
      });

      next(error);

    }

  }

  async logout(req, res, next) {

    try {

      const authHeader = req.headers.authorization;

      if (!authHeader) {

        logger.warn({
          message: "Logout sin token",
          ip: req.ip
        });

        return res.status(400).json({
          success: false,
          message: "Token requerido"
        });

      }

      const token = authHeader.split(" ")[1];

      await prisma.tokenBlacklist.create({
        data: { token }
      });

      logger.info({
        message: "Usuario cerró sesión",
        ip: req.ip
      });

      res.json({
        success: true,
        message: "Sesión cerrada correctamente"
      });

    } catch (error) {

      logger.error({
        message: "Error en logout",
        error: error.message,
        stack: error.stack
      });

      next(error);

    }

  }

}

module.exports = new AuthController();