const request = require("supertest");
const app = require("../app");

let adminToken;
let empleadoToken;
let clienteToken;

beforeAll(async () => {

  const admin = await request(app).post("/api/auth/login").send({
    correo_usu: "admin@test.com",
    password_usu: "admin123"
  });

  adminToken = admin.body.token;

  const empleado = await request(app).post("/api/auth/login").send({
    correo_usu: "empleado@test.com",
    password_usu: "123456"
  });

  empleadoToken = empleado.body.token;

  const cliente = await request(app).post("/api/auth/login").send({
    correo_usu: "cliente@test.com",
    password_usu: "123456"
  });

  clienteToken = cliente.body.token;

});

module.exports = { adminToken, empleadoToken, clienteToken };