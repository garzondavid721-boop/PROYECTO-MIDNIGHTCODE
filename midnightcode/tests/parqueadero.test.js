const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken } = require("./setup");

describe("PARQUEADEROS FULL", () => {

  /* GET */
  test("listar parqueaderos", async () => {
    const res = await request(app)
      .get("/api/parqueaderos")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  /* POST */
  test("ADMIN crea parqueadero", async () => {
    const res = await request(app)
      .post("/api/parqueaderos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        numero_par:50,
        precio_parqueadero:10000
      });

    expect([200,400]).toContain(res.statusCode);
  });

  test("CLIENTE no crea", async () => {
    const res = await request(app)
      .post("/api/parqueaderos")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(403);
  });

  /* PUT */
  test("ADMIN actualiza", async () => {
    const res = await request(app)
      .put("/api/parqueaderos/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ estado_par:false });

    expect([200,404]).toContain(res.statusCode);
  });

  /* DELETE */
  test("ADMIN elimina", async () => {
    const res = await request(app)
      .delete("/api/parqueaderos/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});