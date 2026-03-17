const prisma = require("../config/database");

module.exports = (tabla,accion)=>{

  return async(req,res,next)=>{

    try{

      const user = req.user;

      if(!user){
        return next();
      }

      await prisma.auditoria.create({

        data:{

          tabla_afectada:tabla,
          accion:accion,
          usuario_afectado:Number(user.doc_identidad || user.id),
          descripcion:`${accion} en ${tabla}`

        }

      });

    }catch(err){

      console.error("Error auditoria:",err);

    }

    next();

  };

};