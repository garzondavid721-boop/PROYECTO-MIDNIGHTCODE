const { z } = require("zod");

exports.createCancionSchema = z.object({

  nombre_can: z.string(),

  Link_can: z.string().url()

});

exports.updateCancionSchema = z.object({

  nombre_can: z.string().optional(),

  Link_can: z.string().url().optional()

});