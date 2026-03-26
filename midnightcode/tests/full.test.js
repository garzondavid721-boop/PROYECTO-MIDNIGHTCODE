const request = require("supertest");
const app = require("../src/app");

let adminToken;
let empleadoToken;
let clienteToken;

let mesaId;
let productoId;
let cancionId;
let reservaId;
let ventaId;
let parqueaderoId;
let horarioId;  

describe("🔥 FULL E2E COMPLETO (TODOS LOS ENDPOINTS)", () => {

  /* ---------------- LOGIN ---------------- */
  test("Login admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "admin123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  test("Login empleado", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "empleado@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    empleadoToken = res.body.token;
  });

  test("Login cliente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    clienteToken = res.body.token;
  });

  /* ---------------- USUARIOS ---------------- */
  test("GET usuarios admin", async () => {
    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  /* ---------------- ROLES ---------------- */
  test("GET roles admin", async () => {
    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  /* ---------------- MESAS ---------------- */
  test("POST mesa", async () => {
    const res = await request(app)
      .post("/api/mesas")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ numero: 10, capacidad: 4 });

    expect([200, 201]).toContain(res.statusCode);
    mesaId = res.body.id || res.body.insertId;
  });

  test("PUT mesa", async () => {
    if (!mesaId) return;
    const res = await request(app)
      .put(`/api/mesas/${mesaId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ numero: 11, capacidad: 5 });
    expect(res.statusCode).toBe(200);
  });

  test("GET mesas", async () => {
    const res = await request(app)
      .get("/api/mesas")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  /* ---------------- PRODUCTOS ---------------- */
  test("POST producto", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre: "Cerveza", precio: 5000 });

    expect([200, 201]).toContain(res.statusCode);
    productoId = res.body.id || res.body.insertId;
  });

  test("PUT producto", async () => {
    if (!productoId) return;
    const res = await request(app)
      .put(`/api/productos/${productoId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre: "Cerveza2", precio: 6000 });
    expect(res.statusCode).toBe(200);
  });

  test("GET producto by ID", async () => {
    if (!productoId) return;
    const res = await request(app)
      .get(`/api/productos/${productoId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  /* ---------------- CANCIONES ---------------- */
  test("POST cancion", async () => {
    const res = await request(app)
      .post("/api/canciones")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre: "Song test" });

    expect([200, 201]).toContain(res.statusCode);
    cancionId = res.body.id || res.body.insertId;
  });

  test("GET canciones", async () => {
    const res = await request(app)
      .get("/api/canciones")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("PUT cancion", async () => {
    if (!cancionId) return;
    const res = await request(app)
      .put(`/api/canciones/${cancionId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre: "Song2" });
    expect(res.statusCode).toBe(200);
  });

  test("DELETE cancion", async () => {
    if (!cancionId) return;
    const res = await request(app)
      .delete(`/api/canciones/${cancionId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  /* ---------------- RESERVAS ---------------- */
  test("POST reserva", async () => {
    const res = await request(app)
      .post("/api/reservas")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({
        mesa_id: mesaId,
        fecha: "2026-01-01",
        hora: "20:00",
        cantidad_personas: 2
      });
    expect([200, 201]).toContain(res.statusCode);
    reservaId = res.body.id || res.body.insertId;
  });

  test("GET reservas admin", async () => {
    const res = await request(app)
      .get("/api/reservas")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("GET mis reservas cliente", async () => {
    const res = await request(app)
      .get("/api/reservas/mis-reservas")
      .set("Authorization", `Bearer ${clienteToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("PUT reserva", async () => {
    if (!reservaId) return;
    const res = await request(app)
      .put(`/api/reservas/${reservaId}`)
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({ cantidad_personas: 3 });
    expect(res.statusCode).toBe(200);
  });

  test("DELETE reserva", async () => {
    if (!reservaId) return;
    const res = await request(app)
      .delete(`/api/reservas/${reservaId}`)
      .set("Authorization", `Bearer ${clienteToken}`);
    expect(res.statusCode).toBe(200);
  });
  test("GET mesas disponibles", async () => {
  const res = await request(app)
    .get("/api/reservas/mesas-disponibles")
    .set("Authorization", `Bearer ${clienteToken}`);

  expect(res.statusCode).toBe(200);
});

test("GET parqueaderos disponibles", async () => {
  const res = await request(app)
    .get("/api/reservas/parqueaderos-disponibles")
    .set("Authorization", `Bearer ${clienteToken}`);

  expect(res.statusCode).toBe(200);
});

test("POST bloquear mesa", async () => {
  const res = await request(app)
    .post("/api/reservas/bloquear")
    .set("Authorization", `Bearer ${clienteToken}`)
    .send({ mesa_id: mesaId });

  expect([200, 201]).toContain(res.statusCode);
});

  /* ---------------- CAJA ---------------- */
  test("Abrir caja", async () => {
    const res = await request(app)
      .post("/api/caja/abrir")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ monto_inicial: 100000 });
    expect(res.statusCode).toBe(200);
  });

  test("Caja actual", async () => {
    const res = await request(app)
      .get("/api/caja/actual")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("Cerrar caja", async () => {
    const res = await request(app)
      .post("/api/caja/cerrar")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("Ventas hoy", async () => {
    const res = await request(app)
      .get("/api/caja/ventas-hoy")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("Total hoy", async () => {
    const res = await request(app)
      .get("/api/caja/total-hoy")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("Top productos", async () => {
    const res = await request(app)
      .get("/api/caja/top-productos")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  /* ---------------- VENTAS ---------------- */
  test("GET ventas", async () => {
    const res = await request(app)
      .get("/api/ventas")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test("GET ventas pendientes", async () => {
    const res = await request(app)
      .get("/api/ventas/pendientes")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  // ------------------- PARQUEADEROS ---------------- */
  test("POST parqueadero", async () => {
  const res = await request(app)
    .post("/api/parqueaderos")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ numero_par: 99, precio_parqueadero: 12000 });

  expect([200, 201]).toContain(res.statusCode);
  parqueaderoId = res.body.id || res.body.insertId;
});

test("GET parqueaderos", async () => {
  const res = await request(app)
    .get("/api/parqueaderos")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});

test("PUT parqueadero", async () => {
  if (!parqueaderoId) return;

  const res = await request(app)
    .put(`/api/parqueaderos/${parqueaderoId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ numero_par: 100, precio_parqueadero: 15000 });

  expect(res.statusCode).toBe(200);
});

test("DELETE parqueadero", async () => {
  if (!parqueaderoId) return;

  const res = await request(app)
    .delete(`/api/parqueaderos/${parqueaderoId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});

// ------------------- HORARIOS ---------------- */
test("POST horario", async () => {
  const res = await request(app)
    .post("/api/horarios")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      doc_identidad: 1001,
      dia: "Lunes",
      hora_inicio: "08:00",
      hora_fin: "18:00"
    });

  expect([200, 201]).toContain(res.statusCode);
  horarioId = res.body.id || res.body.insertId;
});

test("GET horarios", async () => {
  const res = await request(app)
    .get("/api/horarios")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});

test("GET horario por documento", async () => {
  const res = await request(app)
    .get("/api/horarios/usuario/1001")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});

test("PUT horario", async () => {
  if (!horarioId) return;

  const res = await request(app)
    .put(`/api/horarios/${horarioId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      dia: "Martes",
      hora_inicio: "09:00",
      hora_fin: "17:00"
    });

  expect(res.statusCode).toBe(200);
});

test("DELETE horario", async () => {
  if (!horarioId) return;

  const res = await request(app)
    .delete(`/api/horarios/${horarioId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});
});