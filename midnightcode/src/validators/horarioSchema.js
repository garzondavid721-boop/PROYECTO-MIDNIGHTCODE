const { z } = require("zod");

exports.createHorarioSchema = z.object({

  doc_identidad: z.number(),

  dia_semana: z.enum([
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ]),

  hora_entrada: z.string(),

  hora_salida: z.string(),

  estado: z.boolean().optional()

});

exports.updateHorarioSchema = z.object({

  dia_semana: z.enum([
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ]).optional(),

  hora_entrada: z.string().optional(),

  hora_salida: z.string().optional(),

  estado: z.boolean().optional()

});