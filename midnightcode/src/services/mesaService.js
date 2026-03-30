const mesaRepository = require("../repositories/mesaRepository");

class MesaService{

  obtenerRol(user){
    return Number(user.cod_rol || user.rol);
  }

  validarAdmin(user){

    if(!user){
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }

    const rol = this.obtenerRol(user);

    if(rol !== 1){
      const error = new Error("Solo admin puede gestionar mesas");
      error.statusCode = 403;
      throw error;
    }

  }

  async getAll(){
    return await mesaRepository.findAll();
  }

  async create(data,user){

    this.validarAdmin(user);

    return await mesaRepository.create(data);
  }

  async update(id,data,user){

    this.validarAdmin(user);

    return await mesaRepository.update(id,data);
  }

  async delete(id,user){

    this.validarAdmin(user);

    return await mesaRepository.delete(id);
  }

}

module.exports = new MesaService();