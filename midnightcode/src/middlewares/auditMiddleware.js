const prisma = require("../config/database");

const auditMiddleware = async (req, res, next) => {

  try {

    const user = req.user;

    if(!user){
      return next();
    }

    const doc = Number(user.doc_identidad || user.id);

    await prisma.auditoria.create({

      data:{

        doc_identidad: doc,
        accion: req.originalUrl,
        metodo: req.method,
        fecha: new Date()

      }

    });

  } catch (error) {

    console.error("Error auditoría:", error);

  }

  next();

};

module.exports = auditMiddleware;