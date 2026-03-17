const prisma = require("../config/database");

class MesaRepository {

  async findAll(){
    return prisma.mesa.findMany();
  }

  async findById(id){
    return prisma.mesa.findUnique({
      where:{
        cod_mesa:Number(id)
      }
    });
  }

  async create(data){
    return prisma.mesa.create({
      data
    });
  }

  async update(id,data){
    return prisma.mesa.update({
      where:{
        cod_mesa:Number(id)
      },
      data
    });
  }

  async delete(id){
    return prisma.mesa.delete({
      where:{
        cod_mesa:Number(id)
      }
    });
  }

}

module.exports = new MesaRepository();