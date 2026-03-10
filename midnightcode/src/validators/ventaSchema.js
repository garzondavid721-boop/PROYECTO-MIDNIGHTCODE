const { z } = require("zod");

exports.createVentaSchema = z.object({

  reserva_id: z.number().optional(),

  detalles: z.array(
    z.object({
      cod_producto: z.number(),
      cantidad: z.number().int().positive()
    })
  ).min(1,"Debe agregar al menos un producto")

});


exports.pagarVentaSchema = z.object({

  cod_metodopago: z.number()

});