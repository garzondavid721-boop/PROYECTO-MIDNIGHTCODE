const authService = require("../services/authService");
const prisma = require("../config/database");
const logger = require("../config/logger");

class AuthController {

  async login(req, res, next) {

    try {

      const { email, password } = req.body;

      logger.info({ message: "Intento de login", email, ip: req.ip });

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contraseña son requeridos",
        });
      }

      const result = await authService.login(email, password);

      logger.info({ message: "Login exitoso", email });

      res.json(result);

    } catch (error) {

      logger.error({ message: "Error en login", error: error.message });
      next(error);

    }

  }

  async register(req, res, next) {

    try {

      const { docId, name, email, phone, password } = req.body;

      logger.info({ message: "Intento de registro", email });

      const result = await authService.register({ docId, name, email, phone, password });

      logger.info({ message: "Registro exitoso", email });

      res.status(201).json(result);

    } catch (error) {

      logger.error({ message: "Error en registro", error: error.message });
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