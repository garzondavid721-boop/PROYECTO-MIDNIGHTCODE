const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {

  async login(correo, password) {

    const user = await prisma.usuario.findUnique({
      where: { correo_usu: correo },
      include: { rol: true }
    });

    if (!user) throw new Error('Credenciales inválidas');

    const match = await bcrypt.compare(password, user.password_usu);

    if (!match) throw new Error('Credenciales inválidas');

  
    const token = jwt.sign(
      {
        id: user.doc_identidad,
        rol: user.rol.nombre_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );



    return { token,rol: user.rol.nombre_rol};
  }
}

module.exports = new AuthService();