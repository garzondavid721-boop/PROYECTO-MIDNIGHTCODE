const prisma = require("../config/database");

class ParqueaderoRepository{

  async findAll(){
    return prisma.parqueadero.findMany();
  }

  async findById(id){
    return prisma.parqueadero.findUnique({
      where:{
        cod_parqueadero:Number(id)
      }
    });
  }

  async create(data){
    return prisma.parqueadero.create({
      data
    });
  }

  async update(id,data){
    return prisma.parqueadero.update({
      where:{
        cod_parqueadero:Number(id)
      },
      data
    });
  }

  async delete(id){
    return prisma.parqueadero.delete({
      where:{
        cod_parqueadero:Number(id)
      }
    });
  }

}

module.exports = new ParqueaderoRepository();