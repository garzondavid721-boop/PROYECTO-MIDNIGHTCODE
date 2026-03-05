const usuarioService = require("../services/usuarioService");

exports.register = async (req, res, next) => {
  try {

    const user = await usuarioService.register(req.body);

    res.json({
      success: true,
      message: "Usuario registrado",
      id: user.doc_identidad
    });

  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {

    const token = await usuarioService.login(req.body);

    res.json(token);

  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {

    const users = await usuarioService.getAll(req.user);

    res.json(users);

  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {

    const user = await usuarioService.getById(
      Number(req.params.id),
      req.user
    );

    res.json(user);

  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {

    const user = await usuarioService.update(
      Number(req.params.id),
      req.body,
      req.user
    );

    res.json(user);

  } catch (err) {
    next(err);
  }
};

exports.patch = async (req, res, next) => {
  try {

    const user = await usuarioService.patch(
      Number(req.params.id),
      req.body,
      req.user
    );

    res.json(user);

  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {

    await usuarioService.delete(
      Number(req.params.id),
      req.user
    );

    res.json({
      success: true,
      message: "Eliminado correctamente"
    });

  } catch (err) {
    next(err);
  }
};