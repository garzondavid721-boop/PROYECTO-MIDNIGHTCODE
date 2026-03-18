const request = require('supertest');
const app = require('../src/app');

describe('Test API', () => {
  it('GET /api/usuarios responde', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).not.toBe(500);
  });
  it('GET /api')
});