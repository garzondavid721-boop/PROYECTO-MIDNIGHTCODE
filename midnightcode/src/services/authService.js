const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {

  async login(correo, password) {

    const user = await prisma.usuario.findUnique({
      where: { correo_usu: correo },
      include: { rol: true }
    });

    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password_usu);

    if (!match) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    if (!user.rol) {
      throw new Error('El usuario no tiene rol asignado');
    }

    const token = jwt.sign(
      {
        id: user.doc_identidad,
        rol: user.cod_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return {
      success: true,
      token,
      rol: user.cod_rol
    };
  }

}

module.exports = new AuthService();