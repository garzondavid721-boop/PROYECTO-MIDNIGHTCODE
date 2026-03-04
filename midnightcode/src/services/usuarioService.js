const usuarioRepo = require("../repositories/usuarioRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuarioService {

  async register(data) {
    data.password_usu = await bcrypt.hash(data.password_usu, 10);
    return usuarioRepo.create(data);
  }

  async login(data) {

    const user = await usuarioRepo.findByEmail(data.correo_usu);

    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(
      data.password_usu,
      user.password_usu
    );

    if (!valid) throw new Error("Credenciales incorrectas");

    const token = jwt.sign(
      { id: user.doc_identidad, rol: user.rol.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return { token };
  }

  async getAll(requestUser) {
    if (requestUser.rol !== 1)
      throw new Error("No autorizado");

    return usuarioRepo.findAll();
  }

  async getById(doc, requestUser) {
    if (requestUser.rol !== 1 && requestUser.id !== doc)
      throw new Error("Forbidden");

    return usuarioRepo.findById(doc);
  }

  async delete(doc, requestUser) {
    if (requestUser.rol !== 1)
      throw new Error("Solo admin puede eliminar");

    return usuarioRepo.delete(doc);
  }
}

module.exports = new UsuarioService();