const { z } = require("zod");

exports.createRolSchema = z.object({
  nombre_rol: z
    .string()
    .min(3, "El nombre del rol debe tener mínimo 3 caracteres")
    .max(50),

  descrip_rol: z
    .string()
    .max(100)
    .optional()
});

exports.updateRolSchema = z.object({
  nombre_rol: z
    .string()
    .min(3)
    .max(50)
    .optional(),

  descrip_rol: z
    .string()
    .max(100)
    .optional()
});