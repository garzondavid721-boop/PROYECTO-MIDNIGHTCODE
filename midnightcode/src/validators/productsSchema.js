const { z } = require("zod");

exports.createProductoSchema = z.object({

  nombre_produc: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  presentacion_produc: z.string()
    .min(2, "La presentación es obligatoria"),

  precio_produc: z.number()
    .positive("El precio debe ser mayor a 0"),

  stock: z.number()
    .int()
    .nonnegative("El stock no puede ser negativo"),

  cantidad: z.number()
    .int()
    .nonnegative("La cantidad no puede ser negativa"),

  estado_produc: z.boolean().optional()

});


exports.updateProductoSchema = z.object({

  nombre_produc: z.string().min(2).optional(),

  presentacion_produc: z.string().optional(),

  precio_produc: z.number().positive().optional(),

  stock: z.number().int().optional(),

  cantidad: z.number().int().optional(),

  estado_produc: z.boolean().optional()

});