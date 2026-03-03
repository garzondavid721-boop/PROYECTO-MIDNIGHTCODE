const { z } = require('zod');

const horarioSchema = z.object({
  doc_identidad: z.number(),
  dia_semana: z.enum([
    'Lunes','Martes','Miercoles',
    'Jueves','Viernes','Sabado','Domingo'
  ]),
  hora_entrada: z.string(),
  hora_salida: z.string()
});

module.exports = horarioSchema;