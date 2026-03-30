const { z } = require("zod");

exports.createReservaSchema = z.object({

  cod_mesa: z.number(),

  cod_parqueadero: z.number(),

  fecha_reserva: z.string(),

  hora_reserva: z.string(),

  cantidad_personas: z.number(),

  incluye_cover: z.boolean()

});

exports.updateReservaSchema = z.object({

  cod_mesa: z.number().optional(),

  cod_parqueadero: z.number().optional(),

  fecha_reserva: z.string().optional(),

  hora_reserva: z.string().optional(),

  cantidad_personas: z.number().optional(),

  incluye_cover: z.boolean().optional(),

  estado: z.enum([
    "Pendiente",
    "Confirmada",
    "Cancelada"
  ]).optional()

});