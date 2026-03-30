const cancionService = require("../services/cancionService");
const logger = require("../config/logger");

// ── Helper: campos DB → frontend ─────────────────────────────────────────────
const toFrontend = (c) => {
  const fila = Number(c.numero_fila);
  let status = 'queued';
  if (fila === 0)       status = 'playing';
  else if (fila === -1) status = 'played';
  else if (fila <= -2)  status = 'rejected';

  const [title, ...rest] = (c.nombre_can || ' - ').split(' - ');
  return {
    id:          c.id_cancion,
    title:       title?.trim() || c.nombre_can,
    artist:      rest.join(' - ').trim() || 'Desconocido',
    link:        c.Link_can,
    votes:       c.votos || 0,
    status,
    requestedBy: c.usuario?.nombre_usu || 'Anon',
    genre:       c.genero  || '',
    message:     c.mensaje || '',
    timestamp:   c.createdAt || Date.now(),
  };
};

// ── DJ Queue handlers ─────────────────────────────────────────────────────────
exports.getQueue = async (req, res, next) => {
  try {
    const canciones = await cancionService.getQueue(req.user);
    res.json({ success: true, data: canciones.map(toFrontend) });
  } catch (err) { next(err); }
};

exports.requestSong = async (req, res, next) => {
  try {
    const cancion = await cancionService.requestSong(req.body, req.user);
    res.status(201).json({ success: true, data: toFrontend(cancion) });
  } catch (err) { next(err); }
};

exports.voteSong = async (req, res, next) => {
  try {
    const cancion = await cancionService.voteSong(req.params.id, req.user);
    res.json({ success: true, data: toFrontend(cancion) });
  } catch (err) { next(err); }
};

exports.playSong = async (req, res, next) => {
  try {
    const cancion = await cancionService.changeStatus(req.params.id, 'playing', req.user);
    res.json({ success: true, data: toFrontend(cancion) });
  } catch (err) { next(err); }
};

exports.markPlayed = async (req, res, next) => {
  try {
    const cancion = await cancionService.changeStatus(req.params.id, 'played', req.user);
    res.json({ success: true, data: toFrontend(cancion) });
  } catch (err) { next(err); }
};

exports.rejectSong = async (req, res, next) => {
  try {
    const cancion = await cancionService.changeStatus(req.params.id, 'rejected', req.user);
    res.json({ success: true, data: toFrontend(cancion) });
  } catch (err) { next(err); }
};

exports.restoreSong = async (req, res, next) => {
  try {
    const cancion = await cancionService.changeStatus(req.params.id, 'queued', req.user);
    res.json({ success: true, data: toFrontend(cancion) });
  } catch (err) { next(err); }
};

exports.buscarYoutube = async (req, res, next) => {

  try {

    logger.info({
      event: "BUSQUEDA_YOUTUBE",
      query: req.query.q
    });

    const canciones = await cancionService.buscarYoutube(req.query.q);

    res.json({
      success: true,
      data: canciones
    });

  } catch (err) {

    logger.error({
      event: "ERROR_BUSQUEDA_YOUTUBE",
      error: err.message
    });

    next(err);

  }

};

exports.getAll = async (req, res, next) => {

  try {

    logger.info({
      event: "LISTAR_CANCIONES",
      user: req.user?.id
    });

    const canciones = await cancionService.getAll(req.user);

    res.json(canciones);

  } catch (err) {

    logger.error({
      event: "ERROR_LISTAR_CANCIONES",
      error: err.message
    });

    next(err);

  }

};

exports.create = async (req, res, next) => {

  try {

    logger.info({
      event: "CREAR_CANCION",
      user: req.user?.id
    });

    const cancion = await cancionService.create(req.body, req.user);

    res.json(cancion);

  } catch (err) {

    logger.error({
      event: "ERROR_CREAR_CANCION",
      error: err.message
    });

    next(err);

  }

};

exports.update = async (req, res, next) => {

  try {

    logger.info({
      event: "ACTUALIZAR_CANCION",
      id: req.params.id,
      user: req.user?.id
    });

    const cancion = await cancionService.update(
      req.params.id,
      req.body,
      req.user
    );

    res.json(cancion);

  } catch (err) {

    logger.error({
      event: "ERROR_ACTUALIZAR_CANCION",
      error: err.message
    });

    next(err);

  }

};

exports.delete = async (req, res, next) => {

  try {

    logger.info({
      event: "ELIMINAR_CANCION",
      id: req.params.id,
      user: req.user?.id
    });

    await cancionService.delete(req.params.id, req.user);

    res.json({
      success: true,
      message: "Canción eliminada"
    });

  } catch (err) {

    logger.error({
      event: "ERROR_ELIMINAR_CANCION",
      error: err.message
    });

    next(err);

  }

};