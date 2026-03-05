const usuarioRepo = require("../repositories/usuarioRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuarioService {

  async register(data) {

    if (!data) {
      throw new Error("Debe enviar datos para registrar");
    }

    const {
      doc_identidad,
      nombre_usu,
      telefono_usu,
      correo_usu,
      password_usu
    } = data;

    // VALIDAR CAMPOS
    if (!doc_identidad) {
      throw new Error("El campo doc_identidad es obligatorio");
    }

    if (!nombre_usu) {
      throw new Error("El campo nombre_usu es obligatorio");
    }

    if (!telefono_usu) {
      throw new Error("El campo telefono_usu es obligatorio");
    }

    if (!correo_usu) {
      throw new Error("El campo correo_usu es obligatorio");
    }

    if (!password_usu) {
      throw new Error("El campo password_usu es obligatorio");
    }

    // ROL POR DEFECTO CLIENTE
    data.cod_rol = 2;

    // VALIDAR DOCUMENTO
    const existeDoc = await usuarioRepo.findById(doc_identidad);

    if (existeDoc) {
      throw new Error("Ya existe un usuario con ese documento, use otro");
    }

    // VALIDAR TELEFONO
    const existeTelefono = await usuarioRepo.findByTelefono(telefono_usu);

    if (existeTelefono) {
      throw new Error("Ese número de teléfono ya está registrado");
    }

    // VALIDAR CORREO
    const existeCorreo = await usuarioRepo.findByEmail(correo_usu);

    if (existeCorreo) {
      throw new Error("El correo ya está registrado");
    }

    // ENCRIPTAR PASSWORD
    data.password_usu = await bcrypt.hash(password_usu, 10);

    return usuarioRepo.create(data);
  }

  async login(data) {

    if (!data.correo_usu) {
      throw new Error("El correo es requerido");
    }

    if (!data.password_usu) {
      throw new Error("La contraseña es requerida");
    }

    const user = await usuarioRepo.findByEmail(data.correo_usu);

    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(
      data.password_usu,
      user.password_usu
    );

    if (!valid) throw new Error("Credenciales incorrectas");

    const token = jwt.sign(
      { id: user.doc_identidad, rol: user.cod_rol },
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

  const docId = Number(doc);
  const userId = Number(requestUser.id);
  const rol = Number(requestUser.rol);

  const user = await usuarioRepo.findById(docId);

  if (!user) {
    throw new Error("Usuario no existe");
  }

  // admin puede ver cualquiera
  // usuario solo puede verse a sí mismo
  if (rol !== 1 && userId !== docId) {
    throw new Error("No autorizado");
  }

  return user;
}

  async update(doc, data, requestUser) {

    doc = Number(doc);

    const user = await usuarioRepo.findById(doc);

    if (!user) {
      throw new Error("Usuario no existe");
    }

    if (requestUser.rol !== 1 && requestUser.id !== doc)
      throw new Error("No autorizado");

    if (data.password_usu) {
      data.password_usu = await bcrypt.hash(data.password_usu, 10);
    }

    return usuarioRepo.update(doc, data);
  }

  async patch(doc, data, requestUser) {

    doc = Number(doc);

    const user = await usuarioRepo.findById(doc);

    if (!user) {
      throw new Error("Usuario no existe");
    }

    if (requestUser.rol !== 1 && requestUser.id !== doc)
      throw new Error("No autorizado");

    if (data.password_usu) {
      data.password_usu = await bcrypt.hash(data.password_usu, 10);
    }

    return usuarioRepo.update(doc, data);
  }

  async delete(doc, requestUser) {

    doc = Number(doc);

    const user = await usuarioRepo.findById(doc);

    if (!user) {
      throw new Error("Usuario no existe");
    }

    if (requestUser.rol !== 1)
      throw new Error("Solo admin puede eliminar");

    return usuarioRepo.delete(doc);
  }

}

module.exports = new UsuarioService();