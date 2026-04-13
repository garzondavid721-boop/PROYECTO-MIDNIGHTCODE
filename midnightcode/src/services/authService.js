const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

class AuthService {

  /* ================= LOGIN ================= */

  async login(correo, password) {

    const user = await prisma.usuario.findUnique({
      where: { correo_usu: correo },
      include: { rol: true }
    });

    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password_usu);

    if (!match) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    if (!user.rol) {
      throw new Error('El usuario no tiene rol asignado');
    }

    const token = jwt.sign(
      {
        id: user.doc_identidad,
        rol: user.cod_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return {
      success: true,
      token,
      rol: user.cod_rol
    };
  }

  /* ================= FORGOT PASSWORD ================= */

  async forgotPassword(correo) {

    const user = await prisma.usuario.findUnique({
      where: { correo_usu: correo }
    });

    if (!user) {
      const error = new Error("El correo no está registrado");
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign(
      {
        correo: user.correo_usu,
        id: user.doc_identidad
      },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "15m" }
    );

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.enviarCorreo(user.correo_usu, user.nombre_usu, link);

    return {
      success: true,
      message: "Correo de recuperación enviado"
    };
  }

  /* ================= RESET PASSWORD ================= */

  async resetPassword(token, nuevaPassword) {

    let payload;

    try {
      payload = jwt.verify(token, process.env.JWT_RESET_SECRET);
    } catch (error) {
      const err = new Error("Token inválido o expirado");
      err.statusCode = 400;
      throw err;
    }

    const user = await prisma.usuario.findUnique({
      where: { correo_usu: payload.correo }
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const hash = await bcrypt.hash(nuevaPassword, 10);

    await prisma.usuario.update({
      where: { correo_usu: payload.correo },
      data: { password_usu: hash }
    });

    return {
      success: true,
      message: "Contraseña actualizada correctamente"
    };
  }

  /* ================= EMAIL ================= */

  async enviarCorreo(correo, nombre, link) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer contraseña</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 10px !important; }
          .button { display: block !important; width: 100% !important; text-align: center !important; }
          .text-center-mobile { text-align: center !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 550px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
        
        <!-- Cabecera con gradiente -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Recupera tu acceso</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">¿Olvidaste tu contraseña? No te preocupes</p>
        </div>
        
        <!-- Cuerpo -->
        <div style="padding: 30px 25px;">
          <p style="font-size: 18px; color: #2d3748; margin: 0 0 10px;">Hola <strong style="color: #4a5568;">${nombre}</strong>,</p>
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva contraseña.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" class="button" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 10px rgba(102,126,234,0.4); transition: all 0.3s;">
               Restablecer contraseña
            </a>
          </div>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #667eea; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #4a5568;">
              <strong>¿El botón no funciona?</strong><br/>
              Copia y pega este enlace en tu navegador:<br/>
              <a href="${link}" style="color: #667eea; word-break: break-all;">${link}</a>
            </p>
          </div>
          
          <p style="color: #718096; font-size: 14px; line-height: 1.5; margin-top: 20px;">
            Este enlace expirará en <strong>15 minutos</strong> por seguridad.<br/>
            Si no solicitaste este cambio, ignora este mensaje. Tu contraseña actual seguirá funcionando.
          </p>
        </div>
        
        <!-- Pie de página -->
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #64748b;">&copy; 2025 Midnight Code. Todos los derechos reservados.</p>
          <p style="margin: 5px 0 0; font-size: 12px; color: #64748b;">Este correo fue enviado a ${correo}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Midnight Code - Soporte" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: "Restablece tu contraseña - Midnight Code",
    html: htmlContent
  });
}

}

module.exports = new AuthService();