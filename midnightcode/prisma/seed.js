const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ejecutando seed...");

  await prisma.rol.createMany({
    data: [
      { cod_rol: 1, nombre_rol: "ADMIN" },
      { cod_rol: 2, nombre_rol: "EMPLEADO" },
      { cod_rol: 3, nombre_rol: "CLIENTE" },
    ],
    skipDuplicates: true,
  });

  const hash = await bcrypt.hash("admin123", 10);

  await prisma.usuario.create({
    data: {
      doc_identidad: 1001,
      cod_rol: 1,
      nombre_usu: "Administrador",
      correo_usu: "admin@test.com",
      password_usu: hash,
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());