const request = require("supertest");
const app = require("../src/app");

let adminToken;
let empleadoToken;
let clienteToken;

let mesaId;
let productoId;
let cancionId;
let reservaId;

describe("🔥 FULL E2E COMPLETO (TODOS LOS ENDPOINTS)", () => {

  /* ---------------- LOGIN ---------------- */

  test("Login admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "123456"
      });

    console.log("ADMIN LOGIN:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    adminToken = res.body.token;
  });

  test("Login empleado", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "empleado@test.com",
        password: "123456"
      });

    console.log("EMPLEADO LOGIN:", res.body);

    expect(res.statusCode).toBe(200);
    empleadoToken = res.body.token;
  });

  test("Login cliente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "cliente@test.com",
        password: "123456"
      });

    console.log("CLIENTE LOGIN:", res.body);

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

  test("GET roles", async () => {
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

  test("GET producto", async () => {
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

  test("GET reservas", async () => {
    const res = await request(app)
      .get("/api/reservas")
      .set("Authorization", `Bearer ${adminToken}`);

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

  /* ---------------- VENTAS ---------------- */

  test("GET ventas", async () => {
    const res = await request(app)
      .get("/api/ventas")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

});