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