const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const ROLE_MAP = { 1: 'admin', 2: 'empleado', 3: 'usuario', 4: 'dj' };

class AuthService {

  async login(email, password) {
    const user = await prisma.usuario.findUnique({
      where: { correo_usu: email },
      include: { rol: true },
    });

    if (!user) throw new Error('Credenciales inválidas');

    const match = await bcrypt.compare(password, user.password_usu);
    if (!match) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
      { id: user.doc_identidad, rol: user.cod_rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      success: true,
      token,
      user: {
        id:      user.doc_identidad,
        name:    user.nombre_usu,
        email:   user.correo_usu,
        phone:   user.telefono_usu,
        role:    ROLE_MAP[user.cod_rol] || 'usuario',
        cod_rol: user.cod_rol,
      },
    };
  }

  async register({ docId, name, email, phone, password }) {
    if (!docId || !name || !email || !password) {
      throw new Error('Todos los campos son requeridos');
    }

    const existeCorreo = await prisma.usuario.findUnique({ where: { correo_usu: email } });
    if (existeCorreo) throw new Error('El correo ya está registrado');

    const existeDoc = await prisma.usuario.findUnique({ where: { doc_identidad: Number(docId) } });
    if (existeDoc) throw new Error('El documento ya está registrado');

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuario.create({
      data: {
        doc_identidad: Number(docId),
        nombre_usu:    name,
        correo_usu:    email,
        telefono_usu:  phone || null,
        password_usu:  hashed,
        cod_rol:       3,
      },
    });

    const token = jwt.sign(
      { id: newUser.doc_identidad, rol: newUser.cod_rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      success: true,
      token,
      user: {
        id:      newUser.doc_identidad,
        name:    newUser.nombre_usu,
        email:   newUser.correo_usu,
        phone:   newUser.telefono_usu,
        role:    ROLE_MAP[newUser.cod_rol] || 'usuario',
        cod_rol: newUser.cod_rol,
      },
    };
  }
}

module.exports = new AuthService();