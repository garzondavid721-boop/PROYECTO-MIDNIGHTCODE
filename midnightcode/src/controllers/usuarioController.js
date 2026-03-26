const usuarioService = require("../services/usuarioService");
const logger = require("../config/logger");

exports.register = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_REGISTRO",
      correo:req.body?.correo
    });

    const user = await usuarioService.register(req.body);

    res.json({
      success: true,
      message: "Usuario registrado",
      id: user.doc_identidad
    });

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_REGISTRO",
      error:err.message
    });

    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_LOGIN_INTENTO",
      correo:req.body?.correo
    });

    const token = await usuarioService.login(req.body);

    logger.info({
      event:"USUARIO_LOGIN_OK"
    });

    res.json(token);

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_LOGIN",
      error:err.message
    });

    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_LISTAR",
      user:req.user?.id
    });

    const users = await usuarioService.getAll(req.user);

    res.json(users);

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_LISTAR",
      error:err.message
    });

    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_CONSULTAR",
      usuario:req.params.id,
      user:req.user?.id
    });

    const user = await usuarioService.getById(
      req.params.id,
      req.user
    );

    res.json(user);

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_CONSULTAR",
      error:err.message
    });

    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_UPDATE",
      usuario:req.params.id,
      user:req.user?.id
    });

    const user = await usuarioService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(user);

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_UPDATE",
      error:err.message
    });

    next(err);
  }
};

exports.patch = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_PATCH",
      usuario:req.params.id,
      user:req.user?.id
    });

    const user = await usuarioService.patch(
      req.params.id,
      req.body,
      req.user
    );

    res.json(user);

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_PATCH",
      error:err.message
    });

    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {

    logger.info({
      event:"USUARIO_DELETE",
      usuario:req.params.id,
      user:req.user?.id
    });

    await usuarioService.delete(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      message: "Eliminado correctamente"
    });

  } catch (err) {

    logger.error({
      event:"ERROR_USUARIO_DELETE",
      error:err.message
    });

    next(err);
  }
};

// ── /me endpoints ─────────────────────────────────────────────────────────────
const prisma = require("../config/database");
const bcrypt = require("bcrypt");

const ROLE_MAP = { 1: 'admin', 2: 'empleado', 3: 'usuario', 4: 'dj' };

exports.getMe = async (req, res, next) => {
  try {
    const doc  = Number(req.user.id);
    const user = await prisma.usuario.findUnique({ where: { doc_identidad: doc } });
    if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    res.json({
      success: true,
      user: {
        id:      user.doc_identidad,
        name:    user.nombre_usu,
        email:   user.correo_usu,
        phone:   user.telefono_usu,
        role:    ROLE_MAP[user.cod_rol] || 'usuario',
        cod_rol: user.cod_rol,
      },
    });
  } catch (err) { next(err); }
};

exports.updateMe = async (req, res, next) => {
  try {
    const doc  = Number(req.user.id);
    const data = {};
    if (req.body.name)  data.nombre_usu   = req.body.name;
    if (req.body.phone) data.telefono_usu = req.body.phone;

    const updated = await prisma.usuario.update({ where: { doc_identidad: doc }, data });

    res.json({
      success: true,
      user: {
        id:      updated.doc_identidad,
        name:    updated.nombre_usu,
        email:   updated.correo_usu,
        phone:   updated.telefono_usu,
        role:    ROLE_MAP[updated.cod_rol] || 'usuario',
        cod_rol: updated.cod_rol,
      },
    });
  } catch (err) { next(err); }
};

exports.changePassword = async (req, res, next) => {
  try {
    const doc  = Number(req.user.id);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Se requiere currentPassword y newPassword" });
    }

    const user  = await prisma.usuario.findUnique({ where: { doc_identidad: doc } });
    const valid = await bcrypt.compare(currentPassword, user.password_usu);
    if (!valid) return res.status(400).json({ success: false, message: "Contraseña actual incorrecta" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.usuario.update({ where: { doc_identidad: doc }, data: { password_usu: hashed } });

    res.json({ success: true, message: "Contraseña actualizada" });
  } catch (err) { next(err); }
};