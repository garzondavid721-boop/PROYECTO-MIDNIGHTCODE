const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken } = require("./setup");

describe("CAJA", () => {

  test("abrir caja ADMIN", async () => {
    const res = await request(app)
      .post("/api/caja/abrir")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ monto_inicial:10000 });

    expect([200,400]).toContain(res.statusCode);
  });

  test("cliente NO abre", async () => {
    const res = await request(app)
      .post("/api/caja/abrir")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({ monto_inicial:10000 });

    expect(res.statusCode).toBe(403);
  });

  test("ver caja actual", async () => {
    const res = await request(app)
      .get("/api/caja/actual")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("cerrar caja", async () => {
    const res = await request(app)
      .post("/api/caja/cerrar")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,400]).toContain(res.statusCode);
  });

});