const productoRepository = require("../repositories/productoRepository");

class ProductoService {

  obtenerRol(user) {
    return Number(user.rol || user.cod_rol);
  }

  validarUsuario(user) {

    if (!user) {
      const error = new Error("No autenticado");
      error.statusCode = 401;
      throw error;
    }

    const rol = this.obtenerRol(user);

    if (![1,2,3].includes(rol)) {
      const error = new Error("No autorizado");
      error.statusCode = 403;
      throw error;
    }

    return rol;
  }

  validarAdminEmpleado(user){

    const rol = this.validarUsuario(user);

    if (rol !== 1 && rol !== 3) {
      const error = new Error("Solo admin o empleado pueden realizar esta acción");
      error.statusCode = 403;
      throw error;
    }

  }

  async getAll(user){

    this.validarUsuario(user);

    const productos = await productoRepository.findAll();

    return {
      success:true,
      data:productos
    }

  }

  async getById(id,user){

    this.validarUsuario(user);

    const producto = await productoRepository.findById(id);

    if(!producto){
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return {
      success:true,
      data:producto
    }

  }

  async create(data,user){

    this.validarAdminEmpleado(user);

    const {
      nombre_produc,
      presentacion_produc,
      precio_produc,
      stock,
      cantidad,
      estado_produc
    } = data;

    const camposFaltantes = [];

    if(!nombre_produc) camposFaltantes.push("nombre_produc");
    if(!presentacion_produc) camposFaltantes.push("presentacion_produc");
    if(precio_produc === undefined) camposFaltantes.push("precio_produc");
    if(stock === undefined) camposFaltantes.push("stock");
    if(cantidad === undefined) camposFaltantes.push("cantidad");

    if(camposFaltantes.length > 0){

      const error = new Error("Faltan campos obligatorios");
      error.statusCode = 400;
      error.fields = camposFaltantes;
      throw error;

    }

    if(precio_produc <= 0){

      const error = new Error("El precio debe ser mayor a 0");
      error.statusCode = 400;
      throw error;

    }

    if(stock < 0){

      const error = new Error("El stock no puede ser negativo");
      error.statusCode = 400;
      throw error;

    }

    return await productoRepository.create(data);

  }

  async update(id,data,user){

    this.validarAdminEmpleado(user);

    const producto = await productoRepository.findById(id);

    if(!producto){
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return await productoRepository.update(id,data);

  }

  async delete(id,user){

    this.validarAdminEmpleado(user);

    const producto = await productoRepository.findById(id);

    if(!producto){
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return await productoRepository.delete(id);

  }

}

module.exports = new ProductoService();