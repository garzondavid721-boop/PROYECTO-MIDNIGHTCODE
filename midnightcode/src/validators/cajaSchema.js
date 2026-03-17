const { z } = require("zod");

const abrirCajaSchema = z.object({

  monto_inicial: z.any()

});

module.exports = {
  abrirCajaSchema
};