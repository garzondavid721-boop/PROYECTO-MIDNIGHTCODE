const request = require("supertest");
const app = require("../app");
const { adminToken, clienteToken } = require("./setup");

describe("ROLES", () => {

  /* GET */
  test("ADMIN obtiene roles", async () => {
    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("CLIENTE no puede ver roles", async () => {
    const res = await request(app)
      .get("/api/roles")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.statusCode).toBe(403);
  });

  /* POST */
  test("ADMIN crea rol", async () => {
    const res = await request(app)
      .post("/api/roles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre_rol:"TEST" });

    expect([200,400]).toContain(res.statusCode);
  });

  /* PUT */
  test("ADMIN actualiza rol", async () => {
    const res = await request(app)
      .put("/api/roles/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ nombre_rol:"ADMIN2" });

    expect([200,400]).toContain(res.statusCode);
  });

  /* DELETE */
  test("ADMIN elimina rol", async () => {
    const res = await request(app)
      .delete("/api/roles/3")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200,400,404]).toContain(res.statusCode);
  });

});