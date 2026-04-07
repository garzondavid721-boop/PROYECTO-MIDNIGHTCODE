const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken } = require("./setup");

describe("PRODUCTOS FULL", () => {

  /* GET */
  test("listar productos", async () => {
    const res = await request(app)
      .get("/api/productos")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("get by id", async () => {
    const res = await request(app)
      .get("/api/productos/1")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

  /* POST */
  test("ADMIN crea producto", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        nombre_produc:"Test",
        presentacion_produc:"Botella",
        precio_produc:2000,
        stock:10,
        cantidad:10
      });

    expect([200,400]).toContain(res.statusCode);
  });

  test("CLIENTE no crea", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({});

    expect(res.statusCode).toBe(403);
  });

  /* PUT */
  test("ADMIN actualiza", async () => {
    const res = await request(app)
      .put("/api/productos/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ precio_produc:3000 });

    expect([200,404]).toContain(res.statusCode);
  });

  /* DELETE */
  test("ADMIN elimina", async () => {
    const res = await request(app)
      .delete("/api/productos/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});