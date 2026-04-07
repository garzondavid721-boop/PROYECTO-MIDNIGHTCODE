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

    await transporter.sendMail({
      from: `"Soporte App" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Recuperación de contraseña",
      html: `
        <div style="font-family: Arial; background:#f4f4f4; padding:30px;">
          <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:10px;text-align:center;">
            
            <h2>Hola ${nombre}</h2>
            <p>Solicitaste recuperar tu contraseña</p>

            <a href="${link}" 
              style="padding:12px 25px;background:#007bff;color:white;text-decoration:none;border-radius:6px;">
              Recuperar contraseña
            </a>

            <p style="margin-top:20px;font-size:12px;color:gray;">
              Este enlace expira en 15 minutos
            </p>

          </div>
        </div>
      `
    });
  }

}

module.exports = new AuthService();