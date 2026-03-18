const request = require('supertest');
const app = require('../src/app');

let token = '';
let productoId = 0;

describe('🔥 E2E API COMPLETA (ADMIN REAL)', () => {

  // ---------------- LOGIN (SEED) ----------------
  it('POST /api/usuarios/login (ADMIN)', async () => {

    const res = await request(app).post('/api/usuarios/login').send({
      correo_usu: "admin@test.com",
      password_usu: "admin123"
    });

    expect(res.statusCode).toBe(200);

    token = res.body.token;

    expect(token).toBeDefined();
  });

  // ---------------- GET USUARIOS ----------------
  it('GET /api/usuarios', async () => {

    const res = await request(app)
      .get('/api/usuarios')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // ---------------- CREAR PRODUCTO ----------------
  it('POST /api/productos', async () => {

    const res = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre_produc: "Producto Test",
        presentacion_produc: "Unidad",
        precio_produc: 10000,
        stock: 10,
        cantidad: 10,
        estado_produc: true
      });

    expect([200, 201]).toContain(res.statusCode);

    productoId = res.body?.cod_producto;
  });

  // ---------------- GET PRODUCTOS ----------------
  it('GET /api/productos', async () => {

    const res = await request(app)
      .get('/api/productos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // ---------------- MESAS ----------------
  it('GET /api/mesas', async () => {

    const res = await request(app)
      .get('/api/mesas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // ---------------- RESERVA ----------------
  it('POST /api/reservas', async () => {

    const res = await request(app)
      .post('/api/reservas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        cod_mesa: 1,
        cod_parqueadero: 1,
        fecha_reserva: "2026-12-31",
        hora_reserva: "20:00:00",
        cantidad_personas: 2,
        incluye_cover: true
      });

    expect([200, 201]).toContain(res.statusCode);
  });

  // ---------------- GET RESERVAS ----------------
  it('GET /api/reservas', async () => {

    const res = await request(app)
      .get('/api/reservas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // ---------------- CAJA ACTUAL ----------------
  it('GET /api/caja/actual', async () => {

    const res = await request(app)
      .get('/api/caja/actual')
      .set('Authorization', `Bearer ${token}`);

    expect([200, 404]).toContain(res.statusCode);
  });

});