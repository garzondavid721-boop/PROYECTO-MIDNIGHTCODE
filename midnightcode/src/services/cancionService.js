const axios = require("axios");
const prisma = require("../config/database");
const cancionRepository = require("../repositories/cancionRepository");

class CancionService {

  obtenerRol(user) {
    return Number(user.rol || user.cod_rol);
  }

  obtenerDocumento(user) {
    return Number(user.id || user.doc_identidad);
  }

  validarUsuario(user) {
    if (!user) {
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }
    return this.obtenerRol(user);
  }

  // ── DJ Queue ────────────────────────────────────────────────────────────────

  async getQueue(user) {
    this.validarUsuario(user);
    return await prisma.cancion.findMany({
      where:   { numero_fila: { gte: -2 } },
      include: { usuario: { select: { nombre_usu: true } } },
      orderBy: { numero_fila: 'desc' },
    });
  }

  async requestSong({ title, artist, link, genre, message }, user) {
    const rol = this.validarUsuario(user);
    if (rol !== 3) {
      const e = new Error("Solo los usuarios pueden solicitar canciones");
      e.statusCode = 403; throw e;
    }
    const doc    = this.obtenerDocumento(user);
    const ultima = await cancionRepository.findLast();
    const fila   = (ultima && ultima.numero_fila >= 1) ? ultima.numero_fila + 1 : 1;

    const cancion = await cancionRepository.create({
      doc_identidad: doc,
      nombre_can:    `${title} - ${artist || 'Desconocido'}`,
      Link_can:      link || '',
      numero_fila:   fila,
    });

    const lista = await prisma.cancion.findMany({
      where:   { numero_fila: { gte: -2 } },
      include: { usuario: { select: { nombre_usu: true } } },
    });
    if (global.io) global.io.emit("colaCanciones", lista);

    return await prisma.cancion.findUnique({
      where:   { id_cancion: cancion.id_cancion },
      include: { usuario: { select: { nombre_usu: true } } },
    });
  }

  async voteSong(id, user) {
    this.validarUsuario(user);
    const cancion = await prisma.cancion.findUnique({ where: { id_cancion: Number(id) } });
    if (!cancion) {
      const e = new Error("Canción no encontrada"); e.statusCode = 404; throw e;
    }
    return cancion;
  }

  async changeStatus(id, status, user) {
    const rol = this.validarUsuario(user);
    if (rol !== 1 && rol !== 4) {
      const e = new Error("Solo admin o DJ pueden cambiar el estado");
      e.statusCode = 403; throw e;
    }

    const STATUS_FILA = { playing: 0, played: -1, rejected: -2, queued: 1 };
    const fila = STATUS_FILA[status];
    if (fila === undefined) {
      const e = new Error("Estado inválido"); e.statusCode = 400; throw e;
    }

    const cancion = await prisma.cancion.update({
      where:   { id_cancion: Number(id) },
      data:    { numero_fila: fila },
      include: { usuario: { select: { nombre_usu: true } } },
    });

    const lista = await prisma.cancion.findMany({
      where:   { numero_fila: { gte: -2 } },
      include: { usuario: { select: { nombre_usu: true } } },
    });
    if (global.io) global.io.emit("colaCanciones", lista);

    return cancion;
  }

  async buscarYoutube(query) {

    if (!query) {
      const error = new Error("Debe enviar el nombre de la canción");
      error.statusCode = 400;
      throw error;
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: 5,
          type: "video"
        }
      }
    );

    return response.data.items.map(video => ({
      nombre: video.snippet.title,
      imagen: video.snippet.thumbnails.medium.url,
      link: `https://www.youtube.com/watch?v=${video.id.videoId}`
    }));
  }

  async getAll(user) {

    const rol = this.validarUsuario(user);

    if (rol !== 1 && rol !== 4) {
      const error = new Error("No autorizado");
      error.statusCode = 403;
      throw error;
    }

    return await cancionRepository.findAll();
  }

  async create(data, user) {

    const rol = this.validarUsuario(user);

    if (rol !== 3) {
      const error = new Error("Solo los usuarios pueden registrar canciones");
      error.statusCode = 403;
      throw error;
    }

    const ultima = await cancionRepository.findLast();

    const numeroFila = ultima ? ultima.numero_fila + 1 : 1;

    const nuevaCancion = {
      doc_identidad: this.obtenerDocumento(user),
      nombre_can: data.nombre_can,
      Link_can: data.Link_can,
      numero_fila: numeroFila
    };

    const cancion = await cancionRepository.create(nuevaCancion);

    const lista = await cancionRepository.findAll();

    global.io.emit("colaCanciones", lista);

    return cancion;
  }

  async update(id, data, user) {

    const rol = this.validarUsuario(user);

    if (rol !== 1 && rol !== 4) {
      const error = new Error("Solo admin o DJ pueden modificar canciones");
      error.statusCode = 403;
      throw error;
    }

    const cancion = await cancionRepository.update(id, data);

    const lista = await cancionRepository.findAll();

    global.io.emit("colaCanciones", lista);

    return cancion;
  }

  async delete(id, user) {

    const rol = this.validarUsuario(user);

    if (rol !== 1 && rol !== 4) {
      const error = new Error("Solo admin o DJ pueden eliminar canciones");
      error.statusCode = 403;
      throw error;
    }

    await cancionRepository.delete(id);

    const lista = await cancionRepository.findAll();

    global.io.emit("colaCanciones", lista);
  }

}

module.exports = new CancionService();