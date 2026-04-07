const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken } = require("./setup");

describe("VENTAS FULL", () => {

  /* GET */
  test("ADMIN ve todas", async () => {
    const res = await request(app)
      .get("/api/ventas")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("get por id", async () => {
    const res = await request(app)
      .get("/api/ventas/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

  test("ventas pendientes", async () => {
    const res = await request(app)
      .get("/api/ventas/pendientes")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  /* POST */
  test("CLIENTE crea venta", async () => {
    const res = await request(app)
      .post("/api/ventas")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({
        detalles:[{ cod_producto:1, cantidad:1 }]
      });

    expect([200,400]).toContain(res.statusCode);
  });

  /* PAGAR */
  test("ADMIN paga venta", async () => {
    const res = await request(app)
      .post("/api/ventas/pagar/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ cod_metodopago:1 });

    expect([200,400,404]).toContain(res.statusCode);
  });

  /* PUT */
  test("ADMIN actualiza", async () => {
    const res = await request(app)
      .put("/api/ventas/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ estado:"Cancelada" });

    expect([200,404]).toContain(res.statusCode);
  });

  /* DELETE */
  test("ADMIN elimina", async () => {
    const res = await request(app)
      .delete("/api/ventas/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});