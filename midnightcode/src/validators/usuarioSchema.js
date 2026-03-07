const { z } = require("zod");

exports.createUserSchema = z.object({
  doc_identidad: z.number(),
    cod_rol: z.number(),
      nombre_usu: z.string().min(3),
        telefono_usu: z.string().optional(),
          correo_usu: z.string().email(),
            password_usu: z.string().min(6)
            });

            exports.loginSchema = z.object({
              correo_usu: z.string().email(),
                password_usu: z.string()
                });