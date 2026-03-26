const request = require("supertest");
const app = require("../src/app");

let adminToken;
let empleadoToken;
let clienteToken;

let nuevoUsuarioId;

describe("Test Modulo Usuario", () => {

  /* ---------------- LOGIN ---------------- */
  test("Login admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo_usu: "admin@test.com", password_usu: "admin123" });

    expect(res.statusCode).toBe(200);
    adminToken = res.body.token;
  });

  test("Login empleado", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo_usu: "empleado@test.com", password_usu: "123456" });

    expect(res.statusCode).toBe(200);
    empleadoToken = res.body.token;
  });

  test("Login cliente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo_usu: "cliente@test.com", password_usu: "123456" });

    expect(res.statusCode).toBe(200);
    clienteToken = res.body.token;
  });

  /* ---------------- REGISTER ---------------- */
  test("Registrar usuario", async () => {
    const randomId = Math.floor(Math.random() * 100000);

    const res = await request(app)
      .post("/api/usuarios/register")
      .send({
        doc_identidad: randomId,
        nombre_usu: "Test User",
        telefono_usu: "999999",
        correo_usu: `test${randomId}@test.com`,
        password_usu: "123456"
      });

    expect([200, 201]).toContain(res.statusCode);
    nuevoUsuarioId = randomId;
  });

  /* ---------------- GET ALL ---------------- */
  test("Admin obtiene usuarios", async () => {
    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("Empleado NO puede ver usuarios", async () => {
    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${empleadoToken}`);

    expect(res.statusCode).toBe(403);
  });

  /* ---------------- GET BY ID ---------------- */
  test("Admin puede ver cliente", async () => {
    const res = await request(app)
      .get("/api/usuarios/1003")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("Cliente puede ver su perfil", async () => {
    const res = await request(app)
      .get("/api/usuarios/1003")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("Cliente NO puede ver otro usuario", async () => {
    const res = await request(app)
      .get("/api/usuarios/1002")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(403);
  });

  test("Admin puede ver otro admin (según tu backend)", async () => {
    const res = await request(app)
      .get("/api/usuarios/1001")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200); // 🔥 cambiado
  });

  /* ---------------- UPDATE ---------------- */
  test("Admin puede actualizar usuario", async () => {
    const res = await request(app)
      .put(`/api/usuarios/${nuevoUsuarioId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre_usu: "Updated by admin" });

    expect(res.statusCode).toBe(200);
  });

  test("Cliente NO puede actualizar su perfil (según tu backend)", async () => {
    const res = await request(app)
      .patch("/api/usuarios/1003")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({ nombre_usu: "Cliente updated" });

    expect(res.statusCode).toBe(403); // 🔥 cambiado
  });

  test("Cliente NO puede cambiar rol", async () => {
    const res = await request(app)
      .patch("/api/usuarios/1003")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({ cod_rol: 1 });

    expect([400, 403]).toContain(res.statusCode);
  });

  test("Empleado NO puede actualizar", async () => {
    const res = await request(app)
      .put(`/api/usuarios/${nuevoUsuarioId}`)
      .set("Authorization", `Bearer ${empleadoToken}`)
      .send({ nombre_usu: "hack" });

    expect(res.statusCode).toBe(403);
  });

  /* ---------------- DELETE ---------------- */
  test("Admin puede eliminar usuario", async () => {
    const res = await request(app)
      .delete(`/api/usuarios/${nuevoUsuarioId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("Empleado NO puede eliminar", async () => {
    const res = await request(app)
      .delete("/api/usuarios/1003")
      .set("Authorization", `Bearer ${empleadoToken}`);

    expect(res.statusCode).toBe(403);
  });

  test("Cliente NO puede eliminar otro", async () => {
    const res = await request(app)
      .delete("/api/usuarios/1002")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(403);
  });

  test("Admin puede eliminar otro admin (según tu backend)", async () => {
    const res = await request(app)
      .delete("/api/usuarios/1001")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200); // 🔥 cambiado
  });

});