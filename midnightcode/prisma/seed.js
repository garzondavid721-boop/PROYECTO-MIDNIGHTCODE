require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Ejecutando seed...");

  //////////////////////////////
  // ROLES
  //////////////////////////////
  await prisma.rol.createMany({
    data: [
      { cod_rol: 1, nombre_rol: "ADMIN" },
      { cod_rol: 2, nombre_rol: "EMPLEADO" },
      { cod_rol: 3, nombre_rol: "CLIENTE" },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // USUARIO ADMIN
  //////////////////////////////
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminDoc = parseInt(process.env.ADMIN_DOC, 10);

  if (!adminEmail || !adminPassword || !adminDoc) {
    throw new Error(
      "Las variables ADMIN_EMAIL, ADMIN_PASSWORD y ADMIN_DOC son requeridas para el seed."
    );
  }

  const hash = await bcrypt.hash(adminPassword, 10);

  await prisma.usuario.createMany({
    data: [
      {
        doc_identidad: adminDoc,
        cod_rol: 1,
        nombre_usu: "Administrador",
        correo_usu: adminEmail,
        password_usu: hash,
      },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // MESAS (AGREGADO)
  //////////////////////////////
  await prisma.mesa.createMany({
    data: [
      {
        numero_mesa: 1,
        tipo_mesa: "Normal",
        capacidad_mesa: 4,
        precio_reserva: 20000,
      },
      {
        numero_mesa: 2,
        tipo_mesa: "Normal",
        capacidad_mesa: 4,
        precio_reserva: 20000,
      },
      {
        numero_mesa: 3,
        tipo_mesa: "VIP",
        capacidad_mesa: 6,
        precio_reserva: 50000,
      },
      {
        numero_mesa: 4,
        tipo_mesa: "VIP",
        capacidad_mesa: 8,
        precio_reserva: 80000,
      },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // PARQUEADEROS (AGREGADO)
  //////////////////////////////
  await prisma.parqueadero.createMany({
    data: [
      {
        numero_par: 1,
        precio_parqueadero: 10000,
      },
      {
        numero_par: 2,
        precio_parqueadero: 10000,
      },
      {
        numero_par: 3,
        precio_parqueadero: 15000,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completado.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());