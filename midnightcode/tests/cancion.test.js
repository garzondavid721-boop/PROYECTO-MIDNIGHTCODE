const request = require("supertest");
const app = require("../app");
const { clienteToken, adminToken } = require("./setup");

describe("CANCIONES", () => {

  test("buscar youtube", async () => {
    const res = await request(app)
      .get("/api/canciones/youtube?q=test")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("listar", async () => {
    const res = await request(app)
      .get("/api/canciones")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("crear", async () => {
    const res = await request(app)
      .post("/api/canciones")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({ nombre_can:"x", Link_can:"x" });

    expect([200,400]).toContain(res.statusCode);
  });

  test("update", async () => {
    const res = await request(app)
      .put("/api/canciones/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre_can:"edit" });

    expect([200,404]).toContain(res.statusCode);
  });

  test("delete", async () => {
    const res = await request(app)
      .delete("/api/canciones/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});