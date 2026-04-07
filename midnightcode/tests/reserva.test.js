const request = require("supertest");
const app = require("../app");
const { clienteToken, adminToken } = require("./setup");

describe("RESERVAS", () => {

  /* GET */
  test("ADMIN ve todas", async () => {
    const res = await request(app)
      .get("/api/reservas")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("CLIENTE ve sus reservas", async () => {
    const res = await request(app)
      .get("/api/reservas/mis-reservas")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  /* GET DISPONIBLES */
  test("mesas disponibles", async () => {
    const res = await request(app)
      .get("/api/reservas/mesas-disponibles?fecha=2026-12-01&hora=20:00:00")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(200);
  });

  /* POST */
  test("cliente crea reserva", async () => {
    const res = await request(app)
      .post("/api/reservas")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({
        cod_mesa:1,
        cod_parqueadero:1,
        fecha_reserva:"2026-12-01",
        hora_reserva:"20:00:00",
        cantidad_personas:2,
        incluye_cover:true
      });

    expect([200,400]).toContain(res.statusCode);
  });

  /* PUT */
  test("ADMIN actualiza", async () => {
    const res = await request(app)
      .put("/api/reservas/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ estado:"Confirmada" });

    expect([200,404]).toContain(res.statusCode);
  });

  /* DELETE */
  test("ADMIN elimina", async () => {
    const res = await request(app)
      .delete("/api/reservas/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});