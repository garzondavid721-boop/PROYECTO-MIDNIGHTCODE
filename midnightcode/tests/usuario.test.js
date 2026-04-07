const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken, empleadoToken } = require("./setup");

describe("USUARIOS COMPLETO", () => {

  /* ================= GET ================= */

  describe("GET /usuarios", () => {

    test("ADMIN puede ver todos", async () => {
      const res = await request(app)
        .get("/api/usuarios")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
    });

    test("CLIENTE no puede ver todos", async () => {
      const res = await request(app)
        .get("/api/usuarios")
        .set("Authorization", `Bearer ${clienteToken}`);

      expect(res.statusCode).toBe(403);
    });

    test("EMPLEADO no puede ver todos", async () => {
      const res = await request(app)
        .get("/api/usuarios")
        .set("Authorization", `Bearer ${empleadoToken}`);

      expect(res.statusCode).toBe(403);
    });

  });

  describe("GET /usuarios/:id", () => {

    test("cliente se ve a sí mismo", async () => {
      const res = await request(app)
        .get("/api/usuarios/1003")
        .set("Authorization", `Bearer ${clienteToken}`);

      expect(res.statusCode).toBe(200);
    });

    test("cliente NO ve otro usuario", async () => {
      const res = await request(app)
        .get("/api/usuarios/1001")
        .set("Authorization", `Bearer ${clienteToken}`);

      expect(res.statusCode).toBe(403);
    });

  });

  /* ================= POST ================= */

  describe("POST /register", () => {

    test("crear usuario", async () => {
      const res = await request(app)
        .post("/api/usuarios/register")
        .send({
          doc_identidad: 8888,
          nombre_usu: "Nuevo",
          telefono_usu: "123456789",
          correo_usu: "nuevo@test.com",
          password_usu: "123456"
        });

      expect(res.statusCode).toBe(200);
    });

  });

  /* ================= PUT ================= */

  describe("PUT /usuarios/:id", () => {

    test("ADMIN puede editar", async () => {
      const res = await request(app)
        .put("/api/usuarios/1003")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ nombre_usu: "EditAdmin" });

      expect([200,404]).toContain(res.statusCode);
    });

    test("CLIENTE solo se edita a sí mismo", async () => {
      const res = await request(app)
        .put("/api/usuarios/1003")
        .set("Authorization", `Bearer ${clienteToken}`)
        .send({ nombre_usu: "EditCliente" });

      expect(res.statusCode).toBe(200);
    });

  });

  /* ================= PATCH ================= */

  describe("PATCH /usuarios/:id", () => {

    test("PATCH admin", async () => {
      const res = await request(app)
        .patch("/api/usuarios/1003")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ telefono_usu: "999" });

      expect([200,404]).toContain(res.statusCode);
    });

  });

  /* ================= DELETE ================= */

  describe("DELETE /usuarios/:id", () => {

    test("ADMIN elimina", async () => {
      const res = await request(app)
        .delete("/api/usuarios/1003")
        .set("Authorization", `Bearer ${adminToken}`);

      expect([200,404]).toContain(res.statusCode);
    });

    test("CLIENTE no elimina otro", async () => {
      const res = await request(app)
        .delete("/api/usuarios/1001")
        .set("Authorization", `Bearer ${clienteToken}`);

      expect(res.statusCode).toBe(403);
    });

  });

});