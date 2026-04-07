const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken } = require("./setup");

describe("MESAS FULL", () => {

  /* GET */
  test("listar mesas", async () => {
    const res = await request(app)
      .get("/api/mesas")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  /* POST */
  test("ADMIN crea mesa", async () => {
    const res = await request(app)
      .post("/api/mesas")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        numero_mesa:99,
        tipo_mesa:"Normal",
        capacidad_mesa:4
      });

    expect([200,400]).toContain(res.statusCode);
  });

  test("CLIENTE no crea", async () => {
    const res = await request(app)
      .post("/api/mesas")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({});

    expect(res.statusCode).toBe(403);
  });

  /* PUT */
  test("ADMIN actualiza mesa", async () => {
    const res = await request(app)
      .put("/api/mesas/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ capacidad_mesa:6 });

    expect([200,404]).toContain(res.statusCode);
  });

  /* DELETE */
  test("ADMIN elimina mesa", async () => {
    const res = await request(app)
      .delete("/api/mesas/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});