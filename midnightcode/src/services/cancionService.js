const axios = require("axios");
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