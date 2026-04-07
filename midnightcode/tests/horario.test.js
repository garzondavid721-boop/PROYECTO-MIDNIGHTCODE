const request = require("supertest");
const app = require("../app");
const { adminToken, empleadoToken, clienteToken } = require("./setup");

describe("HORARIOS FULL", () => {

  /* ================= GET ================= */

  test("ADMIN obtiene todos", async () => {
    const res = await request(app)
      .get("/api/horarios")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("EMPLEADO obtiene su horario", async () => {
    const res = await request(app)
      .get("/api/horarios/usuario/1002")
      .set("Authorization", `Bearer ${empleadoToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("CLIENTE no accede", async () => {
    const res = await request(app)
      .get("/api/horarios")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(403);
  });

  /* ================= POST ================= */

  test("ADMIN crea horario", async () => {
    const res = await request(app)
      .post("/api/horarios")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        doc_identidad:1002,
        dia_semana:"Martes",
        hora_entrada:"08:00:00",
        hora_salida:"12:00:00",
        estado:true
      });

    expect([200,400]).toContain(res.statusCode);
  });

  test("EMPLEADO no crea", async () => {
    const res = await request(app)
      .post("/api/horarios")
      .set("Authorization", `Bearer ${empleadoToken}`)
      .send({});

    expect(res.statusCode).toBe(403);
  });

  /* ================= PUT ================= */

  test("ADMIN actualiza", async () => {
    const res = await request(app)
      .put("/api/horarios/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ estado:false });

    expect([200,404]).toContain(res.statusCode);
  });

  /* ================= DELETE ================= */

  test("ADMIN elimina", async () => {
    const res = await request(app)
      .delete("/api/horarios/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,404]).toContain(res.statusCode);
  });

});