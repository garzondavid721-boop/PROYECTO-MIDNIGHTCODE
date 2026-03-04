const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ejecutando seed...");

  //////////////////////////////////////////////////
  // ROLES
  //////////////////////////////////////////////////

  const adminRol = await prisma.rol.upsert({
    where: { nombre: "ADMIN" },
    update: {},
    create: { nombre: "ADMIN" },
  });

  const empleadoRol = await prisma.rol.upsert({
    where: { nombre: "EMPLEADO" },
    update: {},
    create: { nombre: "EMPLEADO" },
  });

  const clienteRol = await prisma.rol.upsert({
    where: { nombre: "CLIENTE" },
    update: {},
    create: { nombre: "CLIENTE" },
  });

  //////////////////////////////////////////////////
  // USUARIOS
  //////////////////////////////////////////////////

  const hash = await bcrypt.hash("123456", 10);

  await prisma.usuario.upsert({
    where: { correo: "admin@test.com" },
    update: {},
    create: {
      nombre: "Admin",
      apellido: "Principal",
      correo: "admin@test.com",
      password: hash,
      telefono: "3000000000",
      rolId: adminRol.id,
    },
  });

  await prisma.usuario.upsert({
    where: { correo: "empleado@test.com" },
    update: {},
    create: {
      nombre: "Empleado",
      apellido: "Uno",
      correo: "empleado@test.com",
      password: hash,
      telefono: "3111111111",
      rolId: empleadoRol.id,
    },
  });

  await prisma.usuario.upsert({
    where: { correo: "cliente@test.com" },
    update: {},
    create: {
      nombre: "Cliente",
      apellido: "Demo",
      correo: "cliente@test.com",
      password: hash,
      telefono: "3222222222",
      rolId: clienteRol.id,
    },
  });

  //////////////////////////////////////////////////
  // MESAS (usa numero porque es @unique)
  //////////////////////////////////////////////////

  for (let i = 1; i <= 5; i++) {
    await prisma.mesa.upsert({
      where: { numero: i }, // ✅ numero es UNIQUE
      update: {},
      create: {
        numero: i,
        capacidad: 4,
      },
    });
  }

  //////////////////////////////////////////////////
  // PARQUEADEROS (usa numero porque es @unique)
  //////////////////////////////////////////////////

  for (let i = 1; i <= 5; i++) {
    await prisma.parquadero.upsert({
      where: { numero: i }, // ✅ numero es UNIQUE
      update: {},
      create: {
        numero: i,
      },
    });
  }

  //////////////////////////////////////////////////
  // MÉTODOS DE PAGO
  //////////////////////////////////////////////////

  const metodos = [
    "EFECTIVO",
    "TARJETA",
    "TRANSFERENCIA",
    "NEQUI",
    "DAVIPLATA",
  ];

  for (const metodo of metodos) {
    await prisma.metodoPago.upsert({
      where: { tipo: metodo },
      update: {},
      create: { tipo: metodo },
    });
  }

  console.log("✅ Seed completado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });