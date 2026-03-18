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
  // USUARIOS
  //////////////////////////////
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.usuario.createMany({
    data: [
      {
        doc_identidad: 1001,
        cod_rol: 1,
        nombre_usu: "Administrador",
        correo_usu: "admin@test.com",
        password_usu: hash,
      },
      {
        doc_identidad: 2001,
        cod_rol: 3,
        nombre_usu: "Cliente Test",
        correo_usu: "cliente@test.com",
        password_usu: hash,
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
      { numero_mesa: 4, tipo_mesa: "VIP", capacidad_mesa: 8, precio_reserva: 80000 },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // PARQUEADEROS
  //////////////////////////////
  await prisma.parqueadero.createMany({
    data: [
      { numero_par: 1, precio_parqueadero: 10000 },
      { numero_par: 2, precio_parqueadero: 10000 },
      { numero_par: 3, precio_parqueadero: 15000 },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // PRODUCTOS (🔥 NUEVO)
  //////////////////////////////
  await prisma.producto.createMany({
    data: [
      {
        nombre_produc: "Cerveza",
        presentacion_produc: "Botella",
        precio_produc: 5000,
        stock: 50,
        cantidad: 50,
      },
      {
        nombre_produc: "Whisky",
        presentacion_produc: "Botella",
        precio_produc: 80000,
        stock: 20,
        cantidad: 20,
      },
    ],
    skipDuplicates: true,
  });

  //////////////////////////////
  // METODOS DE PAGO (🔥 NUEVO)
  //////////////////////////////
  await prisma.metodoPago.createMany({
    data: [
      { nombre: "Efectivo" },
      { nombre: "Tarjeta" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed COMPLETO listo para testing PRO");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());