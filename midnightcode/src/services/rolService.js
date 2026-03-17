const rolRepository = require("../repositories/rolRepository");

class RolService {

  async getAll() {
    return await rolRepository.findAll();
  }

  async getById(id) {

    const rol = await rolRepository.findById(id);

    if (!rol) {
      const error = new Error("Rol no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return rol;
  }

  async create(data) {

    const existe = await rolRepository.findByName(data.nombre_rol);

    if (existe) {
      const error = new Error("Ese rol ya existe");
      error.statusCode = 400;
      throw error;
    }

    return await rolRepository.create(data);
  }

  async update(id, data) {

    const rol = await rolRepository.findById(id);

    if (!rol) {
      const error = new Error("Rol no encontrado");
      error.statusCode = 404;
      throw error;
    }

    if (data.nombre_rol) {

      const existe = await rolRepository.findByName(data.nombre_rol);

      if (existe && existe.cod_rol !== Number(id)) {
        const error = new Error("Ese nombre de rol ya existe");
        error.statusCode = 400;
        throw error;
      }

    }

    return await rolRepository.update(id, data);
  }

  async delete(id) {

    const rol = await rolRepository.findById(id);

    if (!rol) {
      const error = new Error("Rol no encontrado");
      error.statusCode = 404;
      throw error;
    }

    if (rol.usuarios.length > 0) {
      const error = new Error("No se puede eliminar un rol que tiene usuarios asignados");
      error.statusCode = 400;
      throw error;
    }

    return await rolRepository.delete(id);
  }

}

module.exports = new RolService();