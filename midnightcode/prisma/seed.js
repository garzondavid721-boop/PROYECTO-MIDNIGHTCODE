const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ejecutando seed...");

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
  // HASHES
  //////////////////////////////
  const hashAdmin = await bcrypt.hash("admin123", 10);
  const hashEmpleado = await bcrypt.hash("123456", 10);
  const hashCliente = await bcrypt.hash("123456", 10);

  //////////////////////////////
  // USUARIOS
  //////////////////////////////
  await prisma.usuario.createMany({
    data: [
      {
        doc_identidad: 1001,
        cod_rol: 1,
        nombre_usu: "Administrador",
        correo_usu: "admin@test.com",
        password_usu: hashAdmin,
      },
      {
        doc_identidad: 1002,
        cod_rol: 2,
        nombre_usu: "Empleado",
        correo_usu: "empleado@test.com",
        password_usu: hashEmpleado,
      },
      {
        doc_identidad: 1003,
        cod_rol: 3,
        nombre_usu: "Cliente",
        correo_usu: "cliente@test.com",
        password_usu: hashCliente,
      },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // MESAS
  //////////////////////////////
  await prisma.mesa.createMany({
    data: [
      { numero_mesa: 1, tipo_mesa: "Normal", capacidad_mesa: 4, precio_reserva: 20000 },
      { numero_mesa: 2, tipo_mesa: "Normal", capacidad_mesa: 4, precio_reserva: 20000 },
      { numero_mesa: 3, tipo_mesa: "VIP", capacidad_mesa: 6, precio_reserva: 50000 },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // PARQUEADEROS
  //////////////////////////////
  await prisma.parqueadero.createMany({
    data: [
      { numero_par: 1, precio_parqueadero: 10000 },
      { numero_par: 2, precio_parqueadero: 12000 },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed COMPLETO listo");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());